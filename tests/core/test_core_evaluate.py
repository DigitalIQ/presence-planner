import time

import pytest
from core_helpers import load_demo, make_plan, rect, sensor

from custom_components.presence_planner.core import (
    build_model,
    detect,
    evaluate,
    load_profiles,
    resolve_sensor,
    spill_detail,
)
from custom_components.presence_planner.core.model import get_cells

OWN = {
    "binary_sensor.demo_living_presence": "living",
    "binary_sensor.demo_bedroom_presence": "bedroom",
    "binary_sensor.demo_kitchen_presence": "kitchen",
    "binary_sensor.demo_bath_presence": "bath",
    "binary_sensor.demo_hall_motion": "hall",
}


@pytest.fixture(scope="module")
def demo():
    plan, sensors = load_demo()
    model = build_model(plan, "demo")
    return model, sensors


@pytest.fixture(scope="module")
def result(demo):
    model, sensors = demo
    return evaluate(model, sensors, {"cell": 0.1})


def test_result_shape(result):
    assert set(result) == {"rooms", "sensors", "zones", "grid"}
    assert result["grid"] == {}
    room = result["rooms"]["living"]
    assert set(room) == {"coverage", "coverage_mean", "seen", "misfire_risk", "from", "own_sensors"}
    assert set(room["coverage"]) == {"0.5", "0.9", "1.3"}
    assert room["own_sensors"] == ["binary_sensor.demo_living_presence"]
    assert set(result["sensors"]["binary_sensor.demo_living_presence"]) == {"room", "glass", "spill"}
    for z in result["zones"]:
        assert set(z) == {"name", "room", "height", "share"}


def test_sensor_is_located_in_its_room(result):
    for eid, rid in OWN.items():
        assert result["sensors"][eid]["room"] == rid


def test_every_demo_sensor_covers_its_own_room_clearly(result):
    for eid, rid in OWN.items():
        room = result["rooms"][rid]
        assert room["own_sensors"] == [eid]
        assert room["coverage_mean"] >= 0.75, (rid, room["coverage"])
        for h, v in room["seen"].items():
            assert v >= 0.8, (rid, h, v)
        assert all(0.0 <= v <= 1.0 for v in room["coverage"].values())


def test_values_are_shares_rounded_to_four_decimals(result):
    for room in result["rooms"].values():
        for v in [*room["coverage"].values(), *room["seen"].values(), room["misfire_risk"], room["coverage_mean"], *room["from"].values()]:
            assert 0.0 <= v <= 1.0
            assert v == round(v, 4)


def test_coverage_matches_a_brute_force_loop_over_detect(demo, result):
    model, sensors = demo
    cells = get_cells(model, 0.1)
    for rid in ("living", "hall"):
        own = [s for s in sensors if OWN[s["entity_id"]] == rid]
        room_cells = [c for c in cells if c[2] == rid]
        for h in (0.5, 1.3):
            total = sum(max(detect(model, s, (c[0], h, c[1]), {}) for s in own) for c in room_cells)
            assert result["rooms"][rid]["coverage"][str(h)] == pytest.approx(total / len(room_cells), abs=1e-4)


def test_misfire_matches_a_brute_force_loop(demo, result):
    model, sensors = demo
    cells = get_cells(model, 0.1)
    for rid in ("kitchen", "living"):
        room_cells = [c for c in cells if c[2] == rid]
        foreign = [s for s in sensors if OWN[s["entity_id"]] != rid]
        hit = sum(1 for c in room_cells if any(detect(model, s, (c[0], 1.3, c[1]), {}) > 0 for s in foreign))
        assert result["rooms"][rid]["misfire_risk"] == pytest.approx(hit / len(room_cells), abs=1e-4)


def test_from_and_spill_are_two_views_of_the_same_numbers(result):
    for rid, room in result["rooms"].items():
        for eid, share in room["from"].items():
            assert result["sensors"][eid]["spill"][rid] == share
        assert room["misfire_risk"] >= max(room["from"].values(), default=0.0) - 1e-9
        assert room["misfire_risk"] <= sum(room["from"].values()) + 1e-3


def test_hall_ceiling_sensor_sees_into_neighbours_only_through_doors(demo):
    model, sensors = demo
    hall = next(s for s in sensors if s["entity_id"] == "binary_sensor.demo_hall_motion")
    detail = spill_detail(model, hall, {"cell": 0.1})
    # kitchen and living room: the brick walls (25 dB) stop a 7 m sensor completely, so every seen cell is behind a door
    for rid, door in (("kitchen", "d_kitchen"), ("living", "d_living")):
        assert detail[rid]["walls"] == 0.0
        assert set(detail[rid]["doors"]) == {door}
        assert detail[rid]["doors"][door] > 0.05
        assert detail[rid]["total"] == detail[rid]["doors"][door]
    # the bedroom is out of range
    assert detail["bedroom"]["total"] == 0.0
    # the bathroom wall is only 8 cm thin (10 dB): part of the view goes through the wall, most through the door
    assert detail["bath"]["doors"]["d_bath"] > detail["bath"]["walls"] > 0.0


def test_spill_detail_total_is_walls_plus_doors(demo):
    model, sensors = demo
    for s in sensors:
        for rid, d in spill_detail(model, s, {"cell": 0.1}).items():
            assert d["total"] == pytest.approx(d["walls"] + sum(d["doors"].values()), abs=2e-4)
            assert rid != OWN[s["entity_id"]]


def test_closed_doors_reduce_what_leaves_the_room(demo):
    model, sensors = demo
    opened = evaluate(model, sensors, {"cell": 0.1, "doors": "open"})
    closed = evaluate(model, sensors, {"cell": 0.1, "doors": "closed"})
    # coverage inside a room does not depend on its doors for these sensors
    for rid in OWN.values():
        assert closed["rooms"][rid]["coverage_mean"] == pytest.approx(opened["rooms"][rid]["coverage_mean"], abs=0.02)
    # the misfire numbers are the doors-open worst case in both runs
    for rid in OWN.values():
        assert closed["rooms"][rid]["misfire_risk"] == opened["rooms"][rid]["misfire_risk"]
    one = evaluate(model, sensors, {"cell": 0.1, "doors": {"d_kitchen": False}})
    assert one["rooms"]["kitchen"]["misfire_risk"] == opened["rooms"]["kitchen"]["misfire_risk"]


def test_door_state_changes_the_view_of_a_sensor_that_looks_through_it():
    a = rect("a", 0, 0, 5, 5, [0.3] * 4)
    b = rect("b", 5, 0, 10, 5, [0.3] * 4)
    door = {"id": "d", "room_id": "a", "edge": 1, "offset": 2.5, "width": 1.0, "type": "door", "hinge": "left", "swing": "in"}
    model = build_model(make_plan([a, b], openings=[door]), "f")
    s = [sensor(1.0, 2.5, reach=8, height=1.9)]
    s[0]["entity_id"] = "binary_sensor.looker"
    s1 = evaluate(model, s, {"cell": 0.2})
    assert s1["rooms"]["b"]["misfire_risk"] > 0
    assert s1["sensors"]["binary_sensor.looker"]["spill"]["b"] == s1["rooms"]["b"]["from"]["binary_sensor.looker"]
    assert s1["rooms"]["a"]["own_sensors"] == ["binary_sensor.looker"]
    # outdoors the door is not a way into any room
    assert spill_detail(model, s[0], {"cell": 0.2})["b"]["doors"].keys() == {"d"}


def test_inactive_and_foreign_floor_sensors_are_ignored(demo):
    model, sensors = demo
    off = [dict(sensors[0], active=False)] + sensors[1:]
    res = evaluate(model, off, {"cell": 0.2})
    assert "binary_sensor.demo_living_presence" not in res["sensors"]
    assert res["rooms"]["living"]["own_sensors"] == []
    assert res["rooms"]["living"]["coverage_mean"] == 0.0
    other = [dict(sensors[0], floor_id="elsewhere")]
    assert evaluate(model, other, {"cell": 0.2})["sensors"] == {}


def test_zones_cover_the_expected_places(result):
    zones = {(z["name"], z["room"]): z for z in result["zones"]}
    assert zones[("bed", "bedroom")]["height"] == 0.5
    assert zones[("sofa", "living")]["height"] == 0.9
    assert zones[("kitchen", "kitchen")]["height"] == 1.3
    assert zones[("entry", "hall")]["height"] == 1.3
    for z in result["zones"]:
        assert 0.0 <= z["share"] <= 1.0
    assert zones[("sofa", "living")]["share"] > 0.8
    assert zones[("bed", "bedroom")]["share"] > 0.8


def test_grid_is_only_filled_on_request(demo):
    model, sensors = demo
    res = evaluate(model, sensors, {"cell": 0.2, "grid": True})
    assert set(res["grid"]) == {"0.5", "0.9", "1.3"}
    rows = res["grid"]["1.3"]
    assert len(rows) == len(get_cells(model, 0.2))
    assert set(rows[0]) == {"x", "z", "room", "own", "own_sensor", "spill"}
    living = [r for r in rows if r["room"] == "living"]
    assert any(r["own_sensor"] == "binary_sensor.demo_living_presence" for r in living)
    assert any("binary_sensor.demo_hall_motion" in r["spill"] for r in living)
    mean = sum(r["own"] for r in living) / len(living)
    assert mean == pytest.approx(res["rooms"]["living"]["coverage"]["1.3"], abs=1e-3)


def test_sensors_may_come_unresolved_from_the_panel(demo):
    model, sensors = demo
    bare = [{"entity_id": s["entity_id"], "floor_id": "demo", "x": s["x"], "z": s["z"], "height": s["height"], "phi": s["phi"], "tilt": s["tilt"], "mount": s["mount"], "profile": s["profile"]} for s in sensors]
    a = evaluate(model, bare, {"cell": 0.2})
    full = evaluate(model, [resolve_sensor(s, load_profiles()) for s in bare], {"cell": 0.2})
    assert a["rooms"]["bath"] == full["rooms"]["bath"]


def test_evaluate_demo_at_cell_0_1_and_three_heights_is_fast(demo):
    model, sensors = demo
    t = time.perf_counter()
    evaluate(model, sensors, {"cell": 0.1, "heights": [0.5, 0.9, 1.3]})
    assert time.perf_counter() - t < 5.0
