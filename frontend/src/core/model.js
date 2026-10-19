// buildModel: turns one floor of a pp-plan into the calculation model plus drawing data.
// Same wall rule as NeonPlan 3D: a shared edge is an interior wall centred on the edge,
// an edge without neighbour is an exterior wall drawn fully outside the polygon.

import { dist, inside, insideXZ, orient, rectPoly, segRect } from "./geometry.js";

export const BRICK_DB = 25;
export const CLOSED_DOOR_DB = 6;
export const OBSTACLE_DB = 10;

const EPS = 0.005;
export const ENTRY_RADIUS = 0.9;
const NOT_OBSTACLE = ["lamp", "led_strip", "shower", "plant", "rug", "coat_rack"];

/** Zone rule for a furniture type, or null. `ring` = footprint excluded (zone is the ring only). */
export function zoneRule(type) {
  const t = String(type || "");
  if (t === "bed" || t === "bunk_bed") return { name: "bed", grow: 0, ring: false, height: 0.5 };
  if (t.startsWith("sofa") || t === "armchair") return { name: "sofa", grow: 0, ring: false, height: 0.9 };
  if (t === "desk") return { name: "desk", grow: 0.5, ring: false, height: 0.9 };
  if (t.startsWith("table")) return { name: "dining", grow: 0.45, ring: false, height: 0.9 };
  if (["kitchen", "worktop", "sink", "stove"].includes(t)) return { name: "kitchen", grow: 0.6, ring: true, height: 1.3 };
  if (t === "wc") return { name: "wc", grow: 0.3, ring: false, height: 0.9 };
  if (t === "shower") return { name: "shower", grow: 0, ring: false, height: 1.3 };
  if (t === "bathtub") return { name: "bathtub", grow: 0, ring: false, height: 1.3 };
  if (t === "washbasin") return { name: "washbasin", grow: 0.5, ring: true, height: 1.3 };
  return null;
}

/** Furniture with h >= 1.5 m that is not a lamp, led strip, shower, plant, rug or coat rack damps rays. */
export function isObstacle(f) {
  const t = String(f.type || "");
  return (f.h || 0) >= 1.5 && !t.startsWith("lamp") && !NOT_OBSTACLE.includes(t);
}

const keyOf = (s) => {
  const r = (v) => Math.round(v * 200) / 200;
  const A = [r(s.a[0]), r(s.a[1])], B = [r(s.b[0]), r(s.b[1])];
  return A[0] < B[0] || (A[0] === B[0] && A[1] < B[1]) ? `${A}|${B}` : `${B}|${A}`;
};

export function buildModel(plan, floorId) {
  const floor = (plan.floors || []).find((f) => f.id === floorId) || (floorId == null ? (plan.floors || [])[0] : null);
  if (!floor) throw new Error(`floor not found: ${floorId}`);
  const st = plan.settings || {};
  const wallExt = st.wall_exterior || 0.24, wallInt = st.wall_interior || 0.12;
  const floorH = floor.height || 2.6;
  const roomsSrc = (floor.rooms || []).filter((r) => (r.points || []).length >= 3);
  const rooms = roomsSrc.map((r) => ({
    id: r.id, name: r.name ?? r.id, area_id: r.area_id ?? null,
    points: r.points.map((p) => [p[0], p[1]]), height: r.ceiling_height || floorH,
  }));

  // 1. Split every room edge at vertices of other rooms that lie on it.
  const verts = [];
  rooms.forEach((r) => r.points.forEach((p) => verts.push(p)));
  const subs = [];
  roomsSrc.forEach((src, ri) => {
    const P = rooms[ri].points;
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length], L = dist(a, b);
      if (L < 1e-6) continue;
      const ux = (b[0] - a[0]) / L, uz = (b[1] - a[1]) / L;
      const ts = [0, L];
      for (const v of verts) {
        const dx = v[0] - a[0], dz = v[1] - a[1], t = dx * ux + dz * uz;
        if (Math.abs(dx * uz - dz * ux) < EPS && t > EPS && t < L - EPS) ts.push(t);
      }
      ts.sort((x, y) => x - y);
      const thick = (src.wall_thickness || [])[i], height = (src.wall_heights || [])[i];
      for (let k = 0; k < ts.length - 1; k++) {
        if (ts[k + 1] - ts[k] < EPS) continue;
        // inward normal of this piece: test a point just beside its middle
        const tm = (ts[k] + ts[k + 1]) / 2;
        let nx = -uz, nz = ux;
        if (!inside([a[0] + ux * tm + nx * 0.02, a[1] + uz * tm + nz * 0.02], P)) { nx = -nx; nz = -nz; }
        subs.push({
          a: k === 0 ? [a[0], a[1]] : [a[0] + ux * ts[k], a[1] + uz * ts[k]],
          b: k === ts.length - 2 ? [b[0], b[1]] : [a[0] + ux * ts[k + 1], a[1] + uz * ts[k + 1]],
          room: src.id, edge: i, t0: ts[k], t1: ts[k + 1], n: [nx, nz], u: [ux, uz], thick, noWall: height === 0,
        });
      }
    }
  });

  // 2. Group identical sub-edges: more than one room = interior (shared) wall.
  const groups = new Map();
  for (const s of subs) {
    s.key = keyOf(s);
    if (!groups.has(s.key)) groups.set(s.key, []);
    groups.get(s.key).push(s);
  }
  const bands = [], faces = [], segments = [];
  for (const arr of groups.values()) {
    const shared = new Set(arr.map((s) => s.room)).size > 1;
    const dflt = shared ? wallInt : wallExt;
    const t = Math.max(...arr.map((s) => (typeof s.thick === "number" && s.thick > 0 ? s.thick : dflt)));
    const none = arr.some((s) => s.noWall);
    for (const s of arr) { s.shared = shared; s.wallT = none ? 0 : t; }
    if (none) continue;
    const s = arr[0];
    if (shared) bands.push(segRect(s.a, s.b, t));
    else bands.push([s.a, s.b, [s.b[0] - s.n[0] * t, s.b[1] - s.n[1] * t], [s.a[0] - s.n[0] * t, s.a[1] - s.n[1] * t]]);
    const k = !shared || t >= 0.2 - 1e-9 ? "block" : t >= 0.1 - 1e-9 ? "brick" : "thin";
    segments.push({ a: s.a, b: s.b, k, t, shared });
  }
  for (const s of subs) {
    if (s.noWall) continue;
    const off = s.shared ? s.wallT / 2 : 0;
    faces.push({
      a: [s.a[0] + s.n[0] * off, s.a[1] + s.n[1] * off], b: [s.b[0] + s.n[0] * off, s.b[1] + s.n[1] * off],
      n: s.n, room: s.room, edge: s.edge, t0: s.t0, t1: s.t1, shared: s.shared, off,
    });
  }

  // 3. Openings: doors cut a span out of the wall, windows in exterior walls become glass.
  const byId = Object.fromEntries(rooms.map((r) => [r.id, r]));
  const srcById = Object.fromEntries(roomsSrc.map((r) => [r.id, r]));
  const windows = [], doors = [], glass = [];
  for (const o of floor.openings || []) {
    const r = byId[o.room_id];
    if (!r || !srcById[o.room_id]) continue;
    const P = r.points, a = P[o.edge], b = P[(o.edge + 1) % P.length];
    if (!a || !b) continue;
    const L = dist(a, b), ux = (b[0] - a[0]) / L, uz = (b[1] - a[1]) / L;
    const c0 = o.offset - o.width / 2, c1 = o.offset + o.width / 2;
    const p0 = [a[0] + ux * c0, a[1] + uz * c0], p1 = [a[0] + ux * c1, a[1] + uz * c1];
    const sub = subs.find((s) => s.room === r.id && s.edge === o.edge && o.offset >= s.t0 - 1e-6 && o.offset <= s.t1 + 1e-6) || {};
    const n = sub.n || [-uz, ux], t = sub.wallT || wallInt, shared = !!sub.shared;
    if (o.type === "window") {
      windows.push({ id: o.id, a: p0, b: p1, n, exterior: !shared, room: r.id, sill: o.sill ?? 0.9, height: o.height ?? 1.3, t: shared ? 0 : t });
      if (!shared) glass.push({ a: p0, b: p1, n, sill: o.sill ?? 0.9, height: o.height ?? 1.3 });
    } else {
      const sgn = o.swing === "out" ? -1 : 1;
      const hinge = o.hinge === "right" ? p1 : p0, other = o.hinge === "right" ? p0 : p1;
      const tip = [hinge[0] + n[0] * o.width * sgn, hinge[1] + n[1] * o.width * sgn];
      const mid = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      doors.push({
        id: o.id, a: p0, b: p1, hinge, tip, other, w: o.width, rooms: [r.id], contact: o.contact ?? null,
        outside: !shared, mid, room: r.id, swing: o.swing || "in", sill: o.sill ?? 0, height: o.height ?? 2.0, t,
      });
      // Cut the door span out of the calculation wall.
      for (let i = segments.length - 1; i >= 0; i--) {
        const m = segments[i];
        const w = dist(p0, p1) || 1;
        if (Math.abs(orient(p0, p1, m.a)) / w > EPS || Math.abs(orient(p0, p1, m.b)) / w > EPS) continue;
        const ta = (m.a[0] - p0[0]) * ux + (m.a[1] - p0[1]) * uz, tb = (m.b[0] - p0[0]) * ux + (m.b[1] - p0[1]) * uz;
        const lo = Math.min(ta, tb), hi = Math.max(ta, tb);
        if (hi <= EPS || lo >= w - EPS) continue;
        segments.splice(i, 1);
        const at = (q) => [p0[0] + ux * q, p0[1] + uz * q];
        if (lo < -EPS) segments.push({ ...m, a: at(lo), b: [p0[0], p0[1]] });
        if (hi > w + EPS) segments.push({ ...m, a: at(w), b: at(hi) });
      }
    }
  }
  // Rooms on both sides of every door (entry zones).
  for (const d of doors) {
    const L = dist(d.a, d.b) || 1, nx = -(d.b[1] - d.a[1]) / L, nz = (d.b[0] - d.a[0]) / L;
    d.rooms = rooms
      .filter((r) => insideXZ(d.mid[0] + nx * 0.3, d.mid[1] + nz * 0.3, r.points) || insideXZ(d.mid[0] - nx * 0.3, d.mid[1] - nz * 0.3, r.points))
      .map((r) => r.id);
  }

  // 4. Free walls (chimney, shaft): tall ones block rays like masonry.
  const freeWalls = (floor.walls || []).map((w) => ({
    id: w.id, poly: segRect(w.a, w.b, w.thickness || wallInt), height: w.height ?? null,
    block: w.height == null || w.height >= 1.5,
  }));

  // 5. Furniture and zones.
  const furniture = (floor.furniture || []).map((f) => ({
    id: f.id, type: f.type, poly: rectPoly(f.x, f.z, f.w || 0.3, f.d || 0.3, f.rotation || 0), h: f.h || 0, obstacle: isObstacle(f),
  }));
  const zones = [];
  (floor.furniture || []).forEach((f, i) => {
    const rule = zoneRule(f.type);
    if (!rule) return;
    const room = rooms.find((r) => insideXZ(f.x, f.z, r.points));
    if (!room) return;
    zones.push({
      name: rule.name, room: room.id, height: rule.height,
      outer: rectPoly(f.x, f.z, f.w || 0.3, f.d || 0.3, f.rotation || 0, rule.grow), inner: rule.ring ? furniture[i].poly : null,
    });
  });

  // Entry zones: cells within 0.9 m of a door centre, on both sides of the door.
  const entryZones = [];
  for (const d of doors) {
    for (const rid of d.rooms) entryZones.push({ name: "entry", room: rid, height: 1.3, center: d.mid, radius: ENTRY_RADIUS, door: d.id });
  }

  // 6. Bounds.
  const pts = [...bands.flat(), ...rooms.flatMap((r) => r.points), ...(floor.outdoor || []).flatMap((o) => o.points || [])];
  const xs = pts.map((p) => p[0]), zs = pts.map((p) => p[1]);
  const bounds = { x0: Math.min(...xs) - 0.4, x1: Math.max(...xs) + 0.4, z0: Math.min(...zs) - 0.4, z1: Math.max(...zs) + 0.4 };

  const model = {
    floor: { id: floor.id, name: floor.name ?? floor.id, height: floorH },
    rooms, bands, faces, segments, doors, windows, glass, freeWalls, furniture, zones, entryZones, cells: {}, bounds,
    outdoor: floor.outdoor || [],
  };
  // wall pieces with thickness and normals, used by the optimizer; not part of the drawing data
  Object.defineProperty(model, "subs", { value: subs, enumerable: false });
  model.cells["0.1"] = buildCells(model, 0.1);
  model.cells["0.2"] = buildCells(model, 0.2);
  return model;
}

/**
 * Grid cells with spacing `step` over every room polygon (centres at min + step * (i + 0.5)).
 * Centres inside wall bands and free walls are dropped. Coordinates are rounded to 1e-6.
 */
export function buildCells(model, step) {
  const cells = [];
  const blockers = [...model.bands.map((p) => ({ p, b: boxOf(p) })), ...model.freeWalls.map((w) => ({ p: w.poly, b: boxOf(w.poly) }))];
  for (const r of model.rooms) {
    const bb = boxOf(r.points);
    for (let i = 0; ; i++) {
      const x = bb[0] + step * (i + 0.5);
      if (x >= bb[1]) break;
      for (let j = 0; ; j++) {
        const z = bb[2] + step * (j + 0.5);
        if (z >= bb[3]) break;
        if (!insideXZ(x, z, r.points)) continue;
        let blocked = false;
        for (const { p, b } of blockers) {
          if (b[0] <= x && x <= b[1] && b[2] <= z && z <= b[3] && insideXZ(x, z, p)) { blocked = true; break; }
        }
        if (!blocked) cells.push({ x: Math.round(x * 1e6) / 1e6, z: Math.round(z * 1e6) / 1e6, room: r.id });
      }
    }
  }
  return cells;
}

function boxOf(poly) {
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (const p of poly) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); z0 = Math.min(z0, p[1]); z1 = Math.max(z1, p[1]); }
  return [x0, x1, z0, z1];
}

/** Cells for a given spacing: the prebuilt lists for 0.1 and 0.2, others are built once and cached. */
export function cellsFor(model, step) {
  const key = String(step);
  if (!model.cells[key]) {
    Object.defineProperty(model.cells, key, { value: buildCells(model, step), enumerable: false, writable: true, configurable: true });
  }
  return model.cells[key];
}

/** Snap a plan point to the nearest wall face of the model: returns {d, x, z, along} or null. */
export function snapPoint(model, p, inset = 0.03) {
  let best = null;
  for (const f of model.faces) {
    const bx = f.b[0] - f.a[0], bz = f.b[1] - f.a[1], L2 = bx * bx + bz * bz;
    if (L2 < 1e-6) continue;
    const L = Math.sqrt(L2);
    let t = ((p[0] - f.a[0]) * bx + (p[1] - f.a[1]) * bz) / L2;
    t = Math.max(0.04 / L, Math.min(1 - 0.04 / L, t));
    const px = f.a[0] + bx * t, pz = f.a[1] + bz * t, d = Math.hypot(p[0] - px, p[1] - pz);
    if (!best || d < best.d) best = { d, x: px + f.n[0] * inset, z: pz + f.n[1] * inset, along: [t * L, (1 - t) * L], room: f.room, n: f.n };
  }
  return best;
}
