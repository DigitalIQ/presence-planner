"""Release-review regressions through the actual HA and storage boundaries."""

import copy
from unittest.mock import AsyncMock

import pytest

from custom_components.presence_planner.fusion import RoomFusion
from custom_components.presence_planner.store import PresencePlannerStore

from .test_websocket import _call, _setup


@pytest.mark.parametrize("command,payload", [
    ("save_sensors", {"sensors": []}),
    ("import", {"data": {"format": "neonplan-import", "floors": []}}),
    ("save_plan", {"plan": {"version": 1, "floors": []}}),
])
async def test_all_mutations_require_admin(hass, hass_ws_client, hass_read_only_access_token, config_entry, stored_demo, command, payload):
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass, hass_read_only_access_token)
    result = await _call(client, type=f"presence_planner/{command}", **payload)
    assert not result["success"]
    assert result["error"]["code"] == "unauthorized"


@pytest.mark.parametrize("representation", ["exchange", "native", "building", "bare"])
async def test_oversized_import_preserves_last_good_snapshot(hass, hass_ws_client, config_entry, stored_demo, representation):
    await _setup(hass, config_entry)
    c = config_entry.runtime_data
    before = copy.deepcopy(c.store.data)
    room = {"id": "r", "points": [[0, 0], [10000, 0], [10000, 10000], [0, 10000]]}
    exchange = {"format": "neonplan-import", "floors": [{"rooms": [room]}]}
    plan = {"version": 1, "floors": [{"id": "f", "rooms": [room], "placements": []}]}
    data = {"exchange": exchange, "native": {"presence_planner": {"version": 1, "plan": plan}}, "building": {"building": plan}, "bare": {"floors": exchange["floors"]}}[representation]
    client = await hass_ws_client(hass)
    result = await _call(client, type="presence_planner/import", data=data)
    assert not result["success"]
    assert result["error"]["code"] == "invalid_format"
    assert c.store.data == before


async def test_invalid_save_does_not_replace_plan(hass, hass_ws_client, config_entry, stored_demo):
    await _setup(hass, config_entry)
    before = copy.deepcopy(config_entry.runtime_data.store.data)
    result = await _call(await hass_ws_client(hass), type="presence_planner/save_plan", plan={"version": 1, "floors": [{"rooms": [{}]}]})
    assert result["error"]["code"] == "invalid_plan"
    assert config_entry.runtime_data.store.data == before


async def test_import_without_sensors_replaces_old_sensor_list(hass, hass_ws_client, config_entry, stored_demo):
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    data = {"format": "neonplan-import", "floors": [{"rooms": [{"name": "New", "points": [[0, 0], [2, 0], [2, 2], [0, 2]]}]}]}
    result = await _call(client, type="presence_planner/import", data=data)
    assert result["success"], result
    assert config_entry.runtime_data.store.own_sensors == []
    assert (await _call(client, type="presence_planner/get"))["result"]["sensors"] == []


async def test_failed_store_commit_keeps_sensors(hass, config_entry, stored_demo, demo_sensors, monkeypatch):
    await _setup(hass, config_entry)
    c = config_entry.runtime_data
    before = copy.deepcopy(c.store.data)
    monkeypatch.setattr(c.store._store, "async_save", AsyncMock(side_effect=OSError("disk full")))
    with pytest.raises(OSError):
        await c.async_save_sensors([{**demo_sensors[0], "active": False}])
    assert c.store.data == before


async def test_bad_stored_plan_is_not_evaluated_or_rewritten(hass, hass_storage):
    bad = {"version": 1, "floors": [{"rooms": [{}]}]}
    hass_storage["presence_planner"] = {"version": 1, "data": {"plan": bad, "sensors": {}, "own_sensors": []}}
    store = PresencePlannerStore(hass)
    await store.async_load()
    assert store.plan is None
    assert hass_storage["presence_planner"]["data"]["plan"] == bad


def test_either_closed_door_blocks_a_multi_door_echo_path():
    f = RoomFusion(hold_time=0, echo_window=5, clock=lambda: 100)
    f.configure(["s"], {"s": {"neighbour": {"total": 1, "walls": 0, "doors": {}, "door_paths": [{"doors": ["d1", "d2"], "share": 1}]}}}, {"neighbour": ["n"]}, {"d1": "c1", "d2": "c2"})
    f.seed("c1", True); f.seed("c2", True); f.seed("n", True, 98)
    assert not f.update("s", True).occupied
    assert f.update("c2", False).occupied
    f.update("s", False); f.update("c2", True); f.update("c1", False)
    assert f.update("s", True).occupied


@pytest.mark.parametrize("records", [None, {}, [{"floor_index": 99, "entity_id": "binary_sensor.bad"}]])
async def test_invalid_backup_sensors_do_not_partially_replace_plan(hass, hass_ws_client, config_entry, stored_demo, demo_plan, records):
    await _setup(hass, config_entry)
    before = copy.deepcopy(config_entry.runtime_data.store.data)
    data = {"presence_planner": {"version": 1, "plan": demo_plan, "sensors": records}}
    result = await _call(await hass_ws_client(hass), type="presence_planner/import", data=data)
    assert not result["success"]
    assert result["error"]["code"] == "invalid_format"
    assert config_entry.runtime_data.store.data == before


async def test_native_roundtrip_preserves_ha_and_model_metadata(hass, hass_ws_client, config_entry, stored_demo, demo_plan):
    await _setup(hass, config_entry)
    plan = copy.deepcopy(demo_plan)
    floor = plan["floors"][0]
    floor["ha_floor"] = "upstairs"
    floor["rooms"][0].update(area_id="living_area", ceiling_height=3, wall_thickness=[.31] * len(floor["rooms"][0]["points"]))
    floor["background"] = {"image": "data:image/png;base64,aGVsbG8=", "width": 8, "opacity": .5}
    floor["openings"][0].update(contact="binary_sensor.special_door", contact_invert=True)
    client = await hass_ws_client(hass)
    assert (await _call(client, type="presence_planner/save_plan", plan=plan))["success"]
    exported = await _call(client, type="presence_planner/export")
    assert exported["success"]
    imported = await _call(client, type="presence_planner/import", data=exported["result"])
    assert imported["success"], imported
    assert imported["result"]["plan"] == plan
