"""Persistent data of Presence Planner (.storage/presence_planner)."""

from __future__ import annotations

import copy
import logging
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers.storage import Store

from .const import STORAGE_KEY, STORAGE_VERSION
from .validation import PlanValidationError, validate_plan, validate_sensors

_LOGGER = logging.getLogger(__name__)


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
                try:
                    data["plan"] = validate_plan(stored["plan"])
                except PlanValidationError as err:
                    _LOGGER.error("Stored Presence Planner plan rejected: %s; saved source retained", err)
            if isinstance(stored.get("sensors"), dict):
                data["sensors"] = stored["sensors"]
            if isinstance(stored.get("own_sensors"), list):
                try:
                    validate_sensors(stored["own_sensors"], data["plan"])
                    data["own_sensors"] = stored["own_sensors"]
                except PlanValidationError as err:
                    _LOGGER.error("Stored Presence Planner sensors rejected: %s; saved source retained", err)
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
        """Sensor fields per entity saved by 0.1.x while NeonPlan was the plan source.

        Read only: an imported NeonPlan file gets them back for its placements.
        """
        return self.data["sensors"]

    @property
    def own_sensors(self) -> list[dict[str, Any]]:
        """Full sensor records of the own plan."""
        return self.data["own_sensors"]

    async def async_set_plan(self, plan: dict[str, Any] | None) -> None:
        """Replace the own plan."""
        if plan is not None:
            validate_plan(plan)
            validate_sensors(self.own_sensors, plan)
        await self._commit({**self.data, "plan": copy.deepcopy(plan)})

    async def _commit(self, data: dict[str, Any]) -> None:
        """Publish an in-memory snapshot only after the durable save succeeds."""
        await self._store.async_save(copy.deepcopy(data))
        self.data = data

    async def async_set_snapshot(self, plan: dict[str, Any], sensors: list[dict[str, Any]]) -> None:
        """Replace the complete own plan, including an explicitly empty sensor list."""
        validate_plan(plan)
        validate_sensors(sensors, plan)
        await self._commit({**self.data, "plan": copy.deepcopy(plan), "own_sensors": copy.deepcopy(sensors)})

    async def async_set_own_sensors(self, sensors: list[dict[str, Any]]) -> None:
        """Replace the own sensor list."""
        validate_sensors(sensors, self.plan)
        await self._commit({**self.data, "own_sensors": copy.deepcopy(sensors)})
