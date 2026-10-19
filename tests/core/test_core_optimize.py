import math
import time

import pytest

from core_helpers import load_demo
from custom_components.presence_planner.core import build_model, evaluate, load_profiles, optimize, resolve_sensor
from custom_components.presence_planner.core.geometry import dist_point_segment, point_in_polygon
from custom_components.presence_planner.core.optimize import is_hall_room

WALL_PROFILE = "everything_presence_lite"  # wall and corner mounts only


@pytest.fixture(scope="module")
def model():
    plan, _ = load_demo()
    return build_model(plan, "demo")


@pytest.fixture(scope="module")
def results(model):
    return {r["id"]: optimize(model, r["id"], WALL_PROFILE, {"cell": 0.2}, 1.0) for r in model.rooms}


def min_face_distance(model, room_id, x, z):
    return min(dist_point_segment(x, z, f["a"], f["b"]) for f in model.faces if f["room"] == room_id)


def test_results_are_valid_in_room_wall_points(model, results):
    for rid, res in results.items():
        room = model.room(rid)
        assert 1 <= len(res) <= 5
        for c in res:
            assert point_in_polygon(c["x"], c["z"], room["points"])
            assert not any(point_in_polygon(c["x"], c["z"], b) for b in model.bands)
            # 3 cm in front of its own face; next to a perpendicular wall it can be closer to that one
            assert 0.005 < min_face_distance(model, rid, c["x"], c["z"]) <= 0.03 + 2e-3
            assert c["mount"] in ("wall", "corner")
            assert c["height"] == 1.9 and c["tilt"] == 10
            assert 0 <= c["phi"] < 360
            assert set(c) == {"x", "z", "height", "phi", "tilt", "mount", "score", "coverage", "spill", "glass"}
            assert rid not in c["spill"]


def test_results_avoid_doors_windows_and_tall_furniture(model, results):
    for rid, res in results.items():
        for c in res:
            for o in list(model.doors) + list(model.windows):
                if o.get("room") != rid and rid not in o.get("rooms", []):
                    continue
                assert dist_point_segment(c["x"], c["z"], o["a"], o["b"]) > 0.1
            for f in model.furniture:
                if f["h"] >= 1.5:
                    assert not point_in_polygon(c["x"], c["z"], f["poly"])


def test_results_are_sorted_distinct_and_deterministic(model, results):
    for rid, res in results.items():
        scores = [c["score"] for c in res]
        assert scores == sorted(scores, reverse=True)
        for i, a in enumerate(res):
            for b in res[i + 1 :]:
                assert math.hypot(a["x"] - b["x"], a["z"] - b["z"]) >= 0.4 - 1e-6
    again = optimize(model, "bath", WALL_PROFILE, {"cell": 0.2}, 1.0)
    assert again == results["bath"]


def test_best_candidate_agrees_with_evaluate(model, results):
    profiles = load_profiles()
    for rid, res in results.items():
        c = res[0]
        s = resolve_sensor(
            {"entity_id": "binary_sensor.cand", "floor_id": "demo", "profile": WALL_PROFILE, "mount": c["mount"], "x": c["x"], "z": c["z"], "height": c["height"], "phi": c["phi"], "tilt": c["tilt"]},
            profiles,
        )
        ev = evaluate(model, [s], {"cell": 0.2})
        assert ev["rooms"][rid]["coverage_mean"] == pytest.approx(c["coverage"], abs=0.01)
        for other, share in c["spill"].items():
            assert ev["sensors"]["binary_sensor.cand"]["spill"][other] == pytest.approx(share, abs=0.01)
        assert all(v == pytest.approx(0, abs=0.01) for k, v in ev["sensors"]["binary_sensor.cand"]["spill"].items() if k not in c["spill"])


def test_wall_mounted_best_points_face_into_the_room(model, results):
    # the viewing direction has a positive component along the inward normal of the nearest face
    for rid, res in results.items():
        c = res[0]
        face = min((f for f in model.faces if f["room"] == rid), key=lambda f: dist_point_segment(c["x"], c["z"], f["a"], f["b"]))
        fx, fz = math.cos(math.radians(c["phi"])), math.sin(math.radians(c["phi"]))
        assert fx * face["n"][0] + fz * face["n"][1] > 0


def test_ceiling_capable_profile_can_pick_a_ceiling_point(model):
    res = optimize(model, "bath", "aqara_fp300", {"cell": 0.2}, 1.0)
    best = res[0]
    assert best["mount"] == "ceiling" and best["tilt"] == 90 and best["height"] == 2.6
    assert point_in_polygon(best["x"], best["z"], model.room("bath")["points"])
    assert best["coverage"] > 0.9
    assert best["score"] == max(c["score"] for c in res)


def hall_weighted_spill(model, c):
    return sum((3.0 if is_hall_room(model.room(rid)) else 1.0) * v for rid, v in c["spill"].items())


def test_weight_trades_coverage_for_less_spill(model):
    low = optimize(model, "hall", WALL_PROFILE, {"cell": 0.2}, 0.0)[0]
    high = optimize(model, "hall", WALL_PROFILE, {"cell": 0.2}, 2.0)[0]
    assert hall_weighted_spill(model, high) <= hall_weighted_spill(model, low) + 0.02
    assert high["coverage"] <= low["coverage"] + 0.05 or hall_weighted_spill(model, high) < hall_weighted_spill(model, low)


def test_hall_rooms_are_recognised():
    assert is_hall_room({"id": "hall", "name": "Hall"})
    assert is_hall_room({"id": "r1", "name": "Flur"})
    assert not is_hall_room({"id": "kitchen", "name": "Kitchen"})


def test_unknown_room_raises(model):
    with pytest.raises(KeyError):
        optimize(model, "nope", WALL_PROFILE, {"cell": 0.2})


def test_optimize_one_room_with_cell_0_2_is_fast(model):
    t = time.perf_counter()
    optimize(model, "living", "aqara_fp300", {"cell": 0.2}, 1.0)
    assert time.perf_counter() - t < 20.0
