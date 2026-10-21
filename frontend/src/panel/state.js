// Pure panel state logic. No DOM, no Lit, no core imports, so it runs under node:test.
// State objects are treated as immutable: every function returns a new state.

export const HEIGHTS = [0.5, 0.9, 1.3];
export const SENSOR_CLASSES = ["occupancy", "presence", "motion"];
export const MOUNTS = ["wall", "corner", "ceiling"];
export const DOOR_MODES = ["open", "closed", "live"];
export const VIEWS = ["2d", "3d", "split"];
export const DEFAULT_FOV_V = 90;
export const GLASS_WARN = 0.15;

/** Input limits for sensor fields: [min, max, decimals]. */
export const LIMITS = {
  height: [0.2, 4, 2],
  tilt: [0, 90, 0],
  phi: [0, 359, 0],
  fov_h: [10, 360, 0],
  fov_v: [10, 180, 0],
  reach: [0.5, 15, 1],
  x: [-1000, 1000, 3],
  z: [-1000, 1000, 3],
};

export const MOUNT_DEFAULTS = { wall: { height: 1.9, tilt: 10 }, corner: { height: 1.9, tilt: 10 }, ceiling: { height: 2.5, tilt: 90 } };

const round = (v, d) => {
  const f = 10 ** d;
  return Math.round(v * f) / f;
};
export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
export const normalisePhi = (phi) => ((Math.round(+phi || 0) % 360) + 360) % 360;

/** Clamps and rounds one sensor field. Returns undefined for invalid input. */
export function cleanField(key, value) {
  if (key === "phi") return Number.isFinite(+value) ? normalisePhi(value) : undefined;
  const lim = LIMITS[key];
  if (!lim) return value;
  const n = +value;
  if (value === "" || value === null || !Number.isFinite(n)) return undefined;
  return round(clamp(n, lim[0], lim[1]), lim[2]);
}

/** Accepts the profiles payload as `{ profiles: [...] }`, a list, or a map by id; returns a list. */
export function profileList(profiles) {
  if (!profiles) return [];
  if (Array.isArray(profiles)) return profiles;
  if (Array.isArray(profiles.profiles)) return profiles.profiles;
  return Object.entries(profiles).filter(([, p]) => p && typeof p === "object" && p.name).map(([id, p]) => ({ id, ...p }));
}

/** Wraps any profiles payload into the dict form used by `core.resolveSensor`. */
export function profileDict(profiles) {
  const list = profileList(profiles);
  const fov = profiles && !Array.isArray(profiles) && profiles.default_fov_v ? profiles.default_fov_v : DEFAULT_FOV_V;
  return { version: 1, default_fov_v: fov, profiles: list };
}

export function findProfile(profiles, id) {
  const list = profileList(profiles);
  return list.find((p) => p.id === id) || list.find((p) => p.id === "custom") || null;
}

/**
 * Field values a profile gives for a mount type. Used when the profile or mount changes.
 * Mirrors `resolve_sensor`: fov_v null → default_fov_v (flagged by the core, not here).
 */
export function profileDefaults(profile, mount, defaultFovV = DEFAULT_FOV_V) {
  if (!profile) return { fov_h: 120, fov_v: defaultFovV, reach: 6 };
  if (mount === "ceiling" && profile.ceiling) {
    return { fov_h: profile.ceiling.fov, fov_v: profile.ceiling.fov, reach: profile.ceiling.reach };
  }
  return { fov_h: profile.fov_h, fov_v: profile.fov_v == null ? defaultFovV : profile.fov_v, reach: profile.reach };
}

export function initialState() {
  return {
    loading: true,
    error: null,
    source: null,
    revision: null,
    plan: null,
    editPlan: null,
    planDirty: false,
    savedSensors: [],
    sensors: [],
    profiles: null,
    options: {},
    neonplan: { installed: false, version: null, linked: false },
    deviceProfiles: {},
    floorId: null,
    selected: null,
    dirty: false,
    remoteChanged: false,
    height: 1.3,
    doorsMode: "open",
    thinDb: 10,
    weight: 1,
    snap: true,
    cones: true,
    view: "split",
    tab: "planner",
  };
}

const clone = (v) => (v === undefined ? v : JSON.parse(JSON.stringify(v)));

/** Applies the answer of `presence_planner/get`. Keeps UI choices (height, view, floor if still present). */
export function applyLoad(state, res) {
  const plan = res.plan || null;
  const floors = (plan && plan.floors) || [];
  const floorId = floors.some((f) => f.id === state.floorId) ? state.floorId : floors[0] ? floors[0].id : null;
  const sensors = (res.sensors || []).map((s) => ({ ...s }));
  const opt = res.options || {};
  const selected = sensors.some((s) => s.entity_id === state.selected) ? state.selected : (sensors.find((s) => s.floor_id === floorId) || {}).entity_id || null;
  return {
    ...state,
    loading: false,
    error: null,
    source: res.source || "own",
    revision: res.revision === undefined ? null : res.revision,
    plan,
    editPlan: clone(plan),
    planDirty: false,
    savedSensors: clone(sensors),
    sensors,
    profiles: res.profiles || state.profiles,
    options: opt,
    neonplan: { installed: false, version: null, linked: false, ...(res.neonplan || {}) },
    floorId,
    selected,
    dirty: false,
    remoteChanged: false,
    thinDb: typeof opt.thin_db === "number" && !state.thinTouched ? opt.thin_db : state.thinDb,
    tab: res.source === "neonplan" && state.tab === "editor" ? "planner" : state.tab,
  };
}

/** A subscription event arrived. Reload unless the user has unsaved changes. */
export function onRemoteRevision(state, revision) {
  if (revision !== undefined && revision === state.revision) return { state, reload: false };
  if (state.dirty || state.planDirty) return { state: { ...state, remoteChanged: true }, reload: false };
  return { state, reload: true };
}

export const floorOf = (state) => ((state.editPlan && state.editPlan.floors) || []).find((f) => f.id === state.floorId) || null;
export const sensorsOnFloor = (state) => state.sensors.filter((s) => s.floor_id === state.floorId);
export const getSensor = (state, entityId) => state.sensors.find((s) => s.entity_id === entityId) || null;

/** Updates fields of one sensor. Fields are cleaned; invalid values are ignored. */
export function updateSensor(state, entityId, patch) {
  let changed = false;
  const sensors = state.sensors.map((s) => {
    if (s.entity_id !== entityId) return s;
    const next = { ...s };
    for (const [k, v] of Object.entries(patch)) {
      const c = k in LIMITS ? cleanField(k, v) : v;
      if (c === undefined) continue;
      if (next[k] !== c) {
        next[k] = c;
        changed = true;
      }
    }
    return next;
  });
  if (!changed) return state;
  return { ...state, sensors, dirty: true };
}

/** Profile change: resets fov and reach to the profile values and keeps the mount if supported. */
export function setProfile(state, entityId, profileId) {
  const s = getSensor(state, entityId);
  const p = findProfile(state.profiles, profileId);
  if (!s || !p) return state;
  const mount = p.mounts && p.mounts.length && !p.mounts.includes(s.mount) ? p.mounts[0] : s.mount;
  const defFov = profileDict(state.profiles).default_fov_v;
  return updateSensor(state, entityId, { profile: p.id, mount, ...profileDefaults(p, mount, defFov) });
}

/** Mount change: ceiling looks straight down from the room height; wall and corner use 1.9 m / 10°. */
export function setMount(state, entityId, mount, roomHeight) {
  const s = getSensor(state, entityId);
  if (!s || !MOUNTS.includes(mount)) return state;
  const p = findProfile(state.profiles, s.profile);
  const defFov = profileDict(state.profiles).default_fov_v;
  const base = mount === "ceiling" ? { height: roomHeight || MOUNT_DEFAULTS.ceiling.height, tilt: 90 } : s.mount === "ceiling" ? { ...MOUNT_DEFAULTS[mount] } : {};
  const fov = (mount === "ceiling") !== (s.mount === "ceiling") ? profileDefaults(p, mount, defFov) : {};
  return updateSensor(state, entityId, { mount, ...base, ...fov });
}

/** Creates a new pp-sensor record for an unplaced entity. */
export function newSensor(entityId, { floorId, x, z, profileId, profiles, phi = 0 }) {
  const p = findProfile(profiles, profileId);
  const mount = p && p.mounts && p.mounts.length ? p.mounts[0] : "wall";
  return {
    entity_id: entityId,
    floor_id: floorId,
    x: round(x, 3),
    z: round(z, 3),
    height: MOUNT_DEFAULTS[mount].height,
    phi: normalisePhi(phi),
    tilt: MOUNT_DEFAULTS[mount].tilt,
    mount,
    profile: p ? p.id : "custom",
    ...profileDefaults(p, mount, profileDict(profiles).default_fov_v),
    active: true,
  };
}

export function addSensor(state, sensor) {
  if (getSensor(state, sensor.entity_id)) return state;
  return { ...state, sensors: [...state.sensors, sensor], selected: sensor.entity_id, dirty: true };
}

export function removeSensor(state, entityId) {
  if (!getSensor(state, entityId)) return state;
  const sensors = state.sensors.filter((s) => s.entity_id !== entityId);
  const selected = state.selected === entityId ? (sensors.find((s) => s.floor_id === state.floorId) || {}).entity_id || null : state.selected;
  return { ...state, sensors, selected, dirty: true };
}

/** Back to the last loaded or saved state. */
export function resetChanges(state) {
  const sensors = clone(state.savedSensors);
  const editPlan = clone(state.plan);
  const floors = editPlan?.floors || [];
  const floorId = floors.some((f) => f.id === state.floorId) ? state.floorId : floors[0]?.id || null;
  const selected = sensors.some((s) => s.entity_id === state.selected && s.floor_id === floorId) ? state.selected : null;
  return { ...state, sensors, floorId, editPlan, dirty: false, planDirty: false, selected };
}

export function setEditPlan(state, plan) {
  return { ...state, editPlan: plan, planDirty: true };
}

/** After a successful save_sensors. */
export function markSaved(state, revision) {
  return { ...state, savedSensors: clone(state.sensors), dirty: false, revision: revision === undefined ? state.revision : revision };
}

/** Payload for save_sensors: every sensor of every floor, rounded. */
export function sensorsForSave(state) {
  return state.sensors.map((s) => {
    const out = { ...s };
    for (const k of Object.keys(LIMITS)) if (typeof out[k] === "number") out[k] = cleanField(k, out[k]);
    delete out.fov_v_assumed;
    return out;
  });
}

/**
 * Door states for the core. "open" / "closed" pass through; "live" maps each door with a contact
 * to its current HA state (`on` = open). Doors without contact or with an unknown state count as open.
 */
export function doorsOption(mode, floor, states) {
  if (mode !== "live") return mode === "closed" ? "closed" : "open";
  const out = {};
  for (const o of (floor && floor.openings) || []) {
    if (o.type === "window") continue;
    const st = o.contact && states ? states[o.contact] : null;
    const known = st && (st.state === "on" || st.state === "off");
    out[o.id] = known ? ((st.state === "on") !== !!o.contact_invert) : true;
  }
  return out;
}

/** Options passed to core.evaluate. `fast` = coarse grid at the shown height only (while dragging). */
export function coreOptions(state, states, { fast = false, grid = true } = {}) {
  return {
    heights: fast ? [state.height] : HEIGHTS.slice(),
    doors: doorsOption(state.doorsMode, floorOf(state), states),
    thin_db: state.thinDb,
    cell: fast ? 0.2 : 0.1,
    grid,
  };
}

/** Unplaced HA entities that can be presence sensors, sorted by name. */
export function sensorCandidates(states, placed) {
  const have = new Set((placed || []).map((s) => (typeof s === "string" ? s : s.entity_id)));
  return Object.entries(states || {})
    .filter(([eid, st]) => eid.startsWith("binary_sensor.") && !have.has(eid) && st && st.attributes && SENSOR_CLASSES.includes(st.attributes.device_class))
    .map(([eid, st]) => ({ entity_id: eid, name: st.attributes.friendly_name || eid }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Keyboard handling on the map: arrows move 5 cm (Shift 1 cm), Q/E rotate 5° (Shift 1°). */
export function keyPatch(sensor, key, shift = false) {
  if (!sensor) return null;
  const st = shift ? 0.01 : 0.05;
  const rot = shift ? 1 : 5;
  switch (key) {
    case "ArrowLeft": return { x: round(sensor.x - st, 3) };
    case "ArrowRight": return { x: round(sensor.x + st, 3) };
    case "ArrowUp": return { z: round(sensor.z - st, 3) };
    case "ArrowDown": return { z: round(sensor.z + st, 3) };
    case "q": case "Q": return { phi: normalisePhi(sensor.phi - rot) };
    case "e": case "E": return { phi: normalisePhi(sensor.phi + rot) };
    default: return null;
  }
}

/** Selects the next / previous sensor on the floor (Tab-like cycling with N / P keys). */
export function cycleSelection(state, dir = 1) {
  const list = sensorsOnFloor(state);
  if (!list.length) return state;
  const i = list.findIndex((s) => s.entity_id === state.selected);
  const next = list[(i + dir + list.length) % list.length];
  return { ...state, selected: next.entity_id };
}

/** Applies an optimizer candidate to a sensor (position, height, direction, tilt, mount). */
export function applyCandidate(state, entityId, cand) {
  if (!cand || !sensorsOnFloor(state).some((s) => s.entity_id === entityId)) return state;
  return updateSensor(state, entityId, { x: cand.x, z: cand.z, height: cand.height, phi: cand.phi, tilt: cand.tilt, mount: cand.mount || "wall" });
}

/** Identity of the calculation inputs. A result is applicable only to this exact context. */
export const optimizerContext = (s) => [s.editPlan, s.floorId, s.revision, s.sensors, s.profiles, s.thinDb, s.doorsMode, s.weight];
export const sameOptimizerContext = (a, b) => !!a && !!b && a.length === b.length && a.every((v, i) => v === b[i]);

export function selectFloor(state, floorId) {
  if (!(state.editPlan?.floors || []).some((f) => f.id === floorId)) return state;
  const selected = state.sensors.find((s) => s.floor_id === floorId)?.entity_id || null;
  return { ...state, floorId, selected };
}

/** Stable colour slot per sensor: index in the full sensor list. */
export function colorIndex(state, entityId, paletteSize) {
  const i = state.sensors.findIndex((s) => s.entity_id === entityId);
  return i < 0 ? 0 : i % paletteSize;
}

/** Whether the "Link in NeonPlan" button is offered. */
export const canLinkNeonplan = (state) => !!(state.neonplan && state.neonplan.installed && !state.neonplan.linked);
/** The editor exists only for the own plan. */
export const editorAvailable = (state) => state.source === "own";

/** Default optimizer target: the selected sensor if it is in the room, else the first sensor in the room. */
export function optimizerTarget(state, roomId, roomOf) {
  const list = sensorsOnFloor(state);
  const sel = list.find((s) => s.entity_id === state.selected);
  if (sel && roomOf(sel) === roomId) return sel.entity_id;
  const inRoom = list.find((s) => roomOf(s) === roomId);
  return inRoom ? inRoom.entity_id : sel ? sel.entity_id : null;
}
