"""Cleaned room occupancy: drops known cross-room echoes (pure logic, no Home Assistant imports).

Rules (ARCHITECTURE.md, "Cleaned occupancy"), for a room R:

- Own sensors of R are the active plan sensors located in R.
- An `on` of own sensor s is an echo candidate for neighbour room N (spill_detail(s)[N].total >= threshold) while
  a sensor t located in N is on, t turned on before s, and s turned on within `echo_window` after t. A t that
  has been on for longer does not make s an echo (a second person, not a reflection; otherwise someone sitting
  in one room would block every room its sensor overlaps). Doors: a closed door with a contact removes its share of the spill; if the remaining share is
  below the threshold, s cannot echo into N. Doors without a contact (or with an unknown state) count as open.
- R is occupied if at least one own sensor is on and not an echo candidate. An echo candidate becomes valid as
  soon as all its t sensors are off.
- After the last valid on ends, R stays occupied for `hold_time`.

Reading of the rules where the contract leaves room:
- "within echo_window after t": s turned on at most `echo_window` after an on of t while t was briefly off, and
  t is on again within that window (a flickering motion sensor) also counts.
- An echo candidate stays a candidate while t stays on, even after the window has passed.
- A candidate that became valid (all t off) stays valid until s turns off.
- A valid on that turns into an echo candidate while s is still on (t back within the window, a door opened)
  does not start the hold: nothing was really there.
- A sensor whose on was seeded as settled (HA start, back from unavailable) has an unknown real start: it is
  never an echo and never the cause of one. Its timestamp is only the moment we learned about it.
"""

from __future__ import annotations

import time
from collections import deque
from collections.abc import Callable, Iterable, Mapping
from dataclasses import dataclass, field
from typing import Any

# on-transitions kept per sensor, for the echo window when a neighbour sensor flickers
_HISTORY = 8


@dataclass
class FusionResult:
    """The cleaned state of one room."""

    occupied: bool
    sources: list[str] = field(default_factory=list)
    suppressed_echoes: list[str] = field(default_factory=list)
    echo_of: dict[str, list[str]] = field(default_factory=dict)
    last_valid_sensor: str | None = None
    hold_until: float | None = None


class RoomFusion:
    """Cleaned occupancy of one room, driven by state updates and an injectable clock."""

    def __init__(
        self,
        *,
        hold_time: float = 30.0,
        echo_window: float = 5.0,
        spill_threshold: float = 0.05,
        clock: Callable[[], float] | None = None,
    ) -> None:
        """Create the logic with its options; call configure() before use."""
        self.hold_time = float(hold_time)
        self.echo_window = float(echo_window)
        self.spill_threshold = float(spill_threshold)
        # looked up at call time, so a patched time.time (tests) is seen
        self._clock = clock or (lambda: time.time())
        self._own: list[str] = []
        self._spill: dict[str, dict[str, dict[str, Any]]] = {}
        self._room_sensors: dict[str, list[str]] = {}
        self._door_contacts: dict[str, str] = {}
        self._inverted: set[str] = set()
        # sensor -> time of the current on (None = off)
        self._on_since: dict[str, float | None] = {}
        self._history: dict[str, deque[float]] = {}
        # sensors whose current on has an unknown real start: no echo relations in either direction
        self._settled: set[str] = set()
        # contact entity -> raw state (True = on, False = off, None = unknown)
        self._contacts: dict[str, bool | None] = {}
        self._sources: list[str] = []
        # own sensors that were echo candidates during their current on, and those confirmed valid since
        self._was_echo: set[str] = set()
        self._confirmed: set[str] = set()
        self._hold_until: float | None = None
        self._last_valid: str | None = None
        self._result = FusionResult(occupied=False)

    # configuration

    def configure(
        self,
        own_sensors: Iterable[str],
        spill: Mapping[str, Mapping[str, Mapping[str, Any]]],
        room_sensors: Mapping[str, Iterable[str]],
        door_contacts: Mapping[str, str | None] | None = None,
        inverted_contacts: Iterable[str] = (),
    ) -> None:
        """Set the room's own sensors and their echo relations; known sensor states are kept.

        spill: {own_sensor: {neighbour_room: {"total": share, "walls": share, "doors": {door_id: share}}}}
        room_sensors: {room_id: [sensors located in that room]}
        door_contacts: {door_id: contact entity (on = open)}; inverted_contacts report on = closed.
        """
        self._own = list(own_sensors)
        self._spill = {s: {n: dict(d) for n, d in (spill.get(s) or {}).items()} for s in self._own}
        self._room_sensors = {room: list(sensors) for room, sensors in room_sensors.items()}
        self._door_contacts = {d: c for d, c in (door_contacts or {}).items() if c}
        self._inverted = set(inverted_contacts)
        self.step()

    @property
    def own_sensors(self) -> list[str]:
        """The own sensors of the room."""
        return list(self._own)

    @property
    def tracked_entities(self) -> set[str]:
        """All entities whose states matter: own sensors, neighbour sensors that can cause echoes, contacts."""
        entities = set(self._own)
        for sensor in self._own:
            for room in self._spill.get(sensor, {}):
                entities.update(self._room_sensors.get(room, []))
        entities.update(self._door_contacts.values())
        return entities

    # inputs

    def now(self) -> float:
        """Current time of the injected clock."""
        return self._clock()

    def seed(self, entity_id: str, is_on: bool | None, since: float | None = None, *, settled: bool = False) -> None:
        """Set a known state without counting it as a fresh transition (start-up, reconfiguration).

        settled: the real start of an on is unknown (HA just started, the sensor came back from unavailable), so
        `since` says nothing about the order of events. Such a sensor takes no part in echo relations.
        """
        if entity_id in self._door_contacts.values():
            self._contacts[entity_id] = is_on
        elif is_on and settled:
            self._on_since[entity_id] = self.now() if since is None else since
            self._settled.add(entity_id)
        elif is_on:
            when = self.now() if since is None else since
            self._on_since[entity_id] = when
            self._settled.discard(entity_id)
            self._history.setdefault(entity_id, deque(maxlen=_HISTORY)).append(when)
        else:
            self._turned_off(entity_id)
        self.step()

    def update(self, entity_id: str, is_on: bool | None, at: float | None = None) -> FusionResult:
        """A sensor or door contact changed state (None = unknown or unavailable)."""
        when = self.now() if at is None else at
        if entity_id in self._door_contacts.values():
            self._contacts[entity_id] = is_on
        elif is_on:
            if self._on_since.get(entity_id) is None:
                self._on_since[entity_id] = when
                self._history.setdefault(entity_id, deque(maxlen=_HISTORY)).append(when)
        else:
            self._turned_off(entity_id)
        return self.step(when)

    def _turned_off(self, entity_id: str) -> None:
        self._on_since[entity_id] = None
        self._settled.discard(entity_id)
        self._was_echo.discard(entity_id)
        self._confirmed.discard(entity_id)

    # evaluation

    def _door_open(self, door_id: str) -> bool:
        contact = self._door_contacts.get(door_id)
        if contact is None:
            return True
        state = self._contacts.get(contact)
        if state is None:
            return True
        return (not state) if contact in self._inverted else state

    def _share(self, detail: Mapping[str, Any]) -> float:
        """Spill share into a neighbour that remains with the current door states."""
        share = float(detail.get("walls") or 0)
        for door_id, value in (detail.get("doors") or {}).items():
            if self._door_open(door_id):
                share += float(value or 0)
        for path in detail.get("door_paths") or []:
            if all(self._door_open(door_id) for door_id in path["doors"]):
                share += float(path["share"])
        return share

    def _causes(self, sensor: str) -> list[str]:
        """Neighbour sensors that make the current on of sensor an echo (empty = valid)."""
        s_on = self._on_since.get(sensor)
        if s_on is None or sensor in self._settled:
            return []
        causes = []
        for room, detail in self._spill.get(sensor, {}).items():
            if float(detail.get("total") or 0) < self.spill_threshold:
                continue
            if self._share(detail) < self.spill_threshold:
                continue
            for other in self._room_sensors.get(room, []):
                if other == sensor or other in causes or other in self._settled:
                    continue
                t_on = self._on_since.get(other)
                if t_on is None:
                    continue
                # s turned on within the echo window after t's current on, or after an earlier on of t while
                # t (a flickering motion sensor) is on again within that window. A t that has been on for
                # longer does not make s an echo: someone sitting in the living room must not block the hall.
                direct = t_on < s_on <= t_on + self.echo_window
                flicker = t_on <= s_on + self.echo_window and any(
                    t < s_on <= t + self.echo_window for t in self._history.get(other, ())
                )
                if direct or flicker:
                    causes.append(other)
        return causes

    def step(self, now: float | None = None) -> FusionResult:
        """Recompute the result at a time (default: the clock)."""
        now = self.now() if now is None else now
        sources: list[str] = []
        suppressed: list[str] = []
        echo_of: dict[str, list[str]] = {}
        for sensor in self._own:
            if self._on_since.get(sensor) is None:
                continue
            causes = [] if sensor in self._confirmed else self._causes(sensor)
            if causes:
                suppressed.append(sensor)
                echo_of[sensor] = causes
                self._was_echo.add(sensor)
            else:
                if sensor in self._was_echo:
                    # an echo candidate whose t sensors are all off is valid for the rest of its on
                    self._confirmed.add(sensor)
                sources.append(sensor)
        if sources:
            self._hold_until = None
            self._last_valid = max(sources, key=lambda s: self._on_since[s] or 0)
        elif self._sources:
            # the last valid on just ended: hold from now. If the valid sensors are still on and only turned out
            # to be echoes (a neighbour turned on again within the echo window, a door opened), nothing was
            # really there, so there is no hold.
            if any(self._on_since.get(s) is None for s in self._sources):
                self._hold_until = now + self.hold_time
        self._sources = sources
        if self._hold_until is not None and now >= self._hold_until:
            self._hold_until = None
        self._result = FusionResult(
            occupied=bool(sources) or self._hold_until is not None,
            sources=sources,
            suppressed_echoes=suppressed,
            echo_of=echo_of,
            last_valid_sensor=self._last_valid,
            hold_until=self._hold_until,
        )
        return self._result

    @property
    def result(self) -> FusionResult:
        """The last computed result."""
        return self._result
