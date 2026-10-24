"""Unsafe representations fail before model allocation; ordinary plans still work."""

import copy

import pytest
from core_helpers import load_demo

from custom_components.presence_planner.core import build_model
from custom_components.presence_planner.core.model import get_cells
from custom_components.presence_planner.export import ImportFormatError, import_data
from custom_components.presence_planner.validation import (
    PlanValidationError,
    kernel_weight,
    kernel_work,
    sensors_on_floors,
    validate_plan,
    validate_sensors,
)


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


def contact_plan(**opening):
    plan = small_plan()
    plan["floors"][0]["openings"] = [
        {"id": "d", "room_id": "r", "edge": 0, "offset": 1, "width": 0.8, "type": "door", **opening}
    ]
    return plan


@pytest.mark.parametrize(
    "opening",
    [
        {"contact": {"a": 1}},
        {"contact": ["binary_sensor.door"]},
        {"contact": 5},
        {"contact": "no_domain"},
        {"contact": "Binary_Sensor.Door"},
        {"contact": "binary_sensor." + "x" * 300},
        {"contact": "binary_sensor.door", "contact_invert": "yes"},
        {"contact": "binary_sensor.door", "contact_invert": {"a": 1}},
    ],
)
def test_door_contact_must_be_an_entity_id_and_invert_a_bool(opening):
    """An object there reached the sets of the cleaned occupancy and broke every room, also after a restart."""
    with pytest.raises(PlanValidationError):
        validate_plan(contact_plan(**opening))


@pytest.mark.parametrize("opening", [{}, {"contact": None}, {"contact": "binary_sensor.door", "contact_invert": True}])
def test_valid_door_contacts_pass(opening):
    validate_plan(contact_plan(**opening))


def kernel_plan(furniture=0, tall_walls=0):
    plan = small_plan([[0, 0], [24.9, 0], [24.9, 25], [0, 25]])
    floor = plan["floors"][0]
    floor["furniture"] = [
        {"id": f"w{i}", "type": "wardrobe", "x": 4 + i * 0.4, "z": 4, "w": 0.4, "d": 0.4, "h": 2.0} for i in range(furniture)
    ]
    floor["walls"] = [{"id": f"t{i}", "a": [4, 5 + i * 0.3], "b": [4.2, 5 + i * 0.3], "thickness": 0.1} for i in range(tall_walls)]
    return plan


def sensor_list(count, reach=100, fov_h=360):
    return [
        {"entity_id": f"binary_sensor.s{i}", "floor_id": "f", "x": 1 + i * 0.5, "z": 1, "height": 1.9, "phi": 0,
         "tilt": 0, "mount": "wall", "fov_h": fov_h, "fov_v": 180, "reach": reach}
        for i in range(count)
    ]


def test_ray_casting_budget_counts_obstacles_and_free_walls():
    """24.9 x 25 m, 64 sensors that see everything and 200 tall pieces cost minutes per recompute: refused."""
    plan = kernel_plan(furniture=200)
    validate_plan(plan)
    with pytest.raises(PlanValidationError, match="sensor_work_budget_exceeded"):
        validate_sensors(sensor_list(64), plan)
    with pytest.raises(PlanValidationError, match="sensor_work_budget_exceeded"):
        validate_sensors(sensor_list(8), kernel_plan(furniture=40))
    with pytest.raises(PlanValidationError, match="sensor_work_budget_exceeded"):
        validate_sensors(sensor_list(4), kernel_plan(tall_walls=120))


def test_ray_casting_budget_lets_normal_plans_through():
    validate_sensors(sensor_list(8), kernel_plan(furniture=8))
    # the same room with sensors of normal reach: only the cells in reach and field of view are cast
    validate_sensors(sensor_list(64, reach=6, fov_h=120), kernel_plan(furniture=20, tall_walls=20))
    # low furniture and low walls do not take part in a ray
    low = kernel_plan(furniture=200)
    for item in low["floors"][0]["furniture"]:
        item["h"] = 0.8
    validate_sensors(sensor_list(8), low)
    plan, sensors = load_demo()
    validate_sensors(sensors, plan)


def test_ray_casting_budget_spans_all_floors():
    plan = kernel_plan(furniture=10)
    plan["floors"] = [{**copy.deepcopy(plan["floors"][0]), "id": f"f{i}"} for i in range(3)]
    sensors = sensor_list(8)
    per_floor = [{**s, "floor_id": "f0"} for s in sensors]
    validate_sensors(per_floor, plan)
    spread = [{**s, "floor_id": f"f{i % 3}", "entity_id": f"binary_sensor.t{i}"} for i, s in enumerate(sensor_list(30))]
    validate_sensors(spread[:10], plan)
    with pytest.raises(PlanValidationError, match="sensor_work_budget_exceeded"):
        validate_sensors(spread, plan)


def test_sensors_of_unknown_floors_are_refused():
    plan = small_plan()
    with pytest.raises(PlanValidationError, match="sensor_floor_missing"):
        validate_sensors([{**sensor_list(1)[0], "floor_id": "gone"}], plan)
    with pytest.raises(PlanValidationError, match="sensor_floor_missing"):
        validate_sensors([{**sensor_list(1)[0], "floor_id": {"a": 1}}], plan)
    assert sensors_on_floors([{"floor_id": "f"}, {"floor_id": "x"}, "junk"], plan) == [{"floor_id": "f"}, "junk"]


def test_kernel_weight_and_work_numbers():
    """The same case is asserted in frontend/test/validation-budget.test.js."""
    floor = kernel_plan(furniture=10, tall_walls=10)["floors"][0]
    floor["walls"][0]["height"] = 1.0
    assert kernel_weight(floor) == 64 + 4 + 8 * 9 + 1 + 16 * 10
    assert kernel_work(floor, []) == kernel_work(floor, sensor_list(1))
