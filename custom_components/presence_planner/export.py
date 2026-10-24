"""Own plan <-> NeonPlan import format, and import from a NeonPlan building.

The NeonPlan import format (`format: "neonplan-import"`) is documented in NeonPlan's docs/plan-format.md:
rooms as outlines, doors and windows by their middle point (`at`) on a room edge, furniture by its middle.
"""

from __future__ import annotations

import copy
import math
import re
from typing import Any

from .neonplan import NeonPlanIncompatible, building_to_plan
from .validation import PlanValidationError, bounded_data, validate_plan

IMPORT_FORMAT = "neonplan-import"
# a door or window `at` point counts as lying on an edge within this distance (m)
_EDGE_TOLERANCE = 0.08
_UNITS = {"m": 1.0, "cm": 0.01, "mm": 0.001}


class ImportFormatError(ValueError):
    """The data is neither the NeonPlan import format nor a NeonPlan building nor a pp-plan."""


def _r(value: float) -> float:
    return round(float(value), 4)


def _edge(points: list[list[float]], index: int) -> tuple[list[float], list[float]]:
    return points[index], points[(index + 1) % len(points)]


def _point_along(a: list[float], b: list[float], offset: float) -> list[float]:
    length = math.hypot(b[0] - a[0], b[1] - a[1]) or 1.0
    t = offset / length
    return [_r(a[0] + (b[0] - a[0]) * t), _r(a[1] + (b[1] - a[1]) * t)]


def _opening_at(floor: dict[str, Any], opening: dict[str, Any]) -> list[float] | None:
    if opening.get("wall"):
        wall = next((w for w in floor.get("walls") or [] if w.get("id") == opening["wall"]), None)
        if wall is None:
            return None
        return _point_along(wall["a"], wall["b"], float(opening["offset"]))
    room = next((r for r in floor.get("rooms") or [] if r.get("id") == opening.get("room_id")), None)
    if room is None or not 0 <= int(opening.get("edge", -1)) < len(room["points"]):
        return None
    a, b = _edge(room["points"], int(opening["edge"]))
    return _point_along(a, b, float(opening["offset"]))


def to_neonplan_import(plan: dict[str, Any]) -> dict[str, Any]:
    """Export a pp-plan to the NeonPlan import format."""
    floors = []
    for floor in plan.get("floors") or []:
        doors, windows = [], []
        for opening in floor.get("openings") or []:
            at = _opening_at(floor, opening)
            if at is None:
                continue
            if opening.get("type") == "window":
                windows.append(
                    {
                        "at": at,
                        "width": _r(opening["width"]),
                        "height": _r(opening.get("height") or 1.3),
                        "sill": _r(opening.get("sill") or 0),
                    }
                )
            else:
                doors.append({"at": at, "width": _r(opening["width"]), "height": _r(opening.get("height") or 2.0)})
        walls = []
        for wall in floor.get("walls") or []:
            item = {"from": [_r(v) for v in wall["a"]], "to": [_r(v) for v in wall["b"]]}
            if wall.get("thickness") is not None:
                item["thickness"] = _r(wall["thickness"])
            if wall.get("height") is not None:
                item["height"] = _r(wall["height"])
            walls.append(item)
        floors.append(
            {
                "name": floor.get("name") or floor.get("id"),
                "elevation": _r(floor.get("elevation") or 0),
                "height": _r(floor.get("height") or 2.5),
                "rooms": [
                    {"name": room.get("name") or room["id"], "points": [[_r(p[0]), _r(p[1])] for p in room["points"]]}
                    for room in floor.get("rooms") or []
                ],
                "walls": walls,
                "doors": doors,
                "windows": windows,
                "furniture": [
                    {
                        "type": item["type"],
                        "at": [_r(item["x"]), _r(item["z"])],
                        "width": _r(item["w"]),
                        "depth": _r(item["d"]),
                        "height": _r(item["h"]),
                        "rotation": _r(item.get("rotation") or 0),
                    }
                    for item in floor.get("furniture") or []
                ],
            }
        )
    return {"format": IMPORT_FORMAT, "units": "m", "rooms_at": "centre", "floors": floors}


def _slug(text: str, fallback: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "_", str(text).lower()).strip("_")
    return slug[:48] or fallback


def _unique(base: str, used: set[str]) -> str:
    candidate, n = base, 2
    while candidate in used:
        candidate, n = f"{base}_{n}", n + 1
    used.add(candidate)
    return candidate


def _point(value: Any, unit: float) -> list[float] | None:
    if isinstance(value, (list, tuple)) and len(value) >= 2:
        try:
            return [float(value[0]) * unit, float(value[1]) * unit]
        except (TypeError, ValueError):
            return None
    if isinstance(value, dict) and "x" in value:
        try:
            return [float(value["x"]) * unit, float(value.get("z", value.get("y"))) * unit]
        except (TypeError, ValueError):
            return None
    return None


def _num(value: Any, default: float, unit: float = 1.0) -> float:
    try:
        return float(value) * unit
    except (TypeError, ValueError):
        return default


def _locate(rooms: list[dict[str, Any]], at: list[float]) -> tuple[str, int, float] | None:
    """Room id, edge index and offset of the room edge closest to a point (within the tolerance)."""
    best = None
    for room in rooms:
        pts = room["points"]
        for i in range(len(pts)):
            a, b = _edge(pts, i)
            dx, dz = b[0] - a[0], b[1] - a[1]
            length2 = dx * dx + dz * dz
            if length2 == 0:
                continue
            t = max(0.0, min(1.0, ((at[0] - a[0]) * dx + (at[1] - a[1]) * dz) / length2))
            dist = math.hypot(a[0] + t * dx - at[0], a[1] + t * dz - at[1])
            if dist <= _EDGE_TOLERANCE and (best is None or dist < best[0]):
                best = (dist, room["id"], i, t * math.sqrt(length2))
    return None if best is None else (best[1], best[2], best[3])


def from_neonplan_import(data: dict[str, Any]) -> tuple[dict[str, Any], list[str]]:
    """Read the NeonPlan import format into a pp-plan; returns the plan and warnings."""
    unit = _UNITS.get(str(data.get("units", "m")), 1.0)
    warnings: list[str] = []
    if data.get("rooms_at") == "inner":
        warnings.append("rooms_at_inner_read_as_centre")
    floors = []
    floor_ids: set[str] = set()
    for index, floor in enumerate(data.get("floors") or []):
        used: set[str] = set()
        rooms = []
        for room in floor.get("rooms") or []:
            points = [p for p in (_point(v, unit) for v in room.get("points") or []) if p]
            if len(points) < 3:
                warnings.append("room_skipped")
                continue
            name = str(room.get("name") or f"Room {len(rooms) + 1}")
            rooms.append(
                {
                    "id": _unique(_slug(name, "room"), used),
                    "name": name,
                    "area_id": None,
                    "points": [[_r(p[0]), _r(p[1])] for p in points],
                    "ceiling_height": None,
                }
            )
        openings = []
        for kind, items in (("door", floor.get("doors") or []), ("window", floor.get("windows") or [])):
            for item in items:
                at = _point(item.get("at"), unit)
                where = _locate(rooms, at) if at else None
                if where is None:
                    warnings.append(f"{kind}_not_on_edge")
                    continue
                room_id, edge, offset = where
                height = _num(item.get("height"), 2.01 if kind == "door" else 1.3, unit)
                openings.append(
                    {
                        "id": _unique(f"{kind[0]}{len(openings) + 1}", used),
                        "room_id": room_id,
                        "edge": edge,
                        "offset": _r(offset),
                        "width": _r(_num(item.get("width"), 0.9 if kind == "door" else 1.2, unit)),
                        "type": kind,
                        "sill": 0.0 if kind == "door" else _r(_num(item.get("sill"), 0.9, unit)),
                        "height": _r(height),
                        "hinge": "left",
                        "swing": "in",
                        "contact": None,
                    }
                )
        walls = []
        for item in floor.get("walls") or []:
            a, b = _point(item.get("from"), unit), _point(item.get("to"), unit)
            if not a or not b:
                continue
            walls.append(
                {
                    "id": _unique(f"wall{len(walls) + 1}", used),
                    "a": [_r(a[0]), _r(a[1])],
                    "b": [_r(b[0]), _r(b[1])],
                    "thickness": None if item.get("thickness") is None else _r(_num(item["thickness"], 0.12, unit)),
                    "height": None if item.get("height") is None else _r(_num(item["height"], 2.5, unit)),
                }
            )
        furniture = []
        for item in floor.get("furniture") or []:
            at = _point(item.get("at"), unit)
            if not at:
                continue
            kind = str(item.get("type") or _slug(item.get("name") or "box", "box"))
            furniture.append(
                {
                    "id": _unique(_slug(kind, "item"), used),
                    "type": kind,
                    "x": _r(at[0]),
                    "z": _r(at[1]),
                    "w": _r(_num(item.get("width"), 0.6, unit)),
                    "d": _r(_num(item.get("depth"), 0.6, unit)),
                    "h": _r(_num(item.get("height"), 0.8, unit)),
                    "rotation": _r(_num(item.get("rotation"), 0)),
                }
            )
        floors.append(
            {
                "id": _unique(f"f{index + 1}", floor_ids),
                "name": str(floor.get("name") or f"Floor {index + 1}"),
                "ha_floor": None,
                "elevation": _r(_num(floor.get("elevation"), index * 2.8, unit)),
                "height": _r(_num(floor.get("height"), 2.5, unit)),
                "rooms": rooms,
                "openings": openings,
                "walls": walls,
                "furniture": furniture,
                "outdoor": [],
                "background": None,
            }
        )
    if not floors:
        raise ImportFormatError("nothing_found")
    return {"version": 1, "settings": {"wall_exterior": 0.24, "wall_interior": 0.12}, "floors": floors}, warnings


# keys that only a NeonPlan building has; a pp-plan has none of them
_BUILDING_FLOOR_KEYS = ("placements", "cut_height")
_BUILDING_KEYS = ("building", "energy", "presence")


def _is_native_plan(data: dict[str, Any]) -> bool:
    """A bare pp-plan (as saved by the editor): version 1 without any mark of a NeonPlan building."""
    floors = data.get("floors")
    if data.get("version") != 1 or not isinstance(floors, list) or any(k in data for k in _BUILDING_KEYS):
        return False
    return not any(
        isinstance(floor, dict)
        and (
            any(k in floor for k in _BUILDING_FLOOR_KEYS)
            or any(isinstance(room, dict) and "floor_material" in room for room in floor.get("rooms") or [])
        )
        for floor in floors
    )


def _import_data(data: dict[str, Any]) -> tuple[dict[str, Any], list[str], dict[str, Any] | None]:
    """Own plan from the NeonPlan import format, a NeonPlan building (or backup / get result) or a pp-plan.

    Returns (plan, warnings, building) where building is the NeonPlan building when one was given (so its
    placements can become own sensors).
    """
    if not isinstance(data, dict):
        raise ImportFormatError("not_an_object")
    bounded_data(data)
    native = data.get("presence_planner")
    if isinstance(native, dict) and "plan" in native:
        if native.get("version") != 1 or not isinstance(native["plan"], dict):
            raise ImportFormatError("invalid_native_export")
        return copy.deepcopy(native["plan"]), [], None
    if data.get("format") == IMPORT_FORMAT:
        plan, warnings = from_neonplan_import(data)
        return plan, warnings, None
    if _is_native_plan(data):
        # kept as it is: outdoor areas, the background and openings in free walls have no NeonPlan building form
        return copy.deepcopy(data), [], None
    building = data.get("building") if isinstance(data.get("building"), dict) else data
    if building.get("version") == 1 and isinstance(building.get("floors"), list):
        try:
            plan = building_to_plan(building)
        except NeonPlanIncompatible as err:
            raise ImportFormatError(str(err)) from err
        has_placements = any("placements" in f for f in building["floors"] if isinstance(f, dict))
        return plan, [], building if has_placements else None
    if isinstance(data.get("floors"), list):
        # simple format without the `format` marker (as NeonPlan's own importer accepts)
        plan, warnings = from_neonplan_import(data)
        return plan, warnings, None
    raise ImportFormatError("unknown_format")


def import_data(data: dict[str, Any]) -> tuple[dict[str, Any], list[str], dict[str, Any] | None]:
    """Validate every supported representation before returning a normalized plan."""
    try:
        plan, warnings, building = _import_data(data)
        validate_plan(plan)
        return plan, warnings, building
    except (PlanValidationError, TypeError, AttributeError, OverflowError, KeyError, IndexError) as err:
        raise ImportFormatError(str(err)) from err
