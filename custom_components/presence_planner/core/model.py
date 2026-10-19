"""Build step: turn one floor of a ``pp-plan`` into the geometric model used by the detection code.

Everything in the public part of :class:`Model` is plain lists and dicts so ``model_to_dict`` can hand it
to ``json.dumps``.  The private fields (``subs``, ``fast``, ``cache``) hold acceleration structures and are
never serialised.
"""

from __future__ import annotations

import math
from dataclasses import dataclass, field
from typing import Any

from .geometry import (
    EPS,
    bbox,
    dist,
    halfplanes,
    orient,
    point_in_polygon,
    rect_poly,
    seg_rect,
    snap_key,
)

DEFAULT_CELLS = (0.1, 0.2)
# Furniture that never blocks a ray even when it is taller than 1.5 m.
NON_OBSTACLE_TYPES = ("led_strip", "shower", "plant", "rug", "coat_rack")
ENTRY_RADIUS = 0.9
# Zone heights in metres (lying, sitting, standing).
ZONE_HEIGHTS = {"bed": 0.5, "sofa": 0.9, "desk": 0.9, "dining": 0.9, "wc": 0.9}
STANDING = 1.3

KIND_BLOCK = 0
KIND_BRICK = 1
KIND_THIN = 2
KIND_NAMES = ("block", "brick", "thin")


@dataclass
class Model:
    """Geometric model of one floor.  Field names follow the contract; see ARCHITECTURE.md."""

    floor: dict
    settings: dict
    rooms: list
    bands: list
    faces: list
    segments: list
    doors: list
    windows: list
    glass: list
    free_walls: list
    furniture: list
    zones: list
    cells: dict
    bounds: dict
    # Private acceleration data, not serialised.
    subs: list = field(default_factory=list, repr=False, compare=False)
    fast: dict = field(default_factory=dict, repr=False, compare=False)
    cache: dict = field(default_factory=dict, repr=False, compare=False)

    def room(self, room_id: str) -> dict | None:
        for r in self.rooms:
            if r["id"] == room_id:
                return r
        return None


def cell_key(cell: float) -> str:
    return f"{cell:g}"


def zone_rule(ftype: str):
    """Zone definition for a furniture type: ``(name, grow, ring)`` or ``None``."""
    t = str(ftype)
    if t in ("bed", "bunk_bed"):
        return ("bed", 0.0, False)
    if t.startswith("sofa") or t == "armchair":
        return ("sofa", 0.0, False)
    if t == "desk":
        return ("desk", 0.5, False)
    if t.startswith("table"):
        return ("dining", 0.45, False)
    if t in ("kitchen", "worktop", "sink", "stove"):
        return ("kitchen", 0.6, True)
    if t == "wc":
        return ("wc", 0.3, False)
    if t == "shower":
        return ("shower", 0.0, False)
    if t == "bathtub":
        return ("bathtub", 0.0, False)
    if t == "washbasin":
        return ("washbasin", 0.5, True)
    return None


def is_obstacle(furn: dict) -> bool:
    t = str(furn.get("type", ""))
    return (furn.get("h") or 0) >= 1.5 and not t.startswith("lamp") and t not in NON_OBSTACLE_TYPES


def _inward_normal(points, a, u, mid_t: float):
    """Unit normal of the edge pointing into the polygon."""
    nx, nz = -u[1], u[0]
    mx = a[0] + u[0] * mid_t + nx * 0.02
    mz = a[1] + u[1] * mid_t + nz * 0.02
    if not point_in_polygon(mx, mz, points):
        nx, nz = -nx, -nz
    return nx, nz


def _wall_kind(shared: bool, t: float) -> str:
    if not shared or t >= 0.2 - 1e-9:
        return "block"
    return "brick" if t >= 0.1 - 1e-9 else "thin"


def _seg_key(a, b):
    ka = (snap_key(a[0]), snap_key(a[1]))
    kb = (snap_key(b[0]), snap_key(b[1]))
    return (ka, kb) if ka <= kb else (kb, ka)


def build_model(plan: dict, floor_id: str) -> Model:
    """Build the model of one floor of ``plan`` (see "Build step" in ARCHITECTURE.md)."""
    floor = next((f for f in plan.get("floors", []) if f.get("id") == floor_id), None)
    if floor is None:
        raise KeyError(f"floor {floor_id!r} not found in plan")
    settings = plan.get("settings") or {}
    wall_ext = settings.get("wall_exterior") or 0.24
    wall_int = settings.get("wall_interior") or 0.12
    floor_h = floor.get("height") or 2.6

    # --- rooms -----------------------------------------------------------------------------------
    rooms = []
    for r in floor.get("rooms", []):
        pts = [[float(p[0]), float(p[1])] for p in r.get("points", [])]
        if len(pts) < 3:
            continue
        rooms.append(
            {
                "id": r["id"],
                "name": r.get("name", r["id"]),
                "area_id": r.get("area_id"),
                "points": pts,
                "height": r.get("ceiling_height") or floor_h,
                "_thick": list(r.get("wall_thickness") or []),
                "_wall_h": list(r.get("wall_heights") or []),
            }
        )
    verts = [p for r in rooms for p in r["points"]]

    # --- split every room edge at foreign vertices that lie on it ----------------------------------
    subs: list[dict] = []
    for r in rooms:
        pts = r["points"]
        for i, a in enumerate(pts):
            b = pts[(i + 1) % len(pts)]
            length = dist(a, b)
            if length < 1e-6:
                continue
            u = ((b[0] - a[0]) / length, (b[1] - a[1]) / length)
            ts = [0.0, length]
            for v in verts:
                dx = v[0] - a[0]
                dz = v[1] - a[1]
                t = dx * u[0] + dz * u[1]
                if abs(dx * u[1] - dz * u[0]) < EPS < t < length - EPS:
                    ts.append(t)
            ts.sort()
            thick = r["_thick"][i] if i < len(r["_thick"]) else None
            wall_h = r["_wall_h"][i] if i < len(r["_wall_h"]) else None
            for k in range(len(ts) - 1):
                if ts[k + 1] - ts[k] < EPS:
                    continue
                t0, t1 = ts[k], ts[k + 1]
                pa = list(a) if k == 0 else [a[0] + u[0] * t0, a[1] + u[1] * t0]
                pb = list(b) if k == len(ts) - 2 else [a[0] + u[0] * t1, a[1] + u[1] * t1]
                n = _inward_normal(pts, a, u, (t0 + t1) / 2)
                subs.append(
                    {
                        "room": r["id"],
                        "edge": i,
                        "a": pa,
                        "b": pb,
                        "t0": t0,
                        "t1": t1,
                        "n": list(n),
                        "u": list(u),
                        "thick": thick,
                        "no_wall": wall_h is not None and wall_h == 0,
                        "shared": False,
                        "wall_t": 0.0,
                    }
                )

    # --- group the pieces of the same physical wall --------------------------------------------------
    groups: dict[Any, list[dict]] = {}
    for s in subs:
        groups.setdefault(_seg_key(s["a"], s["b"]), []).append(s)
    bands, faces, segments = [], [], []
    for arr in groups.values():
        shared = len({s["room"] for s in arr}) > 1
        default_t = wall_int if shared else wall_ext
        # Each room contributes its own thickness (or the default); a shared wall takes the larger value.
        t = max((s["thick"] if (s["thick"] or 0) > 0 else default_t) for s in arr)
        none = any(s["no_wall"] for s in arr)
        for s in arr:
            s["shared"] = shared
            s["wall_t"] = 0.0 if none else t
        if none:
            continue
        s0 = arr[0]
        a, b, n = s0["a"], s0["b"], s0["n"]
        if shared:
            bands.append(seg_rect(a, b, t))
        else:
            bands.append([list(a), list(b), [b[0] - n[0] * t, b[1] - n[1] * t], [a[0] - n[0] * t, a[1] - n[1] * t]])
        segments.append({"a": list(a), "b": list(b), "k": _wall_kind(shared, t)})
    for s in subs:
        if s["wall_t"] <= 0:
            continue
        off = s["wall_t"] / 2 if s["shared"] else 0.0
        faces.append(
            {
                "a": [s["a"][0] + s["n"][0] * off, s["a"][1] + s["n"][1] * off],
                "b": [s["b"][0] + s["n"][0] * off, s["b"][1] + s["n"][1] * off],
                "n": list(s["n"]),
                "room": s["room"],
            }
        )

    # --- openings: doors are cut out of the wall, windows stay glass in the wall ----------------------
    by_id = {r["id"]: r for r in rooms}
    doors, windows, glass = [], [], []
    for o in floor.get("openings", []):
        r = by_id.get(o.get("room_id"))
        if r is None or o.get("wall"):
            continue
        pts = r["points"]
        ei = o.get("edge")
        if not isinstance(ei, int) or not 0 <= ei < len(pts):
            continue
        a = pts[ei]
        b = pts[(ei + 1) % len(pts)]
        length = dist(a, b)
        if length < 1e-6:
            continue
        u = ((b[0] - a[0]) / length, (b[1] - a[1]) / length)
        offset = float(o.get("offset", 0.0))
        width = float(o.get("width", 0.8))
        p0 = [a[0] + u[0] * (offset - width / 2), a[1] + u[1] * (offset - width / 2)]
        p1 = [a[0] + u[0] * (offset + width / 2), a[1] + u[1] * (offset + width / 2)]
        sub = next(
            (
                s
                for s in subs
                if s["room"] == r["id"] and s["edge"] == ei and s["t0"] - 1e-6 <= offset <= s["t1"] + 1e-6
            ),
            None,
        )
        n = sub["n"] if sub else list(_inward_normal(pts, a, u, length / 2))
        shared = bool(sub and sub["shared"])
        if o.get("type") == "window":
            win = {
                "id": o.get("id"),
                "a": p0,
                "b": p1,
                "n": list(n),
                "exterior": not shared,
                "room": r["id"],
                "sill": o.get("sill"),
                "height": o.get("height"),
            }
            windows.append(win)
            if not shared:
                glass.append({"a": p0, "b": p1, "n": list(n)})
            continue
        sgn = -1.0 if o.get("swing") == "out" else 1.0
        right = o.get("hinge") == "right"
        hinge, other = (p1, p0) if right else (p0, p1)
        door = {
            "id": o.get("id"),
            "a": p0,
            "b": p1,
            "hinge": list(hinge),
            "tip": [hinge[0] + n[0] * width * sgn, hinge[1] + n[1] * width * sgn],
            "other": list(other),
            "w": width,
            "rooms": [],
            "contact": o.get("contact"),
            "outside": not shared,
            "room": r["id"],
            "edge": ei,
        }
        mid = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2]
        door["rooms"] = [
            q["id"]
            for q in rooms
            if point_in_polygon(mid[0] + n[0] * 0.3, mid[1] + n[1] * 0.3, q["points"])
            or point_in_polygon(mid[0] - n[0] * 0.3, mid[1] - n[1] * 0.3, q["points"])
        ]
        doors.append(door)
        _cut_door(segments, p0, p1, u, width)

    # --- free walls, furniture -------------------------------------------------------------------------
    free_walls = []
    for w in floor.get("walls", []):
        h = w.get("height")
        free_walls.append(
            {
                "id": w.get("id"),
                "poly": seg_rect(w["a"], w["b"], w.get("thickness") or wall_int),
                "height": h,
                "block": h is None or h >= 1.5,
            }
        )
    furniture = []
    for f in floor.get("furniture", []):
        furniture.append(
            {
                "id": f.get("id"),
                "type": f.get("type"),
                "poly": rect_poly(f["x"], f["z"], f.get("w") or 0.3, f.get("d") or 0.3, f.get("rotation") or 0),
                "h": f.get("h") or 0,
                "obstacle": is_obstacle(f),
                "_src": f,
            }
        )

    # --- zones -----------------------------------------------------------------------------------------
    zones = []
    for fur in furniture:
        rule = zone_rule(fur["type"])
        if rule is None:
            continue
        name, grow, ring = rule
        f = fur["_src"]
        room = next((r for r in rooms if point_in_polygon(f["x"], f["z"], r["points"])), None)
        if room is None:
            continue
        zones.append(
            {
                "name": name,
                "room": room["id"],
                "height": ZONE_HEIGHTS.get(name, STANDING),
                "outer": rect_poly(f["x"], f["z"], f.get("w") or 0.3, f.get("d") or 0.3, f.get("rotation") or 0, grow),
                "inner": fur["poly"] if ring else None,
            }
        )
    for d in doors:
        mid = [(d["a"][0] + d["b"][0]) / 2, (d["a"][1] + d["b"][1]) / 2]
        for rid in d["rooms"]:
            zones.append(
                {
                    "name": "entry",
                    "room": rid,
                    "height": STANDING,
                    "outer": None,
                    "inner": None,
                    "center": mid,
                    "radius": ENTRY_RADIUS,
                    "door": d["id"],
                }
            )
    for fur in furniture:
        fur.pop("_src", None)

    # --- bounds ----------------------------------------------------------------------------------------
    pts = [p for b in bands for p in b] + [p for r in rooms for p in r["points"]]
    pts += [p for o in floor.get("outdoor", []) for p in (o.get("points") or [])]
    xs = [p[0] for p in pts] or [0.0]
    zs = [p[1] for p in pts] or [0.0]
    bounds = {"x0": min(xs) - 0.4, "x1": max(xs) + 0.4, "z0": min(zs) - 0.4, "z1": max(zs) + 0.4}

    room_out = [{k: v for k, v in r.items() if not k.startswith("_")} for r in rooms]
    model = Model(
        floor={"id": floor["id"], "name": floor.get("name", floor["id"]), "height": floor_h},
        settings={"wall_exterior": wall_ext, "wall_interior": wall_int},
        rooms=room_out,
        bands=bands,
        faces=faces,
        segments=segments,
        doors=doors,
        windows=windows,
        glass=glass,
        free_walls=free_walls,
        furniture=furniture,
        zones=zones,
        cells={},
        bounds=bounds,
        subs=subs,
    )
    _build_fast(model)
    for c in DEFAULT_CELLS:
        get_cells(model, c)
    return model


def _cut_door(segments: list, p0, p1, u, width: float) -> None:
    """Remove the door span from every wall segment that lies on the door line."""
    length = dist(p0, p1) or 1.0
    for i in range(len(segments) - 1, -1, -1):
        m = segments[i]
        if abs(orient(p0, p1, m["a"])) / length > EPS or abs(orient(p0, p1, m["b"])) / length > EPS:
            continue
        ta = (m["a"][0] - p0[0]) * u[0] + (m["a"][1] - p0[1]) * u[1]
        tb = (m["b"][0] - p0[0]) * u[0] + (m["b"][1] - p0[1]) * u[1]
        lo, hi = min(ta, tb), max(ta, tb)
        if hi <= EPS or lo >= width - EPS:
            continue
        segments.pop(i)
        if lo < -EPS:
            segments.append({"a": [p0[0] + u[0] * lo, p0[1] + u[1] * lo], "b": list(p0), "k": m["k"]})
        if hi > width + EPS:
            segments.append(
                {
                    "a": [p0[0] + u[0] * width, p0[1] + u[1] * width],
                    "b": [p0[0] + u[0] * hi, p0[1] + u[1] * hi],
                    "k": m["k"],
                }
            )


def _build_fast(model: Model) -> None:
    """Tuples for the inner loops of the ray code."""
    walls = []
    for s in model.segments:
        a, b = s["a"], s["b"]
        walls.append(
            (
                a[0],
                a[1],
                b[0],
                b[1],
                KIND_NAMES.index(s["k"]),
                min(a[0], b[0]),
                max(a[0], b[0]),
                min(a[1], b[1]),
                max(a[1], b[1]),
            )
        )
    door_segs = []
    for d in model.doors:
        a, b = d["a"], d["b"]
        door_segs.append(
            (
                d["id"],
                a[0],
                a[1],
                b[0],
                b[1],
                min(a[0], b[0]),
                max(a[0], b[0]),
                min(a[1], b[1]),
                max(a[1], b[1]),
                d["outside"],
            )
        )
    blockers = [(halfplanes(w["poly"]), bbox(w["poly"])) for w in model.free_walls if w["block"]]
    obstacles = [(halfplanes(f["poly"]), bbox(f["poly"]), f["h"]) for f in model.furniture if f["obstacle"]]
    model.fast = {"walls": walls, "doors": door_segs, "blockers": blockers, "obstacles": obstacles}


def get_cells(model: Model, cell: float) -> list:
    """Cells ``[x, z, room_id]`` on a grid of spacing ``cell`` over each room, outside wall bands and free walls."""
    key = cell_key(cell)
    cached = model.cells.get(key)
    if cached is not None:
        return cached
    band_boxes = [(bbox(b), b) for b in model.bands] + [(bbox(w["poly"]), w["poly"]) for w in model.free_walls]
    cells = []
    for r in model.rooms:
        pts = r["points"]
        x0, x1, z0, z1 = bbox(pts)
        i = 0
        while True:
            x = x0 + cell * (i + 0.5)
            if x >= x1:
                break
            j = 0
            while True:
                z = z0 + cell * (j + 0.5)
                if z >= z1:
                    break
                j += 1
                if not point_in_polygon(x, z, pts):
                    continue
                blocked = False
                for (bx0, bx1, bz0, bz1), poly in band_boxes:
                    if bx0 <= x <= bx1 and bz0 <= z <= bz1 and point_in_polygon(x, z, poly):
                        blocked = True
                        break
                if not blocked:
                    cells.append([round(x, 6), round(z, 6), r["id"]])
            i += 1
    model.cells[key] = cells
    return cells


def cells_by_room(model: Model, cell: float) -> dict:
    """``{room_id: [cell index, ...]}`` for the grid of this spacing (cached)."""
    key = "by_room:" + cell_key(cell)
    if key not in model.cache:
        out: dict[str, list[int]] = {r["id"]: [] for r in model.rooms}
        for i, c in enumerate(get_cells(model, cell)):
            out[c[2]].append(i)
        model.cache[key] = out
    return model.cache[key]


def zone_groups(model: Model) -> list:
    """Zones merged per ``(name, room)`` in order of first appearance: ``{name, room, height, parts}``."""
    if "zone_groups" not in model.cache:
        order: dict[tuple, dict] = {}
        for z in model.zones:
            k = (z["name"], z["room"])
            if k not in order:
                order[k] = {"name": z["name"], "room": z["room"], "height": z["height"], "parts": []}
            order[k]["parts"].append(z)
        model.cache["zone_groups"] = list(order.values())
    return model.cache["zone_groups"]


def zone_cell_ids(model: Model, group: dict, cell: float) -> list:
    """Indices of the grid cells (of the zone's room) that belong to the zone group."""
    cells = get_cells(model, cell)
    ids = []
    for i in cells_by_room(model, cell)[group["room"]]:
        x, z = cells[i][0], cells[i][1]
        for part in group["parts"]:
            if part.get("outer") is None:
                c = part["center"]
                hit = math.hypot(x - c[0], z - c[1]) < part["radius"]
            else:
                hit = point_in_polygon(x, z, part["outer"]) and not (
                    part["inner"] and point_in_polygon(x, z, part["inner"])
                )
            if hit:
                ids.append(i)
                break
    return ids


def _round_pt(p, nd=4):
    return [round(p[0], nd), round(p[1], nd)]


def _round_poly(poly, nd=4):
    return [_round_pt(p, nd) for p in poly]


def model_to_dict(model: Model) -> dict:
    """JSON-serialisable view of the model, with the key names of the JS ``buildModel`` result."""
    return {
        "floor": dict(model.floor),
        "settings": dict(model.settings),
        "rooms": [
            {
                "id": r["id"],
                "name": r["name"],
                "area_id": r["area_id"],
                "points": _round_poly(r["points"]),
                "height": r["height"],
            }
            for r in model.rooms
        ],
        "bands": [_round_poly(b) for b in model.bands],
        "faces": [
            {"a": _round_pt(f["a"]), "b": _round_pt(f["b"]), "n": _round_pt(f["n"]), "room": f["room"]}
            for f in model.faces
        ],
        "segments": [{"a": _round_pt(s["a"]), "b": _round_pt(s["b"]), "k": s["k"]} for s in model.segments],
        "doors": [
            {
                "id": d["id"],
                "a": _round_pt(d["a"]),
                "b": _round_pt(d["b"]),
                "hinge": _round_pt(d["hinge"]),
                "tip": _round_pt(d["tip"]),
                "other": _round_pt(d["other"]),
                "w": d["w"],
                "rooms": list(d["rooms"]),
                "contact": d["contact"],
                "outside": d["outside"],
            }
            for d in model.doors
        ],
        "windows": [
            {
                "id": w["id"],
                "a": _round_pt(w["a"]),
                "b": _round_pt(w["b"]),
                "n": _round_pt(w["n"]),
                "exterior": w["exterior"],
            }
            for w in model.windows
        ],
        "glass": [{"a": _round_pt(g["a"]), "b": _round_pt(g["b"]), "n": _round_pt(g["n"])} for g in model.glass],
        "freeWalls": [
            {"id": w["id"], "poly": _round_poly(w["poly"]), "height": w["height"], "block": w["block"]}
            for w in model.free_walls
        ],
        "furniture": [
            {"id": f["id"], "type": f["type"], "poly": _round_poly(f["poly"]), "h": f["h"], "obstacle": f["obstacle"]}
            for f in model.furniture
        ],
        "zones": [_zone_dict(z) for z in model.zones],
        "cells": {k: [[c[0], c[1], c[2]] for c in v] for k, v in model.cells.items()},
        "bounds": {k: round(v, 4) for k, v in model.bounds.items()},
    }


def _zone_dict(z: dict) -> dict:
    out = {"name": z["name"], "room": z["room"], "height": z["height"]}
    if z.get("outer") is None:
        out.update(
            {
                "outer": None,
                "inner": None,
                "center": _round_pt(z["center"]),
                "radius": z["radius"],
                "door": z.get("door"),
            }
        )
    else:
        out.update({"outer": _round_poly(z["outer"]), "inner": _round_poly(z["inner"]) if z["inner"] else None})
    return out


def room_at(model: Model, x: float, z: float) -> str | None:
    """Id of the first room whose polygon contains ``(x, z)``."""
    for r in model.rooms:
        if point_in_polygon(x, z, r["points"]):
            return r["id"]
    return None
