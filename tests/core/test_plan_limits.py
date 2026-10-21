"""Unsafe representations fail before model allocation; ordinary plans still work."""

import copy

import pytest

from custom_components.presence_planner.core import build_model
from custom_components.presence_planner.core.model import get_cells
from custom_components.presence_planner.export import ImportFormatError, import_data
from custom_components.presence_planner.validation import PlanValidationError, validate_plan


def small_plan(points=None):
    return {"version": 1, "floors": [{"id": "f", "rooms": [{"id": "r", "points": points or [[0, 0], [2, 0], [2, 2], [0, 2]]}]}]}


@pytest.mark.parametrize("value", [10_000, 1e100, float("nan"), float("inf")])
def test_unsafe_geometry_rejected_before_model(value):
    plan = small_plan([[0, 0], [value, 0], [value, 1], [0, 1]])
    with pytest.raises(PlanValidationError):
        build_model(plan, "f")


@pytest.mark.parametrize("units,value", [("m", "10000"), ("cm", "1000000"), ("mm", "10000000"), ("m", "Infinity")])
def test_import_encodings_share_the_same_limit(units, value):
    data = {"format": "neonplan-import", "units": units, "floors": [{"rooms": [{"points": [{"x": 0, "y": 0}, {"x": value, "y": 0}, {"x": value, "y": 1}]}]}]}
    with pytest.raises(ImportFormatError):
        import_data(data)


@pytest.mark.parametrize("step", [0, -1, float("nan"), float("inf"), 5e-324])
def test_direct_grid_entry_rejects_invalid_step_even_with_cache(step):
    model = build_model(small_plan(), "f")
    model.cells[str(step)] = []
    with pytest.raises(PlanValidationError):
        get_cells(model, step)


def test_skinny_bounds_and_floor_aggregate_are_bounded():
    plan = small_plan([[0, 0], [999, 0], [999, 0.001], [0, 999]])
    with pytest.raises(PlanValidationError):
        validate_plan(plan)
    plan = small_plan()
    plan["floors"][0]["rooms"] = [{"id": str(i), "points": [[0, 0], [20, 0], [20, 20], [0, 20]]} for i in range(4)]
    with pytest.raises(PlanValidationError):
        validate_plan(plan)


def test_missing_ids_and_remote_background_are_rejected():
    with pytest.raises(PlanValidationError):
        validate_plan({"version": 1, "floors": [{"rooms": [{}]}]})
    plan = small_plan()
    plan["floors"][0]["background"] = {"image": "https://example.invalid/tracker.png"}
    with pytest.raises(PlanValidationError):
        validate_plan(plan)


def test_normal_negative_coordinates_null_wall_overrides_and_custom_grid():
    plan = small_plan([[-2, -2], [0, -2], [0, 0], [-2, 0]])
    room = plan["floors"][0]["rooms"][0]
    room.update(wall_thickness=[None] * 4, wall_heights=[0] * 4)
    before = copy.deepcopy(plan)
    model = build_model(plan, "f")
    assert get_cells(model, 0.25)
    assert plan == before


def test_free_wall_opening_is_not_reinterpreted_as_room_door():
    plan = small_plan()
    floor = plan["floors"][0]
    floor["walls"] = [{"id": "w", "a": [1, .5], "b": [1, 1.5]}]
    floor["openings"] = [{"id": "d", "room_id": "r", "edge": 0, "offset": 1, "width": .8, "type": "door", "wall": "w"}]
    assert build_model(plan, "f").doors == []


@pytest.mark.parametrize("key", ["rooms", "walls", "openings", "furniture", "outdoor"])
def test_explicit_null_collections_fail_before_persistence(key):
    plan = small_plan()
    plan["floors"][0][key] = None
    with pytest.raises(PlanValidationError):
        validate_plan(plan)
