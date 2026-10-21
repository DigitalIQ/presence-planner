// Detection engine: sensor state, ray attenuation (walls, doors, obstacles) and the 3D detection model.
// Single source of the detection maths for detect(), evaluate(), spillDetail() and optimize().

import { DEG, RAD, clamp, crossXZ, insideXZ, prepConvex, clipConvex } from "./geometry.js";
import { BRICK_DB, CLOSED_DOOR_DB, OBSTACLE_DB } from "./model.js";
import { PROFILES } from "./profiles.js";

export const DEFAULT_OPTS = { heights: [0.5, 0.9, 1.3], doors: "open", thin_db: 10, cell: 0.1 };

export function normOpts(opts) {
  const o = { ...DEFAULT_OPTS, ...(opts || {}) };
  if (!Array.isArray(o.heights) || !o.heights.length) o.heights = DEFAULT_OPTS.heights;
  return o;
}

/** Fill fov_h, fov_v, reach, mount from the profile; explicit values on the sensor win. */
export function resolveSensor(sensor, profiles = PROFILES) {
  const list = profiles.profiles || [];
  const prof = list.find((x) => x.id === sensor.profile) || list.find((x) => x.id === "custom") || list[0];
  const out = { ...sensor };
  if (out.mount == null) out.mount = (prof.mounts && prof.mounts[0]) || "wall";
  const ceiling = out.mount === "ceiling" ? prof.ceiling : null;
  if (out.fov_h == null) out.fov_h = ceiling ? ceiling.fov : prof.fov_h;
  if (out.reach == null) out.reach = ceiling ? ceiling.reach : prof.reach;
  if (out.fov_v == null) {
    if (prof.fov_v == null) { out.fov_v = profiles.default_fov_v ?? 90; out.fov_v_assumed = true; }
    else out.fov_v = prof.fov_v;
  }
  if (ceiling && out.ceiling_fov == null) out.ceiling_fov = ceiling.fov;
  if (out.tilt == null) out.tilt = out.mount === "ceiling" ? 90 : 0;
  if (out.active == null) out.active = true;
  return out;
}

/** Resolve against the bundled profiles only when a model field is missing (same rule as the Python core). */
export function ensureResolved(sensor) {
  if (sensor.fov_h != null && sensor.fov_v != null && sensor.reach != null && sensor.mount != null) return sensor;
  return resolveSensor(sensor, PROFILES);
}

const ANGLE_EPS = 1e-9;

/** Precomputed view frame of one sensor (a resolved sensor record). */
export function sensorState(sensor) {
  const fovH = Number(sensor.fov_h), fovV = Number(sensor.fov_v);
  const S = {
    x: Number(sensor.x), y: Number(sensor.height ?? 1.9), z: Number(sensor.z), reach: Number(sensor.reach),
    ceiling: sensor.mount === "ceiling", degH: fovH / 2, degV: fovV / 2,
    degC: (sensor.ceiling_fov ? Number(sensor.ceiling_fov) : Math.max(fovH, fovV)) / 2,
    halfH: 0, halfV: 0, halfC: 0, fx: 0, fy: 0, fz: 0, rx: 0, rz: 0, ux: 0, uy: 0, uz: 0, d: 0,
  };
  S.halfH = S.degH * DEG; S.halfV = S.degV * DEG; S.halfC = S.degC * DEG;
  const ph = (sensor.phi || 0) * DEG, ti = (sensor.tilt || 0) * DEG, cp = Math.cos(ph), sp = Math.sin(ph), ct = Math.cos(ti), st = Math.sin(ti);
  // forward f, right r = normalize(f x up), up' = r x f (y is up)
  S.fx = cp * ct; S.fy = -st; S.fz = sp * ct;
  S.rx = -sp; S.rz = cp;
  S.ux = cp * st; S.uy = ct; S.uz = sp * st;
  return S;
}

/**
 * Field-of-view factor (0 = outside, otherwise the edge taper 0.6..1) for the vector v from sensor to point.
 * Sets S.d to |v|.
 */
export function fovGain(S, vx, vy, vz) {
  const d = Math.sqrt(vx * vx + vy * vy + vz * vz);
  S.d = d;
  if (d < 1e-6) return 0;
  if (S.ceiling) {
    const theta = Math.acos(clamp(-vy / d, -1, 1));
    if (theta > S.halfC + ANGLE_EPS) return 0;
    return 1 - 0.4 * clamp((theta * RAD - (S.degC - 15)) / 15, 0, 1);
  }
  const a = vx * S.fx + vy * S.fy + vz * S.fz;
  if (a <= 0) return 0;
  const b = vx * S.rx + vz * S.rz;
  const yaw = Math.abs(Math.atan2(b, a));
  if (yaw > S.halfH + ANGLE_EPS) return 0;
  const c = vx * S.ux + vy * S.uy + vz * S.uz;
  const pitch = Math.abs(Math.atan2(c, Math.hypot(a, b)));
  if (pitch > S.halfV + ANGLE_EPS) return 0;
  return (1 - 0.4 * clamp((yaw * RAD - (S.degH - 15)) / 15, 0, 1)) * (1 - 0.4 * clamp((pitch * RAD - (S.degV - 10)) / 10, 0, 1));
}

/** Quality 0..1 from distance d, FOV gain g and linear attenuation factor att = 10^(-L/20). */
export function quality(S, g, d, att) {
  if (g <= 0 || d > S.reach * g * att) return 0;
  const k = 0.58 * S.reach;
  return d <= k ? 1 : 1 - (0.4 * (d - k)) / (S.reach - k);
}

/* ---------------- attenuation scene ---------------- */

const sceneCache = new WeakMap();

/** Wall, door and obstacle data of a model for one set of options (cached per model). */
export function getScene(model, opts) {
  const o = normOpts(opts);
  const doorsKey = typeof o.doors === "object" ? JSON.stringify(o.doors) : String(o.doors);
  const key = `${o.thin_db}|${doorsKey}`;
  let byKey = sceneCache.get(model);
  if (!byKey) sceneCache.set(model, (byKey = new Map()));
  if (byKey.has(key)) return byKey.get(key);
  const segs = model.segments, n = segs.length;
  const sc = {
    n, ax: new Float64Array(n), az: new Float64Array(n), bx: new Float64Array(n), bz: new Float64Array(n), db: new Float64Array(n),
    x0: new Float64Array(n), x1: new Float64Array(n), z0: new Float64Array(n), z1: new Float64Array(n),
    doorSegs: [], blockers: [], obstacles: [],
  };
  segs.forEach((s, i) => {
    sc.ax[i] = s.a[0]; sc.az[i] = s.a[1]; sc.bx[i] = s.b[0]; sc.bz[i] = s.b[1];
    sc.db[i] = s.k === "block" ? Infinity : s.k === "brick" ? BRICK_DB : o.thin_db;
    sc.x0[i] = Math.min(s.a[0], s.b[0]); sc.x1[i] = Math.max(s.a[0], s.b[0]);
    sc.z0[i] = Math.min(s.a[1], s.b[1]); sc.z1[i] = Math.max(s.a[1], s.b[1]);
  });
  model.doors.forEach((d, idx) => {
    const open = o.doors === "open" ? true : o.doors === "closed" ? false : o.doors?.[d.id] !== false;
    sc.doorSegs.push({ idx, id: d.id, ax: d.a[0], az: d.a[1], bx: d.b[0], bz: d.b[1], db: open ? 0 : CLOSED_DOOR_DB });
  });
  for (const w of model.freeWalls) if (w.block) sc.blockers.push(prepConvex(w.poly));
  for (const f of model.furniture) if (f.obstacle) sc.obstacles.push({ P: prepConvex(f.poly), h: f.h });
  sc.tmp = new Float64Array(3);
  byKey.set(key, sc);
  return sc;
}

/** 2D attenuation (dB) along sensor->point through walls, doors and tall free walls. Infinity = blocked. */
export function wallLoss(sc, ax, az, bx, bz) {
  let L = 0;
  const lx = Math.min(ax, bx), hx = Math.max(ax, bx), lz = Math.min(az, bz), hz = Math.max(az, bz);
  for (let i = 0; i < sc.n; i++) {
    if (sc.x1[i] < lx || sc.x0[i] > hx || sc.z1[i] < lz || sc.z0[i] > hz) continue;
    if (!crossXZ(ax, az, bx, bz, sc.ax[i], sc.az[i], sc.bx[i], sc.bz[i])) continue;
    if (sc.db[i] === Infinity) return Infinity;
    L += sc.db[i];
  }
  for (const d of sc.doorSegs) if (d.db && crossXZ(ax, az, bx, bz, d.ax, d.az, d.bx, d.bz)) L += d.db;
  for (const P of sc.blockers) if (clipConvex(P, ax, az, bx, bz, sc.tmp) && !sc.tmp[2]) return Infinity;
  return L;
}

/** Extra attenuation from tall furniture: 10 dB per obstacle whose footprint the ray crosses below its top. */
export function obstacleLoss(sc, sx, sy, sz, px, py, pz) {
  let L = 0;
  for (const ob of sc.obstacles) {
    if (!clipConvex(ob.P, sx, sz, px, pz, sc.tmp) || sc.tmp[2]) continue;
    const y0 = sy + (py - sy) * sc.tmp[0], y1 = sy + (py - sy) * sc.tmp[1];
    if (Math.min(y0, y1) < ob.h) L += OBSTACLE_DB;
  }
  return L;
}

/** Index (into model.doors) of the first door segment the plan projection of the ray crosses, or -1. */
export function firstDoor(sc, ax, az, bx, bz) {
  for (const d of sc.doorSegs) if (crossXZ(ax, az, bx, bz, d.ax, d.az, d.bx, d.bz)) return d.idx;
  return -1;
}

/** All crossed door indices; callers preserve the complete path for contact filtering. */
export function crossedDoors(sc, ax, az, bx, bz) {
  return sc.doorSegs.filter((d) => crossXZ(ax, az, bx, bz, d.ax, d.az, d.bx, d.bz)).map((d) => d.idx);
}

/* ---------------- single point detection ---------------- */

/** Quality 0..1 of one sensor at point (x, y, z), y = height. */
export function detectPoint(model, sensor, point, opts) {
  const o = normOpts(opts);
  const sc = getScene(model, o);
  const S = sensorState(ensureResolved(sensor));
  const [px, py, pz] = point;
  const vx = px - S.x, vy = py - S.y, vz = pz - S.z;
  const d2 = vx * vx + vy * vy + vz * vz;
  if (d2 < 1e-12 || d2 > S.reach * S.reach) return 0;
  const g = fovGain(S, vx, vy, vz);
  if (!g || S.d > S.reach * g) return 0;
  const wl = wallLoss(sc, S.x, S.z, px, pz);
  if (wl === Infinity) return 0;
  const L = wl + obstacleLoss(sc, S.x, S.y, S.z, px, py, pz);
  return quality(S, g, S.d, Math.pow(10, -L / 20));
}

/* ---------------- probes: many points for one sensor position ---------------- */

const cellArrCache = new WeakMap();

/** Typed coordinate arrays of a cell list (cached). */
export function cellArrays(cells, model) {
  let c = cellArrCache.get(cells);
  if (c) return c;
  const n = cells.length, x = new Float64Array(n), z = new Float64Array(n), room = new Int32Array(n);
  const idx = new Map(model.rooms.map((r, i) => [r.id, i]));
  cells.forEach((cell, i) => { x[i] = cell.x; z[i] = cell.z; room[i] = idx.get(cell.room); });
  c = { n, x, z, room };
  cellArrCache.set(cells, c);
  return c;
}

/**
 * Collect all (cell, height) points a sensor at (sx, sy, sz) could reach, with their vectors and
 * the linear attenuation factor of the static scene. The result does not depend on the viewing direction.
 */
export function prepareProbe(sc, sx, sy, sz, reach, ca, sel, heights) {
  const nH = heights.length, cap = sel.length * nH;
  const vx = new Float64Array(cap), vy = new Float64Array(cap), vz = new Float64Array(cap), att = new Float64Array(cap);
  const ci = new Int32Array(cap), hi = new Int8Array(cap);
  let n = 0;
  for (let s = 0; s < sel.length; s++) {
    const c = sel[s], cx = ca.x[c], cz = ca.z[c];
    const dx = cx - sx, dz = cz - sz;
    if (dx * dx + dz * dz > reach * reach) continue;
    const wl = wallLoss(sc, sx, sz, cx, cz);
    if (wl === Infinity) continue;
    for (let h = 0; h < nH; h++) {
      const y = heights[h], dy = y - sy;
      if (dx * dx + dz * dz + dy * dy > reach * reach) continue;
      const L = wl + (sc.obstacles.length ? obstacleLoss(sc, sx, sy, sz, cx, y, cz) : 0);
      vx[n] = dx; vy[n] = dy; vz[n] = dz; att[n] = L ? Math.pow(10, -L / 20) : 1; ci[n] = c; hi[n] = h; n++;
    }
  }
  return { n, nH, vx, vy, vz, att, ci, hi };
}

/** Quality of every probe point for the given sensor state, written into out[0..n). */
export function runProbe(P, S, out) {
  for (let k = 0; k < P.n; k++) {
    const g = fovGain(S, P.vx[k], P.vy[k], P.vz[k]);
    out[k] = g ? quality(S, g, S.d, P.att[k]) : 0;
  }
  return out;
}

/** Id of the first room whose polygon contains (x, z), or null. */
export function roomAt(model, x, z) {
  for (const r of model.rooms) if (insideXZ(x, z, r.points)) return r.id;
  return null;
}

/** Glass facing penalty of a sensor: exterior windows it looks at, weighted by closeness and angle. Ceiling = 0. */
export function glassScore(model, sensor) {
  const s = ensureResolved(sensor);
  if (s.mount === "ceiling" || !model.glass.length) return 0;
  const limit = Math.max(10, Number(s.fov_h) / 2 - 10), phi = s.phi || 0, reach = Number(s.reach);
  let pen = 0;
  for (const g of model.glass) {
    for (let k = 0; k <= 10; k++) {
      const px = g.a[0] + ((g.b[0] - g.a[0]) * k) / 10, pz = g.a[1] + ((g.b[1] - g.a[1]) * k) / 10;
      const dx = px - s.x, dz = pz - s.z, d = Math.hypot(dx, dz);
      if (d < 0.3 || d > reach) continue;
      if (Math.abs(((Math.atan2(dz, dx) * RAD - phi + 540) % 360) - 180) > limit) continue;
      pen += (Math.abs(dx * g.n[0] + dz * g.n[1]) / d) * (1 - d / reach) / 11;
    }
  }
  return pen;
}

