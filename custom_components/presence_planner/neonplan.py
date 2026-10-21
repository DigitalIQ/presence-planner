"""Adapter to NeonPlan 3D (github.com/Mastershort/neonplan3d).

NeonPlan keeps its runtime data object in ``hass.data["neonplan3d"]`` (class ``FloorplanData`` in its
``storage.py``). The adapter reads ``building`` and ``revision`` from it and saves through
``async_save_building(building)``, the same call NeonPlan's own ``neonplan3d/building/save`` WebSocket
handler makes after validating with ``schema.BUILDING_SCHEMA``. That call writes the restore points, bumps the
revision and sends the dispatcher signal ``neonplan3d_building_updated`` (with the revision), which the adapter
listens to.

Everything NeonPlan-internal is version-guarded: a missing attribute raises ``NeonPlanIncompatible`` and the
integration falls back to its own plan.
"""

from __future__ import annotations

import copy
import inspect
import logging
import sys
from collections.abc import Callable
from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.loader import IntegrationNotFound, async_get_integration

from .const import (
    DEFAULT_CEILING_TILT,
    DEFAULT_WALL_HEIGHT,
    DEFAULT_WALL_TILT,
    NEONPLAN_BUTTON,
    NEONPLAN_DOMAIN,
    NEONPLAN_SIGNAL,
)
from .validation import bounded_data, validate_plan

_LOGGER = logging.getLogger(__name__)

# the only placement fields this integration ever writes
PLACEMENT_FIELDS = ("x", "z", "y", "rotation", "tilt", "fov", "reach")
# NeonPlan limits (schema.PLACEMENT_SCHEMA), so a save never fails on a value from our model
_LIMITS = {
    "x": (-1000.0, 1000.0),
    "z": (-1000.0, 1000.0),
    "y": (0.0, 100.0),
    "tilt": (0.0, 90.0),
    "fov": (10.0, 360.0),
    "reach": (0.5, 50.0),
}
# NeonPlan allows at most 20 own menu buttons (schema.SETTINGS_SCHEMA)
_MAX_BUTTONS = 20


class NeonPlanError(Exception):
    """Base error of the adapter."""

    code = "neonplan_error"


class NeonPlanUnavailable(NeonPlanError):
    """NeonPlan 3D is not loaded."""

    code = "neonplan_unavailable"


class NeonPlanIncompatible(NeonPlanError):
    """NeonPlan 3D is loaded, but its internals are not what this adapter expects."""

    code = "neonplan_incompatible"


def _clamp(key: str, value: float) -> float:
    low, high = _LIMITS[key]
    return min(high, max(low, float(value)))


def _float_or_none(value: Any) -> float | None:
    try:
        return None if value is None else float(value)
    except (TypeError, ValueError):
        return None


def building_to_plan(building: dict[str, Any]) -> dict[str, Any]:
    """Turn a NeonPlan building into a pp-plan (version 1). Raises NeonPlanIncompatible on a strange shape."""
    try:
        bounded_data(building)
        settings = building.get("settings") or {}
        floors = []
        for floor in building["floors"]:
            rooms = []
            for room in floor["rooms"]:
                item = {
                    "id": str(room["id"]),
                    "name": str(room.get("name") or room["id"]),
                    "area_id": room.get("area_id"),
                    "points": [[float(p[0]), float(p[1])] for p in room["points"]],
                    "ceiling_height": room.get("ceiling_height"),
                }
                for key in ("wall_thickness", "wall_heights"):
                    if room.get(key) is not None:
                        item[key] = copy.deepcopy(room[key])
                rooms.append(item)
            openings = []
            for opening in floor.get("openings") or []:
                kind = opening.get("type", "door")
                item = {
                    "id": str(opening["id"]),
                    "room_id": str(opening["room_id"]),
                    "edge": int(opening["edge"]),
                    "offset": float(opening["offset"]),
                    "width": float(opening["width"]),
                    # a garage door is a door for the model (it leads outside and is ignored for spill)
                    "type": "window" if kind == "window" else "door",
                    "sill": float(opening.get("sill") or 0),
                    "height": float(opening.get("height") or 2.0),
                    "hinge": opening.get("hinge") or "left",
                    "swing": opening.get("swing") or "in",
                    "contact": opening.get("contact") if kind != "window" else None,
                }
                if opening.get("wall"):
                    item["wall"] = opening["wall"]
                if opening.get("contact_invert"):
                    item["contact_invert"] = True
                openings.append(item)
            walls = [
                {
                    "id": str(wall["id"]),
                    "a": [float(wall["a"][0]), float(wall["a"][1])],
                    "b": [float(wall["b"][0]), float(wall["b"][1])],
                    "thickness": wall.get("thickness"),
                    "height": wall.get("height"),
                }
                for wall in floor.get("walls") or []
            ]
            furniture = [
                {
                    "id": str(item["id"]),
                    "type": str(item["type"]),
                    "x": float(item["x"]),
                    "z": float(item["z"]),
                    "w": float(item["w"]),
                    "d": float(item["d"]),
                    "h": float(item["h"]),
                    "rotation": float(item.get("rotation") or 0),
                }
                for item in floor.get("furniture") or []
            ]
            floors.append(
                {
                    "id": str(floor["id"]),
                    "name": str(floor.get("name") or floor["id"]),
                    "ha_floor": floor.get("ha_floor"),
                    "elevation": float(floor.get("elevation") or 0),
                    "height": float(floor.get("height") or 2.5),
                    "rooms": rooms,
                    "openings": openings,
                    "walls": walls,
                    "furniture": furniture,
                    "outdoor": [],
                    "background": None,
                }
            )
        return validate_plan({
            "version": 1,
            "settings": {
                "wall_exterior": float(settings.get("wall_exterior", 0.24)),
                "wall_interior": float(settings.get("wall_interior", 0.12)),
            },
            "floors": floors,
        })
    except (KeyError, TypeError, ValueError, IndexError, AttributeError) as err:
        raise NeonPlanIncompatible(f"Unexpected NeonPlan building layout: {err!r}") from err


def placements(building: dict[str, Any]) -> list[tuple[str, dict[str, Any]]]:
    """All placements as (floor_id, placement)."""
    try:
        return [(str(floor["id"]), p) for floor in building["floors"] for p in floor["placements"]]
    except (KeyError, TypeError) as err:
        raise NeonPlanIncompatible(f"Unexpected NeonPlan placements: {err!r}") from err


def placement_to_sensor(
    floor_id: str, placement: dict[str, Any], extras: dict[str, Any] | None = None, floor_height: float = 2.5
) -> dict[str, Any]:
    """Build a pp-sensor from a NeonPlan placement plus the fields from our store.

    Contract mapping: height = y, phi = (rotation + 90) mod 360, tilt = tilt, fov_h = fov, reach = reach.
    """
    extras = dict(extras or {})
    mount = extras.get("mount") or "wall"
    y = _float_or_none(placement.get("y"))
    if y is None:
        y = floor_height if mount == "ceiling" else DEFAULT_WALL_HEIGHT
    tilt = _float_or_none(placement.get("tilt"))
    if tilt is None:
        tilt = DEFAULT_CEILING_TILT if mount == "ceiling" else DEFAULT_WALL_TILT
    sensor: dict[str, Any] = {
        "entity_id": placement["entity_id"],
        "floor_id": floor_id,
        "x": float(placement["x"]),
        "z": float(placement["z"]),
        "height": y,
        "phi": (float(placement.get("rotation") or 0) + 90.0) % 360.0,
        "tilt": tilt,
        "mount": mount,
        "active": True,
    }
    # extras (profile, mount, fov_v, active, own fields) never override the NeonPlan-owned fields
    for key, value in extras.items():
        if key not in ("x", "z", "height", "phi", "tilt", "fov_h", "reach", "entity_id", "floor_id"):
            sensor[key] = value
    if (fov := _float_or_none(placement.get("fov"))) is not None:
        sensor["fov_h"] = fov
    if (reach := _float_or_none(placement.get("reach"))) is not None:
        sensor["reach"] = reach
    return sensor


def sensor_to_placement_fields(sensor: dict[str, Any]) -> dict[str, Any]:
    """The NeonPlan fields of a pp-sensor (and nothing else)."""
    fields: dict[str, Any] = {
        "x": _clamp("x", sensor["x"]),
        "z": _clamp("z", sensor["z"]),
        "y": _clamp("y", sensor["height"]),
        "rotation": round((float(sensor.get("phi", 0)) - 90.0) % 360.0, 4),
    }
    if sensor.get("tilt") is not None:
        fields["tilt"] = _clamp("tilt", sensor["tilt"])
    if sensor.get("fov_h") is not None:
        fields["fov"] = _clamp("fov", sensor["fov_h"])
    if sensor.get("reach") is not None:
        fields["reach"] = _clamp("reach", sensor["reach"])
    return fields


def apply_sensors(building: dict[str, Any], sensors: list[dict[str, Any]]) -> dict[str, Any]:
    """Return a copy of the building with the sensor fields written into its placements.

    A placement keeps every other field. A sensor without a placement gets a new one on its floor; a sensor whose
    floor changed moves with its placement.
    """
    result = copy.deepcopy(building)
    try:
        floors = {str(f["id"]): f for f in result["floors"]}
        for sensor in sensors:
            fields = sensor_to_placement_fields(sensor)
            target_floor = floors.get(str(sensor.get("floor_id")))
            found = None
            for floor in result["floors"]:
                for placement in floor["placements"]:
                    if placement.get("entity_id") == sensor["entity_id"]:
                        found = (floor, placement)
                        break
                if found:
                    break
            if found:
                floor, placement = found
                placement.update(fields)
                if target_floor is not None and target_floor is not floor:
                    floor["placements"].remove(placement)
                    target_floor["placements"].append(placement)
            elif target_floor is not None:
                target_floor["placements"].append({"entity_id": sensor["entity_id"], **fields})
    except (KeyError, TypeError, AttributeError) as err:
        raise NeonPlanIncompatible(f"Unexpected NeonPlan placements: {err!r}") from err
    return result


def is_linked(building: dict[str, Any]) -> bool:
    """True if the Presence Planner menu button is in the building settings."""
    buttons = (building.get("settings") or {}).get("buttons") or []
    return any(isinstance(b, dict) and b.get("id") == NEONPLAN_BUTTON["id"] for b in buttons)


def _neonplan_module(name: str) -> Any | None:
    # only modules NeonPlan already imported: no import (and no file access) from the event loop
    return sys.modules.get(f"custom_components.{NEONPLAN_DOMAIN}.{name}")


class NeonPlanAdapter:
    """Reads and writes NeonPlan 3D through its runtime data object."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Create the adapter."""
        self.hass = hass

    def _data(self) -> Any:
        data = self.hass.data.get(NEONPLAN_DOMAIN)
        if data is None:
            raise NeonPlanUnavailable("NeonPlan 3D is not loaded")
        building = getattr(data, "building", None)
        revision = getattr(data, "revision", None)
        save = getattr(data, "async_save_building", None)
        if (
            not isinstance(building, dict)
            or not isinstance(building.get("floors"), list)
            or not isinstance(revision, int)
            or save is None
            or not inspect.iscoroutinefunction(save)
        ):
            raise NeonPlanIncompatible(
                "NeonPlan 3D runtime data lacks building/revision/async_save_building as expected"
            )
        return data

    @property
    def loaded(self) -> bool:
        """True if NeonPlan has set up its runtime data (compatible or not)."""
        return self.hass.data.get(NEONPLAN_DOMAIN) is not None

    def check(self) -> None:
        """Raise NeonPlanUnavailable or NeonPlanIncompatible."""
        data = self._data()
        placements(data.building)

    async def async_info(self) -> dict[str, Any]:
        """Installed, version and linked state for the panel."""
        version = None
        installed = self.loaded
        try:
            integration = await async_get_integration(self.hass, NEONPLAN_DOMAIN)
            installed = True
            version = str(integration.version) if integration.version else None
        except IntegrationNotFound:
            pass
        linked = False
        error = None
        try:
            linked = is_linked(self._data().building)
        except NeonPlanUnavailable:
            pass
        except NeonPlanIncompatible:
            error = NeonPlanIncompatible.code
        return {"installed": installed, "version": version, "linked": linked, "loaded": self.loaded, "error": error}

    @property
    def revision(self) -> int:
        """NeonPlan's revision."""
        return self._data().revision

    def building(self) -> dict[str, Any]:
        """NeonPlan's current building (do not change it in place)."""
        return self._data().building

    def plan(self) -> dict[str, Any]:
        """NeonPlan's building as pp-plan."""
        return building_to_plan(self.building())

    def placements(self) -> list[tuple[str, dict[str, Any]]]:
        """All placements as (floor_id, placement)."""
        return placements(self.building())

    async def _async_save(self, building: dict[str, Any]) -> int:
        """Save through NeonPlan's own path: BUILDING_SCHEMA validation, then async_save_building."""
        data = self._data()
        schema_module = _neonplan_module("schema")
        schema = getattr(schema_module, "BUILDING_SCHEMA", None) if schema_module else None
        if schema is not None:
            # NeonPlan's WebSocket handler validates (and fills defaults) before it saves; so do we
            building = schema(building)
        return await data.async_save_building(building)

    async def async_save_sensors(self, sensors: list[dict[str, Any]]) -> int:
        """Write the placement fields of the sensors; returns NeonPlan's new revision."""
        return await self._async_save(apply_sensors(self.building(), sensors))

    async def async_link(self) -> bool:
        """Add the menu button once; returns False if it was already there."""
        building = self.building()
        if is_linked(building):
            return False
        result = copy.deepcopy(building)
        settings = result.setdefault("settings", {})
        if not isinstance(settings, dict):
            raise NeonPlanIncompatible("NeonPlan settings are not a dict")
        buttons = settings.setdefault("buttons", [])
        if not isinstance(buttons, list):
            raise NeonPlanIncompatible("NeonPlan menu buttons are not a list")
        if len(buttons) >= _MAX_BUTTONS:
            raise NeonPlanError("NeonPlan 3D has no room for another menu button")
        buttons.append(dict(NEONPLAN_BUTTON))
        await self._async_save(result)
        return True

    @callback
    def async_listen(self, update: Callable[[], None]) -> Callable[[], None]:
        """Call update whenever NeonPlan's building changes."""
        const = _neonplan_module("const")
        signal = getattr(const, "SIGNAL_BUILDING_UPDATED", NEONPLAN_SIGNAL) if const else NEONPLAN_SIGNAL

        @callback
        def _changed(*_args: Any) -> None:
            update()

        return async_dispatcher_connect(self.hass, signal, _changed)
