// evaluate(): coverage, misfire risk, zone shares per room. spillDetail(): where a sensor leaks into other rooms.
// Semantics follow the contract and the Python core: own coverage uses the doors of the options, misfire risk,
// per-sensor spill and spill detail always use open doors (worst case) at standing height 1.3 m.

import { insideXZ, round4 } from "./geometry.js";
import { cellsFor } from "./model.js";
import {
  normOpts, getScene, ensureResolved, sensorState, prepareProbe, runProbe, cellArrays, roomAt, glassScore, crossedDoors,
} from "./engine.js";

export const STANDING = 1.3;
export const heightKey = (h) => String(h);

/** Active sensors of the model's floor with profile defaults filled in. */
export function activeSensors(model, sensors) {
  return (sensors || [])
    .filter((s) => s.active !== false && (s.floor_id == null || s.floor_id === model.floor.id))
    .map((s) => ensureResolved(s));
}

/** Zones merged per (name, room) in order of first appearance, with the union of their cell indices. */
export function zoneGroups(model, cells) {
  const order = new Map();
  const add = (z) => {
    const k = `${z.name}|${z.room}`;
    if (!order.has(k)) order.set(k, { name: z.name, room: z.room, height: z.height, parts: [] });
    order.get(k).parts.push(z);
  };
  model.zones.forEach(add);
  model.entryZones.forEach(add);
  const groups = [...order.values()];
  for (const g of groups) {
    g.idx = [];
    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      if (c.room !== g.room) continue;
      for (const p of g.parts) {
        const hit = p.center
          ? Math.hypot(c.x - p.center[0], c.z - p.center[1]) < p.radius
          : insideXZ(c.x, c.z, p.outer) && !(p.inner && insideXZ(c.x, c.z, p.inner));
        if (hit) { g.idx.push(i); break; }
      }
    }
  }
  return groups;
}

export function evaluate(model, sensors, opts) {
  const o = normOpts(opts);
  const scUser = getScene(model, o);
  const scOpen = getScene(model, { ...o, doors: "open" });
  const cells = cellsFor(model, o.cell);
  const ca = cellArrays(cells, model);
  const nC = cells.length, nR = model.rooms.length;
  const sens = activeSensors(model, sensors), nS = sens.length;
  const states = sens.map((s) => sensorState(s));
  const sRoom = sens.map((s) => roomAt(model, s.x, s.z));
  const all = new Int32Array(nC);
  for (let i = 0; i < nC; i++) all[i] = i;
  const roomIdx = new Map(model.rooms.map((r, i) => [r.id, i]));
  const sRoomIdx = sRoom.map((id) => (id == null ? -1 : roomIdx.get(id)));
  const roomCells = new Array(nR).fill(0);
  for (let c = 0; c < nC; c++) roomCells[ca.room[c]]++;

  // quality of sensor j for a height list, doors as in the options: Float32Array [cell * nh + h]
  const qCache = new Map();
  const qUser = (j, heights) => {
    const key = `${j}|${heights.join(",")}`;
    if (qCache.has(key)) return qCache.get(key);
    const S = states[j], nh = heights.length;
    const P = prepareProbe(scUser, S.x, S.y, S.z, S.reach, ca, all, heights);
    const out = runProbe(P, S, new Float64Array(P.n));
    const q = new Float32Array(nC * nh);
    for (let k = 0; k < P.n; k++) if (out[k] > 0) q[P.ci[k] * nh + P.hi[k]] = out[k];
    qCache.set(key, q);
    return q;
  };
  // visibility at standing height with open doors (misfire worst case); also for grid heights
  const openCache = new Map();
  const qOpen = (j, heights) => {
    const key = `${j}|${heights.join(",")}`;
    if (openCache.has(key)) return openCache.get(key);
    const S = states[j], nh = heights.length;
    const P = prepareProbe(scOpen, S.x, S.y, S.z, S.reach, ca, all, heights);
    const out = runProbe(P, S, new Float64Array(P.n));
    const q = new Float32Array(nC * nh);
    for (let k = 0; k < P.n; k++) if (out[k] > 0) q[P.ci[k] * nh + P.hi[k]] = out[k];
    openCache.set(key, q);
    return q;
  };

  const rooms = {}, sensorsOut = {};
  sens.forEach((s, j) => { sensorsOut[s.entity_id] = { room: sRoom[j], glass: round4(glassScore(model, s)), spill: {} }; });

  // foreign visibility at 1.3 m, doors open
  const seeOpen = sens.map((s, j) => qOpen(j, [STANDING]));

  const cellsOf = model.rooms.map(() => []);
  for (let c = 0; c < nC; c++) cellsOf[ca.room[c]].push(c);

  model.rooms.forEach((r, ri) => {
    const idxs = cellsOf[ri], total = idxs.length;
    const own = [];
    for (let j = 0; j < nS; j++) if (sRoomIdx[j] === ri) own.push(j);
    const coverage = {}, seen = {};
    const ownQ = own.map((j) => qUser(j, o.heights));
    o.heights.forEach((h, hi) => {
      if (!total) { coverage[heightKey(h)] = 0; seen[heightKey(h)] = 0; return; }
      let sum = 0, cnt = 0;
      for (const c of idxs) {
        let best = 0;
        for (const q of ownQ) { const v = q[c * o.heights.length + hi]; if (v > best) best = v; }
        sum += best; if (best > 0) cnt++;
      }
      coverage[heightKey(h)] = round4(sum / total);
      seen[heightKey(h)] = round4(cnt / total);
    });
    const covVals = Object.values(coverage);
    const from = {};
    const union = new Uint8Array(total);
    for (let j = 0; j < nS; j++) {
      if (sRoomIdx[j] === ri) continue;
      let cnt = 0;
      idxs.forEach((c, k) => { if (seeOpen[j][c] > 0) { cnt++; union[k] = 1; } });
      const share = total ? round4(cnt / total) : 0;
      from[sens[j].entity_id] = share;
      sensorsOut[sens[j].entity_id].spill[r.id] = share;
    }
    let misfire = 0;
    for (let k = 0; k < total; k++) misfire += union[k];
    rooms[r.id] = {
      coverage, coverage_mean: covVals.length ? round4(covVals.reduce((a, b) => a + b, 0) / covVals.length) : 0, seen,
      misfire_risk: total ? round4(misfire / total) : 0, from, own_sensors: own.map((j) => sens[j].entity_id),
    };
  });

  // zones: share of zone cells seen at the zone height by the sensors located in the zone's room
  const zones = [];
  for (const g of zoneGroups(model, cells)) {
    if (!g.idx.length) continue;
    const ri = roomIdx.get(g.room);
    const ownQ = [];
    for (let j = 0; j < nS; j++) if (sRoomIdx[j] === ri) ownQ.push(qUser(j, [g.height]));
    let hit = 0;
    for (const c of g.idx) if (ownQ.some((q) => q[c] > 0)) hit++;
    zones.push({ name: g.name, room: g.room, height: g.height, share: round4(hit / g.idx.length) });
  }

  const result = { rooms, sensors: sensorsOut, zones, grid: {} };
  if (o.grid) {
    for (const h of o.heights) {
      const rows = [];
      const own = o.heights.indexOf(h);
      model.rooms.forEach((r, ri) => {
        const ownJ = [];
        for (let j = 0; j < nS; j++) if (sRoomIdx[j] === ri) ownJ.push(j);
        for (const c of cellsOf[ri]) {
          let best = 0, who = null;
          for (const j of ownJ) { const q = qUser(j, o.heights)[c * o.heights.length + own]; if (q > best) { best = q; who = sens[j].entity_id; } }
          const spill = [];
          for (let j = 0; j < nS; j++) if (sRoomIdx[j] !== ri && qOpen(j, [h])[c] > 0) spill.push(sens[j].entity_id);
          rows.push({ x: round4(cells[c].x), z: round4(cells[c].z), room: r.id, own: round4(best), own_sensor: who, spill });
        }
      });
      result.grid[heightKey(h)] = rows;
    }
  }
  return result;
}

/**
 * Spill of one sensor into foreign rooms at 1.3 m with open doors. Every seen cell of a foreign room is
 * attributed to the first door opening its ray crosses, or to "walls" when it crosses none.
 */
export function spillDetail(model, sensor, opts) {
  const o = normOpts(opts);
  const sc = getScene(model, { ...o, doors: "open" });
  const cells = cellsFor(model, o.cell);
  const ca = cellArrays(cells, model);
  const s = ensureResolved(sensor);
  const S = sensorState(s);
  const home = roomAt(model, s.x, s.z);
  const homeIdx = home == null ? -1 : model.rooms.findIndex((r) => r.id === home);
  const sel = [];
  for (let c = 0; c < cells.length; c++) if (ca.room[c] !== homeIdx) sel.push(c);
  const P = prepareProbe(sc, S.x, S.y, S.z, S.reach, ca, Int32Array.from(sel), [STANDING]);
  const q = runProbe(P, S, new Float64Array(P.n));
  const n = new Array(model.rooms.length).fill(0), walls = new Array(model.rooms.length).fill(0);
  const doors = model.rooms.map(() => ({}));
  const paths = model.rooms.map(() => new Map());
  for (let c = 0; c < cells.length; c++) n[ca.room[c]]++;
  for (let k = 0; k < P.n; k++) {
    if (!(q[k] > 0)) continue;
    const c = P.ci[k], r = ca.room[c];
    const ids = [...new Set(crossedDoors(sc, S.x, S.z, ca.x[c], ca.z[c]).map((i) => model.doors[i].id))].sort();
    if (!ids.length) walls[r]++;
    else if (ids.length === 1) { const id = ids[0]; doors[r][id] = (doors[r][id] || 0) + 1; }
    else { const key = JSON.stringify(ids); paths[r].set(key, (paths[r].get(key) || 0) + 1); }
  }
  const out = {};
  model.rooms.forEach((r, ri) => {
    if (ri === homeIdx) return;
    const total = n[ri];
    const seen = walls[ri] + Object.values(doors[ri]).reduce((a, b) => a + b, 0) + [...paths[ri].values()].reduce((a, b) => a + b, 0);
    const dd = {};
    for (const [id, v] of Object.entries(doors[ri])) dd[id] = round4(v / total);
    out[r.id] = { total: total ? round4(seen / total) : 0, walls: total ? round4(walls[ri] / total) : 0, doors: dd };
    if (paths[ri].size) out[r.id].door_paths = [...paths[ri]].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([ids, count]) => ({ doors: JSON.parse(ids), share: round4(count / total) }));
  });
  return out;
}
