"""Bound plan parsing and geometric work before persistence or allocation."""

from __future__ import annotations

import math
from typing import Any

MAX_GRID_WORK = 100_000
MAX_PLAN_WORK = 500_000
MAX_WEIGHTED_WORK = 20_000_000


class PlanValidationError(ValueError):
    """The supplied plan cannot be processed safely."""


def bounded_data(value: Any) -> None:
    """Reject excessive or non-finite JSON before import conversion walks it."""
    remaining = 50_000
    text = 0

    def visit(item: Any, depth: int) -> None:
        nonlocal remaining, text
        remaining -= 1
        if remaining < 0 or depth > 20:
            raise PlanValidationError("plan_too_complex")
        if isinstance(item, float) and not math.isfinite(item):
            raise PlanValidationError("non_finite_number")
        if isinstance(item, str):
            text += len(item)
            if text > 8_000_000:
                raise PlanValidationError("plan_too_large")
        elif isinstance(item, (dict, list, tuple)):
            if len(item) > 2048:
                raise PlanValidationError("too_many_objects")
            for child in item.values() if isinstance(item, dict) else item:
                visit(child, depth + 1)

    visit(value, 0)


def _number(value: Any, limit: float = 1000) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise PlanValidationError("invalid_number")
    if abs(value) > limit or not math.isfinite(value):
        raise PlanValidationError("number_out_of_bounds")
    return value


def _point(value: Any) -> None:
    if not isinstance(value, (list, tuple)) or len(value) != 2:
        raise PlanValidationError("invalid_point")
    for v in value:
        _number(v)


def _objects(parent: dict, key: str, maximum: int) -> list[dict]:
    items = parent.get(key, [])
    if not isinstance(items, list) or len(items) > maximum:
        raise PlanValidationError(f"invalid_{key}")
    ids: set[str] = set()
    for item in items:
        if not isinstance(item, dict) or not isinstance(item.get("id"), str) or not item["id"]:
            raise PlanValidationError(f"missing_{key}_id")
        if item["id"] in ids:
            raise PlanValidationError(f"duplicate_{key}_id")
        ids.add(item["id"])
    return items


def grid_work(rooms: list[dict], step: float) -> int:
    """Conservative candidate count, including empty-row outer-loop work."""
    if not isinstance(rooms, list) or len(rooms) > 64:
        raise PlanValidationError("invalid_rooms")
    if not isinstance(step, (int, float)) or isinstance(step, bool) or abs(step) > 1e100 or not math.isfinite(step) or step <= 0:
        raise PlanValidationError("invalid_grid_step")
    work = 0
    for room in rooms:
        points = room["points"]
        if not isinstance(points, list) or not 3 <= len(points) <= 128:
            raise PlanValidationError("invalid_polygon")
        for point in points:
            _point(point)
        if len(points) < 3:
            raise PlanValidationError("invalid_polygon")
        xs, zs = [p[0] for p in points], [p[1] for p in points]
        dx, dz = (max(xs) - min(xs)) / step, (max(zs) - min(zs)) / step
        if not math.isfinite(dx) or not math.isfinite(dz) or max(dx, dz) > MAX_GRID_WORK:
            raise PlanValidationError("grid_budget_exceeded")
        nx, nz = math.ceil(dx), math.ceil(dz)
        work += nx + nx * nz
        if work > MAX_GRID_WORK:
            raise PlanValidationError("grid_budget_exceeded")
    return work


def validate_plan(plan: Any) -> dict:
    """Validate normalized pp-plan geometry; return it unchanged for schema use."""
    bounded_data(plan)
    if not isinstance(plan, dict) or plan.get("version") != 1:
        raise PlanValidationError("invalid_plan_version")
    if not isinstance(plan.get("floors"), list):
        raise PlanValidationError("invalid_floors")
    if plan.get("settings") is not None and not isinstance(plan["settings"], dict):
        raise PlanValidationError("invalid_settings")
    floors = _objects(plan, "floors", 16)
    for key in ("wall_exterior", "wall_interior"):
        value = (plan.get("settings") or {}).get(key)
        if value is not None and _number(value) < 0:
            raise PlanValidationError("invalid_settings")
    total_work = weighted = 0
    for floor in floors:
        rooms = _objects(floor, "rooms", 64)
        walls = _objects(floor, "walls", 256)
        openings = _objects(floor, "openings", 256)
        furniture = _objects(floor, "furniture", 256)
        outdoor = floor.get("outdoor", [])
        if not isinstance(outdoor, list) or len(outdoor) > 64:
            raise PlanValidationError("invalid_outdoor")
        for area in outdoor:
            if not isinstance(area, dict) or not isinstance(area.get("points"), list):
                raise PlanValidationError("invalid_outdoor")
            if not 3 <= len(area["points"]) <= 128:
                raise PlanValidationError("invalid_outdoor")
            for point in area["points"]:
                _point(point)
        background = floor.get("background")
        if background is not None:
            if not isinstance(background, dict):
                raise PlanValidationError("invalid_background")
            image = background.get("image")
            if image is not None and (not isinstance(image, str) or not image.startswith("data:image/")):
                raise PlanValidationError("background_must_be_inline_image")
        vertices = 0
        for room in rooms:
            points = room.get("points")
            if not isinstance(points, list) or not 3 <= len(points) <= 128:
                raise PlanValidationError("invalid_polygon")
            vertices += len(points)
            for point in points:
                _point(point)
            for key in ("wall_thickness", "wall_heights"):
                values = room.get(key)
                if values is not None:
                    if not isinstance(values, list) or len(values) != len(points):
                        raise PlanValidationError(f"invalid_{key}")
                    for v in values:
                        if v is not None and _number(v) < 0:
                            raise PlanValidationError(f"invalid_{key}")
            height = room.get("ceiling_height")
            if height is not None and not 0 < _number(height) <= 20:
                raise PlanValidationError("invalid_ceiling_height")
        if vertices > 1024:
            raise PlanValidationError("too_many_vertices")
        if floor.get("height") is not None and not 0 < _number(floor["height"]) <= 20:
            raise PlanValidationError("invalid_floor_height")
        for wall in walls:
            _point(wall.get("a"))
            _point(wall.get("b"))
        room_by_id = {r["id"]: r for r in rooms}
        wall_ids = {w["id"] for w in walls}
        for opening in openings:
            if opening.get("wall"):
                if opening["wall"] not in wall_ids:
                    raise PlanValidationError("missing_opening_wall")
            elif opening.get("room_id") not in room_by_id:
                raise PlanValidationError("missing_opening_room")
            else:
                edge = opening.get("edge")
                if not isinstance(edge, int) or not 0 <= edge < len(room_by_id[opening["room_id"]]["points"]):
                    raise PlanValidationError("invalid_opening_edge")
            for key in ("offset", "width"):
                if _number(opening.get(key)) < 0:
                    raise PlanValidationError(f"invalid_{key}")
        for item in furniture:
            if not isinstance(item.get("type"), str):
                raise PlanValidationError("invalid_furniture_type")
            for key in ("x", "z", "w", "d", "h"):
                _number(item.get(key))
        for item in [floor, *walls, *openings, *furniture]:
            for key in ("height", "thickness", "rotation", "sill", "elevation"):
                if item.get(key) is not None:
                    _number(item[key])
        work = grid_work(rooms, 0.1) + grid_work(rooms, 0.2)
        total_work += work
        weighted += work * (vertices + len(walls) + len(openings) + len(furniture) + 1)
        if total_work > MAX_PLAN_WORK or weighted > MAX_WEIGHTED_WORK:
            raise PlanValidationError("plan_budget_exceeded")
    return plan


def validate_sensors(sensors: Any, plan: dict | None = None) -> None:
    """Keep externally supplied sensor work finite and bounded as well."""
    bounded_data(sensors)
    if not isinstance(sensors, list) or len(sensors) > 64:
        raise PlanValidationError("too_many_sensors")
    ids = set()
    for sensor in sensors:
        if not isinstance(sensor, dict) or not isinstance(sensor.get("entity_id"), str):
            raise PlanValidationError("invalid_sensor")
        if sensor["entity_id"] in ids:
            raise PlanValidationError("duplicate_sensor")
        ids.add(sensor["entity_id"])
        for key in ("x", "z", "height", "phi", "tilt", "reach", "fov_h", "fov_v"):
            if sensor.get(key) is not None:
                _number(sensor[key], 1_000_000 if key == "phi" else 1000)
    if plan:
        for floor in plan["floors"]:
            count = sum(s.get("floor_id") == floor["id"] for s in sensors)
            rooms = floor.get("rooms") or []
            weight = sum(len(r["points"]) for r in rooms) + 1
            if grid_work(rooms, 0.1) * max(1, count) * weight > MAX_WEIGHTED_WORK:
                raise PlanValidationError("sensor_work_budget_exceeded")
