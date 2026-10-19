"""WebSocket commands `presence_planner/*` used by the panel."""

from __future__ import annotations

import asyncio
from typing import TYPE_CHECKING, Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_connect

from .const import DOMAIN, SIGNAL_UPDATED, SOURCE_OWN
from .devices import device_profiles
from .export import ImportFormatError, import_data, to_neonplan_import
from .neonplan import NeonPlanError

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
        ws_link_neonplan,
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
    """Return source, revision, plan, sensors, profiles, options and the NeonPlan state."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    neonplan = await coordinator.adapter.async_info()
    if coordinator.neonplan_error:
        neonplan["error"] = coordinator.neonplan_error
    connection.send_result(
        msg["id"],
        {
            "source": coordinator.source,
            "revision": coordinator.revision,
            "plan": coordinator.plan,
            "sensors": coordinator.sensors,
            "profiles": coordinator.profiles,
            "options": coordinator.options,
            "neonplan": neonplan,
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
    """Write sensors to NeonPlan (placement fields) and our store, or to the own store."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    try:
        await coordinator.async_save_sensors(msg["sensors"])
    except NeonPlanError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    except vol.Invalid as err:
        connection.send_error(msg["id"], "neonplan_rejected", str(err))
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
    await coordinator.async_save_plan(msg["plan"])
    connection.send_result(msg["id"], {"revision": await _after_write(hass, coordinator)})


@websocket_api.websocket_command({vol.Required("type"): "presence_planner/export", vol.Optional("plan"): PLAN_SCHEMA})
@websocket_api.async_response
async def ws_export(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """The given plan, else the own plan, else the current plan, in the NeonPlan import format."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    plan = msg.get("plan") or coordinator.store.plan or coordinator.plan
    if not plan:
        connection.send_error(msg["id"], "no_plan", "There is no plan to export")
        return
    data = to_neonplan_import(plan)
    # The import format has no sensors. They travel in an extra key that NeonPlan ignores, keyed by floor index
    # because the import format carries no floor ids.
    floor_index = {f["id"]: i for i, f in enumerate(plan.get("floors") or [])}
    raw = coordinator.store.own_sensors if coordinator.source == SOURCE_OWN else coordinator.sensors
    sensors = [
        {**{k: s[k] for k in _EXPORT_SENSOR_KEYS if s.get(k) is not None}, "floor_index": floor_index[s["floor_id"]]}
        for s in raw
        if s.get("floor_id") in floor_index
    ]
    if sensors:
        data[EXPORT_SENSORS_KEY] = {"version": 1, "sensors": sensors}
    connection.send_result(msg["id"], data)


def _exported_sensors(data: dict[str, Any], plan: dict[str, Any], warnings: list[str]) -> list[dict[str, Any]]:
    """Sensors from the extra key of an own export, with floor ids of the imported plan."""
    extra = data.get(EXPORT_SENSORS_KEY)
    if not isinstance(extra, dict) or not isinstance(extra.get("sensors"), list):
        return []
    floors = plan.get("floors") or []
    sensors = []
    for item in extra["sensors"]:
        index = item.get("floor_index") if isinstance(item, dict) else None
        if not isinstance(index, int) or not 0 <= index < len(floors):
            warnings.append("sensor_floor_missing")
            continue
        record = {k: v for k, v in item.items() if k != "floor_index"}
        try:
            sensors.append(SENSOR_SCHEMA({**record, "floor_id": floors[index]["id"]}))
        except vol.Invalid:
            warnings.append(f"sensor_invalid:{record.get('entity_id')}")
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
    except ImportFormatError as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    exported = _exported_sensors(msg["data"], plan, warnings) if building is None else []
    sensors = await coordinator.async_import(plan, building, exported)
    await _after_write(hass, coordinator)
    connection.send_result(msg["id"], {"plan": plan, "sensors": sensors, "warnings": warnings})


@websocket_api.websocket_command({vol.Required("type"): "presence_planner/link_neonplan"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_link_neonplan(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Add the Presence Planner button to NeonPlan's menu (idempotent)."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    try:
        added = await coordinator.adapter.async_link()
    except NeonPlanError as err:
        connection.send_error(msg["id"], err.code, str(err))
        return
    except vol.Invalid as err:
        connection.send_error(msg["id"], "neonplan_rejected", str(err))
        return
    connection.send_result(msg["id"], {"linked": True, "added": added})


@websocket_api.websocket_command({vol.Required("type"): "presence_planner/device_profiles"})
@websocket_api.async_response
async def ws_device_profiles(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Suggested profile per presence entity from the device registry."""
    if (coordinator := _coordinator(hass, connection, msg)) is None:
        return
    connection.send_result(msg["id"], {"suggestions": device_profiles(hass, coordinator.profiles)})
