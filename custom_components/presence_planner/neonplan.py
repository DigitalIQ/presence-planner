"""Read NeonPlan 3D files (github.com/Mastershort/neonplan3d) into the own plan.

Presence Planner never touches NeonPlan at runtime. A user exports the building or a backup in NeonPlan and
imports the file here; these pure functions turn that data into a pp-plan and own sensors. The NeonPlan import
format itself is handled in ``export.py``.
"""

from __future__ import annotations

import copy
from typing import Any

from .const import DEFAULT_CEILING_TILT, DEFAULT_WALL_HEIGHT, DEFAULT_WALL_TILT
from .validation import bounded_data, validate_plan


class NeonPlanIncompatible(ValueError):
    """The data does not have the shape of a NeonPlan building."""


def _float_or_none(value: Any) -> float | None:
    try:
        return None if value is None else float(value)
    except (TypeError, ValueError):
        return None


def building_to_plan(building: dict[str, Any]) -> dict[str, Any]:
    """Turn a NeonPlan building into a pp-plan (version 1). Raises NeonPlanIncompatible on a strange shape."""
    try:
        bounded_data(building)
        settings = building.get("settings") or {}
        floors = []
        for floor in building["floors"]:
            rooms = []
            for room in floor["rooms"]:
                item = {
                    "id": str(room["id"]),
                    "name": str(room.get("name") or room["id"]),
                    "area_id": room.get("area_id"),
                    "points": [[float(p[0]), float(p[1])] for p in room["points"]],
                    "ceiling_height": room.get("ceiling_height"),
                }
                for key in ("wall_thickness", "wall_heights"):
                    if room.get(key) is not None:
                        item[key] = copy.deepcopy(room[key])
                rooms.append(item)
            openings = []
            for opening in floor.get("openings") or []:
                kind = opening.get("type", "door")
                item = {
                    "id": str(opening["id"]),
                    "room_id": str(opening["room_id"]),
                    "edge": int(opening["edge"]),
                    "offset": float(opening["offset"]),
                    "width": float(opening["width"]),
                    # a garage door is a door for the model (it leads outside and is ignored for spill)
                    "type": "window" if kind == "window" else "door",
                    "sill": float(opening.get("sill") or 0),
                    "height": float(opening.get("height") or 2.0),
                    "hinge": opening.get("hinge") or "left",
                    "swing": opening.get("swing") or "in",
                    "contact": opening.get("contact") if kind != "window" else None,
                }
                if opening.get("wall"):
                    item["wall"] = opening["wall"]
                if opening.get("contact_invert"):
                    item["contact_invert"] = True
                openings.append(item)
            walls = [
                {
                    "id": str(wall["id"]),
                    "a": [float(wall["a"][0]), float(wall["a"][1])],
                    "b": [float(wall["b"][0]), float(wall["b"][1])],
                    "thickness": wall.get("thickness"),
                    "height": wall.get("height"),
                }
                for wall in floor.get("walls") or []
            ]
            furniture = [
                {
                    "id": str(item["id"]),
                    "type": str(item["type"]),
                    "x": float(item["x"]),
                    "z": float(item["z"]),
                    "w": float(item["w"]),
                    "d": float(item["d"]),
                    "h": float(item["h"]),
                    "rotation": float(item.get("rotation") or 0),
                }
                for item in floor.get("furniture") or []
            ]
            floors.append(
                {
                    "id": str(floor["id"]),
                    "name": str(floor.get("name") or floor["id"]),
                    "ha_floor": floor.get("ha_floor"),
                    "elevation": float(floor.get("elevation") or 0),
                    "height": float(floor.get("height") or 2.5),
                    "rooms": rooms,
                    "openings": openings,
                    "walls": walls,
                    "furniture": furniture,
                    "outdoor": [],
                    "background": None,
                }
            )
        return validate_plan({
            "version": 1,
            "settings": {
                "wall_exterior": float(settings.get("wall_exterior", 0.24)),
                "wall_interior": float(settings.get("wall_interior", 0.12)),
            },
            "floors": floors,
        })
    except (KeyError, TypeError, ValueError, IndexError, AttributeError) as err:
        raise NeonPlanIncompatible(f"Unexpected NeonPlan building layout: {err!r}") from err


def placements(building: dict[str, Any]) -> list[tuple[str, dict[str, Any]]]:
    """All placements as (floor_id, placement)."""
    try:
        return [(str(floor["id"]), p) for floor in building["floors"] for p in floor["placements"]]
    except (KeyError, TypeError) as err:
        raise NeonPlanIncompatible(f"Unexpected NeonPlan placements: {err!r}") from err


def placement_to_sensor(
    floor_id: str, placement: dict[str, Any], extras: dict[str, Any] | None = None, floor_height: float = 2.5
) -> dict[str, Any]:
    """Build a pp-sensor from a NeonPlan placement plus the fields from our store.

    Contract mapping: height = y, phi = (rotation + 90) mod 360, tilt = tilt, fov_h = fov, reach = reach.
    """
    extras = dict(extras or {})
    mount = extras.get("mount") or "wall"
    y = _float_or_none(placement.get("y"))
    if y is None:
        y = floor_height if mount == "ceiling" else DEFAULT_WALL_HEIGHT
    tilt = _float_or_none(placement.get("tilt"))
    if tilt is None:
        tilt = DEFAULT_CEILING_TILT if mount == "ceiling" else DEFAULT_WALL_TILT
    sensor: dict[str, Any] = {
        "entity_id": placement["entity_id"],
        "floor_id": floor_id,
        "x": float(placement["x"]),
        "z": float(placement["z"]),
        "height": y,
        "phi": (float(placement.get("rotation") or 0) + 90.0) % 360.0,
        "tilt": tilt,
        "mount": mount,
        "active": True,
    }
    # extras (profile, mount, fov_v, active, own fields) never override the NeonPlan-owned fields
    for key, value in extras.items():
        if key not in ("x", "z", "height", "phi", "tilt", "fov_h", "reach", "entity_id", "floor_id"):
            sensor[key] = value
    if (fov := _float_or_none(placement.get("fov"))) is not None:
        sensor["fov_h"] = fov
    if (reach := _float_or_none(placement.get("reach"))) is not None:
        sensor["reach"] = reach
    return sensor
