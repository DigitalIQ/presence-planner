"""Regressions for the backend audit: store, import, migration, availability, echoes and cleanup."""

from __future__ import annotations

import copy
import threading
from typing import Any

import pytest
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import issue_registry as ir
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.presence_planner import async_remove_config_entry_device
from custom_components.presence_planner import websocket as ws_module
from custom_components.presence_planner.store import PresencePlannerStore
from custom_components.presence_planner.validation import PlanValidationError

from .conftest import DOMAIN, REAL_CORE, demo_building
from .test_neonplan import native_plan
from .test_websocket import OPTIONS, _call, _setup

BATH = "binary_sensor.demo_bath_presence"
HALL = "binary_sensor.demo_hall_motion"
DOOR = "binary_sensor.demo_bath_door"
ATTIC = "binary_sensor.attic_motion"


def _issue(hass: HomeAssistant, issue_id: str):
    return ir.async_get(hass).async_get_issue(DOMAIN, issue_id)


def _occupancy(hass: HomeAssistant, entry: MockConfigEntry, room: str) -> str:
    return er.async_get(hass).async_get_entity_id("binary_sensor", DOMAIN, f"{entry.entry_id}_demo_{room}_occupancy")


def _store_data(plan: Any, sensors: Any, extras: Any = None) -> dict[str, Any]:
    return {"version": 1, "minor_version": 1, "key": DOMAIN, "data": {"plan": plan, "sensors": extras or {}, "own_sensors": sensors}}


def _second_floor() -> dict[str, Any]:
    return {
        "id": "up", "name": "Upstairs", "elevation": 2.8, "height": 2.5,
        "rooms": [{"id": "attic", "name": "Attic", "points": [[0, 0], [3, 0], [3, 3], [0, 3]]}],
        "openings": [], "walls": [], "furniture": [], "outdoor": [], "background": None,
    }


def _attic_sensor() -> dict[str, Any]:
    return {
        "entity_id": ATTIC, "floor_id": "up", "x": 1.5, "z": 1.5, "height": 2.2, "phi": 0, "tilt": 10,
        "mount": "wall", "profile": "custom", "fov_h": 120, "fov_v": 90, "reach": 6, "active": True,
    }


@pytest.fixture
def stored_two_floors(hass_storage, demo_plan, demo_sensors):
    plan = copy.deepcopy(demo_plan)
    plan["floors"].append(_second_floor())
    hass_storage[DOMAIN] = _store_data(plan, [*demo_sensors, _attic_sensor()])
    return hass_storage[DOMAIN]


# 1 broken door contact, one broken entity


async def test_stored_plan_with_object_contact_is_rejected_and_setup_survives(
    hass, hass_storage, config_entry, demo_plan, demo_sensors
):
    """A dict as door contact crashed the fusion of every room, also after each restart."""
    plan = copy.deepcopy(demo_plan)
    plan["floors"][0]["openings"][0]["contact"] = {"entity": "binary_sensor.x"}
    hass_storage[DOMAIN] = _store_data(plan, demo_sensors)
    await _setup(hass, config_entry)
    assert config_entry.state is ConfigEntryState.LOADED
    assert config_entry.runtime_data.plan is None
    assert hass_storage[DOMAIN]["data"]["plan"] == plan


async def test_one_failing_listener_does_not_stop_the_others(hass, config_entry, stored_demo, caplog):
    await _setup(hass, config_entry)
    coordinator = config_entry.runtime_data
    called = []

    def boom() -> None:
        raise RuntimeError("broken entity")

    coordinator.async_add_listener(boom)
    coordinator.async_add_listener(lambda: called.append(1))
    await coordinator.async_recompute()
    assert called == [1]
    assert "Presence Planner entity failed to update" in caplog.text


# 2 rejected stored data survives writes


async def test_rejected_plan_is_written_back_until_replaced(hass, hass_storage, demo_plan, demo_sensors):
    bad = {"version": 1, "floors": [{"rooms": [{}]}]}
    hass_storage[DOMAIN] = _store_data(bad, demo_sensors)
    store = PresencePlannerStore(hass)
    await store.async_load()
    assert store.plan is None and store.own_sensors == demo_sensors
    assert _issue(hass, "stored_data_rejected") is not None
    # a sensor write must not turn the rejected plan into null on disk
    await store.async_set_own_sensors(demo_sensors[:2])
    assert hass_storage[DOMAIN]["data"]["plan"] == bad
    assert _issue(hass, "stored_data_rejected") is not None
    # saving a plan replaces it on purpose
    await store.async_set_plan(demo_plan)
    assert hass_storage[DOMAIN]["data"]["plan"] == demo_plan
    assert _issue(hass, "stored_data_rejected") is None


async def test_rejected_sensors_are_written_back_until_replaced(hass, hass_storage, demo_plan):
    bad = [{"entity_id": "binary_sensor.x", "floor_id": "demo", "x": 10**9, "z": 0, "height": 1, "phi": 0}]
    hass_storage[DOMAIN] = _store_data(demo_plan, bad)
    store = PresencePlannerStore(hass)
    await store.async_load()
    assert store.plan is not None and store.own_sensors == []
    plan = copy.deepcopy(demo_plan)
    plan["floors"][0]["name"] = "Renamed"
    await store.async_set_plan(plan)
    assert hass_storage[DOMAIN]["data"]["own_sensors"] == bad
    assert _issue(hass, "stored_data_rejected") is not None
    await store.async_set_own_sensors([])
    assert hass_storage[DOMAIN]["data"]["own_sensors"] == []
    assert _issue(hass, "stored_data_rejected") is None


async def test_import_replaces_both_rejected_parts(hass, hass_storage, demo_plan, demo_sensors):
    hass_storage[DOMAIN] = _store_data({"version": 1, "floors": [{"rooms": [{}]}]}, [{"entity_id": 1}])
    store = PresencePlannerStore(hass)
    await store.async_load()
    await store.async_set_snapshot(demo_plan, demo_sensors)
    assert hass_storage[DOMAIN]["data"]["plan"] == demo_plan
    assert hass_storage[DOMAIN]["data"]["own_sensors"] == demo_sensors
    assert _issue(hass, "stored_data_rejected") is None


async def test_issues_go_with_the_entry(hass, hass_storage, config_entry, demo_sensors):
    hass_storage[DOMAIN] = _store_data({"version": 1, "floors": [{"rooms": [{}]}]}, demo_sensors)
    await _setup(hass, config_entry)
    assert _issue(hass, "stored_data_rejected") is not None
    ir.async_create_issue(hass, DOMAIN, "import_neonplan", is_fixable=False, severity=ir.IssueSeverity.WARNING,
                          translation_key="import_neonplan")
    await hass.config_entries.async_remove(config_entry.entry_id)
    await hass.async_block_till_done()
    assert _issue(hass, "stored_data_rejected") is None
    assert _issue(hass, "import_neonplan") is None


# 3 a sensor that is merely back is no echo


@pytest.mark.skipif(not REAL_CORE, reason="needs the real core's spill detail")
async def test_sensor_back_from_unavailable_is_no_echo(hass, config_entry, stored_demo):
    hass.states.async_set(HALL, "off", {"device_class": "motion"})
    hass.states.async_set(BATH, "unavailable", {"device_class": "presence"})
    hass.states.async_set(DOOR, "on", {"device_class": "door"})
    await _setup(hass, config_entry)
    entity_id = _occupancy(hass, config_entry, "bath")
    hass.states.async_set(HALL, "on", {"device_class": "motion"})
    await hass.async_block_till_done()
    hass.states.async_set(BATH, "on", {"device_class": "presence"})
    await hass.async_block_till_done()
    state = hass.states.get(entity_id)
    assert state.state == "on"
    assert state.attributes["suppressed_echoes"] == []


@pytest.mark.skipif(not REAL_CORE, reason="needs the real core's spill detail")
async def test_both_sensors_on_at_start_are_no_echo(hass, config_entry, stored_demo):
    """After a restart the states carry timestamps microseconds apart; that is no order of events."""
    hass.states.async_set(DOOR, "on", {"device_class": "door"})
    hass.states.async_set(HALL, "on", {"device_class": "motion"})
    hass.states.async_set(BATH, "on", {"device_class": "presence"})
    await _setup(hass, config_entry)
    state = hass.states.get(_occupancy(hass, config_entry, "bath"))
    assert state.state == "on"
    assert state.attributes["suppressed_echoes"] == []


# 4 kernel budget is checked on the compute path


async def test_stored_sensors_over_the_budget_are_kept_but_not_used(hass, hass_storage, config_entry, demo_plan, demo_sensors):
    """A budget tightened after the sensors were saved must not break the setup or eat the saved list."""
    sensors = [
        {**demo_sensors[i % 5], "entity_id": f"binary_sensor.copy{i}", "reach": 100, "fov_h": 360} for i in range(12)
    ]
    plan = copy.deepcopy(demo_plan)
    plan["floors"][0]["furniture"] = [
        {"id": f"w{i}", "type": "wardrobe", "x": 3 + i * 0.03, "z": 3, "w": 0.3, "d": 0.3, "h": 2.0} for i in range(200)
    ]
    hass_storage[DOMAIN] = _store_data(plan, sensors)
    await _setup(hass, config_entry)
    assert config_entry.state is ConfigEntryState.LOADED
    assert config_entry.runtime_data.sensors == []
    assert _issue(hass, "stored_data_rejected") is not None
    assert hass_storage[DOMAIN]["data"]["own_sensors"] == sensors


async def test_recompute_survives_a_plan_the_budget_refuses(hass, config_entry, stored_demo, monkeypatch):
    await _setup(hass, config_entry)
    coordinator = config_entry.runtime_data

    def refuse(plan, sensors, opts):
        raise PlanValidationError("sensor_work_budget_exceeded")

    monkeypatch.setattr("custom_components.presence_planner.coordinator.compute", refuse)
    await coordinator.async_recompute()
    assert coordinator.results == {}


# 5 export


async def test_export_ignores_a_plan_from_non_admins(hass, hass_ws_client, hass_read_only_access_token, config_entry, stored_demo, demo_plan):
    await _setup(hass, config_entry)
    other = copy.deepcopy(demo_plan)
    other["floors"][0]["name"] = "Somebody else's"
    client = await hass_ws_client(hass, hass_read_only_access_token)
    msg = await _call(client, type="presence_planner/export", plan=other)
    assert msg["success"], msg
    assert msg["result"]["presence_planner"]["plan"]["floors"][0]["name"] == demo_plan["floors"][0]["name"]


async def test_export_of_an_admins_plan_runs_in_the_executor(hass, hass_ws_client, config_entry, stored_demo, demo_plan, monkeypatch):
    await _setup(hass, config_entry)
    threads = []
    build = ws_module._build_export

    def spy(plan, sensors):
        threads.append(threading.current_thread())
        return build(plan, sensors)

    monkeypatch.setattr(ws_module, "_build_export", spy)
    other = copy.deepcopy(demo_plan)
    other["floors"][0]["name"] = "Edited"
    msg = await _call(await hass_ws_client(hass), type="presence_planner/export", plan=other)
    assert msg["success"], msg
    assert msg["result"]["presence_planner"]["plan"]["floors"][0]["name"] == "Edited"
    assert threads and threads[0] is not threading.main_thread()
    bad = msg = await _call(await hass_ws_client(hass), type="presence_planner/export", plan={"version": 1, "floors": [{"rooms": [{}]}]})
    assert bad["error"]["code"] == "invalid_plan"


# 6 migration


@pytest.mark.parametrize(
    ("source", "extras", "expect_import"),
    [("auto", {}, False), ("auto", {ATTIC: {"profile": "custom"}}, True), ("neonplan", {}, True), ("own", {ATTIC: {}}, False)],
)
async def test_migration_asks_for_an_import_only_when_neonplan_was_used(hass, hass_storage, source, extras, expect_import):
    hass_storage[DOMAIN] = _store_data(None, [], extras)
    entry = MockConfigEntry(
        domain=DOMAIN, title="Presence Planner", data={}, options={**OPTIONS, "plan_source": source},
        unique_id=DOMAIN, version=1, minor_version=1,
    )
    entry.add_to_hass(hass)
    await _setup(hass, entry)
    assert entry.data.get("neonplan_import", False) is expect_import
    assert (_issue(hass, "import_neonplan") is not None) is expect_import


async def test_migration_without_the_option_and_without_a_store(hass):
    entry = MockConfigEntry(
        domain=DOMAIN, title="Presence Planner", data={}, options={k: v for k, v in OPTIONS.items() if k != "plan_source"},
        unique_id=DOMAIN, version=1, minor_version=1,
    )
    entry.add_to_hass(hass)
    await _setup(hass, entry)
    assert "neonplan_import" not in entry.data


# 7 import of NeonPlan files


async def test_import_skips_bad_and_repeated_placements(hass, hass_ws_client, config_entry, demo_plan, demo_sensors):
    for sensor in demo_sensors:
        hass.states.async_set(sensor["entity_id"], "off", {"device_class": "presence"})
    building = demo_building(demo_plan, demo_sensors)
    placements = building["floors"][0]["placements"]
    by_id = {p["entity_id"]: p for p in placements}
    del by_id[demo_sensors[0]["entity_id"]]["x"]
    by_id[demo_sensors[1]["entity_id"]]["z"] = "far away"
    by_id[demo_sensors[2]["entity_id"]]["x"] = "nan"
    by_id[demo_sensors[3]["entity_id"]]["x"] = 10**9
    first = by_id[demo_sensors[4]["entity_id"]]
    placements.append({**first, "x": first["x"] + 1})
    await _setup(hass, config_entry)
    msg = await _call(await hass_ws_client(hass), type="presence_planner/import", data={"building": building})
    assert msg["success"], msg
    result = msg["result"]
    assert [s["entity_id"] for s in result["sensors"]] == [demo_sensors[4]["entity_id"]]
    assert result["sensors"][0]["x"] == first["x"]
    assert sorted(result["warnings"]) == sorted(
        [f"placement_skipped:{demo_sensors[i]['entity_id']}" for i in range(4)]
        + [f"duplicate_placement:{demo_sensors[4]['entity_id']}"]
    )
    assert config_entry.runtime_data.store.own_sensors == result["sensors"]


# 8 resolved-only fields are not stored


async def test_ceiling_cone_is_not_persisted_and_follows_fov_h(hass, hass_ws_client, hass_storage, config_entry, stored_demo, demo_sensors):
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    sensors = copy.deepcopy(demo_sensors)
    ceiling = next(s for s in sensors if s["mount"] == "ceiling")
    ceiling.update(profile="aqara_fp400", fov_h=90, ceiling_fov=120, fov_v_assumed=True)
    assert (await _call(client, type="presence_planner/save_sensors", sensors=sensors))["success"]
    stored = next(s for s in hass_storage[DOMAIN]["data"]["own_sensors"] if s["entity_id"] == ceiling["entity_id"])
    assert "ceiling_fov" not in stored and "fov_v_assumed" not in stored
    got = next(s for s in (await _call(client, type="presence_planner/get"))["result"]["sensors"] if s["entity_id"] == ceiling["entity_id"])
    assert got["ceiling_fov"] == 90


# 9 availability


async def test_occupancy_is_unavailable_without_a_reporting_own_sensor(hass, hass_storage, config_entry, demo_plan, demo_sensors):
    hass_storage[DOMAIN] = _store_data(demo_plan, [s for s in demo_sensors if "kitchen" not in s["entity_id"]])
    living = "binary_sensor.demo_living_presence"
    await _setup(hass, config_entry)
    # the kitchen has no own sensor at all
    assert hass.states.get(_occupancy(hass, config_entry, "kitchen")).state == "unavailable"
    # the living room sensor does not exist yet
    assert hass.states.get(_occupancy(hass, config_entry, "living")).state == "unavailable"
    hass.states.async_set(living, "unavailable", {"device_class": "presence"})
    await hass.async_block_till_done()
    assert hass.states.get(_occupancy(hass, config_entry, "living")).state == "unavailable"
    hass.states.async_set(living, "off", {"device_class": "presence"})
    await hass.async_block_till_done()
    assert hass.states.get(_occupancy(hass, config_entry, "living")).state == "off"
    hass.states.async_set(living, "unknown", {"device_class": "presence"})
    await hass.async_block_till_done()
    assert hass.states.get(_occupancy(hass, config_entry, "living")).state == "unavailable"


# 10 floors that are gone, 11 sensors of gone floors, 13 repair issues


async def test_removed_floor_takes_its_device_and_sensors(hass, hass_ws_client, hass_storage, config_entry, stored_two_floors, demo_plan):
    hass.states.async_set(ATTIC, "off", {"device_class": "motion"})
    await _setup(hass, config_entry)
    devices = dr.async_get(hass)
    assert sorted(d.name for d in dr.async_entries_for_config_entry(devices, config_entry.entry_id)) == ["Demo flat", "Upstairs"]
    msg = await _call(await hass_ws_client(hass), type="presence_planner/save_plan", plan=demo_plan)
    assert msg["success"], msg
    await hass.async_block_till_done()
    assert [d.name for d in dr.async_entries_for_config_entry(devices, config_entry.entry_id)] == ["Demo flat"]
    assert ATTIC not in {s["entity_id"] for s in hass_storage[DOMAIN]["data"]["own_sensors"]}
    assert len(hass_storage[DOMAIN]["data"]["own_sensors"]) == 5
    assert len(er.async_entries_for_config_entry(er.async_get(hass), config_entry.entry_id)) == 15


async def test_floor_devices_can_be_removed_only_when_the_floor_is_gone(hass, config_entry, stored_demo):
    await _setup(hass, config_entry)
    devices = dr.async_get(hass)
    current = dr.async_entries_for_config_entry(devices, config_entry.entry_id)[0]
    assert await async_remove_config_entry_device(hass, config_entry, current) is False
    gone = devices.async_get_or_create(
        config_entry_id=config_entry.entry_id, identifiers={(DOMAIN, f"{config_entry.entry_id}_gone")}, name="Gone"
    )
    assert await async_remove_config_entry_device(hass, config_entry, gone) is True


async def test_sensors_of_unknown_floors_are_not_stored(hass, hass_ws_client, hass_storage, config_entry, stored_demo, demo_sensors):
    await _setup(hass, config_entry)
    before = copy.deepcopy(hass_storage[DOMAIN]["data"])
    msg = await _call(await hass_ws_client(hass), type="presence_planner/save_sensors", sensors=[{**demo_sensors[0], "floor_id": "deleted"}])
    assert msg["error"]["code"] == "invalid_plan"
    assert "sensor_floor_missing" in msg["error"]["message"]
    assert hass_storage[DOMAIN]["data"] == before


async def test_stored_sensors_of_unknown_floors_are_ignored_on_load(hass, hass_storage, demo_plan, demo_sensors):
    hass_storage[DOMAIN] = _store_data(demo_plan, [*demo_sensors, _attic_sensor()])
    store = PresencePlannerStore(hass)
    await store.async_load()
    assert [s["entity_id"] for s in store.own_sensors] == [s["entity_id"] for s in demo_sensors]
    assert _issue(hass, "stored_data_rejected") is None


# 12 a bare pp-plan through the websocket


async def test_bare_pp_plan_import_keeps_everything(hass, hass_ws_client, hass_storage, config_entry, stored_demo):
    await _setup(hass, config_entry)
    plan = native_plan()
    msg = await _call(await hass_ws_client(hass), type="presence_planner/import", data=copy.deepcopy(plan))
    assert msg["success"], msg
    assert msg["result"]["plan"] == plan
    assert hass_storage[DOMAIN]["data"]["plan"] == plan
