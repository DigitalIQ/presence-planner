"""NeonPlan mapping helpers (no Home Assistant instance needed)."""

from __future__ import annotations

import copy

import pytest

from custom_components.presence_planner.export import ImportFormatError, import_data, to_neonplan_import
from custom_components.presence_planner.neonplan import (
    NeonPlanIncompatible,
    building_to_plan,
    placement_to_sensor,
)

from .conftest import DEMO, demo_building


def test_placement_mapping_both_ways() -> None:
    """phi = rotation + 90, height = y, fov_h = fov; extras never override NeonPlan fields."""
    placement = {"entity_id": "binary_sensor.a", "x": 1, "z": 2, "y": 1.8, "rotation": 315, "tilt": 15, "fov": 100}
    sensor = placement_to_sensor("f1", placement, {"profile": "aqara_fp300", "fov_v": 60, "phi": 1, "x": 99})
    assert sensor["phi"] == 45
    assert (sensor["x"], sensor["z"], sensor["height"], sensor["tilt"]) == (1, 2, 1.8, 15)
    assert sensor["fov_h"] == 100
    assert "reach" not in sensor  # None in NeonPlan: the profile fills it
    assert sensor["fov_v"] == 60


def test_placement_defaults() -> None:
    """Missing height and tilt: 1.9 m / 10 deg on a wall, floor height / 90 deg on the ceiling."""
    placement = {"entity_id": "binary_sensor.a", "x": 1, "z": 2, "y": None}
    wall = placement_to_sensor("f1", placement)
    assert (wall["height"], wall["tilt"], wall["phi"], wall["mount"]) == (1.9, 10.0, 90.0, "wall")
    ceiling = placement_to_sensor("f1", placement, {"mount": "ceiling"}, floor_height=2.6)
    assert (ceiling["height"], ceiling["tilt"]) == (2.6, 90.0)


def test_building_to_plan() -> None:
    """A NeonPlan building maps to the pp-plan subset; a strange one raises NeonPlanIncompatible."""
    plan = building_to_plan(demo_building(DEMO["plan"], DEMO["sensors"]))
    floor = plan["floors"][0]
    expected = DEMO["plan"]["floors"][0]
    assert [r["points"] for r in floor["rooms"]] == [r["points"] for r in expected["rooms"]]
    assert floor["rooms"][0]["wall_thickness"] == expected["rooms"][0]["wall_thickness"]
    assert [o["contact"] for o in floor["openings"]] == [o["contact"] for o in expected["openings"]]
    assert "floor_material" not in floor["rooms"][0]
    with pytest.raises(NeonPlanIncompatible):
        building_to_plan({"version": 1, "floors": [{"id": "x"}]})


def test_import_simple_format_units_and_warnings() -> None:
    """Centimetres are converted; a door off every edge is dropped with a warning."""
    data = {
        "format": "neonplan-import",
        "units": "cm",
        "floors": [
            {
                "name": "EG",
                "rooms": [
                    {"name": "Wohnen", "points": [[0, 0], [400, 0], [400, 300], [0, 300]]},
                    {"name": "Wohnen", "points": [[400, 0], [700, 0], [700, 300], [400, 300]]},
                ],
                "doors": [{"at": [400, 150], "width": 90}, {"at": [200, 150]}],
                "furniture": [{"name": "Sofa", "at": [200, 200]}],
            }
        ],
    }
    plan, warnings, building = import_data(data)
    assert building is None
    floor = plan["floors"][0]
    assert [r["id"] for r in floor["rooms"]] == ["wohnen", "wohnen_2"]
    assert floor["rooms"][0]["points"][1] == [4.0, 0.0]
    assert len(floor["openings"]) == 1
    door = floor["openings"][0]
    assert (door["room_id"], door["edge"], door["offset"], door["width"]) == ("wohnen", 1, 1.5, 0.9)
    assert warnings == ["door_not_on_edge"]
    assert floor["furniture"][0]["type"] == "sofa"
    with pytest.raises(ImportFormatError):
        import_data({"format": "neonplan-import", "floors": []})


def test_export_pp_plan_reimport_as_plan() -> None:
    """A pp-plan given to import is read like a NeonPlan building without placements."""
    plan, warnings, building = import_data(copy.deepcopy(DEMO["plan"]))
    assert building is None and warnings == []
    assert to_neonplan_import(plan) == to_neonplan_import(DEMO["plan"])


def native_plan() -> dict:
    """The demo flat with the parts that have no NeonPlan building form."""
    plan = copy.deepcopy(DEMO["plan"])
    floor = plan["floors"][0]
    floor["outdoor"] = [{"id": "garden", "points": [[0, 0], [2, 0], [2, 2]]}]
    floor["background"] = {"image": "data:image/png;base64,aGVsbG8=", "width": 8, "opacity": 0.5}
    floor["openings"].append({"id": "d_chimney", "wall": "chimney", "offset": 0.3, "width": 0.3, "type": "door"})
    return plan


def test_raw_pp_plan_is_imported_as_it_is() -> None:
    """The building path dropped outdoor areas and the background and failed on openings in free walls."""
    plan = native_plan()
    imported, warnings, building = import_data(copy.deepcopy(plan))
    assert imported == plan and warnings == [] and building is None


def test_building_with_placements_is_still_a_building() -> None:
    building = demo_building(DEMO["plan"], DEMO["sensors"])
    plan, _warnings, found = import_data(copy.deepcopy(building))
    assert found is not None and plan["floors"][0]["outdoor"] == []
