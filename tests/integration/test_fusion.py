"""Cleaned occupancy logic with a fake clock."""

from __future__ import annotations

from custom_components.presence_planner.fusion import RoomFusion

KITCHEN = "binary_sensor.kitchen_presence"
KITCHEN_2 = "binary_sensor.kitchen_motion"
HALL = "binary_sensor.hall_motion"
DOOR = "binary_sensor.hall_door"


class Clock:
    """A clock the test moves by hand."""

    def __init__(self) -> None:
        """Start at a fixed time."""
        self.t = 1000.0

    def __call__(self) -> float:
        """Current time."""
        return self.t

    def tick(self, seconds: float) -> None:
        """Move forward."""
        self.t += seconds


def make(spill: dict | None = None, doors: dict | None = None, hold: float = 30, window: float = 5):
    """Kitchen fusion: the kitchen sensor sees into the hall (through the door d1 and a thin wall)."""
    clock = Clock()
    fusion = RoomFusion(hold_time=hold, echo_window=window, spill_threshold=0.05, clock=clock)
    detail = spill if spill is not None else {"hall": {"total": 0.2, "walls": 0.02, "doors": {"d1": 0.18}}}
    fusion.configure(
        own_sensors=[KITCHEN],
        spill={KITCHEN: detail},
        room_sensors={"hall": [HALL]},
        door_contacts=doors if doors is not None else {"d1": DOOR},
    )
    for entity in (KITCHEN, HALL):
        fusion.seed(entity, False)
    return fusion, clock


def test_own_presence() -> None:
    """An own sensor on with the neighbour off is valid."""
    fusion, _clock = make()
    result = fusion.update(KITCHEN, True)
    assert result.occupied
    assert result.sources == [KITCHEN]
    assert result.suppressed_echoes == []
    assert result.last_valid_sensor == KITCHEN


def test_echo_suppressed() -> None:
    """The kitchen sensor turning on while the hall sensor is already on is an echo."""
    fusion, clock = make()
    fusion.update(HALL, True)
    clock.tick(2)
    result = fusion.update(KITCHEN, True)
    assert not result.occupied
    assert result.suppressed_echoes == [KITCHEN]
    assert result.echo_of == {KITCHEN: [HALL]}
    assert result.last_valid_sensor is None


def test_echo_after_neighbour_flicker_within_window() -> None:
    """The hall turned on 2 s before the kitchen, flickered off and is on again: still an echo."""
    fusion, clock = make()
    fusion.update(HALL, True)
    clock.tick(1)
    fusion.update(HALL, False)
    clock.tick(1)
    fusion.update(KITCHEN, True)
    clock.tick(1)
    result = fusion.update(HALL, True)
    assert not result.occupied
    assert result.suppressed_echoes == [KITCHEN]
    # it looked valid for a second, but turned out to be an echo: no hold either
    assert result.hold_until is None


def test_no_echo_when_neighbour_turns_on_later() -> None:
    """t must have turned on before s."""
    fusion, clock = make()
    fusion.update(KITCHEN, True)
    clock.tick(1)
    result = fusion.update(HALL, True)
    assert result.occupied
    assert result.sources == [KITCHEN]


def test_echo_becomes_valid_when_neighbour_turns_off() -> None:
    """Once all t sensors are off, the candidate counts."""
    fusion, clock = make()
    fusion.update(HALL, True)
    clock.tick(1)
    assert not fusion.update(KITCHEN, True).occupied
    clock.tick(10)
    result = fusion.update(HALL, False)
    assert result.occupied
    assert result.sources == [KITCHEN]
    # and the hall turning on again later does not make it an echo again
    clock.tick(5)
    assert fusion.update(HALL, True).occupied


def test_closed_door_removes_echo() -> None:
    """With the door closed, only the wall share (below the threshold) remains: no echo possible."""
    fusion, clock = make()
    fusion.update(DOOR, False)
    fusion.update(HALL, True)
    clock.tick(1)
    result = fusion.update(KITCHEN, True)
    assert result.occupied
    assert result.sources == [KITCHEN]
    # opening the door makes the same on an echo candidate again
    result = fusion.update(DOOR, True)
    assert result.suppressed_echoes == [KITCHEN]


def test_door_without_contact_counts_as_open() -> None:
    """A door with no contact keeps its share."""
    fusion, clock = make(doors={"d1": None})
    fusion.update(HALL, True)
    clock.tick(1)
    assert fusion.update(KITCHEN, True).suppressed_echoes == [KITCHEN]


def test_unknown_contact_counts_as_open() -> None:
    """An unavailable contact is treated like no contact."""
    fusion, clock = make()
    fusion.update(DOOR, None)
    fusion.update(HALL, True)
    clock.tick(1)
    assert fusion.update(KITCHEN, True).suppressed_echoes == [KITCHEN]


def test_inverted_contact() -> None:
    """A contact reporting on = closed."""
    clock = Clock()
    fusion = RoomFusion(hold_time=0, echo_window=5, spill_threshold=0.05, clock=clock)
    fusion.configure(
        [KITCHEN],
        {KITCHEN: {"hall": {"total": 0.2, "walls": 0.0, "doors": {"d1": 0.2}}}},
        {"hall": [HALL]},
        {"d1": DOOR},
        inverted_contacts=[DOOR],
    )
    fusion.update(DOOR, True)  # closed
    fusion.update(HALL, True)
    clock.tick(1)
    assert fusion.update(KITCHEN, True).occupied


def test_spill_below_threshold_never_echoes() -> None:
    """A neighbour seen less than the threshold is no echo source."""
    fusion, clock = make(spill={"hall": {"total": 0.04, "walls": 0.04, "doors": {}}})
    fusion.update(HALL, True)
    clock.tick(1)
    assert fusion.update(KITCHEN, True).occupied


def test_hold_time() -> None:
    """After the last valid on ends the room stays occupied for hold_time."""
    fusion, clock = make(hold=30)
    fusion.update(KITCHEN, True)
    clock.tick(60)
    result = fusion.update(KITCHEN, False)
    assert result.occupied
    assert result.sources == []
    assert result.hold_until == clock.t + 30
    clock.tick(29)
    assert fusion.step().occupied
    clock.tick(1)
    result = fusion.step()
    assert not result.occupied
    assert result.hold_until is None
    assert result.last_valid_sensor == KITCHEN


def test_hold_restarts_with_new_valid_on() -> None:
    """A new valid on during the hold cancels it; the hold starts again at its end."""
    fusion, clock = make(hold=30)
    fusion.update(KITCHEN, True)
    clock.tick(5)
    fusion.update(KITCHEN, False)
    clock.tick(20)
    assert fusion.update(KITCHEN, True).hold_until is None
    clock.tick(5)
    result = fusion.update(KITCHEN, False)
    assert result.hold_until == clock.t + 30


def test_echo_does_not_start_hold() -> None:
    """An echo that ends never made the room occupied, so there is no hold."""
    fusion, clock = make(hold=30)
    fusion.update(HALL, True)
    clock.tick(1)
    fusion.update(KITCHEN, True)
    clock.tick(5)
    result = fusion.update(KITCHEN, False)
    assert not result.occupied
    assert result.hold_until is None


def test_second_own_sensor_keeps_room_occupied() -> None:
    """One echo and one valid own sensor: occupied, with both listed."""
    clock = Clock()
    fusion = RoomFusion(hold_time=0, echo_window=5, spill_threshold=0.05, clock=clock)
    fusion.configure(
        [KITCHEN, KITCHEN_2],
        {KITCHEN: {"hall": {"total": 0.3, "walls": 0.3, "doors": {}}}, KITCHEN_2: {}},
        {"hall": [HALL]},
        {},
    )
    fusion.update(HALL, True)
    clock.tick(1)
    fusion.update(KITCHEN, True)
    result = fusion.update(KITCHEN_2, True)
    assert result.occupied
    assert result.sources == [KITCHEN_2]
    assert result.suppressed_echoes == [KITCHEN]
    assert fusion.tracked_entities == {KITCHEN, KITCHEN_2, HALL}


def test_late_neighbour_on_does_not_reclassify() -> None:
    """A neighbour turning on again long after the own on is no flicker echo."""
    fusion, clock = make(window=5)
    fusion.update(HALL, True)
    clock.tick(1)
    fusion.update(HALL, False)
    clock.tick(1)
    assert fusion.update(KITCHEN, True).occupied
    clock.tick(60)
    result = fusion.update(HALL, True)
    assert result.occupied
    assert result.sources == [KITCHEN]
