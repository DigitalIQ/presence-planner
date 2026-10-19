"""Plan source, sensors and model results of Presence Planner."""

from __future__ import annotations

import asyncio
import copy
import logging
from collections.abc import Callable
from typing import Any

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.debounce import Debouncer
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.start import async_at_started

from .const import (
    CELL,
    CONF_ECHO_WINDOW,
    CONF_HOLD_TIME,
    CONF_PLAN_SOURCE,
    CONF_SPILL_THRESHOLD,
    CONF_THIN_DB,
    DEBOUNCE_SECONDS,
    DEFAULT_OPTIONS,
    DOMAIN,
    HEIGHTS,
    SIGNAL_UPDATED,
    SOURCE_AUTO,
    SOURCE_NEONPLAN,
    SOURCE_OWN,
)
from .core import build_model, evaluate, load_profiles, resolve_sensor, spill_detail
from .devices import is_presence_entity, suggest_profile
from .neonplan import NeonPlanAdapter, NeonPlanError, NeonPlanIncompatible, placement_to_sensor

_LOGGER = logging.getLogger(__name__)

# pp-sensor fields that NeonPlan keeps when it is the source; everything else goes to our store
NEONPLAN_OWNED = ("x", "z", "height", "phi", "tilt", "fov_h", "reach")


def compute(plan: dict[str, Any] | None, sensors: list[dict[str, Any]], opts: dict[str, Any]) -> dict[str, Any]:
    """Model results per floor (CPU work, runs in the executor).

    Returns {floor_id: {"evaluation": evaluate(...), "spill": {entity_id: spill_detail(...)}}}.
    """
    results: dict[str, Any] = {}
    if not plan:
        return results
    for floor in plan.get("floors") or []:
        floor_id = floor["id"]
        floor_sensors = [s for s in sensors if s.get("floor_id") == floor_id and s.get("active", True)]
        try:
            model = build_model(plan, floor_id)
            evaluation = evaluate(model, floor_sensors, opts)
            spill = {s["entity_id"]: spill_detail(model, s, opts) for s in floor_sensors}
        except Exception:
            _LOGGER.exception("Presence Planner could not evaluate floor %s", floor_id)
            continue
        results[floor_id] = {"evaluation": evaluation, "spill": spill}
    return results


class PresencePlannerCoordinator:
    """Holds the plan source, the merged sensors and the results; notifies entities and subscribers."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry, store: Any) -> None:
        """Create the coordinator."""
        self.hass = hass
        self.entry = entry
        self.store = store
        self.adapter = NeonPlanAdapter(hass)
        self.options: dict[str, Any] = {**DEFAULT_OPTIONS, **entry.options}
        self.profiles: dict[str, Any] = {"profiles": []}
        self.source = SOURCE_OWN
        self.neonplan_error: str | None = None
        self.plan: dict[str, Any] | None = None
        self.sensors: list[dict[str, Any]] = []
        self.results: dict[str, Any] = {}
        self.revision = 0
        self.room_keys: tuple = ()
        self.reload_task: asyncio.Task | None = None
        self._listeners: list[Callable[[], None]] = []
        self._unsubs: list[Callable[[], None]] = []
        self._debouncer = Debouncer(
            hass, _LOGGER, cooldown=DEBOUNCE_SECONDS, immediate=False, function=self.async_recompute
        )

    # life cycle

    async def async_setup(self) -> None:
        """Load profiles and data, pick the source and compute once."""
        self.profiles = await self.hass.async_add_executor_job(load_profiles)
        self._reload()
        self.room_keys = self._room_keys()
        self._unsubs.append(self.adapter.async_listen(self._neonplan_changed))
        await self.async_recompute()

        @callback
        def _started(_hass: HomeAssistant) -> None:
            # entity states of other integrations may only exist now
            self.async_changed()

        self._unsubs.append(async_at_started(self.hass, _started))

    async def async_shutdown(self) -> None:
        """Stop listening."""
        self._debouncer.async_shutdown()
        while self._unsubs:
            self._unsubs.pop()()
        self._listeners.clear()

    # options

    @property
    def model_opts(self) -> dict[str, Any]:
        """Options passed to the core."""
        return {"heights": list(HEIGHTS), "doors": "open", "thin_db": self.options[CONF_THIN_DB], "cell": CELL}

    @property
    def hold_time(self) -> float:
        """Seconds a room stays occupied after the last valid on."""
        return float(self.options[CONF_HOLD_TIME])

    @property
    def echo_window(self) -> float:
        """Seconds an echo may follow the neighbour's on."""
        return float(self.options[CONF_ECHO_WINDOW])

    @property
    def spill_threshold(self) -> float:
        """Least spill share that makes an echo possible."""
        return float(self.options[CONF_SPILL_THRESHOLD])

    # source and data

    def _pick_source(self) -> str:
        wanted = self.options.get(CONF_PLAN_SOURCE, SOURCE_AUTO)
        self.neonplan_error = None
        if wanted == SOURCE_OWN:
            return SOURCE_OWN
        if not self.adapter.loaded:
            if wanted == SOURCE_NEONPLAN:
                self.neonplan_error = "neonplan_unavailable"
            return SOURCE_OWN
        try:
            self.adapter.check()
        except NeonPlanIncompatible as err:
            _LOGGER.warning("NeonPlan 3D is not compatible, using the own plan: %s", err)
            self.neonplan_error = NeonPlanIncompatible.code
            return SOURCE_OWN
        except NeonPlanError as err:
            self.neonplan_error = err.code
            return SOURCE_OWN
        return SOURCE_NEONPLAN

    def _resolve(self, sensor: dict[str, Any]) -> dict[str, Any]:
        if not sensor.get("profile"):
            sensor["profile"] = suggest_profile(self.hass, sensor["entity_id"], self.profiles) or "custom"
        try:
            return resolve_sensor(sensor, self.profiles)
        except Exception:
            _LOGGER.debug("Could not resolve sensor %s", sensor.get("entity_id"), exc_info=True)
            return sensor

    def _neonplan_sensors(self, plan: dict[str, Any]) -> list[dict[str, Any]]:
        heights = {f["id"]: float(f.get("height") or 2.5) for f in plan.get("floors") or []}
        extras = self.store.extras
        sensors = []
        for floor_id, placement in self.adapter.placements():
            entity_id = placement.get("entity_id")
            if not isinstance(entity_id, str) or not entity_id.startswith("binary_sensor."):
                continue
            if entity_id not in extras and not is_presence_entity(self.hass, entity_id):
                continue
            sensor = placement_to_sensor(floor_id, placement, extras.get(entity_id), heights.get(floor_id, 2.5))
            sensors.append(self._resolve(sensor))
        return sensors

    def _reload(self) -> None:
        """Read plan and sensors from the current source."""
        self.source = self._pick_source()
        if self.source == SOURCE_NEONPLAN:
            try:
                plan = self.adapter.plan()
                self.plan, self.sensors = plan, self._neonplan_sensors(plan)
                return
            except NeonPlanIncompatible as err:
                _LOGGER.warning("NeonPlan 3D is not compatible, using the own plan: %s", err)
                self.neonplan_error = NeonPlanIncompatible.code
                self.source = SOURCE_OWN
        self.plan = copy.deepcopy(self.store.plan)
        self.sensors = [self._resolve(copy.deepcopy(s)) for s in self.store.own_sensors]

    def _room_keys(self) -> tuple:
        keys = []
        for floor in (self.plan or {}).get("floors") or []:
            for room in floor.get("rooms") or []:
                keys.append((floor["id"], floor.get("name"), room["id"], room.get("name")))
        return tuple(keys)

    # change handling

    @callback
    def _neonplan_changed(self) -> None:
        if self.options.get(CONF_PLAN_SOURCE) != SOURCE_OWN:
            self.async_changed()

    @callback
    def async_changed(self) -> None:
        """Plan or sensors changed: reload, tell subscribers, recompute debounced."""
        self._reload()
        self.revision += 1
        async_dispatcher_send(self.hass, SIGNAL_UPDATED, self.revision)
        if self._room_keys() != self.room_keys:
            # Rooms were added, removed or renamed: the entities are rebuilt. The WebSocket write commands
            # await this task before they answer, so the panel's next `get` reaches the reloaded entry.
            if self.reload_task is None or self.reload_task.done():
                self.reload_task = self.hass.async_create_task(
                    self.hass.config_entries.async_reload(self.entry.entry_id),
                    f"{DOMAIN} reload after room change",
                    eager_start=False,
                )
            return
        self._debouncer.async_schedule_call()

    async def async_recompute(self) -> None:
        """Compute the model results in the executor and notify the entities."""
        plan, sensors = copy.deepcopy(self.plan), copy.deepcopy(self.sensors)
        self.results = await self.hass.async_add_executor_job(compute, plan, sensors, self.model_opts)
        for update in list(self._listeners):
            update()

    @callback
    def async_add_listener(self, update: Callable[[], None]) -> Callable[[], None]:
        """Call update after each recompute."""
        self._listeners.append(update)

        @callback
        def _remove() -> None:
            if update in self._listeners:
                self._listeners.remove(update)

        return _remove

    # writes

    async def async_save_sensors(self, sensors: list[dict[str, Any]]) -> None:
        """Write sensors: placement fields to NeonPlan and the rest to our store, or all to the own store."""
        if self.source == SOURCE_NEONPLAN:
            extras = {
                s["entity_id"]: {k: v for k, v in s.items() if k not in (*NEONPLAN_OWNED, "entity_id", "floor_id")}
                for s in sensors
            }
            await self.store.async_update_extras(extras)
            # NeonPlan's change signal reaches _neonplan_changed as well; the explicit call keeps it synchronous
            await self.adapter.async_save_sensors(sensors)
        else:
            await self.store.async_set_own_sensors(sensors)
        self.async_changed()

    async def async_save_plan(self, plan: dict[str, Any]) -> None:
        """Replace the own plan (never touches NeonPlan)."""
        await self.store.async_set_plan(plan)
        if self.source == SOURCE_OWN:
            self.async_changed()

    async def async_import(
        self, plan: dict[str, Any], building: dict[str, Any] | None, sensors: list[dict[str, Any]] | None = None
    ) -> list[dict[str, Any]]:
        """Store an imported plan as own plan; sensors from a NeonPlan building's placements become own sensors.

        `sensors` are the sensors of an own export (already validated, floor ids of `plan`).
        """
        sensors = list(sensors or [])
        if building is not None:
            heights = {f["id"]: float(f.get("height") or 2.5) for f in plan.get("floors") or []}
            for floor in building.get("floors") or []:
                for placement in floor.get("placements") or []:
                    entity_id = placement.get("entity_id")
                    if isinstance(entity_id, str) and is_presence_entity(self.hass, entity_id):
                        floor_id = str(floor["id"])
                        sensors.append(
                            placement_to_sensor(
                                floor_id, placement, self.store.extras.get(entity_id), heights.get(floor_id, 2.5)
                            )
                        )
        await self.store.async_set_plan(plan)
        if sensors:
            await self.store.async_set_own_sensors(sensors)
        if self.source == SOURCE_OWN:
            self.async_changed()
        return sensors

    # entity helpers

    def floor(self, floor_id: str) -> dict[str, Any] | None:
        """A floor of the current plan."""
        return next((f for f in (self.plan or {}).get("floors") or [] if f["id"] == floor_id), None)

    def room_result(self, floor_id: str, room_id: str) -> dict[str, Any] | None:
        """evaluate()['rooms'][room_id] of the last computation."""
        floor = self.results.get(floor_id)
        if not floor:
            return None
        return (floor["evaluation"].get("rooms") or {}).get(room_id)

    def fusion_config(self, floor_id: str, room_id: str) -> dict[str, Any]:
        """Arguments for RoomFusion.configure() of one room."""
        floor_result = self.results.get(floor_id) or {}
        rooms = (floor_result.get("evaluation") or {}).get("rooms") or {}
        own = list((rooms.get(room_id) or {}).get("own_sensors") or [])
        spill_all = floor_result.get("spill") or {}
        spill = {s: {n: d for n, d in (spill_all.get(s) or {}).items() if n != room_id and n in rooms} for s in own}
        room_sensors = {n: list(r.get("own_sensors") or []) for n, r in rooms.items() if n != room_id}
        floor = self.floor(floor_id) or {}
        doors = {o["id"]: o.get("contact") for o in floor.get("openings") or [] if o.get("type", "door") == "door"}
        inverted = [o["contact"] for o in floor.get("openings") or [] if o.get("contact") and o.get("contact_invert")]
        return {
            "own_sensors": own,
            "spill": spill,
            "room_sensors": room_sensors,
            "door_contacts": doors,
            "inverted_contacts": inverted,
        }
