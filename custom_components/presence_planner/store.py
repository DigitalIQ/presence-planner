"""Persistent data of Presence Planner (.storage/presence_planner)."""

from __future__ import annotations

import copy
import logging
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import issue_registry as ir
from homeassistant.helpers.storage import Store

from .const import DOMAIN, ISSUE_STORED_DATA_REJECTED, RESOLVED_ONLY_FIELDS, STORAGE_KEY, STORAGE_VERSION
from .validation import PlanValidationError, sensors_on_floors, validate_plan, validate_sensors

_LOGGER = logging.getLogger(__name__)


def empty_data() -> dict[str, Any]:
    """Return the empty store layout from the contract."""
    return {"plan": None, "sensors": {}, "own_sensors": []}


def strip_resolved(sensors: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Copies of the sensors without the fields the model derives from the profile."""
    return [{k: copy.deepcopy(v) for k, v in s.items() if k not in RESOLVED_ONLY_FIELDS} for s in sensors]


async def async_has_sensor_extras(hass: HomeAssistant) -> bool:
    """Whether the store holds sensor extras, which 0.1.x only saved while NeonPlan was the live plan source."""
    stored = await Store(hass, STORAGE_VERSION, STORAGE_KEY).async_load()
    return isinstance(stored, dict) and bool(stored.get("sensors"))


class PresencePlannerStore:
    """Own plan, sensor extras (profile, mount, fov_v, ...) keyed by entity_id, and own sensors."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Create the store."""
        self._hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, STORAGE_KEY)
        self.data: dict[str, Any] = empty_data()
        # stored values that failed validation, by key: written back unchanged until a write replaces them
        self._rejected: dict[str, Any] = {}

    async def async_load(self) -> None:
        """Load the stored data, keeping the layout complete."""
        stored = await self._store.async_load()
        data = empty_data()
        rejected: dict[str, Any] = {}
        if isinstance(stored, dict):
            if isinstance(stored.get("plan"), dict):
                try:
                    data["plan"] = validate_plan(stored["plan"])
                except PlanValidationError as err:
                    _LOGGER.error("Stored Presence Planner plan rejected: %s; saved source retained", err)
                    rejected["plan"] = stored["plan"]
            if isinstance(stored.get("sensors"), dict):
                data["sensors"] = stored["sensors"]
            if isinstance(stored.get("own_sensors"), list):
                try:
                    sensors = stored["own_sensors"]
                    if data["plan"] is not None:
                        # sensors of a deleted floor (stored before they were refused) are of no use
                        kept = sensors_on_floors(sensors, data["plan"])
                        if len(kept) != len(sensors):
                            _LOGGER.warning("Ignoring %d stored sensors of unknown floors", len(sensors) - len(kept))
                        sensors = kept
                    validate_sensors(sensors, data["plan"])
                    data["own_sensors"] = sensors
                except PlanValidationError as err:
                    _LOGGER.error("Stored Presence Planner sensors rejected: %s; saved source retained", err)
                    rejected["own_sensors"] = stored["own_sensors"]
        self.data = data
        self._rejected = rejected
        self._update_issue()

    def _update_issue(self) -> None:
        """Tell the user while rejected data waits in the store."""
        if self._rejected:
            ir.async_create_issue(
                self._hass, DOMAIN, ISSUE_STORED_DATA_REJECTED, is_fixable=False, severity=ir.IssueSeverity.ERROR,
                translation_key=ISSUE_STORED_DATA_REJECTED,
            )
        else:
            ir.async_delete_issue(self._hass, DOMAIN, ISSUE_STORED_DATA_REJECTED)

    async def async_save(self) -> None:
        """Write the data now (saves are rare: only on explicit user actions)."""
        await self._store.async_save({**copy.deepcopy(self.data), **copy.deepcopy(self._rejected)})

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
        """Replace the own plan; own sensors of floors that are gone with it are dropped."""
        sensors = self.own_sensors
        if plan is not None:
            validate_plan(plan)
            sensors = sensors_on_floors(sensors, plan)
            if len(sensors) != len(self.own_sensors):
                _LOGGER.info("Dropped %d own sensors of removed floors", len(self.own_sensors) - len(sensors))
            validate_sensors(sensors, plan)
        await self._commit({**self.data, "plan": copy.deepcopy(plan), "own_sensors": copy.deepcopy(sensors)}, "plan")

    async def _commit(self, data: dict[str, Any], *replaced: str) -> None:
        """Publish an in-memory snapshot only after the durable save succeeds.

        Rejected stored values stay in the file as they were, except the ones this write replaces on purpose.
        """
        keep = {k: v for k, v in self._rejected.items() if k not in replaced}
        await self._store.async_save({**copy.deepcopy(data), **copy.deepcopy(keep)})
        self.data = data
        self._rejected = keep
        self._update_issue()

    async def async_set_snapshot(self, plan: dict[str, Any], sensors: list[dict[str, Any]]) -> None:
        """Replace the complete own plan, including an explicitly empty sensor list."""
        validate_plan(plan)
        validate_sensors(sensors, plan)
        await self._commit(
            {**self.data, "plan": copy.deepcopy(plan), "own_sensors": strip_resolved(sensors)}, "plan", "own_sensors"
        )

    async def async_set_own_sensors(self, sensors: list[dict[str, Any]]) -> None:
        """Replace the own sensor list."""
        validate_sensors(sensors, self.plan)
        await self._commit({**self.data, "own_sensors": strip_resolved(sensors)}, "own_sensors")
