// optimize(): best mount point and direction for one room (same algorithm and constants as the Python core).
// Candidates: wall points every 0.1 m, convex corners, a 0.5 m ceiling grid for ceiling-capable profiles.
// Score = weighted room coverage (zones x3, entry zones x2) - weight * spill (hall-type rooms x3) - 0.3 * glass.
// Everything independent of the viewing direction (distance, ray attenuation) is computed once per position.

import { insideXZ, distToSeg, normDeg, round4 } from "./geometry.js";
import { cellsFor } from "./model.js";
import {
  normOpts, getScene, resolveSensor, sensorState, fovGain, wallLoss, obstacleLoss, glassScore, cellArrays,
} from "./engine.js";
import { zoneGroups, STANDING } from "./evaluate.js";
import { PROFILES } from "./profiles.js";

const WALL_STEP = 0.1, WALL_INSET = 0.03, CEILING_STEP = 0.5;
const WALL_HEIGHT = 1.9, WALL_TILT = 10;
const NORMAL_RANGE = 70, DIR_STEP = 10, CORNER_RANGE = 30;
const REFINE_STEPS = [-5, -2.5, 2.5, 5], REFINE_POSITIONS = 20;
const DISTINCT_DISTANCE = 0.4;
const ZONE_WEIGHT = 3, ENTRY_WEIGHT = 2, GLASS_WEIGHT = 0.3, HALL_SPILL_FACTOR = 3;
const HALL_WORDS = ["flur", "hall", "corridor", "diele", "entry", "entrance", "eingang", "vorraum", "lobby"];
const TOP_N = 5;

export function isHallRoom(room) {
  const text = `${room.id ?? ""} ${room.name ?? ""}`.toLowerCase();
  return HALL_WORDS.some((w) => text.includes(w));
}

const range = (from, to, step) => { const out = []; for (let v = from; v <= to; v += step) out.push(v); return out; };

/** True if the point is inside the polygon or closer than `margin` to its outline. */
function nearPolygon(x, z, poly, margin) {
  if (insideXZ(x, z, poly)) return true;
  for (let i = 0; i < poly.length; i++) if (distToSeg(x, z, poly[i], poly[(i + 1) % poly.length]) < margin) return true;
  return false;
}

/** Weighted own-room sample points and foreign-room spill points for one room. */
function buildTargets(model, room, o, cells, ca) {
  const heights = o.heights.length ? o.heights : [STANDING];
  const nH = heights.length;
  const ri = model.rooms.indexOf(room);
  const ownIdx = [];
  for (let c = 0; c < cells.length; c++) if (ca.room[c] === ri) ownIdx.push(c);
  const nCells = ownIdx.length;
  // per own cell: map height -> [ws, wp]
  const perCell = new Map();
  for (const c of ownIdx) {
    const m = new Map();
    for (const h of heights) m.set(h, [1 / nH, 1 / (nCells * nH)]);
    perCell.set(c, m);
  }
  let den = nCells;
  for (const g of zoneGroups(model, cells)) {
    if (g.room !== room.id) continue;
    const w = g.name === "entry" ? ENTRY_WEIGHT : ZONE_WEIGHT;
    den += w * g.idx.length;
    for (const c of g.idx) {
      const m = perCell.get(c);
      if (!m.has(g.height)) m.set(g.height, [0, 0]);
      m.get(g.height)[0] += w;
    }
  }
  den = den || 1;
  const own = { cx: [], cz: [], py: [], ws: [], wp: [] };
  for (const c of ownIdx) {
    for (const [h, [ws, wp]] of perCell.get(c)) {
      own.cx.push(cells[c].x); own.cz.push(cells[c].z); own.py.push(h); own.ws.push(ws / den); own.wp.push(wp);
    }
  }
  const spill = { rooms: [], n: [], mult: [], cx: [], cz: [], sr: [] };
  model.rooms.forEach((r, rj) => {
    if (r.id === room.id) return;
    const idx = [];
    for (let c = 0; c < cells.length; c++) if (ca.room[c] === rj) idx.push(c);
    if (!idx.length) return;
    const k = spill.rooms.length;
    spill.rooms.push(r.id); spill.n.push(idx.length); spill.mult.push(isHallRoom(r) ? HALL_SPILL_FACTOR : 1);
    for (const c of idx) { spill.cx.push(cells[c].x); spill.cz.push(cells[c].z); spill.sr.push(k); }
  });
  return { own, spill };
}

/** Direction independent data: the points a sensor at (x, y, z) can reach, with vectors and attenuation. */
function positionData(sc, tg, x, y, z, reach) {
  const r2 = reach * reach;
  const own = [];
  const O = tg.own;
  let lastX = NaN, lastZ = NaN, wl = 0;
  for (let k = 0; k < O.cx.length; k++) {
    const px = O.cx[k], pz = O.cz[k], py = O.py[k];
    const vx = px - x, vy = py - y, vz = pz - z, d2 = vx * vx + vy * vy + vz * vz;
    if (d2 > r2 || d2 < 1e-12) continue;
    // wall loss is the same for all heights of one cell (points are stored cell by cell)
    if (px !== lastX || pz !== lastZ) { wl = wallLoss(sc, x, z, px, pz); lastX = px; lastZ = pz; }
    if (wl === Infinity) continue;
    const L = wl + obstacleLoss(sc, x, y, z, px, py, pz);
    const att = Math.pow(10, -L / 20), d = Math.sqrt(d2);
    if (d > reach * att) continue;
    own.push(vx, vy, vz, d, att, O.ws[k], O.wp[k]);
  }
  const spill = [];
  const Sp = tg.spill;
  for (let k = 0; k < Sp.cx.length; k++) {
    const px = Sp.cx[k], pz = Sp.cz[k];
    const vx = px - x, vy = STANDING - y, vz = pz - z, d2 = vx * vx + vy * vy + vz * vz;
    if (d2 > r2 || d2 < 1e-12) continue;
    const wl2 = wallLoss(sc, x, z, px, pz);
    if (wl2 === Infinity) continue;
    const L = wl2 + obstacleLoss(sc, x, y, z, px, STANDING, pz);
    const att = Math.pow(10, -L / 20), d = Math.sqrt(d2);
    if (d > reach * att) continue;
    spill.push(vx, vy, vz, d, att, Sp.sr[k]);
  }
  return { own, spill };
}

function scoreDirection(model, tg, data, tpl, phi, weight) {
  const sensor = { ...tpl, phi };
  const S = sensorState(sensor);
  const reach = S.reach, k58 = 0.58 * reach, span = reach - k58;
  let covS = 0, covP = 0;
  const own = data.own;
  for (let i = 0; i < own.length; i += 7) {
    const g = fovGain(S, own[i], own[i + 1], own[i + 2]);
    const d = own[i + 3];
    if (!g || d > reach * g * own[i + 4]) continue;
    const q = d <= k58 ? 1 : 1 - (0.4 * (d - k58)) / span;
    covS += own[i + 5] * q; covP += own[i + 6] * q;
  }
  const counts = new Array(tg.spill.rooms.length).fill(0);
  const sp = data.spill;
  for (let i = 0; i < sp.length; i += 6) {
    const g = fovGain(S, sp[i], sp[i + 1], sp[i + 2]);
    if (!g || sp[i + 3] > reach * g * sp[i + 4]) continue;
    counts[sp[i + 5]]++;
  }
  const shares = {};
  let spillW = 0;
  counts.forEach((c, ri) => {
    if (!c) return;
    const share = c / tg.spill.n[ri];
    shares[tg.spill.rooms[ri]] = share;
    spillW += tg.spill.mult[ri] * share;
  });
  const glass = glassScore(model, sensor);
  return { phi: normDeg(phi), score: covS - weight * spillW - GLASS_WEIGHT * glass, coverage: covP, spill: shares, glass };
}

/** True when a wall or corner mount at this point would sit in or on something. */
function blockedMount(model, room, x, z) {
  if (!insideXZ(x, z, room.points)) return true;
  for (const band of model.bands) {
    const b = bboxOf(band);
    if (b[0] <= x && x <= b[1] && b[2] <= z && z <= b[3] && insideXZ(x, z, band)) return true;
  }
  for (const w of model.freeWalls) if (nearPolygon(x, z, w.poly, 0.05)) return true;
  for (const o of [...model.doors, ...model.windows]) {
    const a = o.a, b = o.b, len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const ux = (b[0] - a[0]) / len, uz = (b[1] - a[1]) / len;
    const along = (x - a[0]) * ux + (z - a[1]) * uz, lateral = Math.abs((x - a[0]) * uz - (z - a[1]) * ux);
    if (along >= -0.15 && along <= len + 0.15 && lateral < 0.5) return true;
  }
  for (const f of model.furniture) {
    if (f.h >= 1.5 && !String(f.type).startsWith("lamp") && nearPolygon(x, z, f.poly, 0.08)) return true;
  }
  return false;
}

function bboxOf(poly) {
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (const p of poly) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[1]); z1 = Math.max(z1, p[1]); }
  return [x0, x1, z0, z1];
}

function wallCandidates(model, room) {
  const out = [];
  const subs = model.subs.filter((s) => s.room === room.id);
  const pts = room.points;
  for (let ei = 0; ei < pts.length; ei++) {
    const edgeSubs = subs.filter((s) => s.edge === ei).sort((p, q) => p.t0 - q.t0);
    if (!edgeSubs.length) continue;
    const a = pts[ei], u = edgeSubs[0].u, length = edgeSubs[edgeSubs.length - 1].t1;
    for (let k = 0; ; k++) {
      const t = WALL_INSET + WALL_STEP * k;
      if (t > length - WALL_INSET + 1e-9) break;
      const sub = edgeSubs.find((s) => s.t0 - 1e-9 <= t && t <= s.t1 + 1e-9);
      if (!sub || sub.wallT <= 0) continue;
      const off = (sub.shared ? sub.wallT / 2 : 0) + WALL_INSET;
      const x = a[0] + u[0] * t + sub.n[0] * off, z = a[1] + u[1] * t + sub.n[1] * off;
      if (blockedMount(model, room, x, z)) continue;
      const phiN = Math.atan2(sub.n[1], sub.n[0]) * 180 / Math.PI;
      out.push({ x, z, mount: "wall", phis: range(-NORMAL_RANGE, NORMAL_RANGE, DIR_STEP).map((d) => phiN + d) });
    }
  }
  return out;
}

function cornerCandidates(model, room) {
  const out = [];
  const pts = room.points, n = pts.length;
  let area = 0;
  for (let i = 0; i < n; i++) { const p = pts[(i + n - 1) % n]; area += p[0] * pts[i][1] - pts[i][0] * p[1]; }
  const subs = model.subs.filter((s) => s.room === room.id);
  for (let i = 0; i < n; i++) {
    const prevSubs = subs.filter((s) => s.edge === (i + n - 1) % n), nextSubs = subs.filter((s) => s.edge === i);
    if (!prevSubs.length || !nextSubs.length) continue;
    const s1 = prevSubs.reduce((p, q) => (q.t1 > p.t1 ? q : p)), s2 = nextSubs.reduce((p, q) => (q.t0 < p.t0 ? q : p));
    if (s1.wallT <= 0 || s2.wallT <= 0) continue;
    const e1 = s1.u, e2 = s2.u;
    if ((e1[0] * e2[1] - e1[1] * e2[0]) * area <= 0) continue; // reflex or straight vertex
    const n1 = s1.n, n2 = s2.n, det = n1[0] * n2[1] - n1[1] * n2[0];
    if (Math.abs(det) < 0.2) continue;
    const d1 = (s1.shared ? s1.wallT / 2 : 0) + WALL_INSET, d2 = (s2.shared ? s2.wallT / 2 : 0) + WALL_INSET;
    const v = pts[i];
    const x = v[0] + (d1 * n2[1] - d2 * n1[1]) / det, z = v[1] + (n1[0] * d2 - n2[0] * d1) / det;
    if (blockedMount(model, room, x, z)) continue;
    const phiB = Math.atan2(n1[1] + n2[1], n1[0] + n2[0]) * 180 / Math.PI;
    out.push({ x, z, mount: "corner", phis: range(-CORNER_RANGE, CORNER_RANGE, DIR_STEP).map((d) => phiB + d) });
  }
  return out;
}

function ceilingCandidates(model, room) {
  const out = [];
  const [x0, x1, z0, z1] = bboxOf(room.points);
  for (let i = Math.ceil(x0 / CEILING_STEP - 1e-9); i * CEILING_STEP <= x1; i++) {
    const x = i * CEILING_STEP;
    for (let j = Math.ceil(z0 / CEILING_STEP - 1e-9); j * CEILING_STEP <= z1; j++) {
      const z = j * CEILING_STEP;
      if (!insideXZ(x, z, room.points)) continue;
      if (model.bands.some((b) => insideXZ(x, z, b))) continue;
      if (model.freeWalls.some((w) => insideXZ(x, z, w.poly))) continue;
      out.push({ x, z, mount: "ceiling", phis: [0] });
    }
  }
  return out;
}

const cmp = (a, b) => (b.best.score - a.best.score) || (a.cand.x - b.cand.x) || (a.cand.z - b.cand.z) || (a.best.phi - b.best.phi);

/**
 * Best mount points for `roomId`: up to 5 distinct candidates, best first.
 * @param {object} model       result of buildModel
 * @param {string} roomId      target room
 * @param {string} profileId   profile id from PROFILES
 * @param {object} opts        {heights, doors, thin_db, cell}; doors are always open here (worst case)
 * @param {number} weight      misfire weight, 0 = coverage only, 2 = strongly avoid misfires
 * @param {object} profiles    profile catalogue (default PROFILES)
 * @param {function} onProgress optional, called with a fraction 0..1
 */
export function optimize(model, roomId, profileId, opts, weight = 1, profiles = PROFILES, onProgress = null) {
  const o = normOpts(opts);
  const room = model.rooms.find((r) => r.id === roomId);
  if (!room) throw new Error(`room not found: ${roomId}`);
  const prof = (profiles.profiles || []).find((p) => p.id === profileId) || (profiles.profiles || []).find((p) => p.id === "custom");
  const sc = getScene(model, { ...o, doors: "open" });
  const cells = cellsFor(model, o.cell);
  const ca = cellArrays(cells, model);
  const tg = buildTargets(model, room, o, cells, ca);
  const mounts = prof.mounts || ["wall"];

  const cands = [];
  if (mounts.includes("wall")) cands.push(...wallCandidates(model, room));
  if (mounts.includes("corner")) cands.push(...cornerCandidates(model, room));
  if (mounts.includes("ceiling")) cands.push(...ceilingCandidates(model, room));

  const wallH = Math.min(WALL_HEIGHT, room.height - 0.1);
  const results = [];
  cands.forEach((c, ci) => {
    const ceiling = c.mount === "ceiling";
    const height = ceiling ? room.height : wallH, tilt = ceiling ? 90 : WALL_TILT;
    const tpl = resolveSensor({ entity_id: "candidate", profile: prof.id, mount: c.mount, x: c.x, z: c.z, height, tilt, phi: 0 }, profiles);
    const data = positionData(sc, tg, c.x, height, c.z, Number(tpl.reach));
    let best = null;
    for (const phi of c.phis) {
      const r = scoreDirection(model, tg, data, tpl, phi, weight);
      if (best === null || r.score > best.score + 1e-12) best = r;
    }
    results.push({ cand: c, tpl, data, best, height, tilt });
    if (onProgress && (ci % 10 === 0)) onProgress(0.9 * (ci + 1) / cands.length);
  });

  results.sort(cmp);
  for (const r of results.slice(0, REFINE_POSITIONS)) {
    if (r.cand.mount === "ceiling") continue;
    const base = r.best;
    for (const step of REFINE_STEPS) {
      const alt = scoreDirection(model, tg, r.data, r.tpl, base.phi + step, weight);
      if (alt.score > r.best.score + 1e-12) r.best = alt;
    }
  }
  results.sort(cmp);

  const out = [];
  for (const r of results) {
    const c = r.cand;
    if (out.some((q) => Math.hypot(c.x - q.x, c.z - q.z) < DISTINCT_DISTANCE)) continue;
    const b = r.best;
    const spill = {};
    for (const [k, v] of Object.entries(b.spill)) spill[k] = round4(v);
    out.push({
      x: round4(c.x), z: round4(c.z), height: round4(r.height), phi: Math.round(b.phi * 100) / 100, tilt: r.tilt, mount: c.mount,
      score: round4(b.score), coverage: round4(b.coverage), spill, glass: round4(b.glass),
    });
    if (out.length >= TOP_N) break;
  }
  if (onProgress) onProgress(1);
  return out;
}
