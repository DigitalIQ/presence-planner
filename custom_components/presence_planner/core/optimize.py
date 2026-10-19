"""Mount point search for one room (``optimize``).

Candidates are wall points every 0.1 m, convex corners and, for ceiling-capable profiles, a 0.5 m ceiling
grid.  Everything that does not depend on the viewing direction (distance, ray attenuation) is computed
once per position; the directions then only run the field-of-view test.
"""

from __future__ import annotations

import math

from .detection import RayCaster, SensorCtx, glass_score, normalize_opts
from .geometry import bbox, near_polygon, point_in_polygon
from .model import STANDING, Model, cells_by_room, get_cells, zone_cell_ids, zone_groups
from .profiles import default_profiles, find_profile, resolve_sensor

WALL_STEP = 0.1
WALL_INSET = 0.03
CEILING_STEP = 0.5
WALL_HEIGHT = 1.9
WALL_TILT = 10.0
NORMAL_RANGE = 70
DIR_STEP = 10
CORNER_RANGE = 30
REFINE_STEPS = (-5.0, -2.5, 2.5, 5.0)
REFINE_POSITIONS = 20
DISTINCT_DISTANCE = 0.4
ZONE_WEIGHT = 3.0
ENTRY_WEIGHT = 2.0
GLASS_WEIGHT = 0.3
HALL_SPILL_FACTOR = 3.0
HALL_WORDS = ("flur", "hall", "corridor", "diele", "entry", "entrance", "eingang", "vorraum", "lobby")
TOP_N = 5


def is_hall_room(room: dict) -> bool:
    text = f"{room.get('id', '')} {room.get('name', '')}".lower()
    return any(w in text for w in HALL_WORDS)


class _Targets:
    """Weighted own-room sample points and foreign-room spill points for one room."""

    def __init__(self, model: Model, room: dict, o: dict):
        cells = get_cells(model, o["cell"])
        by_room = cells_by_room(model, o["cell"])
        heights = o["heights"] or [STANDING]
        own_idx = by_room[room["id"]]
        n_cells = len(own_idx)
        n_h = len(heights)
        weights: dict[tuple, list] = {}
        for i in own_idx:
            for h in heights:
                weights[(i, h)] = [1.0 / n_h, 1.0 / (n_cells * n_h)]
        den = float(n_cells)
        for g in zone_groups(model):
            if g["room"] != room["id"]:
                continue
            w = ENTRY_WEIGHT if g["name"] == "entry" else ZONE_WEIGHT
            ids = zone_cell_ids(model, g, o["cell"])
            den += w * len(ids)
            for i in ids:
                weights.setdefault((i, g["height"]), [0.0, 0.0])[0] += w
        den = den or 1.0
        self.px, self.pz, self.py, self.ws, self.wp = [], [], [], [], []
        for (i, h), (ws, wp) in weights.items():
            self.px.append(cells[i][0])
            self.pz.append(cells[i][1])
            self.py.append(h)
            self.ws.append(ws / den)
            self.wp.append(wp)
        self.spill_rooms = []
        self.spill_n = []
        self.spill_mult = []
        self.sx, self.sz, self.sr = [], [], []
        for r in model.rooms:
            if r["id"] == room["id"] or not by_room[r["id"]]:
                continue
            ri = len(self.spill_rooms)
            self.spill_rooms.append(r["id"])
            self.spill_n.append(len(by_room[r["id"]]))
            self.spill_mult.append(HALL_SPILL_FACTOR if is_hall_room(r) else 1.0)
            for i in by_room[r["id"]]:
                self.sx.append(cells[i][0])
                self.sz.append(cells[i][1])
                self.sr.append(ri)


def _position_data(model: Model, tg: _Targets, x: float, z: float, y: float, reach: float, thin_db: float):
    """Direction independent part: surviving points as ``(vx, vy, vz, d, attenuation, ...)`` tuples."""
    rc = RayCaster(model, x, z, y, reach, frozenset(), thin_db)
    loss = rc.loss
    r2 = reach * reach
    sqrt = math.sqrt
    own = []
    for k in range(len(tg.px)):
        px, pz, py = tg.px[k], tg.pz[k], tg.py[k]
        vx, vy, vz = px - x, py - y, pz - z
        d2 = vx * vx + vy * vy + vz * vz
        if d2 > r2 or d2 < 1e-12:
            continue
        L = loss(px, pz, py)
        if L is None:
            continue
        att = 10.0 ** (-L / 20.0)
        d = sqrt(d2)
        if d > reach * att:
            continue
        own.append((vx, vy, vz, d, att, tg.ws[k], tg.wp[k]))
    spill = []
    for k in range(len(tg.sx)):
        px, pz = tg.sx[k], tg.sz[k]
        vx, vy, vz = px - x, STANDING - y, pz - z
        d2 = vx * vx + vy * vy + vz * vz
        if d2 > r2 or d2 < 1e-12:
            continue
        L = loss(px, pz, STANDING)
        if L is None:
            continue
        att = 10.0 ** (-L / 20.0)
        d = sqrt(d2)
        if d > reach * att:
            continue
        spill.append((vx, vy, vz, d, att, tg.sr[k]))
    return own, spill


def _score_direction(model: Model, tg: _Targets, data, tpl: dict, phi: float, weight: float) -> dict:
    sensor = dict(tpl)
    sensor["phi"] = phi
    ctx = SensorCtx(sensor)
    reach = ctx.reach
    fov = ctx.fov_gain
    own, spill = data
    cov_s = 0.0
    cov_p = 0.0
    k58 = 0.58 * reach
    span = reach - k58
    for vx, vy, vz, d, att, ws, wp in own:
        g = fov(vx, vy, vz, d)
        if g is None or d > reach * g * att:
            continue
        q = 1.0 if d <= k58 else 1.0 - 0.4 * (d - k58) / span
        cov_s += ws * q
        cov_p += wp * q
    counts = [0] * len(tg.spill_rooms)
    for vx, vy, vz, d, att, ri in spill:
        g = fov(vx, vy, vz, d)
        if g is None or d > reach * g * att:
            continue
        counts[ri] += 1
    shares = {}
    spill_w = 0.0
    for ri, c in enumerate(counts):
        if c:
            share = c / tg.spill_n[ri]
            shares[tg.spill_rooms[ri]] = share
            spill_w += tg.spill_mult[ri] * share
    glass = glass_score(model, sensor)
    return {
        "phi": phi % 360.0,
        "score": cov_s - weight * spill_w - GLASS_WEIGHT * glass,
        "coverage": cov_p,
        "spill": shares,
        "glass": glass,
    }


def _blocked_mount(model: Model, room: dict, x: float, z: float) -> bool:
    """True when a wall or corner mount at this point would sit in/on something."""
    if not point_in_polygon(x, z, room["points"]):
        return True
    for band in model.bands:
        x0, x1, z0, z1 = bbox(band)
        if x0 <= x <= x1 and z0 <= z <= z1 and point_in_polygon(x, z, band):
            return True
    for w in model.free_walls:
        if near_polygon(x, z, w["poly"], 0.05):
            return True
    for o in list(model.doors) + list(model.windows):
        a, b = o["a"], o["b"]
        length = math.hypot(b[0] - a[0], b[1] - a[1]) or 1.0
        ux, uz = (b[0] - a[0]) / length, (b[1] - a[1]) / length
        along = (x - a[0]) * ux + (z - a[1]) * uz
        lateral = abs((x - a[0]) * uz - (z - a[1]) * ux)
        if -0.15 <= along <= length + 0.15 and lateral < 0.5:
            return True
    for f in model.furniture:
        if f["h"] >= 1.5 and not str(f["type"]).startswith("lamp") and near_polygon(x, z, f["poly"], 0.08):
            return True
    return False


def _wall_candidates(model: Model, room: dict) -> list:
    out = []
    subs = [s for s in model.subs if s["room"] == room["id"]]
    pts = room["points"]
    for ei in range(len(pts)):
        edge_subs = sorted((s for s in subs if s["edge"] == ei), key=lambda s: s["t0"])
        if not edge_subs:
            continue
        a = pts[ei]
        u = edge_subs[0]["u"]
        length = edge_subs[-1]["t1"]
        k = 0
        while True:
            t = WALL_INSET + WALL_STEP * k
            k += 1
            if t > length - WALL_INSET + 1e-9:
                break
            sub = next((s for s in edge_subs if s["t0"] - 1e-9 <= t <= s["t1"] + 1e-9), None)
            if sub is None or sub["wall_t"] <= 0:
                continue
            off = (sub["wall_t"] / 2 if sub["shared"] else 0.0) + WALL_INSET
            x = a[0] + u[0] * t + sub["n"][0] * off
            z = a[1] + u[1] * t + sub["n"][1] * off
            if _blocked_mount(model, room, x, z):
                continue
            phi_n = math.degrees(math.atan2(sub["n"][1], sub["n"][0]))
            out.append({"x": x, "z": z, "mount": "wall", "phis": [phi_n + d for d in range(-NORMAL_RANGE, NORMAL_RANGE + 1, DIR_STEP)]})
    return out


def _corner_candidates(model: Model, room: dict) -> list:
    out = []
    pts = room["points"]
    n = len(pts)
    area = 0.0
    for i in range(n):
        area += pts[i - 1][0] * pts[i][1] - pts[i][0] * pts[i - 1][1]
    subs = [s for s in model.subs if s["room"] == room["id"]]
    for i in range(n):
        prev_edge = (i - 1) % n
        prev_subs = [s for s in subs if s["edge"] == prev_edge]
        next_subs = [s for s in subs if s["edge"] == i]
        if not prev_subs or not next_subs:
            continue
        s1 = max(prev_subs, key=lambda s: s["t1"])
        s2 = min(next_subs, key=lambda s: s["t0"])
        if s1["wall_t"] <= 0 or s2["wall_t"] <= 0:
            continue
        e1 = s1["u"]
        e2 = s2["u"]
        if (e1[0] * e2[1] - e1[1] * e2[0]) * area <= 0:  # reflex or straight vertex
            continue
        n1, n2 = s1["n"], s2["n"]
        det = n1[0] * n2[1] - n1[1] * n2[0]
        if abs(det) < 0.2:
            continue
        d1 = (s1["wall_t"] / 2 if s1["shared"] else 0.0) + WALL_INSET
        d2 = (s2["wall_t"] / 2 if s2["shared"] else 0.0) + WALL_INSET
        v = pts[i]
        x = v[0] + (d1 * n2[1] - d2 * n1[1]) / det
        z = v[1] + (n1[0] * d2 - n2[0] * d1) / det
        if _blocked_mount(model, room, x, z):
            continue
        phi_b = math.degrees(math.atan2(n1[1] + n2[1], n1[0] + n2[0]))
        out.append({"x": x, "z": z, "mount": "corner", "phis": [phi_b + d for d in range(-CORNER_RANGE, CORNER_RANGE + 1, DIR_STEP)]})
    return out


def _ceiling_candidates(model: Model, room: dict) -> list:
    out = []
    x0, x1, z0, z1 = bbox(room["points"])
    i = math.ceil(x0 / CEILING_STEP - 1e-9)
    while i * CEILING_STEP <= x1:
        x = i * CEILING_STEP
        j = math.ceil(z0 / CEILING_STEP - 1e-9)
        while j * CEILING_STEP <= z1:
            z = j * CEILING_STEP
            j += 1
            if not point_in_polygon(x, z, room["points"]):
                continue
            if any(point_in_polygon(x, z, b) for b in model.bands):
                continue
            if any(point_in_polygon(x, z, w["poly"]) for w in model.free_walls):
                continue
            out.append({"x": x, "z": z, "mount": "ceiling", "phis": [0.0]})
        i += 1
    return out


def optimize(
    model: Model,
    room_id: str,
    profile_id: str,
    opts: dict | None = None,
    weight: float = 1.0,
    profiles: dict | None = None,
) -> list:
    """Best mount points for ``room_id``: up to 5 distinct candidates, best first.

    Score = weighted room coverage (zones x3, entry zones x2) - weight * spill (hall-type rooms x3)
    - 0.3 * glass facing.  ``coverage`` in the result is the plain mean over the heights, as in ``evaluate``.
    """
    o = normalize_opts(opts)
    profiles = profiles or default_profiles()
    prof = find_profile(profiles, profile_id)
    room = model.room(room_id)
    if room is None:
        raise KeyError(f"room {room_id!r} not found")
    tg = _Targets(model, room, o)
    mounts = prof.get("mounts") or ["wall"]

    cands: list[dict] = []
    if "wall" in mounts:
        cands += _wall_candidates(model, room)
    if "corner" in mounts:
        cands += _corner_candidates(model, room)
    if "ceiling" in mounts:
        cands += _ceiling_candidates(model, room)

    wall_h = min(WALL_HEIGHT, room["height"] - 0.1)
    results: list[dict] = []
    for c in cands:
        ceiling = c["mount"] == "ceiling"
        height = room["height"] if ceiling else wall_h
        tilt = 90.0 if ceiling else WALL_TILT
        tpl = resolve_sensor(
            {"entity_id": "candidate", "profile": prof["id"], "mount": c["mount"], "x": c["x"], "z": c["z"], "height": height, "tilt": tilt, "phi": 0.0},
            profiles,
        )
        data = _position_data(model, tg, c["x"], c["z"], height, float(tpl["reach"]), float(o["thin_db"]))
        best = None
        for phi in c["phis"]:
            r = _score_direction(model, tg, data, tpl, phi, weight)
            if best is None or r["score"] > best["score"] + 1e-12:
                best = r
        results.append({"cand": c, "tpl": tpl, "data": data, "best": best, "height": height, "tilt": tilt})

    results.sort(key=lambda r: (-r["best"]["score"], r["cand"]["x"], r["cand"]["z"], r["best"]["phi"]))
    for r in results[:REFINE_POSITIONS]:
        if r["cand"]["mount"] == "ceiling":
            continue
        base = r["best"]
        for step in REFINE_STEPS:
            alt = _score_direction(model, tg, r["data"], r["tpl"], base["phi"] + step, weight)
            if alt["score"] > r["best"]["score"] + 1e-12:
                r["best"] = alt
    results.sort(key=lambda r: (-r["best"]["score"], r["cand"]["x"], r["cand"]["z"], r["best"]["phi"]))

    out: list[dict] = []
    for r in results:
        c = r["cand"]
        if any(math.hypot(c["x"] - q["x"], c["z"] - q["z"]) < DISTINCT_DISTANCE - 1e-9 for q in out):
            continue
        b = r["best"]
        out.append(
            {
                "x": round(c["x"], 4),
                "z": round(c["z"], 4),
                "height": round(r["height"], 4),
                "phi": round(b["phi"], 2),
                "tilt": r["tilt"],
                "mount": c["mount"],
                "score": round(b["score"], 4),
                "coverage": round(b["coverage"], 4),
                "spill": {k: round(v, 4) for k, v in b["spill"].items()},
                "glass": round(b["glass"], 4),
            }
        )
        if len(out) >= TOP_N:
            break
    return out
