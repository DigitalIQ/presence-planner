"""Shared base of the per-room entities."""

from __future__ import annotations

from typing import Any

from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.entity import Entity

from .const import DOMAIN, TITLE
from .coordinator import PresencePlannerCoordinator


def rooms_of(coordinator: PresencePlannerCoordinator) -> list[tuple[dict[str, Any], dict[str, Any]]]:
    """(floor, room) for every room of the current plan."""
    return [
        (floor, room) for floor in (coordinator.plan or {}).get("floors") or [] for room in floor.get("rooms") or []
    ]


class PresencePlannerRoomEntity(Entity):
    """An entity of one room, on the device of its floor."""

    _attr_has_entity_name = True
    _attr_should_poll = False
    key: str

    def __init__(self, coordinator: PresencePlannerCoordinator, floor: dict[str, Any], room: dict[str, Any]) -> None:
        """Name the entity after the room and group it under the floor's device."""
        self.coordinator = coordinator
        self.floor_id = floor["id"]
        self.room_id = room["id"]
        entry_id = coordinator.entry.entry_id
        self._attr_unique_id = f"{entry_id}_{self.floor_id}_{self.room_id}_{self.key}"
        self._attr_translation_key = self.key
        self._attr_translation_placeholders = {"room": str(room.get("name") or room["id"])}
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, f"{entry_id}_{self.floor_id}")},
            name=str(floor.get("name") or self.floor_id),
            manufacturer=TITLE,
            model="Floor",
            entry_type=DeviceEntryType.SERVICE,
        )

    async def async_added_to_hass(self) -> None:
        """Follow the recomputed results."""
        self.async_on_remove(self.coordinator.async_add_listener(self._handle_results))
        self._handle_results()

    def _handle_results(self) -> None:
        self._update_from_results()
        if self.hass is not None:
            self.async_write_ha_state()

    def _update_from_results(self) -> None:
        """Read the room's values from the coordinator."""
        raise NotImplementedError
