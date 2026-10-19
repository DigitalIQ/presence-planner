"""Hand-checkable detection cases.  Angles and distances are chosen so the expected value is plain arithmetic."""

import math

import pytest
from core_helpers import expected_quality, make_plan, rect, sensor

from custom_components.presence_planner.core import build_model, detect


def open_room(**kw):
    return build_model(make_plan([rect("r", 0, 0, 10, 10, [0.3] * 4)], **kw), "f")


def polar(s, yaw_deg, d, y=None):
    """Point at plan angle phi + yaw and horizontal distance d from the sensor."""
    a = math.radians(s["phi"] + yaw_deg)
    return (s["x"] + d * math.cos(a), s["height"] if y is None else y, s["z"] + d * math.sin(a))


def test_straight_ahead_full_quality_then_ramp_then_cut_off():
    m = open_room()
    s = sensor(2, 5)
    assert detect(m, s, (5, 1.9, 5), {}) == pytest.approx(1.0)
    assert detect(m, s, (7, 1.9, 5), {}) == pytest.approx(expected_quality(5, 6))
    assert detect(m, s, (7, 1.9, 5), {}) == pytest.approx(0.7587, abs=1e-3)
    assert detect(m, s, (8, 1.9, 5), {}) == pytest.approx(0.6)
    assert detect(m, s, (8.05, 1.9, 5), {}) == 0.0


def test_behind_the_sensor_and_on_top_of_it():
    m = open_room()
    s = sensor(5, 5)
    assert detect(m, s, (3, 1.9, 5), {}) == 0.0
    assert detect(m, s, (5, 1.9, 5), {}) == 0.0


def test_outside_yaw_and_edge_taper():
    m = open_room()
    s = sensor(2, 5)
    assert detect(m, s, polar(s, 70, 2), {}) == 0.0
    assert detect(m, s, polar(s, -61, 2), {}) == 0.0
    assert detect(m, s, polar(s, 44, 5), {}) == pytest.approx(expected_quality(5, 6))
    # yaw 59 deg: taper factor 1 - 0.4 * 14 / 15 = 0.6267 -> effective reach 3.76 m
    assert detect(m, s, polar(s, 59, 3.5), {}) == pytest.approx(expected_quality(3.5, 6))
    assert detect(m, s, polar(s, 59, 3.9), {}) == 0.0
    assert detect(m, s, polar(s, -59, 3.9), {}) == 0.0
    # the taper does not touch the centre
    assert detect(m, s, polar(s, 0, 3.9), {}) > 0.9


def test_outside_pitch_and_pitch_taper():
    m = open_room()
    s = sensor(2, 5, height=2.5)
    # 2 m ahead, 1.9 m down: pitch -43.5 deg (inside +-45), 2.1 m down: -46.4 deg (outside)
    assert detect(m, s, (4, 0.6, 5), {}) > 0
    assert detect(m, s, (4, 0.4, 5), {}) == 0.0
    assert detect(m, s, (4, 4.8, 5), {}) == 0.0  # 2.3 m up: +49 deg
    # short reach shows the taper: pitch 40 deg -> factor 0.8; pitch 36 deg -> factor 0.96
    s3 = sensor(2, 5, height=2.5, reach=3)
    assert detect(m, s3, (4, 2.5 - 2 * math.tan(math.radians(40)), 5), {}) == 0.0
    assert detect(m, s3, (4, 2.5 - 2 * math.tan(math.radians(36)), 5), {}) > 0


def test_tilt_moves_the_vertical_window():
    m = open_room()
    s = sensor(2, 5, height=2.5, tilt=30, fov_v=40)
    # looking 30 deg down: a point at -30 deg is the centre, -45 deg is 15 deg off (inside +-20)
    assert detect(m, s, (5, 2.5 - 3 * math.tan(math.radians(30)), 5), {}) == pytest.approx(1.0)
    assert detect(m, s, (4, 2.5 - 2 * math.tan(math.radians(45)), 5), {}) > 0
    # -55 deg is 25 deg off, -5 deg is 25 deg off the other way
    assert detect(m, s, (2 + 1.2, 2.5 - 1.2 * math.tan(math.radians(55)), 5), {}) == 0.0
    assert detect(m, s, (5, 2.5 - 3 * math.tan(math.radians(5)), 5), {}) == 0.0
    # without tilt the level point is inside and the steep one is not
    s0 = sensor(2, 5, height=2.5, tilt=0, fov_v=40)
    assert detect(m, s0, (5, 2.5 - 3 * math.tan(math.radians(5)), 5), {}) > 0
    assert detect(m, s0, (4, 2.5 - 2 * math.tan(math.radians(45)), 5), {}) == 0.0


def test_point_directly_below_a_wall_sensor_is_not_seen():
    m = open_room()
    s = sensor(2, 5, height=2.2, tilt=10)
    assert detect(m, s, (2, 0.5, 5), {}) == 0.0
    assert detect(m, s, (2.1, 0.5, 5), {}) == 0.0


def test_ceiling_cone():
    m = open_room()
    s = sensor(5, 5, height=2.6, mount="ceiling", tilt=90, reach=4, ceiling_fov=120)
    assert detect(m, s, (5, 1.3, 5), {}) == pytest.approx(1.0)
    assert detect(m, s, (5.5, 1.3, 5), {}) == pytest.approx(1.0)
    # r = 2.0 m at 1.3 m below: cone angle 56.98 deg, taper 0.6805, d = 2.385 <= 2.72
    d = math.hypot(2.0, 1.3)
    assert detect(m, s, (7, 1.3, 5), {}) == pytest.approx(expected_quality(d, 4))
    # r = 2.4 m: cone angle 61.5 deg > 60
    assert detect(m, s, (7.4, 1.3, 5), {}) == 0.0
    # the same radius lower down is inside the cone
    assert detect(m, s, (7.4, 0.2, 5), {}) > 0
    # above the sensor plane
    assert detect(m, s, (5, 2.8, 5), {}) == 0.0
    # any azimuth
    assert detect(m, s, (5, 1.3, 7), {}) == pytest.approx(expected_quality(d, 4))
    assert detect(m, s, (3, 1.3, 5), {}) == pytest.approx(expected_quality(d, 4))


def test_ceiling_cone_falls_back_to_largest_fov_when_profile_has_no_ceiling_block():
    m = open_room()
    s = sensor(4, 5, height=2.6, mount="ceiling", tilt=90, fov_h=150, fov_v=90, reach=7)
    # half angle 75 deg: r = 3.5 at 1.3 below is 69.6 deg (inside), r = 5.0 is 75.4 deg (outside)
    assert detect(m, s, (7.5, 1.3, 5), {}) > 0
    assert detect(m, s, (9.0, 1.3, 5), {}) == 0.0


def two_rooms(thickness, openings=None, **kw):
    a = rect("a", 0, 0, 5, 5, [0.3, thickness, 0.3, 0.3])
    b = rect("b", 5, 0, 10, 5, [0.3, 0.3, 0.3, thickness])
    return build_model(make_plan([a, b], openings=openings, **kw), "f")


@pytest.mark.parametrize("thickness, kind", [(0.3, "block"), (0.115, "brick"), (0.08, "thin")])
def test_wall_categories(thickness, kind):
    m = two_rooms(thickness)
    assert [s["k"] for s in m.segments if s["a"][0] == s["b"][0] == 5.0] == [kind]


def test_block_wall_stops_everything():
    m = two_rooms(0.3)
    s = sensor(4.5, 2.5)
    assert detect(m, s, (5.5, 1.9, 2.5), {}) == 0.0
    behind = sensor(4.5, 2.5, phi=180)
    assert detect(m, behind, (3.0, 1.9, 2.5), {}) == pytest.approx(1.0)


def test_brick_wall_costs_25_db():
    m = two_rooms(0.115)
    s = sensor(4.9, 2.5, reach=40)  # 40 * 10^(-25/20) = 2.2 m effective reach
    assert detect(m, s, (5.9, 1.9, 2.5), {}) == pytest.approx(1.0)
    assert detect(m, s, (7.5, 1.9, 2.5), {}) == 0.0  # 2.6 m


def test_thin_wall_attenuation_depends_on_thin_db():
    m = two_rooms(0.08)
    s = sensor(4.5, 2.5)  # reach 6 -> 6 * 10^(-10/20) = 1.897 m through the wall
    assert detect(m, s, (6.0, 1.9, 2.5), {}) == pytest.approx(1.0)  # 1.5 m
    assert detect(m, s, (6.5, 1.9, 2.5), {}) == 0.0  # 2.0 m
    assert detect(m, s, (6.5, 1.9, 2.5), {"thin_db": 5}) == pytest.approx(1.0)  # 6 * 10^(-5/20) = 3.37 m
    assert detect(m, s, (6.0, 1.9, 2.5), {"thin_db": 20}) == 0.0  # 0.6 m
    assert detect(m, s, (6.0, 1.9, 2.5), {"thin_db": 20}) == detect(m, s, (6.0, 1.9, 2.5), {"thin_db": 20.0})


def test_wall_attenuation_applies_at_every_height_and_for_ceiling_mounts():
    m = two_rooms(0.08)
    s = sensor(4.5, 2.5, height=2.6, mount="ceiling", tilt=90, reach=6, ceiling_fov=150)
    near = detect(m, s, (5.4, 1.3, 2.5), {})
    far = detect(m, s, (7.5, 1.3, 2.5), {})
    assert near > 0 and far == 0.0


def test_closed_door_costs_6_db_and_open_door_nothing():
    door = {"id": "d", "room_id": "a", "edge": 1, "offset": 2.5, "width": 1.0, "type": "door", "hinge": "left", "swing": "in"}
    m = two_rooms(0.3, openings=[door])
    s = sensor(2, 2.5)
    p = (5.5 + 1.0, 1.9, 2.5)  # d = 4.5 m through the doorway
    assert detect(m, s, p, {}) == pytest.approx(expected_quality(4.5, 6))
    # closed: 6 * 10^(-6/20) = 3.007 m effective reach
    assert detect(m, s, p, {"doors": "closed"}) == 0.0
    assert detect(m, s, p, {"doors": {"d": False}}) == 0.0
    assert detect(m, s, p, {"doors": {"d": True}}) == pytest.approx(expected_quality(4.5, 6))
    assert detect(m, s, p, {"doors": {"other": False}}) == pytest.approx(expected_quality(4.5, 6))
    near = (5.5 + 0.2, 1.9, 2.5)  # 3.7 m ... still beyond 3.007
    assert detect(m, s, near, {"doors": "closed"}) == 0.0
    inside = (4.5 + 0.0, 1.9, 2.5)
    assert detect(m, s, inside, {"doors": "closed"}) == pytest.approx(1.0)
    # a ray that misses the doorway hits the block wall in both states
    assert detect(m, s, (5.5, 1.9, 0.5), {}) == 0.0


def test_door_leading_outside_does_not_open_the_wall_for_other_rooms():
    door = {"id": "d", "room_id": "a", "edge": 1, "offset": 2.5, "width": 1.0, "type": "door", "hinge": "left", "swing": "in"}
    m = two_rooms(0.3, openings=[door])
    assert m.doors[0]["outside"] is False
    ext = two_rooms(0.3, openings=[{"id": "e", "room_id": "a", "edge": 0, "offset": 2.5, "width": 1.0, "type": "door"}])
    assert ext.doors[0]["outside"] is True


SHELF = {"id": "shelf", "type": "shelf", "x": 5, "z": 2.5, "w": 0.4, "d": 3.0, "h": 2.0, "rotation": 0}


def test_tall_furniture_damps_a_ray_that_passes_below_its_top():
    s = sensor(2, 2.5, height=1.9)
    free = open_room()
    shelf = open_room(furniture=[SHELF])
    p = (7, 1.3, 2.5)  # 5 m away
    assert detect(free, s, p, {}) == pytest.approx(expected_quality(math.sqrt(25 + 0.36), 6))
    # 10 dB: 6 * 0.316 = 1.9 m effective reach
    assert detect(shelf, s, p, {}) == 0.0
    # a ray that is above the 2.0 m top where it crosses the footprint is not damped
    high = (7, 2.4, 2.5)
    assert detect(shelf, s, high, {}) == pytest.approx(detect(free, s, high, {}))
    # a ray that goes around the shelf is not damped
    around = (7, 1.3, 5.5)
    assert detect(shelf, s, around, {}) == pytest.approx(detect(free, s, around, {}))
    # close behind the shelf within the damped reach
    near_sensor = sensor(3.8, 2.5)
    assert detect(shelf, near_sensor, (5.6, 1.9, 2.5), {}) == pytest.approx(1.0)


@pytest.mark.parametrize("ftype, h", [("lamp_floor", 1.8), ("plant", 1.7), ("rug", 2.0), ("coat_rack", 1.8), ("shower", 2.0), ("sofa", 0.85)])
def test_these_furniture_types_do_not_damp(ftype, h):
    s = sensor(2, 2.5)
    item = dict(SHELF, type=ftype, h=h)
    m = open_room(furniture=[item])
    free = open_room()
    p = (7, 1.3, 2.5)
    assert detect(m, s, p, {}) == pytest.approx(detect(free, s, p, {}))


def test_sensor_standing_inside_a_footprint_is_not_damped_by_it():
    s = sensor(5, 2.5, height=1.9)
    m = open_room(furniture=[SHELF])
    assert detect(m, s, (7, 1.3, 2.5), {}) == pytest.approx(detect(open_room(), s, (7, 1.3, 2.5), {}))


def test_tall_free_wall_blocks_and_low_free_wall_does_not():
    s = sensor(2, 2.5)
    tall = open_room(walls=[{"id": "w", "a": [5, 1.0], "b": [5, 4.0], "thickness": 0.2, "height": None}])
    high = open_room(walls=[{"id": "w", "a": [5, 1.0], "b": [5, 4.0], "thickness": 0.2, "height": 2.4}])
    low = open_room(walls=[{"id": "w", "a": [5, 1.0], "b": [5, 4.0], "thickness": 0.2, "height": 1.0}])
    p = (6.5, 1.3, 2.5)
    assert detect(tall, s, p, {}) == 0.0
    assert detect(high, s, p, {}) == 0.0
    assert detect(low, s, p, {}) > 0
    assert detect(tall, s, (6.5, 1.3, 5.5), {}) > 0  # around the end of the wall


def test_detect_resolves_sensors_from_their_profile():
    m = open_room()
    s = {"entity_id": "x", "x": 2, "z": 5, "height": 1.9, "phi": 0, "tilt": 0, "profile": "aqara_fp300"}
    assert detect(m, s, (5, 1.9, 5), {}) == pytest.approx(1.0)
    assert detect(m, s, (8.5, 1.9, 5), {}) == 0.0


def test_default_opts_are_accepted_as_none_and_empty():
    m = open_room()
    s = sensor(2, 5)
    assert detect(m, s, (5, 1.9, 5), None) == detect(m, s, (5, 1.9, 5), {})
