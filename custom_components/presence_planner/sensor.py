"""Coverage and misfire risk per room."""

from __future__ import annotations

from typing import Any

from homeassistant.components.sensor import SensorEntity
from homeassistant.const import PERCENTAGE, EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import PresencePlannerConfigEntry
from .const import HEIGHT_NAMES
from .entity import PresencePlannerRoomEntity, rooms_of

PARALLEL_UPDATES = 0


def _pct(value: Any) -> float | None:
    try:
        return round(float(value) * 100, 1)
    except (TypeError, ValueError):
        return None


async def async_setup_entry(
    hass: HomeAssistant, entry: PresencePlannerConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    """Two sensors per room."""
    coordinator = entry.runtime_data
    entities: list[SensorEntity] = []
    for floor, room in rooms_of(coordinator):
        entities.append(CoverageSensor(coordinator, floor, room))
        entities.append(MisfireRiskSensor(coordinator, floor, room))
    async_add_entities(entities)


class _RoomPercentSensor(PresencePlannerRoomEntity, SensorEntity):
    _attr_native_unit_of_measurement = PERCENTAGE
    _attr_entity_category = EntityCategory.DIAGNOSTIC
    _attr_suggested_display_precision = 0


class CoverageSensor(_RoomPercentSensor):
    """Mean coverage over the three heights, per height in the attributes."""

    key = "coverage"

    def _update_from_results(self) -> None:
        result = self.coordinator.room_result(self.floor_id, self.room_id)
        if result is None:
            self._attr_native_value = None
            self._attr_extra_state_attributes = {}
            return
        self._attr_native_value = _pct(result.get("coverage_mean"))
        attrs: dict[str, Any] = {}
        for height, name in HEIGHT_NAMES.items():
            attrs[f"coverage_{name}"] = _pct((result.get("coverage") or {}).get(height))
            attrs[f"seen_{name}"] = _pct((result.get("seen") or {}).get(height))
        attrs["own_sensors"] = list(result.get("own_sensors") or [])
        self._attr_extra_state_attributes = attrs


class MisfireRiskSensor(_RoomPercentSensor):
    """Share of the room seen by sensors of other rooms (doors open, 1.3 m)."""

    key = "misfire_risk"

    def _update_from_results(self) -> None:
        result = self.coordinator.room_result(self.floor_id, self.room_id)
        if result is None:
            self._attr_native_value = None
            self._attr_extra_state_attributes = {}
            return
        self._attr_native_value = _pct(result.get("misfire_risk"))
        self._attr_extra_state_attributes = {
            "from": {entity_id: _pct(share) for entity_id, share in (result.get("from") or {}).items()},
            "height": 1.3,
        }
