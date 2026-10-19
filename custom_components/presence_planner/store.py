"""Persistent data of Presence Planner (.storage/presence_planner)."""

from __future__ import annotations

import copy
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION


def empty_data() -> dict[str, Any]:
    """Return the empty store layout from the contract."""
    return {"plan": None, "sensors": {}, "own_sensors": []}


class PresencePlannerStore:
    """Own plan, sensor extras (profile, mount, fov_v, ...) keyed by entity_id, and own sensors."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Create the store."""
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.data: dict[str, Any] = empty_data()

    async def async_load(self) -> None:
        """Load the stored data, keeping the layout complete."""
        stored = await self._store.async_load()
        data = empty_data()
        if isinstance(stored, dict):
            if isinstance(stored.get("plan"), dict):
                data["plan"] = stored["plan"]
            if isinstance(stored.get("sensors"), dict):
                data["sensors"] = stored["sensors"]
            if isinstance(stored.get("own_sensors"), list):
                data["own_sensors"] = stored["own_sensors"]
        self.data = data

    async def async_save(self) -> None:
        """Write the data now (saves are rare: only on explicit user actions)."""
        await self._store.async_save(copy.deepcopy(self.data))

    @property
    def plan(self) -> dict[str, Any] | None:
        """The own plan."""
        return self.data["plan"]

    @property
    def extras(self) -> dict[str, dict[str, Any]]:
        """Fields per entity that NeonPlan does not keep."""
        return self.data["sensors"]

    @property
    def own_sensors(self) -> list[dict[str, Any]]:
        """Full sensor records of the own plan."""
        return self.data["own_sensors"]

    async def async_set_plan(self, plan: dict[str, Any] | None) -> None:
        """Replace the own plan."""
        self.data["plan"] = copy.deepcopy(plan)
        await self.async_save()

    async def async_set_own_sensors(self, sensors: list[dict[str, Any]]) -> None:
        """Replace the own sensor list."""
        self.data["own_sensors"] = copy.deepcopy(sensors)
        await self.async_save()

    async def async_update_extras(self, extras: dict[str, dict[str, Any]]) -> None:
        """Merge extra fields per entity."""
        for entity_id, fields in extras.items():
            self.data["sensors"][entity_id] = {**self.data["sensors"].get(entity_id, {}), **copy.deepcopy(fields)}
        await self.async_save()
