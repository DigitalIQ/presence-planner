"""NeonPlan mapping helpers (no Home Assistant instance needed)."""

from __future__ import annotations

import copy

import pytest

from custom_components.presence_planner.export import ImportFormatError, import_data, to_neonplan_import
from custom_components.presence_planner.neonplan import (
    NeonPlanIncompatible,
    apply_sensors,
    building_to_plan,
    is_linked,
    placement_to_sensor,
    sensor_to_placement_fields,
)

from .conftest import DEMO, demo_building


def test_placement_mapping_both_ways() -> None:
    """rotation = (phi - 90) mod 360, y = height, fov = fov_h; extras never override NeonPlan fields."""
    placement = {"entity_id": "binary_sensor.a", "x": 1, "z": 2, "y": 1.8, "rotation": 315, "tilt": 15, "fov": 100}
    sensor = placement_to_sensor("f1", placement, {"profile": "aqara_fp300", "fov_v": 60, "phi": 1, "x": 99})
    assert sensor["phi"] == 45
    assert (sensor["x"], sensor["z"], sensor["height"], sensor["tilt"]) == (1, 2, 1.8, 15)
    assert sensor["fov_h"] == 100
    assert "reach" not in sensor  # None in NeonPlan: the profile fills it
    assert sensor["fov_v"] == 60
    fields = sensor_to_placement_fields({**sensor, "reach": 80})
    assert fields == {"x": 1.0, "z": 2.0, "y": 1.8, "rotation": 315.0, "tilt": 15.0, "fov": 100.0, "reach": 50.0}


def test_placement_defaults() -> None:
    """Missing height and tilt: 1.9 m / 10 deg on a wall, floor height / 90 deg on the ceiling."""
    placement = {"entity_id": "binary_sensor.a", "x": 1, "z": 2, "y": None}
    wall = placement_to_sensor("f1", placement)
    assert (wall["height"], wall["tilt"], wall["phi"], wall["mount"]) == (1.9, 10.0, 90.0, "wall")
    ceiling = placement_to_sensor("f1", placement, {"mount": "ceiling"}, floor_height=2.6)
    assert (ceiling["height"], ceiling["tilt"]) == (2.6, 90.0)


def test_apply_sensors_writes_only_placement_fields() -> None:
    """Other fields stay, a new sensor gets a placement, a floor change moves the placement."""
    building = demo_building(DEMO["plan"], DEMO["sensors"])
    second = copy.deepcopy(building["floors"][0])
    second["id"] = "upstairs"
    second["placements"] = []
    building["floors"].append(second)
    original = copy.deepcopy(building)
    sensors = [
        {
            "entity_id": "binary_sensor.demo_living_presence",
            "floor_id": "demo",
            "x": 0.5,
            "z": 4.0,
            "height": 2.0,
            "phi": 90,
            "tilt": 5,
            "fov_h": 120,
            "reach": 9,
            "profile": "x",
            "mount": "corner",
        },
        {"entity_id": "binary_sensor.new", "floor_id": "demo", "x": 1, "z": 1, "height": 2.2, "phi": 0},
        {
            "entity_id": "binary_sensor.demo_hall_motion",
            "floor_id": "upstairs",
            "x": 4,
            "z": 5.6,
            "height": 2.6,
            "phi": 0,
            "tilt": 90,
        },
    ]
    result = apply_sensors(building, sensors)
    assert building == original  # the input is not changed
    placements = {p["entity_id"]: p for p in result["floors"][0]["placements"]}
    living = placements["binary_sensor.demo_living_presence"]
    assert living["rotation"] == 0.0
    assert living["icon"] == "motion-sensor" and living["locked"] is True
    assert "profile" not in living and "mount" not in living
    assert placements["binary_sensor.new"] == {
        "entity_id": "binary_sensor.new",
        "x": 1.0,
        "z": 1.0,
        "y": 2.2,
        "rotation": 270.0,
    }
    assert "binary_sensor.demo_hall_motion" not in placements
    assert result["floors"][1]["placements"][0]["entity_id"] == "binary_sensor.demo_hall_motion"
    # the light placement is untouched
    assert placements["light.demo_living"] == {
        "entity_id": "light.demo_living",
        "x": 2.0,
        "z": 2.0,
        "y": None,
        "mount": "ceiling",
    }


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


def test_is_linked() -> None:
    """The button is recognised by its id."""
    assert not is_linked({"settings": {"buttons": [{"id": "other"}]}})
    assert is_linked({"settings": {"buttons": [{"id": "presence_planner"}]}})


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
