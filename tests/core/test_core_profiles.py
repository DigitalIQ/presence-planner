import json
from pathlib import Path

from custom_components.presence_planner.core import load_profiles, resolve_sensor
from custom_components.presence_planner.core.profiles import PROFILES_PATH

ROOT = Path(__file__).resolve().parents[2]


def test_bundled_profiles_identical_to_shared():
    shared = (ROOT / "shared" / "profiles.json").read_bytes()
    bundled = PROFILES_PATH.read_bytes()
    assert bundled == shared
    assert load_profiles() == json.loads(shared)


def test_profiles_have_custom_and_unique_ids():
    ids = [p["id"] for p in load_profiles()["profiles"]]
    assert "custom" in ids
    assert len(ids) == len(set(ids))


def test_resolve_fills_missing_and_marks_assumed_fov_v():
    profiles = load_profiles()
    s = resolve_sensor({"entity_id": "x", "profile": "aqara_fp300", "x": 1, "z": 2}, profiles)
    assert s["fov_h"] == 120 and s["reach"] == 6 and s["mount"] == "wall"
    assert s["fov_v"] == profiles["default_fov_v"] and s["fov_v_assumed"] is True


def test_resolve_keeps_overrides_and_known_fov_v():
    profiles = load_profiles()
    s = resolve_sensor({"profile": "everything_presence_one", "fov_h": 90, "reach": 4}, profiles)
    assert (s["fov_h"], s["fov_v"], s["reach"]) == (90, 40, 4)
    assert "fov_v_assumed" not in s


def test_resolve_ceiling_uses_profile_ceiling_block():
    profiles = load_profiles()
    s = resolve_sensor({"profile": "aqara_fp400", "mount": "ceiling"}, profiles)
    assert s["ceiling_fov"] == 120 and s["reach"] == 4 and s["fov_h"] == 120


def test_resolve_does_not_mutate_input_and_unknown_profile_is_custom():
    profiles = load_profiles()
    src = {"profile": "nope"}
    out = resolve_sensor(src, profiles)
    assert src == {"profile": "nope"}
    assert out["fov_h"] == 120 and out["reach"] == 6
