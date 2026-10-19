import json
import math

from custom_components.presence_planner.core import golden


def assert_close(a, b, path="$"):
    if isinstance(a, dict):
        assert isinstance(b, dict) and a.keys() == b.keys(), path
        for k in a:
            assert_close(a[k], b[k], f"{path}.{k}")
    elif isinstance(a, list):
        assert isinstance(b, list) and len(a) == len(b), path
        for i, (x, y) in enumerate(zip(a, b)):
            assert_close(x, y, f"{path}[{i}]")
    elif isinstance(a, float) or isinstance(b, float):
        assert math.isclose(a, b, abs_tol=1.5e-4), f"{path}: {a} != {b}"
    else:
        assert a == b, path


def test_golden_files_reproduce():
    generated = golden.generate()
    assert set(generated) == {"demo-detect.json", "demo-evaluate.json", "demo-spill.json", "demo-optimize.json"}
    for name, data in generated.items():
        on_disk = json.loads((golden.GOLDEN_DIR / name).read_text(encoding="utf-8"))
        assert_close(json.loads(json.dumps(data)), on_disk, name)


def test_golden_output_is_byte_stable():
    plan, sensors = golden.load_demo()
    a = golden.dumps(golden.evaluate_golden(plan, sensors))
    assert a == golden.dumps(golden.evaluate_golden(plan, sensors))
    on_disk = (golden.GOLDEN_DIR / "demo-evaluate.json").read_text(encoding="utf-8")
    assert on_disk == a + "\n"


def test_detect_golden_has_enough_varied_samples():
    data = json.loads((golden.GOLDEN_DIR / "demo-detect.json").read_text(encoding="utf-8"))
    samples = data["samples"]
    assert len(samples) >= 300
    tags = {s["tag"] for s in samples}
    assert {
        "thin_wall",
        "brick_wall",
        "door_open",
        "door_closed",
        "fov_edge_yaw",
        "fov_edge_pitch",
        "below",
        "ceiling_cone",
    } <= tags
    qualities = [s["quality"] for s in samples]
    assert any(q == 0 for q in qualities) and any(0 < q < 1 for q in qualities) and any(q == 1 for q in qualities)
    for s in samples:
        assert set(s) == {"tag", "sensor", "point", "opts", "quality"}
        assert len(s["point"]) == 3 and 0.0 <= s["quality"] <= 1.0


def test_door_state_matters_in_the_golden_samples():
    data = json.loads((golden.GOLDEN_DIR / "demo-detect.json").read_text(encoding="utf-8"))
    open_q = sum(s["quality"] for s in data["samples"] if s["tag"] == "door_open")
    closed_q = sum(s["quality"] for s in data["samples"] if s["tag"] == "door_closed")
    assert open_q > closed_q


def test_evaluate_golden_holds_both_door_states():
    data = json.loads((golden.GOLDEN_DIR / "demo-evaluate.json").read_text(encoding="utf-8"))
    assert data["opts"]["cell"] == 0.1
    assert (
        set(data["open"]["rooms"]) == set(data["closed"]["rooms"]) == {"living", "bedroom", "kitchen", "hall", "bath"}
    )
    assert data["open"]["grid"] == {} and data["closed"]["grid"] == {}


def test_optimize_golden_has_a_best_candidate_per_room():
    data = json.loads((golden.GOLDEN_DIR / "demo-optimize.json").read_text(encoding="utf-8"))
    assert data["profile"] == "aqara_fp300" and data["weight"] == 1.0 and data["opts"]["cell"] == 0.2
    assert set(data["rooms"]) == {"living", "bedroom", "kitchen", "hall", "bath"}
    assert set(data["wall_corner"]["rooms"]) == set(data["rooms"])
    for entry in data["rooms"].values():
        assert set(entry["best"]) >= {"x", "z", "height", "phi", "tilt", "mount", "score"}
