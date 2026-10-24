"""Cleaned occupancy per room."""

from __future__ import annotations

from collections.abc import Callable
from typing import Any

from homeassistant.components.binary_sensor import BinarySensorDeviceClass, BinarySensorEntity
from homeassistant.const import STATE_ON, STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import Event, EventStateChangedData, HomeAssistant, State, callback
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.event import async_call_later, async_track_state_change_event
from homeassistant.util import dt as dt_util

from . import PresencePlannerConfigEntry
from .coordinator import PresencePlannerCoordinator
from .entity import PresencePlannerRoomEntity, rooms_of
from .fusion import RoomFusion

PARALLEL_UPDATES = 0


async def async_setup_entry(
    hass: HomeAssistant, entry: PresencePlannerConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    """One cleaned occupancy sensor per room."""
    coordinator = entry.runtime_data
    async_add_entities(RoomOccupancySensor(coordinator, floor, room) for floor, room in rooms_of(coordinator))


def _is_on(state: State | None) -> bool | None:
    if state is None or state.state in (STATE_UNKNOWN, STATE_UNAVAILABLE):
        return None
    return state.state == STATE_ON


class RoomOccupancySensor(PresencePlannerRoomEntity, BinarySensorEntity):
    """Occupied while an own sensor is on that is not a known echo of a neighbour room."""

    key = "occupancy"
    _attr_device_class = BinarySensorDeviceClass.OCCUPANCY

    def __init__(self, coordinator: PresencePlannerCoordinator, floor: dict[str, Any], room: dict[str, Any]) -> None:
        """Create the fusion logic with the entry's options."""
        super().__init__(coordinator, floor, room)
        self._fusion = RoomFusion(
            hold_time=coordinator.hold_time,
            echo_window=coordinator.echo_window,
            spill_threshold=coordinator.spill_threshold,
            clock=lambda: dt_util.utcnow().timestamp(),
        )
        self._tracked: frozenset[str] = frozenset()
        self._unsub_track: Callable[[], None] | None = None
        self._unsub_hold: Callable[[], None] | None = None
        self._attr_is_on = False

    async def async_will_remove_from_hass(self) -> None:
        """Stop the timers and state listeners."""
        self._cancel_hold()
        if self._unsub_track:
            self._unsub_track()
            self._unsub_track = None

    def _update_from_results(self) -> None:
        self._fusion.configure(**self.coordinator.fusion_config(self.floor_id, self.room_id))
        tracked = frozenset(self._fusion.tracked_entities)
        if tracked != self._tracked and self.hass is not None:
            if self._unsub_track:
                self._unsub_track()
                self._unsub_track = None
            for entity_id in tracked - self._tracked:
                state = self.hass.states.get(entity_id)
                since = state.last_changed.timestamp() if state is not None else None
                # after a restart the timestamps say nothing about who turned on first
                self._fusion.seed(entity_id, _is_on(state), since, settled=True)
            if tracked:
                self._unsub_track = async_track_state_change_event(self.hass, list(tracked), self._state_changed)
            self._tracked = tracked
        self._apply(self._fusion.step())
        self._update_available()

    def _update_available(self) -> None:
        """Unavailable without own sensors, or while none of them reports a state."""
        if self.hass is None:
            return
        self._attr_available = any(_is_on(self.hass.states.get(e)) is not None for e in self._fusion.own_sensors)

    @callback
    def _state_changed(self, event: Event[EventStateChangedData]) -> None:
        entity_id, old, new = event.data["entity_id"], event.data["old_state"], event.data["new_state"]
        if _is_on(new) and _is_on(old) is None:
            # back from unavailable or unknown (a reconnect), or its first state: already on, but not a fresh
            # on that could be compared with the neighbours' times
            self._fusion.seed(entity_id, True, new.last_changed.timestamp(), settled=True)
            self._apply(self._fusion.step())
        else:
            self._apply(self._fusion.update(entity_id, _is_on(new)))
        self._update_available()
        self.async_write_ha_state()

    def _apply(self, result: Any) -> None:
        self._attr_is_on = result.occupied
        self._attr_extra_state_attributes = {
            "sources": result.sources,
            "suppressed_echoes": result.suppressed_echoes,
            "echo_of": result.echo_of,
            "last_valid_sensor": result.last_valid_sensor,
        }
        self._cancel_hold()
        if result.hold_until is not None and self.hass is not None:
            delay = max(0.0, result.hold_until - self._fusion.now())
            self._unsub_hold = async_call_later(self.hass, delay, self._hold_ended)

    @callback
    def _hold_ended(self, _now: Any) -> None:
        self._unsub_hold = None
        self._apply(self._fusion.step())
        self.async_write_ha_state()

    def _cancel_hold(self) -> None:
        if self._unsub_hold:
            self._unsub_hold()
            self._unsub_hold = None
