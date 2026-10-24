"""Presence Planner: plan presence and motion sensors on a floor plan."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.typing import ConfigType

from .const import DOMAIN, ENTITY_KEYS, ISSUE_IMPORT_NEONPLAN
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


async def async_migrate_entry(hass: HomeAssistant, entry: PresencePlannerConfigEntry) -> bool:
    """1.1 -> 1.2: the NeonPlan plan source is gone; such entries are asked to import a NeonPlan file once."""
    if entry.version > 1:
        return False
    if entry.minor_version < 2:
        options = dict(entry.options)
        source = options.pop("plan_source", "auto")
        data = {**entry.data, "neonplan_import": True} if source != "own" else dict(entry.data)
        hass.config_entries.async_update_entry(entry, data=data, options=options, minor_version=2)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: PresencePlannerConfigEntry) -> bool:
    """Load the store, compute and add the panel and entities."""
    store = PresencePlannerStore(hass)
    await store.async_load()
    coordinator = PresencePlannerCoordinator(hass, entry, store)
    await coordinator.async_setup()
    entry.runtime_data = coordinator
    entry.async_on_unload(coordinator.async_shutdown)
    await async_register_panel(hass)
    _update_import_issue(hass, entry, coordinator)
    _remove_stale_entities(hass, entry, coordinator)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


def _update_import_issue(
    hass: HomeAssistant, entry: PresencePlannerConfigEntry, coordinator: PresencePlannerCoordinator
) -> None:
    """Ask entries that used NeonPlan as live source (0.1.x) to import a NeonPlan file until they have a plan."""
    if entry.data.get("neonplan_import") and coordinator.plan is None:
        ir.async_create_issue(
            hass, DOMAIN, ISSUE_IMPORT_NEONPLAN, is_fixable=False, severity=ir.IssueSeverity.WARNING,
            translation_key=ISSUE_IMPORT_NEONPLAN,
        )
    else:
        ir.async_delete_issue(hass, DOMAIN, ISSUE_IMPORT_NEONPLAN)


def _remove_stale_entities(
    hass: HomeAssistant, entry: PresencePlannerConfigEntry, coordinator: PresencePlannerCoordinator
) -> None:
    """Drop registry entries of rooms that are no longer in the plan (deleted rooms, new room ids after an import).

    Without this they stay behind as "unavailable" entities and block their entity ids. Without any saved plan
    (an entry that used NeonPlan as live source before 0.2) the entities stay until a plan is imported.
    """
    if coordinator.plan is None:
        return
    wanted = {
        f"{entry.entry_id}_{floor_id}_{room_id}_{key}"
        for floor_id, _floor_name, room_id, _room_name in coordinator.room_keys
        for key in ENTITY_KEYS
    }
    registry = er.async_get(hass)
    for reg_entry in er.async_entries_for_config_entry(registry, entry.entry_id):
        if reg_entry.unique_id not in wanted:
            registry.async_remove(reg_entry.entity_id)


async def async_unload_entry(hass: HomeAssistant, entry: PresencePlannerConfigEntry) -> bool:
    """Remove the entities; the panel only goes when the entry is disabled.

    A reload (rooms added or renamed, options changed) keeps the panel: removing it would throw the user out of
    the page they just saved from.
    """
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded and entry.disabled_by is not None:
        async_remove_panel(hass)
    return unloaded


async def async_remove_entry(hass: HomeAssistant, entry: PresencePlannerConfigEntry) -> None:
    """The entry is deleted: remove the panel."""
    async_remove_panel(hass)
