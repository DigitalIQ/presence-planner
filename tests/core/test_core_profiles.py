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


def test_resolve_ceiling_cone_follows_an_explicit_fov_h():
    """The user's fov_h of a ceiling mount wins over the profile's ceiling angle; stale stored cones are dropped."""
    profiles = load_profiles()
    s = resolve_sensor({"profile": "aqara_fp400", "mount": "ceiling", "fov_h": 90}, profiles)
    assert (s["fov_h"], s["ceiling_fov"], s["reach"]) == (90, 90, 4)
    stale = resolve_sensor({"profile": "aqara_fp400", "mount": "ceiling", "fov_h": 100, "ceiling_fov": 120}, profiles)
    assert stale["ceiling_fov"] == 100
    # a wall mount never carries a cone angle, and a profile without ceiling block falls back to its own fields
    assert "ceiling_fov" not in resolve_sensor({"profile": "aqara_fp400", "mount": "wall", "ceiling_fov": 120}, profiles)
    assert "ceiling_fov" not in resolve_sensor({"profile": "aqara_p1", "mount": "ceiling", "ceiling_fov": 120}, profiles)


def test_detection_of_a_ceiling_mount_uses_the_overridden_fov_h():
    from core_helpers import make_plan, rect

    from custom_components.presence_planner.core import build_model, detect

    base = {"profile": "aqara_fp400", "mount": "ceiling", "x": 5, "z": 5, "height": 2.6, "tilt": 90, "phi": 0}
    wide = resolve_sensor({**base, "fov_h": 150}, load_profiles())
    narrow = resolve_sensor({**base, "fov_h": 60, "ceiling_fov": 120}, load_profiles())
    point = (5 + 2.4, 1.3, 5)  # 61.5 degrees off the vertical
    m = build_model(make_plan([rect("r", 0, 0, 10, 10)]), "f")
    assert detect(m, wide, point, {}) > 0
    assert detect(m, narrow, point, {}) == 0.0
