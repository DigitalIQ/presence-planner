"""Presence Planner: plan presence and motion sensors on a floor plan."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from .const import DOMAIN
from .coordinator import PresencePlannerCoordinator
from .panel import async_register_panel, async_remove_panel
from .store import PresencePlannerStore
from .websocket import async_register_commands

PLATFORMS: list[Platform] = [Platform.SENSOR, Platform.BINARY_SENSOR]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

type PresencePlannerConfigEntry = ConfigEntry[PresencePlannerCoordinator]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register the WebSocket commands once."""
    async_register_commands(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: PresencePlannerConfigEntry) -> bool:
    """Load the store, pick the plan source, compute and add the panel and entities."""
    store = PresencePlannerStore(hass)
    await store.async_load()
    coordinator = PresencePlannerCoordinator(hass, entry, store)
    await coordinator.async_setup()
    entry.runtime_data = coordinator
    entry.async_on_unload(coordinator.async_shutdown)
    await async_register_panel(hass)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: PresencePlannerConfigEntry) -> bool:
    """Remove entities and the panel."""
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        async_remove_panel(hass)
    return unloaded
