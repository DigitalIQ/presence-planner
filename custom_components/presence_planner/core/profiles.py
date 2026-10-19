"""Sensor profiles and sensor record resolution."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

PROFILES_PATH = Path(__file__).with_name("profiles.json")


def load_profiles() -> dict:
    """Parse the bundled profiles file (a copy of shared/profiles.json, kept identical by a test)."""
    with PROFILES_PATH.open(encoding="utf-8") as fh:
        return json.load(fh)


_CACHE: dict[str, Any] = {}


def default_profiles() -> dict:
    """Parsed profiles, cached for internal use.  Callers must not mutate the result."""
    if "p" not in _CACHE:
        _CACHE["p"] = load_profiles()
    return _CACHE["p"]


def find_profile(profiles: dict, profile_id: str | None) -> dict:
    """Return the profile with this id; unknown or missing ids fall back to ``custom``."""
    by_id = {p["id"]: p for p in profiles["profiles"]}
    if profile_id in by_id:
        return by_id[profile_id]
    return by_id.get("custom") or next(iter(by_id.values()))


def resolve_sensor(sensor: dict, profiles: dict) -> dict:
    """Return a copy of ``sensor`` with ``fov_h``, ``fov_v``, ``reach`` and ``mount`` filled from the profile.

    Only missing (absent or ``None``) fields are filled, so explicit overrides win.  A profile without a
    vertical field of view gets ``profiles["default_fov_v"]`` and ``fov_v_assumed: True``.  For a ceiling
    mount the profile's ``ceiling`` block (``fov``, ``reach``) is used when present and its ``fov`` is
    stored as ``ceiling_fov`` (the cone opening angle used by ``detect``).
    """
    out = dict(sensor)
    prof = find_profile(profiles, out.get("profile"))
    if out.get("mount") is None:
        mounts = prof.get("mounts") or ["wall"]
        out["mount"] = mounts[0]
    ceiling = prof.get("ceiling") if out["mount"] == "ceiling" else None
    if out.get("fov_h") is None:
        out["fov_h"] = ceiling["fov"] if ceiling else prof["fov_h"]
    if out.get("reach") is None:
        out["reach"] = ceiling["reach"] if ceiling else prof["reach"]
    if out.get("fov_v") is None:
        fov_v = prof.get("fov_v")
        if fov_v is None:
            out["fov_v"] = profiles.get("default_fov_v", 90)
            out["fov_v_assumed"] = True
        else:
            out["fov_v"] = fov_v
    if ceiling and out.get("ceiling_fov") is None:
        out["ceiling_fov"] = ceiling["fov"]
    if out.get("tilt") is None:
        out["tilt"] = 90 if out["mount"] == "ceiling" else 0
    if out.get("active") is None:
        out["active"] = True
    return out


def ensure_resolved(sensor: dict) -> dict:
    """Resolve a sensor against the bundled profiles when any model field is missing."""
    if all(sensor.get(k) is not None for k in ("fov_h", "fov_v", "reach", "mount")):
        return sensor
    return resolve_sensor(sensor, default_profiles())
