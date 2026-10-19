import json

import pytest

from core_helpers import load_demo, make_plan, rect
from custom_components.presence_planner.core import build_model, model_to_dict
from custom_components.presence_planner.core.geometry import (
    clip_segment,
    halfplanes,
    point_in_polygon,
    rect_poly,
    segments_cross,
)
from custom_components.presence_planner.core.model import get_cells


def band_box(band):
    xs = [p[0] for p in band]
    zs = [p[1] for p in band]
    return min(xs), max(xs), min(zs), max(zs)


def find_segment(model, a, b):
    for s in model.segments:
        pts = {tuple(round(v, 6) for v in s["a"]), tuple(round(v, 6) for v in s["b"])}
        if pts == {tuple(a), tuple(b)}:
            return s
    return None


def find_band(model, x0, x1, z0, z1):
    for b in model.bands:
        box = band_box(b)
        if all(abs(m - e) < 1e-6 for m, e in zip(box, (x0, x1, z0, z1))):
            return b
    return None


def three_rooms(extra=None, openings=None):
    # A on top; B and C below, so the bottom edge of A has to be split at x = 3.
    a = rect("a", 0, 0, 6, 3, [0.3, 0.3, 0.08, 0.3])
    b = rect("b", 0, 3, 3, 6, [0.14, 0.16, 0.3, 0.3])
    c = rect("c", 3, 3, 6, 6, [0.05, 0.3, 0.3, 0.14])
    plan = make_plan([a, b, c], openings=openings)
    if extra:
        extra(plan["floors"][0])
    return build_model(plan, "f")


def test_edge_is_split_at_foreign_vertices():
    m = three_rooms()
    a_bottom = [s for s in m.subs if s["room"] == "a" and s["edge"] == 2]
    assert len(a_bottom) == 2
    assert sorted((round(s["t0"], 6), round(s["t1"], 6)) for s in a_bottom) == [(0.0, 3.0), (3.0, 6.0)]
    # 7 exterior pieces, the two halves of the A boundary and the B/C wall
    assert len(m.segments) == 10


def test_shared_versus_exterior_classification():
    m = three_rooms()
    shared = {(s["room"], s["edge"], round(s["t0"], 3)) for s in m.subs if s["shared"]}
    assert shared == {("a", 2, 3.0), ("a", 2, 0.0), ("b", 0, 0.0), ("b", 1, 0.0), ("c", 0, 0.0), ("c", 3, 0.0)}
    assert all(not s["shared"] for s in m.subs if s["room"] == "a" and s["edge"] in (0, 1, 3))


def test_shared_wall_takes_larger_thickness_and_category():
    m = three_rooms()
    # A/B piece: max(0.08, 0.14) = 0.14 -> brick, band centred on the edge
    seg = find_segment(m, (0, 3), (3, 3))
    assert seg["k"] == "brick"
    assert find_band(m, 0, 3, 3 - 0.07, 3 + 0.07) is not None
    # A/C piece: max(0.08, 0.05) = 0.08 -> thin
    seg = find_segment(m, (3, 3), (6, 3))
    assert seg["k"] == "thin"
    assert find_band(m, 3, 6, 3 - 0.04, 3 + 0.04) is not None
    # B/C wall: max(0.16, 0.14) = 0.16 -> brick
    assert find_segment(m, (3, 3), (3, 6))["k"] == "brick"
    assert find_band(m, 3 - 0.08, 3 + 0.08, 3, 6) is not None


def test_exterior_band_lies_fully_outside_the_polygon():
    m = three_rooms()
    top = find_band(m, 0, 6, -0.3, 0)  # A top edge, thickness 0.3
    assert top is not None
    left = find_band(m, -0.3, 0, 3, 6)  # B left edge
    assert left is not None
    right = find_band(m, 6, 6.3, 0, 3)  # A right edge
    assert right is not None
    assert find_segment(m, (0, 0), (6, 0))["k"] == "block"


def test_faces_follow_the_wall_rule():
    m = three_rooms()
    a_face = [f for f in m.faces if f["room"] == "a" and f["a"][1] == pytest.approx(3 - 0.07)]
    b_face = [f for f in m.faces if f["room"] == "b" and f["a"][1] == pytest.approx(3 + 0.07)]
    assert len(a_face) == 1 and len(b_face) == 1
    assert a_face[0]["n"] == pytest.approx([0, -1])
    assert b_face[0]["n"] == pytest.approx([0, 1])
    # exterior face sits on the polygon edge
    top = [f for f in m.faces if f["room"] == "a" and f["a"][1] == pytest.approx(0.0) and f["b"][1] == pytest.approx(0.0)]
    assert len(top) == 1 and top[0]["n"] == pytest.approx([0, 1])


def test_default_thickness_from_settings():
    plan = make_plan([rect("a", 0, 0, 4, 3), rect("b", 4, 0, 8, 3)], settings={"wall_exterior": 0.24, "wall_interior": 0.12})
    m = build_model(plan, "f")
    assert find_band(m, 4 - 0.06, 4 + 0.06, 0, 3) is not None
    assert find_band(m, 0, 4, -0.24, 0) is not None


def test_wall_height_zero_removes_the_wall():
    a = rect("a", 0, 0, 4, 3, [0.3] * 4, wall_heights=[1, 0, 1, 1])
    m = build_model(make_plan([a]), "f")
    assert len(m.segments) == 3 and len(m.bands) == 3
    assert find_segment(m, (4, 0), (4, 3)) is None


def test_cells_stay_out_of_bands_and_free_walls():
    plan = make_plan(
        [rect("a", 0, 0, 4, 3, [0.3, 0.3, 0.3, 0.3]), rect("b", 0, 3, 4, 6, [0.3, 0.3, 0.3, 0.3])],
        walls=[{"id": "w", "a": [1, 1.5], "b": [2, 1.5], "thickness": 0.4, "height": None}],
    )
    m = build_model(plan, "f")
    cells = get_cells(m, 0.1)
    assert cells
    for x, z, rid in cells:
        assert not any(point_in_polygon(x, z, b) for b in m.bands)
        assert not any(point_in_polygon(x, z, w["poly"]) for w in m.free_walls)
        assert (0 <= z < 3) == (rid == "a")
    # shared wall is 0.3 thick, centred on z = 3: nothing between 2.85 and 3.15
    assert not any(2.85 < z < 3.15 for _, z, _r in cells)
    assert any(z < 2.85 for _, z, _r in cells) and any(z > 3.15 for _, z, _r in cells)
    # free wall 1..2 x 1.3..1.7 is excluded
    assert not any(1.0 < x < 2.0 and 1.3 < z < 1.7 for x, z, _r in cells)


def test_cell_grid_spacing_and_room_origin():
    m = build_model(make_plan([rect("a", 1, 1, 2, 2, [0.01] * 4)]), "f")
    cells = get_cells(m, 0.5)
    xs = sorted({c[0] for c in cells})
    assert xs == [1.25, 1.75]


def test_door_is_cut_out_of_the_wall_and_window_becomes_glass():
    openings = [
        {"id": "d1", "room_id": "b", "edge": 0, "offset": 1.5, "width": 0.9, "type": "door", "hinge": "left", "swing": "in", "contact": "binary_sensor.x"},
        {"id": "w1", "room_id": "a", "edge": 0, "offset": 3.0, "width": 1.0, "type": "window", "sill": 0.9, "height": 1.2},
        {"id": "d2", "room_id": "c", "edge": 2, "offset": 1.5, "width": 0.9, "type": "door", "hinge": "right", "swing": "out"},
    ]
    m = three_rooms(openings=openings)
    door = next(d for d in m.doors if d["id"] == "d1")
    assert door["rooms"] == ["a", "b"] and door["outside"] is False and door["contact"] == "binary_sensor.x"
    assert door["a"] == pytest.approx([1.05, 3.0]) and door["b"] == pytest.approx([1.95, 3.0])
    # hinge left = start side, swing in = into room b (z > 3)
    assert door["hinge"] == pytest.approx([1.05, 3.0]) and door["tip"] == pytest.approx([1.05, 3.9])
    spans = sorted((min(s["a"][0], s["b"][0]), max(s["a"][0], s["b"][0])) for s in m.segments if s["a"][1] == s["b"][1] == 3.0 and max(s["a"][0], s["b"][0]) <= 3.0)
    assert [v for span in spans for v in span] == pytest.approx([0.0, 1.05, 1.95, 3.0])
    # window: stays a block wall, listed as glass
    assert find_segment(m, (0, 0), (6, 0))["k"] == "block"
    assert len(m.glass) == 1 and m.windows[0]["exterior"] is True
    # exterior door is flagged and cut too
    d2 = next(d for d in m.doors if d["id"] == "d2")
    assert d2["outside"] is True and d2["rooms"] == ["c"]


def test_furniture_footprint_follows_the_contract_formula():
    poly = rect_poly(2, 3, 1.0, 0.4, 90)
    # local (-0.5, -0.2) at 90 degrees -> (x - b*1 ..., z + a*1) = (2 + 0.2, 3 - 0.5)
    assert poly[0] == pytest.approx([2.2, 2.5])
    assert poly[1] == pytest.approx([2.2, 3.5])


def test_segment_helpers():
    assert segments_cross((0, 0), (2, 2), (0, 2), (2, 0))
    assert not segments_cross((0, 0), (1, 1), (0, 2), (2, 0))
    hp = halfplanes([[0, 0], [2, 0], [2, 1], [0, 1]])
    t_in, t_out, start_inside = clip_segment(hp, -1, 0.5, 3, 0.5)
    assert (t_in, t_out, start_inside) == pytest.approx((0.25, 0.75, False))
    assert clip_segment(hp, -1, 3, 3, 3) is None
    assert clip_segment(hp, 1, 0.5, 5, 0.5)[2] is True


def test_demo_model_structure():
    plan, _ = load_demo()
    m = build_model(plan, "demo")
    assert [r["id"] for r in m.rooms] == ["living", "bedroom", "kitchen", "hall", "bath"]
    assert len(m.doors) == 5 and len(m.windows) == 4 and len(m.glass) == 4
    kinds = {s["k"] for s in m.segments}
    assert kinds == {"block", "brick", "thin"}
    # hall/bath wall is 0.08 m thick: thin, band centred on x = 5
    assert find_band(m, 5 - 0.04, 5 + 0.04, 4.2, 7.0) is not None
    # tall furniture (shelf, wardrobe, fridge, tall cabinet) are obstacles, the shower is not
    assert sorted(f["id"] for f in m.furniture if f["obstacle"]) == ["coat", "fridge", "shelf", "wardrobe"]
    assert m.free_walls[0]["block"] is True
    # d_living: hinge on the start side of the hall edge, swings out into the living room
    d = next(d for d in m.doors if d["id"] == "d_living")
    assert d["hinge"] == pytest.approx([3.6, 4.2]) and d["tip"] == pytest.approx([3.6, 3.4])
    assert d["rooms"] == ["living", "hall"]
    names = {(z["name"], z["room"]) for z in m.zones}
    assert {("bed", "bedroom"), ("sofa", "living"), ("desk", "living"), ("dining", "kitchen"), ("kitchen", "kitchen"), ("wc", "bath"), ("entry", "hall")} <= names


def test_model_to_dict_is_json_serialisable_and_has_contract_keys():
    plan, _ = load_demo()
    m = build_model(plan, "demo")
    d = model_to_dict(m)
    json.dumps(d)
    for key in ("floor", "rooms", "bands", "faces", "segments", "doors", "windows", "glass", "freeWalls", "furniture", "zones", "cells", "bounds"):
        assert key in d
    assert set(d["cells"]) == {"0.1", "0.2"}
    assert set(d["bounds"]) == {"x0", "x1", "z0", "z1"}
    assert d["rooms"][0].keys() == {"id", "name", "area_id", "points", "height"}


def test_unknown_floor_raises():
    plan, _ = load_demo()
    with pytest.raises(KeyError):
        build_model(plan, "nope")
