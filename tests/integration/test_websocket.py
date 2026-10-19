"""WebSocket commands presence_planner/*."""

from __future__ import annotations

import copy
from typing import Any

import pytest
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockConfigEntry

from .conftest import DOMAIN, FakeNeonPlanData, demo_building

OPTIONS = {"plan_source": "auto", "thin_db": 10, "hold_time": 30, "echo_window": 5, "spill_threshold": 0.05}


async def _setup(hass: HomeAssistant, entry: MockConfigEntry) -> None:
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()


@pytest.fixture
def auto_entry(hass: HomeAssistant) -> MockConfigEntry:
    """An entry with plan source auto."""
    entry = MockConfigEntry(domain=DOMAIN, title="Presence Planner", data={}, options=OPTIONS, unique_id=DOMAIN)
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
    assert result["source"] == "own"
    assert isinstance(result["revision"], int)
    assert [f["id"] for f in result["plan"]["floors"]] == ["demo"]
    assert len(result["sensors"]) == 5
    assert all(s["fov_v"] is not None for s in result["sensors"])
    assert any(p["id"] == "aqara_fp300" for p in result["profiles"]["profiles"])
    assert result["options"]["hold_time"] == 30
    assert result["neonplan"]["installed"] is False
    assert result["neonplan"]["linked"] is False


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


async def test_export_and_import_roundtrip(
    hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry, stored_demo, demo_plan
) -> None:
    """export gives the NeonPlan import format; importing it gives the same rooms, doors and windows."""
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/export")
    assert msg["success"], msg
    data = msg["result"]
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

    msg = await _call(client, type="presence_planner/import", data=data)
    assert msg["success"], msg
    plan = msg["result"]["plan"]
    imported = plan["floors"][0]
    assert len(imported["rooms"]) == 5
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


async def test_import_invalid(hass: HomeAssistant, hass_ws_client, config_entry: MockConfigEntry) -> None:
    """Unknown data is refused."""
    await _setup(hass, config_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/import", data={"hello": "world"})
    assert not msg["success"]
    assert msg["error"]["code"] == "invalid_format"


async def test_neonplan_source_and_save_sensors(
    hass: HomeAssistant, hass_ws_client, hass_storage, auto_entry: MockConfigEntry, neonplan: FakeNeonPlanData
) -> None:
    """With NeonPlan loaded, auto reads its building; saves write only the placement fields."""
    await _setup(hass, auto_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/get")
    result = msg["result"]
    assert result["source"] == "neonplan"
    assert result["neonplan"]["installed"] is True
    sensors = {s["entity_id"]: s for s in result["sensors"]}
    # the light placement is no presence sensor
    assert "light.demo_living" not in sensors
    assert len(sensors) == 5
    bedroom = sensors["binary_sensor.demo_bedroom_presence"]
    assert bedroom["phi"] == 135
    assert bedroom["height"] == 1.7
    assert bedroom["fov_h"] == 120
    assert len(er.async_entries_for_config_entry(er.async_get(hass), auto_entry.entry_id)) == 15

    bedroom = {**bedroom, "phi": 180, "height": 2.1, "tilt": 20, "reach": 5.5, "mount": "corner", "fov_v": 70}
    msg = await _call(client, type="presence_planner/save_sensors", sensors=[bedroom])
    assert msg["success"], msg
    placement = next(
        p
        for f in neonplan.building["floors"]
        for p in f["placements"]
        if p["entity_id"] == "binary_sensor.demo_bedroom_presence"
    )
    assert placement == {
        "entity_id": "binary_sensor.demo_bedroom_presence",
        "x": 8.57,
        "z": 0.03,
        "y": 2.1,
        "rotation": 90.0,
        "tilt": 20.0,
        "fov": 120.0,
        "reach": 5.5,
        "icon": "motion-sensor",
        "locked": True,
    }
    extras = hass_storage[DOMAIN]["data"]["sensors"]["binary_sensor.demo_bedroom_presence"]
    assert extras["mount"] == "corner"
    assert extras["fov_v"] == 70
    assert "phi" not in extras and "x" not in extras
    assert len(neonplan.saved) == 1
    msg = await _call(client, type="presence_planner/get")
    saved = next(s for s in msg["result"]["sensors"] if s["entity_id"] == "binary_sensor.demo_bedroom_presence")
    assert saved["phi"] == 180
    assert saved["fov_v"] == 70


async def test_neonplan_change_signal(hass: HomeAssistant, hass_ws_client, auto_entry, neonplan) -> None:
    """A save in NeonPlan reaches our subscribers."""
    await _setup(hass, auto_entry)
    client = await hass_ws_client(hass)
    assert (await _call(client, type="presence_planner/subscribe"))["success"]
    building = copy.deepcopy(neonplan.building)
    building["floors"][0]["placements"][0]["x"] = 1.0
    await neonplan.async_save_building(building)
    event = await client.receive_json()
    assert event["type"] == "event"
    msg = await _call(client, type="presence_planner/get")
    living = next(s for s in msg["result"]["sensors"] if s["entity_id"] == "binary_sensor.demo_living_presence")
    assert living["x"] == 1.0


async def test_link_neonplan(hass: HomeAssistant, hass_ws_client, auto_entry, neonplan) -> None:
    """link_neonplan adds the menu button once."""
    await _setup(hass, auto_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/link_neonplan")
    assert msg["success"], msg
    assert msg["result"] == {"linked": True, "added": True}
    msg = await _call(client, type="presence_planner/link_neonplan")
    assert msg["result"] == {"linked": True, "added": False}
    assert neonplan.building["settings"]["buttons"] == [
        {
            "id": "presence_planner",
            "label": "Presence Planner",
            "icon": "radar",
            "action": "navigate",
            "target": "/presence-planner",
        }
    ]
    assert len(neonplan.saved) == 1
    msg = await _call(client, type="presence_planner/get")
    assert msg["result"]["neonplan"]["linked"] is True


async def test_link_neonplan_unavailable(hass: HomeAssistant, hass_ws_client, auto_entry) -> None:
    """Without NeonPlan the link is refused."""
    await _setup(hass, auto_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/link_neonplan")
    assert not msg["success"]
    assert msg["error"]["code"] == "neonplan_unavailable"


async def test_neonplan_incompatible_falls_back(hass: HomeAssistant, hass_ws_client, auto_entry, stored_demo) -> None:
    """A NeonPlan object without the expected attributes: own plan, reported as neonplan_incompatible."""

    class Strange:
        building = None

    hass.data["neonplan3d"] = Strange()
    await _setup(hass, auto_entry)
    client = await hass_ws_client(hass)
    msg = await _call(client, type="presence_planner/get")
    assert msg["result"]["source"] == "own"
    assert msg["result"]["neonplan"]["error"] == "neonplan_incompatible"
    assert len(msg["result"]["sensors"]) == 5
    msg = await _call(client, type="presence_planner/link_neonplan")
    assert msg["error"]["code"] == "neonplan_incompatible"


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
