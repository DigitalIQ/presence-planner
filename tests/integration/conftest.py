"""Fixtures for the integration tests.

If the core (custom_components/presence_planner/core/__init__.py) is not there yet, a small fake core with the
contract's API is installed so the integration can be tested on its own.
"""

from __future__ import annotations

import copy
import json
import os
import sys
import types
from pathlib import Path
from typing import Any

import pytest
from homeassistant.core import HomeAssistant
from homeassistant.helpers.dispatcher import async_dispatcher_send
from pytest_homeassistant_custom_component.common import MockConfigEntry

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

CORE_INIT = ROOT / "custom_components" / "presence_planner" / "core" / "__init__.py"
# PP_FAKE_CORE=1 tests the integration against the fake core even when the real one exists
REAL_CORE = CORE_INIT.is_file() and not os.environ.get("PP_FAKE_CORE")
DEMO = json.loads((ROOT / "shared" / "demo-plan.json").read_text())
PROFILES = json.loads((ROOT / "shared" / "profiles.json").read_text())

DOMAIN = "presence_planner"


def _inside(point: tuple[float, float], polygon: list[list[float]]) -> bool:
    x, z = point
    inside = False
    for i in range(len(polygon)):
        x1, z1 = polygon[i]
        x2, z2 = polygon[(i + 1) % len(polygon)]
        if (z1 > z) != (z2 > z) and x < (x2 - x1) * (z - z1) / (z2 - z1) + x1:
            inside = not inside
    return inside


def _fake_core() -> types.ModuleType:
    """Contract API with trivial numbers: coverage 0.5 with an own sensor, no spill."""
    core = types.ModuleType("custom_components.presence_planner.core")

    def load_profiles() -> dict:
        return copy.deepcopy(PROFILES)

    def resolve_sensor(sensor: dict, profiles: dict) -> dict:
        profile = next((p for p in profiles["profiles"] if p["id"] == sensor.get("profile")), None) or {}
        result = dict(sensor)
        result.setdefault("mount", "wall")
        for key in ("fov_h", "fov_v", "reach"):
            if result.get(key) is None:
                result[key] = profile.get(key)
        if result.get("fov_v") is None:
            result["fov_v"] = profiles["default_fov_v"]
            result["fov_v_assumed"] = True
        return result

    def build_model(plan: dict, floor_id: str) -> dict:
        return {"floor": next(f for f in plan["floors"] if f["id"] == floor_id)}

    def room_of(model: dict, sensor: dict) -> str | None:
        for room in model["floor"]["rooms"]:
            if _inside((sensor["x"], sensor["z"]), room["points"]):
                return room["id"]
        return None

    def evaluate(model: dict, sensors: list, opts: dict) -> dict:
        rooms = {}
        for room in model["floor"]["rooms"]:
            own = [s["entity_id"] for s in sensors if room_of(model, s) == room["id"]]
            value = 0.5 if own else 0.0
            rooms[room["id"]] = {
                "coverage": {"0.5": value, "0.9": value, "1.3": value},
                "coverage_mean": value,
                "seen": {"0.5": value, "0.9": value, "1.3": value},
                "misfire_risk": 0.0,
                "from": {},
                "own_sensors": own,
            }
        return {
            "rooms": rooms,
            "sensors": {s["entity_id"]: {"room": room_of(model, s), "glass": 0.0, "spill": {}} for s in sensors},
            "zones": [],
            "grid": {},
        }

    def spill_detail(model: dict, sensor: dict, opts: dict) -> dict:
        return {}

    core.load_profiles = load_profiles
    core.resolve_sensor = resolve_sensor
    core.build_model = build_model
    core.evaluate = evaluate
    core.spill_detail = spill_detail
    core.FAKE = True
    return core


if not REAL_CORE:
    sys.modules["custom_components.presence_planner.core"] = _fake_core()


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations: None) -> None:
    """Load custom_components from the repository."""


@pytest.fixture(autouse=True)
def no_frontend_package(hass: HomeAssistant) -> None:
    """The test env has no hass_frontend package: mark frontend as set up (panels still register)."""
    hass.config.components.add("frontend")


@pytest.fixture
def demo_plan() -> dict[str, Any]:
    """The synthetic demo flat."""
    return copy.deepcopy(DEMO["plan"])


@pytest.fixture
def demo_sensors() -> list[dict[str, Any]]:
    """The demo sensors."""
    return copy.deepcopy(DEMO["sensors"])


@pytest.fixture
def config_entry(hass: HomeAssistant) -> MockConfigEntry:
    """A current config entry (1.2)."""
    entry = MockConfigEntry(
        domain=DOMAIN,
        title="Presence Planner",
        data={},
        version=1,
        minor_version=2,
        options={
            "thin_db": 10,
            "hold_time": 30,
            "echo_window": 5,
            "spill_threshold": 0.05,
        },
        unique_id=DOMAIN,
    )
    entry.add_to_hass(hass)
    return entry


@pytest.fixture
def stored_demo(hass_storage: dict[str, Any], demo_plan: dict, demo_sensors: list) -> dict[str, Any]:
    """Our store prefilled with the demo plan and sensors."""
    hass_storage[DOMAIN] = {
        "version": 1,
        "minor_version": 1,
        "key": DOMAIN,
        "data": {"plan": demo_plan, "sensors": {}, "own_sensors": demo_sensors},
    }
    return hass_storage[DOMAIN]


class FakeNeonPlanData:
    """Stand-in for NeonPlan's FloorplanData (hass.data['neonplan3d']); Presence Planner must leave it alone."""

    def __init__(self, hass: HomeAssistant, building: dict[str, Any]) -> None:
        """Keep the building."""
        self.hass = hass
        self.building = building
        self.revision = 1
        self.saved: list[dict[str, Any]] = []

    async def async_save_building(self, building: dict[str, Any]) -> int:
        """Same effects as NeonPlan: replace, bump the revision, send the signal."""
        self.building = building
        self.revision += 1
        self.saved.append(copy.deepcopy(building))
        async_dispatcher_send(self.hass, "neonplan3d_building_updated", self.revision)
        return self.revision


def demo_building(plan: dict[str, Any], sensors: list[dict[str, Any]]) -> dict[str, Any]:
    """A NeonPlan building made from the demo plan, sensors as placements, plus a light placement."""
    building = {
        "version": 1,
        "settings": {**plan["settings"], "grid": 0.05, "buttons": []},
        "floors": [],
        "energy": {},
        "presence": [],
    }
    for floor in plan["floors"]:
        placements = [
            {
                "entity_id": s["entity_id"],
                "x": s["x"],
                "z": s["z"],
                "y": s["height"],
                "rotation": (s["phi"] - 90) % 360,
                "tilt": s["tilt"],
                "fov": s["fov_h"],
                "reach": s["reach"],
                "icon": "motion-sensor",
                "locked": True,
            }
            for s in sensors
            if s["floor_id"] == floor["id"]
        ]
        placements.append({"entity_id": "light.demo_living", "x": 2.0, "z": 2.0, "y": None, "mount": "ceiling"})
        building["floors"].append(
            {
                "id": floor["id"],
                "name": floor["name"],
                "elevation": floor.get("elevation", 0),
                "height": floor.get("height", 2.5),
                "cut_height": 1.15,
                "rooms": [{**r, "floor_material": "wood"} for r in floor["rooms"]],
                "openings": copy.deepcopy(floor["openings"]),
                "furniture": [{**f, "variant": None} for f in floor["furniture"]],
                "placements": placements,
                "background": None,
                "walls": copy.deepcopy(floor.get("walls") or []),
            }
        )
    return building


@pytest.fixture
def neonplan(hass: HomeAssistant, demo_plan: dict, demo_sensors: list) -> FakeNeonPlanData:
    """A loaded fake NeonPlan with the demo flat; the demo sensors report device class presence/motion."""
    data = FakeNeonPlanData(hass, demo_building(demo_plan, demo_sensors))
    hass.data["neonplan3d"] = data
    for sensor in demo_sensors:
        device_class = "motion" if sensor["entity_id"].endswith("_motion") else "presence"
        hass.states.async_set(sensor["entity_id"], "off", {"device_class": device_class})
    return data
