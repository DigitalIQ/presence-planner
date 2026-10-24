"""Setup, unload, panel and entities."""

from __future__ import annotations

from datetime import timedelta

import pytest
from freezegun.api import FrozenDateTimeFactory
from homeassistant import config_entries
from homeassistant.components import frontend
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.util import dt as dt_util
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_time_changed

from .conftest import REAL_CORE

ROOMS = ["living", "bedroom", "kitchen", "hall", "bath"]


async def test_setup_and_unload(hass: HomeAssistant, config_entry: MockConfigEntry, stored_demo: dict) -> None:
    """Setup registers the panel and the entities; reload keeps the panel, disabling and removing drop it."""
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done()
    assert config_entry.state is ConfigEntryState.LOADED

    panels = hass.data[frontend.DATA_PANELS]
    panel = panels["presence-planner"]
    assert panel.sidebar_title == "Presence Planner"
    assert panel.sidebar_icon == "mdi:radar"
    assert panel.require_admin is False
    custom = panel.config["_panel_custom"]
    assert custom["name"] == "presence-planner-panel"
    assert custom["embed_iframe"] is False
    assert custom["module_url"].startswith("/presence_planner/frontend/presence-planner-panel.js?v=")

    # a reload (rooms added or renamed) must not throw the user out of the open panel
    assert await hass.config_entries.async_reload(config_entry.entry_id)
    await hass.async_block_till_done()
    assert config_entry.state is ConfigEntryState.LOADED
    assert "presence-planner" in hass.data[frontend.DATA_PANELS]

    assert await hass.config_entries.async_set_disabled_by(
        config_entry.entry_id, config_entries.ConfigEntryDisabler.USER
    )
    await hass.async_block_till_done()
    assert config_entry.state is ConfigEntryState.NOT_LOADED
    assert "presence-planner" not in hass.data[frontend.DATA_PANELS]

    assert await hass.config_entries.async_set_disabled_by(config_entry.entry_id, None)
    await hass.async_block_till_done()
    assert "presence-planner" in hass.data[frontend.DATA_PANELS]
    await hass.config_entries.async_remove(config_entry.entry_id)
    await hass.async_block_till_done()
    assert "presence-planner" not in hass.data[frontend.DATA_PANELS]


async def test_entities_per_room(hass: HomeAssistant, config_entry: MockConfigEntry, stored_demo: dict) -> None:
    """Three entities per room, one device per floor, names from the room names."""
    hass.states.async_set("binary_sensor.demo_living_presence", "off", {"device_class": "presence"})
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done()
    registry = er.async_get(hass)
    entries = er.async_entries_for_config_entry(registry, config_entry.entry_id)
    unique_ids = {e.unique_id for e in entries}
    for room in ROOMS:
        for key in ("coverage", "misfire_risk", "occupancy"):
            assert f"{config_entry.entry_id}_demo_{room}_{key}" in unique_ids
    assert len(entries) == 15

    devices = dr.async_entries_for_config_entry(dr.async_get(hass), config_entry.entry_id)
    assert [d.name for d in devices] == ["Demo flat"]

    occupancy = registry.async_get_entity_id(
        "binary_sensor", "presence_planner", f"{config_entry.entry_id}_demo_living_occupancy"
    )
    state = hass.states.get(occupancy)
    assert state.name == "Demo flat Living room occupancy"
    assert state.state == "off"
    assert state.attributes["device_class"] == "occupancy"
    assert state.attributes["sources"] == []

    coverage = registry.async_get_entity_id(
        "sensor", "presence_planner", f"{config_entry.entry_id}_demo_living_coverage"
    )
    state = hass.states.get(coverage)
    assert state.name == "Demo flat Living room coverage"
    assert state.attributes["unit_of_measurement"] == "%"
    assert 0 < float(state.state) <= 100
    assert set(state.attributes) >= {"coverage_lying", "coverage_sitting", "coverage_standing", "own_sensors"}
    assert state.attributes["own_sensors"] == ["binary_sensor.demo_living_presence"]


async def test_occupancy_follows_own_sensor(
    hass: HomeAssistant, config_entry: MockConfigEntry, stored_demo: dict, freezer: FrozenDateTimeFactory
) -> None:
    """The cleaned occupancy turns on with its own sensor and holds after it turns off."""
    hass.states.async_set("binary_sensor.demo_bedroom_presence", "off", {"device_class": "presence"})
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done()
    entity_id = er.async_get(hass).async_get_entity_id(
        "binary_sensor", "presence_planner", f"{config_entry.entry_id}_demo_bedroom_occupancy"
    )
    assert hass.states.get(entity_id).state == "off"
    hass.states.async_set("binary_sensor.demo_bedroom_presence", "on", {"device_class": "presence"})
    await hass.async_block_till_done()
    state = hass.states.get(entity_id)
    assert state.state == "on"
    assert state.attributes["sources"] == ["binary_sensor.demo_bedroom_presence"]
    assert state.attributes["last_valid_sensor"] == "binary_sensor.demo_bedroom_presence"
    hass.states.async_set("binary_sensor.demo_bedroom_presence", "off", {"device_class": "presence"})
    await hass.async_block_till_done()
    # held for hold_time (30 s)
    assert hass.states.get(entity_id).state == "on"
    # the fusion clock follows the frozen time, the loop timer needs the explicit offset
    freezer.tick(29)
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=29))
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).state == "on"
    freezer.tick(2)
    async_fire_time_changed(hass, dt_util.utcnow() + timedelta(seconds=31))
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).state == "off"


async def test_setup_without_plan(hass: HomeAssistant, config_entry: MockConfigEntry) -> None:
    """A fresh install has no plan and no entities, but loads."""
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done()
    assert config_entry.state is ConfigEntryState.LOADED
    assert er.async_entries_for_config_entry(er.async_get(hass), config_entry.entry_id) == []


@pytest.mark.skipif(not REAL_CORE, reason="needs the real core's spill detail")
async def test_echo_suppressed_end_to_end(
    hass: HomeAssistant, config_entry: MockConfigEntry, stored_demo: dict
) -> None:
    """The bath sensor sees the hall through the bath door: an echo while the hall is on, valid once the door closes."""
    hall, bath, door = (
        "binary_sensor.demo_hall_motion",
        "binary_sensor.demo_bath_presence",
        "binary_sensor.demo_bath_door",
    )
    hass.states.async_set(hall, "off", {"device_class": "motion"})
    hass.states.async_set(bath, "off", {"device_class": "presence"})
    hass.states.async_set(door, "on", {"device_class": "door"})
    assert await hass.config_entries.async_setup(config_entry.entry_id)
    await hass.async_block_till_done()
    entity_id = er.async_get(hass).async_get_entity_id(
        "binary_sensor", "presence_planner", f"{config_entry.entry_id}_demo_bath_occupancy"
    )
    hass.states.async_set(hall, "on", {"device_class": "motion"})
    await hass.async_block_till_done()
    assert hass.states.get(entity_id).state == "off"
    hass.states.async_set(bath, "on", {"device_class": "presence"})
    await hass.async_block_till_done()
    state = hass.states.get(entity_id)
    assert state.state == "off"
    assert state.attributes["suppressed_echoes"] == [bath]
    assert state.attributes["echo_of"] == {bath: [hall]}
    # closing the door removes the door share; the wall share alone is below the threshold
    hass.states.async_set(door, "off", {"device_class": "door"})
    await hass.async_block_till_done()
    state = hass.states.get(entity_id)
    assert state.state == "on"
    assert state.attributes["sources"] == [bath]
