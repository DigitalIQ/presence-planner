"""WebSocket commands `presence_planner/*` used by the panel."""

from __future__ import annotations

import asyncio
import copy
from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import DOMAIN, SIGNAL_UPDATED
from .devices import device_profiles
from .export import ImportFormatError, import_data, to_neonplan_import
from .validation import PlanValidationError, validate_plan

if TYPE_CHECKING:
    from .coordinator import PresencePlannerCoordinator

_NUMBER = vol.Coerce(float)

SENSOR_SCHEMA = vol.Schema(
    {
        vol.Required("entity_id"): vol.All(str, vol.Match(r"^[a-z_]+\.[a-z0-9_]+$")),
        vol.Required("floor_id"): str,
        vol.Required("x"): _NUMBER,
        vol.Required("z"): _NUMBER,
        vol.Required("height"): vol.All(_NUMBER, vol.Range(min=0, max=100)),
        vol.Required("phi"): _NUMBER,
        vol.Optional("tilt", default=10.0): vol.All(_NUMBER, vol.Range(min=-90, max=90)),
        vol.Optional("mount", default="wall"): vol.In(["wall", "corner", "ceiling"]),
        vol.Optional("profile"): vol.Any(None, str),
        vol.Optional("fov_h"): vol.Any(None, vol.All(_NUMBER, vol.Range(min=1, max=360))),
        vol.Optional("fov_v"): vol.Any(None, vol.All(_NUMBER, vol.Range(min=1, max=180))),
        vol.Optional("reach"): vol.Any(None, vol.All(_NUMBER, vol.Range(min=0, max=100))),
        vol.Optional("active", default=True): bool,
    },
    extra=vol.ALLOW_EXTRA,
)

EXPORT_SENSORS_KEY = "presence_planner"
_EXPORT_SENSOR_KEYS = (
    "entity_id",
    "x",
    "z",
    "height",
    "phi",
    "tilt",
    "mount",
    "profile",
    "fov_h",
    "fov_v",
    "reach",
    "active",
)

PLAN_SCHEMA = vol.Schema(
    {vol.Required("version"): 1, vol.Required("floors"): [dict], vol.Optional("settings"): dict},
    extra=vol.ALLOW_EXTRA,
)


@callback
def async_register_commands(hass: HomeAssistant) -> None:
    """Register all commands."""
    for command in (
        ws_get,
        ws_subscribe,
        ws_save_sensors,
        ws_save_plan,
        ws_export,
        ws_import,
        ws_device_profiles,
    ):
        websocket_api.async_register_command(hass, command)


def _coordinator(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> PresencePlannerCoordinator | None:
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if not entries:
        connection.send_error(msg["id"], "not_loaded", "Presence Planner is not set up")
        return None
    return entries[0].runtime_data


async def _after_write(hass: HomeAssistant, coordinator: PresencePlannerCoordinator) -> int:
    """Wait for a reload the write started (rooms changed) and return the revision of the loaded entry.

    Without the wait, the panel's next `get` lands in the middle of the reload and gets `not_loaded`.
    """
    task = coordinator.reload_task
    if task is not None and not task.done():
        await asyncio.shield(task)
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    return entries[0].runtime_data.revision if entries else coordinator.revision


@websocket_api.websocket_command({vol.Required("type"): "presence_planner/get"})
@websocket_api.async_response
async def ws_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Return revision, plan, sensors, profiles and options."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    connection.send_result(
        msg["id"],
        {
            "revision": coordinator.revision,
            "plan": coordinator.plan,
            "sensors": coordinator.sensors,
            "profiles": coordinator.profiles,
            "options": coordinator.options,
        },
    )


@websocket_api.websocket_command({vol.Required("type"): "presence_planner/subscribe"})
@callback
def ws_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Send {revision} whenever the plan or the sensors change."""

    @callback
    def forward(revision: int) -> None:
        connection.send_message(websocket_api.event_message(msg["id"], {"revision": revision}))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(hass, SIGNAL_UPDATED, forward)
    connection.send_result(msg["id"])


@websocket_api.websocket_command(
    {vol.Required("type"): "presence_planner/save_sensors", vol.Required("sensors"): [SENSOR_SCHEMA]}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save_sensors(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Replace the own sensors."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    try:
        await coordinator.async_save_sensors(msg["sensors"])
    except PlanValidationError as err:
        connection.send_error(msg["id"], "invalid_plan", str(err))
        return
    connection.send_result(msg["id"], {"revision": await _after_write(hass, coordinator)})


@websocket_api.websocket_command(
    {vol.Required("type"): "presence_planner/save_plan", vol.Required("plan"): PLAN_SCHEMA}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_save_plan(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Replace the own plan."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    try:
        await coordinator.async_save_plan(msg["plan"])
    except PlanValidationError as err:
        connection.send_error(msg["id"], "invalid_plan", str(err))
        return
    connection.send_result(msg["id"], {"revision": await _after_write(hass, coordinator)})


def _build_export(plan: dict[str, Any], raw_sensors: list[dict[str, Any]]) -> dict[str, Any]:
    """The NeonPlan import format with the native plan and sensors attached (CPU work, runs in the executor)."""
    validate_plan(plan)
    data = to_neonplan_import(plan)
    # The import format has no sensors. They travel in an extra key that NeonPlan ignores, keyed by floor index
    # because the import format carries no floor ids.
    floor_index = {f["id"]: i for i, f in enumerate(plan.get("floors") or [])}
    sensors = [
        {**{k: s[k] for k in _EXPORT_SENSOR_KEYS if s.get(k) is not None}, "floor_index": floor_index[s["floor_id"]]}
        for s in raw_sensors
        if s.get("floor_id") in floor_index
    ]
    data[EXPORT_SENSORS_KEY] = {"version": 1, "plan": copy.deepcopy(plan), "sensors": sensors}
    return data


@websocket_api.websocket_command({vol.Required("type"): "presence_planner/export", vol.Optional("plan"): PLAN_SCHEMA})
@websocket_api.async_response
async def ws_export(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """The own plan, in the NeonPlan import format. Admins may pass an unsaved plan of the editor instead."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    # validating and converting a supplied plan is CPU work that only admins (who may write plans anyway) trigger
    plan = (msg.get("plan") if connection.user.is_admin else None) or coordinator.store.plan
    if not plan:
        connection.send_error(msg["id"], "no_plan", "There is no plan to export")
        return
    try:
        data = await hass.async_add_executor_job(_build_export, plan, copy.deepcopy(coordinator.store.own_sensors))
    except PlanValidationError as err:
        connection.send_error(msg["id"], "invalid_plan", str(err))
        return
    connection.send_result(msg["id"], data)


def _exported_sensors(data: dict[str, Any], plan: dict[str, Any], warnings: list[str]) -> list[dict[str, Any]]:
    """Sensors from the extra key of an own export, with floor ids of the imported plan."""
    extra = data.get(EXPORT_SENSORS_KEY)
    if extra is None:
        return []
    if not isinstance(extra, dict) or extra.get("version") != 1 or not isinstance(extra.get("sensors"), list):
        raise ImportFormatError("invalid_exported_sensors")
    floors = plan.get("floors") or []
    sensors = []
    for item in extra["sensors"]:
        index = item.get("floor_index") if isinstance(item, dict) else None
        if not isinstance(index, int) or not 0 <= index < len(floors):
            raise ImportFormatError("sensor_floor_missing")
        record = {k: v for k, v in item.items() if k != "floor_index"}
        try:
            sensors.append(SENSOR_SCHEMA({**record, "floor_id": floors[index]["id"]}))
        except vol.Invalid:
            raise ImportFormatError(f"sensor_invalid:{record.get('entity_id')}") from None
    return sensors


@websocket_api.websocket_command({vol.Required("type"): "presence_planner/import", vol.Required("data"): dict})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_import(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Own plan from the NeonPlan import format or a NeonPlan building."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    try:
        plan, warnings, building = import_data(msg["data"])
        validate_plan(plan)
    except (ImportFormatError, PlanValidationError, TypeError, AttributeError, OverflowError) as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    try:
        exported = _exported_sensors(msg["data"], plan, warnings) if building is None else []
        sensors = await coordinator.async_import(plan, building, exported, warnings)
    except (PlanValidationError, ImportFormatError) as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    await _after_write(hass, coordinator)
    connection.send_result(msg["id"], {"plan": plan, "sensors": sensors, "warnings": warnings})


@websocket_api.websocket_command({vol.Required("type"): "presence_planner/device_profiles"})
@websocket_api.async_response
async def ws_device_profiles(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Suggested profile per presence entity from the device registry."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    connection.send_result(msg["id"], {"suggestions": device_profiles(hass, coordinator.profiles)})
