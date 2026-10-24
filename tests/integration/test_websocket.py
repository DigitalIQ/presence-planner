"""WebSocket commands presence_planner/*."""

from __future__ import annotations

import copy
from typing import Any

import pytest
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import issue_registry as ir
from pytest_homeassistant_custom_component.common import MockConfigEntry

from .conftest import DOMAIN, FakeNeonPlanData, demo_building

OPTIONS = {"plan_source": "auto", "thin_db": 10, "hold_time": 30, "echo_window": 5, "spill_threshold": 0.05}


async def _setup(hass: HomeAssistant, entry: MockConfigEntry) -> None:
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


@pytest.fixture
def auto_entry(hass: HomeAssistant) -> MockConfigEntry:
    """An entry from 0.1.x with plan source auto (config entry 1.1)."""
    entry = MockConfigEntry(
        domain=DOMAIN, title="Presence Planner", data={}, options=OPTIONS, unique_id=DOMAIN, version=1, minor_version=1
    )
    entry.add_to_hass(hass)
    return entry


async def _call(client: Any, **msg: Any) -> dict[str, Any]:
    await client.send_json_auto_id(msg)
    return await client.receive_json()


async def test_get_own(hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry, stored_demo) -> None:
    """get returns the own plan, the resolved sensors, profiles and options."""
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/get")
    assert msg["success"], msg
    result = msg["result"]
    assert "source" not in result and "neonplan" not in result
    assert isinstance(result["revision"], int)
    assert [f["id"] for f in result["plan"]["floors"]] == ["demo"]
    assert len(result["sensors"]) == 5
    assert all(s["fov_v"] is not None for s in result["sensors"])
    assert any(p["id"] == "aqara_fp300" for p in result["profiles"]["profiles"])
    assert result["options"]["hold_time"] == 30


async def test_save_sensors_own_and_subscribe(
    hass: HomeAssistant, hass_ws_client, hass_storage, config_entry: MockConfigEntry, stored_demo, demo_sensors
) -> None:
    """save_sensors writes the own store and subscribers get the new revision."""
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    sub = await _call(client, type="presence_planner/subscribe")
    assert sub["success"]
    sensors = copy.deepcopy(demo_sensors)
    sensors[0]["phi"] = 300
    msg = await _call(client, type="presence_planner/save_sensors", sensors=sensors)
    # the event may arrive before the result
    replies = [msg, await client.receive_json()]
    event = next(r for r in replies if r["type"] == "event")
    result = next(r for r in replies if r["type"] == "result")
    assert result["success"], result
    assert event["event"]["revision"] == result["result"]["revision"]
    assert hass_storage[DOMAIN]["data"]["own_sensors"][0]["phi"] == 300
    msg = await _call(client, type="presence_planner/get")
    assert msg["result"]["sensors"][0]["phi"] == 300


async def test_save_plan_requires_admin(
    hass: HomeAssistant, hass_ws_client, hass_read_only_access_token, config_entry: MockConfigEntry, stored_demo
) -> None:
    """A non-admin user cannot write."""
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass, hass_read_only_access_token)
    msg = await _call(client, type="presence_planner/save_plan", plan={"version": 1, "floors": []})
    assert not msg["success"]
    assert msg["error"]["code"] == "unauthorized"
    msg = await _call(client, type="presence_planner/get")
    assert msg["success"]


async def test_save_plan_renames_entities(
    hass: HomeAssistant, hass_ws_client, hass_storage, config_entry: MockConfigEntry, stored_demo, demo_plan
) -> None:
    """save_plan stores the own plan; a renamed room rebuilds the entities."""
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    plan = copy.deepcopy(demo_plan)
    plan["floors"][0]["rooms"][0]["name"] = "Lounge"
    msg = await _call(client, type="presence_planner/save_plan", plan=plan)
    assert msg["success"], msg
    await hass.async_block_till_done()
    assert hass_storage[DOMAIN]["data"]["plan"]["floors"][0]["rooms"][0]["name"] == "Lounge"
    entity_id = er.async_get(hass).async_get_entity_id(
        "binary_sensor", DOMAIN, f"{config_entry.entry_id}_demo_living_occupancy"
    )
    assert hass.states.get(entity_id).name == "Demo flat Lounge occupancy"


async def test_save_plan_answers_after_the_reload(
    hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry, stored_demo, demo_plan
) -> None:
    """A room change reloads the entry; save_plan answers only after it, so the next get works right away."""
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    plan = copy.deepcopy(demo_plan)
    plan["floors"][0]["rooms"][0]["name"] = "Lounge"
    msg = await _call(client, type="presence_planner/save_plan", plan=plan)
    assert msg["success"], msg
    # no async_block_till_done here: the panel loads immediately after the answer
    msg = await _call(client, type="presence_planner/get")
    assert msg["success"], msg
    assert msg["result"]["plan"]["floors"][0]["rooms"][0]["name"] == "Lounge"
    assert config_entry.state is ConfigEntryState.LOADED


async def test_deleted_room_loses_its_entities(
    hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry, stored_demo, demo_plan
) -> None:
    """A room removed from the plan takes its three entities out of the registry (no unavailable leftovers)."""
    await _setup(hass, config_entry)
    registry = er.async_get(hass)
    before = {e.unique_id for e in er.async_entries_for_config_entry(registry, config_entry.entry_id)}
    plan = copy.deepcopy(demo_plan)
    removed = plan["floors"][0]["rooms"].pop()
    plan["floors"][0]["openings"] = [o for o in plan["floors"][0]["openings"] if o.get("room_id") != removed["id"]]
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/save_plan", plan=plan)
    assert msg["success"], msg
    await hass.async_block_till_done()
    after = {e.unique_id for e in er.async_entries_for_config_entry(registry, config_entry.entry_id)}
    gone = before - after
    floor_id = demo_plan["floors"][0]["id"]
    assert gone == {
        f"{config_entry.entry_id}_{floor_id}_{removed['id']}_{k}" for k in ("coverage", "misfire_risk", "occupancy")
    }
    assert len(after) == len(before) - 3


async def test_export_and_import_roundtrip(
    hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry, stored_demo, demo_plan
) -> None:
    """export gives the NeonPlan import format; importing it gives the same rooms, doors and windows."""
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/export")
    assert msg["success"], msg
    data = msg["result"]
    assert data["presence_planner"]["plan"] == demo_plan
    assert data["format"] == "neonplan-import"
    assert data["rooms_at"] == "centre"
    floor = data["floors"][0]
    assert [r["name"] for r in floor["rooms"]] == [r["name"] for r in demo_plan["floors"][0]["rooms"]]
    assert len(floor["doors"]) == 5
    assert len(floor["windows"]) == 4
    # d_living: hall edge 0 from (3, 4.2) to (5, 4.2), offset 1.0
    assert [4.0, 4.2] in [d["at"] for d in floor["doors"]]
    sofa = next(f for f in floor["furniture"] if f["type"] == "sofa_l")
    assert sofa == {"type": "sofa_l", "at": [1.4, 2.9], "width": 2.4, "depth": 1.6, "height": 0.85, "rotation": 180}
    assert floor["walls"][0]["from"] == [0.15, 6.55]

    # the sensors travel in an extra key, by floor index (the import format has no floor ids)
    exported = data["presence_planner"]["sensors"]
    assert exported and all(s["floor_index"] == 0 for s in exported)

    msg = await _call(client, type="presence_planner/import", data=data)
    assert msg["success"], msg
    plan = msg["result"]["plan"]
    assert plan == demo_plan
    imported = plan["floors"][0]
    assert len(imported["rooms"]) == 5
    sensors = msg["result"]["sensors"]
    assert [s["entity_id"] for s in sensors] == [s["entity_id"] for s in exported]
    assert all(s["floor_id"] == imported["id"] for s in sensors)
    assert [(s["x"], s["z"], s["phi"]) for s in sensors] == [(s["x"], s["z"], s["phi"]) for s in exported]
    assert len([o for o in imported["openings"] if o["type"] == "door"]) == 5
    assert len([o for o in imported["openings"] if o["type"] == "window"]) == 4
    living = next(r for r in imported["rooms"] if r["name"] == "Living room")
    assert living["points"] == demo_plan["floors"][0]["rooms"][0]["points"]
    # the door between hall and living room sits on an edge at the right place
    door = next(o for o in imported["openings"] if o["type"] == "door" and o["width"] == 0.8 and o["offset"] == 1.0)
    room = next(r for r in imported["rooms"] if r["id"] == door["room_id"])
    a, b = room["points"][door["edge"]], room["points"][(door["edge"] + 1) % len(room["points"])]
    assert {tuple(a), tuple(b)} in ({(3, 4.2), (5, 4.2)}, {(5, 4.2), (3, 4.2)})


async def test_import_neonplan_building(
    hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry, demo_plan, demo_sensors
) -> None:
    """A NeonPlan building becomes the own plan; its presence placements become own sensors."""
    for sensor in demo_sensors:
        hass.states.async_set(sensor["entity_id"], "off", {"device_class": "presence"})
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/import", data={"building": demo_building(demo_plan, demo_sensors)})
    assert msg["success"], msg
    assert [r["id"] for r in msg["result"]["plan"]["floors"][0]["rooms"]] == [
        r["id"] for r in demo_plan["floors"][0]["rooms"]
    ]
    sensors = {s["entity_id"]: s for s in msg["result"]["sensors"]}
    assert set(sensors) == {s["entity_id"] for s in demo_sensors}
    assert sensors["binary_sensor.demo_bedroom_presence"]["phi"] == 135
    await hass.async_block_till_done()
    assert len(er.async_entries_for_config_entry(er.async_get(hass), config_entry.entry_id)) == 15


async def test_import_skips_own_occupancy_entities(
    hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry, demo_plan, demo_sensors
) -> None:
    """Our own occupancy entities placed in NeonPlan never become input sensors."""
    for sensor in demo_sensors:
        hass.states.async_set(sensor["entity_id"], "off", {"device_class": "presence"})
    own = er.async_get(hass).async_get_or_create(
        "binary_sensor", DOMAIN, "own_occupancy", suggested_object_id="flat_bath_occupancy"
    )
    hass.states.async_set(own.entity_id, "off", {"device_class": "occupancy"})
    building = demo_building(demo_plan, demo_sensors)
    building["floors"][0]["placements"].append({"entity_id": own.entity_id, "x": 1.0, "z": 1.0, "y": 2.0})
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/import", data={"building": building})
    assert msg["success"], msg
    assert own.entity_id not in {s["entity_id"] for s in msg["result"]["sensors"]}
    assert len(msg["result"]["sensors"]) == len(demo_sensors)


async def test_import_invalid(hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry) -> None:
    """Unknown data is refused."""
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/import", data={"hello": "world"})
    assert not msg["success"]
    assert msg["error"]["code"] == "invalid_format"


async def test_neonplan_runtime_data_is_ignored(
    hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry, stored_demo, neonplan: FakeNeonPlanData
) -> None:
    """A loaded NeonPlan is neither read nor written, and its change signal changes nothing."""
    neonplan.building["floors"][0]["rooms"] = []
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/get")
    assert [r["id"] for r in msg["result"]["plan"]["floors"][0]["rooms"]] == [
        r["id"] for r in stored_demo["data"]["plan"]["floors"][0]["rooms"]
    ]
    revision = msg["result"]["revision"]
    sensors = copy.deepcopy(msg["result"]["sensors"])
    sensors[0]["x"] = 1.5
    msg = await _call(client, type="presence_planner/save_sensors", sensors=sensors)
    assert msg["success"], msg
    assert neonplan.saved == []
    await neonplan.async_save_building(copy.deepcopy(neonplan.building))
    await hass.async_block_till_done()
    msg = await _call(client, type="presence_planner/get")
    assert msg["result"]["revision"] == revision + 1
    msg = await _call(client, type="presence_planner/link_neonplan")
    assert msg["error"]["code"] == "unknown_command"


async def test_migration_from_neonplan_source(
    hass: HomeAssistant, hass_ws_client, auto_entry: MockConfigEntry, demo_plan, demo_sensors
) -> None:
    """A 0.1.x entry drops the source option, keeps its entities and asks for a NeonPlan import once."""
    room = demo_plan["floors"][0]["rooms"][0]["id"]
    registry = er.async_get(hass)
    kept = registry.async_get_or_create(
        "sensor", DOMAIN, f"{auto_entry.entry_id}_demo_{room}_coverage", config_entry=auto_entry
    )
    for sensor in demo_sensors:
        hass.states.async_set(sensor["entity_id"], "off", {"device_class": "presence"})
    await _setup(hass, auto_entry)
    assert auto_entry.minor_version == 2
    assert "plan_source" not in auto_entry.options
    assert auto_entry.data["neonplan_import"] is True
    assert registry.async_get(kept.entity_id) is not None
    assert ir.async_get(hass).async_get_issue(DOMAIN, "import_neonplan") is not None

    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/import", data={"building": demo_building(demo_plan, demo_sensors)})
    assert msg["success"], msg
    await hass.async_block_till_done()
    assert ir.async_get(hass).async_get_issue(DOMAIN, "import_neonplan") is None
    assert registry.async_get(kept.entity_id) is not None
    assert len(er.async_entries_for_config_entry(registry, auto_entry.entry_id)) == 15


async def test_migration_own_source_needs_no_import(hass: HomeAssistant, stored_demo) -> None:
    """A 0.1.x entry that already used the own plan only loses the option."""
    entry = MockConfigEntry(
        domain=DOMAIN, title="Presence Planner", data={}, options={**OPTIONS, "plan_source": "own"},
        unique_id=DOMAIN, version=1, minor_version=1,
    )
    entry.add_to_hass(hass)
    await _setup(hass, entry)
    assert entry.state is ConfigEntryState.LOADED
    assert "neonplan_import" not in entry.data
    assert "plan_source" not in entry.options
    assert ir.async_get(hass).async_get_issue(DOMAIN, "import_neonplan") is None


async def test_device_profiles(hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry) -> None:
    """A device 'Aqara Presence Multi-Sensor FP300' suggests the aqara_fp300 profile."""
    await _setup(hass, config_entry)
    other = MockConfigEntry(domain="zha")
    other.add_to_hass(hass)
    device = dr.async_get(hass).async_get_or_create(
        config_entry_id=other.entry_id,
        identifiers={("zha", "fp300")},
        manufacturer="Aqara",
        model="Presence Multi-Sensor FP300",
        name="Kitchen sensor",
    )
    entry = er.async_get(hass).async_get_or_create(
        "binary_sensor", "zha", "fp300-occupancy", device_id=device.id, original_device_class="occupancy"
    )
    hass.states.async_set("binary_sensor.no_device", "off", {"device_class": "motion"})
    hass.states.async_set("binary_sensor.window", "off", {"device_class": "window"})
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/device_profiles")
    assert msg["success"], msg
    suggestions = msg["result"]["suggestions"]
    assert suggestions[entry.entity_id]["profile"] == "aqara_fp300"
    assert suggestions["binary_sensor.no_device"]["profile"] is None
    assert "binary_sensor.window" not in suggestions
