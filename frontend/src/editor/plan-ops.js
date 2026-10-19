// Pure plan mutations for the floor plan editor. Every function takes a pp-plan and returns a new
// pp-plan; the input is never changed. Unchanged parts are shared by reference.

import {
  EPS,
  add,
  clamp,
  cleanPolygon,
  dist,
  edgeOf,
  furnitureCorners,
  normDeg,
  pointInPolygon,
  projectOnSegment,
  roundMm,
  roundPoint,
  sub,
} from "./geometry.js";
import { DEFAULT_SETTINGS, wallTargets } from "./walls.js";
import { FURNITURE_SIZE } from "./furniture.js";

export const DEFAULT_FLOOR_HEIGHT = 2.6;
export const OPENING_DEFAULTS = {
  door: { width: 0.9, sill: 0, height: 2.0, hinge: "left", swing: "in" },
  window: { width: 1.2, sill: 0.9, height: 1.3, hinge: "left", swing: "in" },
};

export function emptyPlan() {
  return { version: 1, settings: { ...DEFAULT_SETTINGS }, floors: [] };
}

/** Accept null/partial input and return a plan with the required top-level keys. */
export function normalizePlan(plan) {
  if (!plan || typeof plan !== "object") return emptyPlan();
  if (Array.isArray(plan.floors) && plan.settings && plan.version) return plan;
  return { version: 1, ...plan, settings: { ...DEFAULT_SETTINGS, ...(plan.settings || {}) }, floors: plan.floors || [] };
}

export function getFloor(plan, floorId) {
  return (plan && plan.floors && plan.floors.find((f) => f.id === floorId)) || null;
}

/** Fill the list keys a floor needs, without touching existing values. */
function completeFloor(f) {
  return {
    rooms: [],
    openings: [],
    walls: [],
    furniture: [],
    outdoor: [],
    background: null,
    ...f,
  };
}

/** Replace one floor using fn(floor) → new floor. */
export function updateFloor(plan, floorId, fn) {
  let found = false;
  const floors = plan.floors.map((f) => {
    if (f.id !== floorId) return f;
    found = true;
    return fn(completeFloor(f));
  });
  return found ? { ...plan, floors } : plan;
}

/** Smallest free id `${prefix}_${n}` among the given ids. */
export function newId(prefix, taken) {
  const set = new Set(taken);
  let n = 1;
  while (set.has(`${prefix}_${n}`)) n++;
  return `${prefix}_${n}`;
}

function allFloorIds(floor) {
  return [
    ...(floor.rooms || []).map((r) => r.id),
    ...(floor.openings || []).map((o) => o.id),
    ...(floor.walls || []).map((w) => w.id),
    ...(floor.furniture || []).map((f) => f.id),
  ];
}

// ---------------------------------------------------------------- floors

export function addFloor(plan, props = {}) {
  const p = normalizePlan(plan);
  const id = props.id || newId("floor", p.floors.map((f) => f.id));
  let elevation = 0;
  for (const f of p.floors) elevation = Math.max(elevation, (f.elevation || 0) + (f.height || DEFAULT_FLOOR_HEIGHT));
  const floor = completeFloor({
    id,
    name: props.name || id,
    ha_floor: props.ha_floor ?? null,
    elevation: props.elevation ?? roundMm(elevation),
    height: props.height ?? DEFAULT_FLOOR_HEIGHT,
  });
  return { ...p, floors: [...p.floors, floor] };
}

/** Change floor properties: name, ha_floor, height, elevation. */
export function setFloorProps(plan, floorId, props) {
  const allowed = {};
  for (const k of ["name", "ha_floor", "height", "elevation"]) if (k in props) allowed[k] = props[k];
  return updateFloor(plan, floorId, (f) => ({ ...f, ...allowed }));
}

export function deleteFloor(plan, floorId) {
  return { ...plan, floors: plan.floors.filter((f) => f.id !== floorId) };
}

// ---------------------------------------------------------------- rooms

export function getRoom(floor, roomId) {
  return (floor && floor.rooms.find((r) => r.id === roomId)) || null;
}

function mapRoom(plan, floorId, roomId, fn) {
  return updateFloor(plan, floorId, (f) => ({ ...f, rooms: f.rooms.map((r) => (r.id === roomId ? fn(r) : r)) }));
}

/** Add a room from drawn points. Returns { plan, id } or { plan, id: null } if the polygon is invalid. */
export function addRoom(plan, floorId, points, props = {}) {
  const floor = getFloor(plan, floorId);
  if (!floor) return { plan, id: null };
  const pts = cleanPolygon(points.map(roundPoint));
  if (pts.length < 3) return { plan, id: null };
  const id = props.id || newId("room", allFloorIds(completeFloor(floor)));
  const room = {
    id,
    name: props.name || id,
    area_id: props.area_id ?? null,
    points: pts,
    ceiling_height: null,
  };
  return { plan: updateFloor(plan, floorId, (f) => ({ ...f, rooms: [...f.rooms, room] })), id };
}

export function setRoomProps(plan, floorId, roomId, props) {
  const allowed = {};
  for (const k of ["name", "area_id", "ceiling_height"]) if (k in props) allowed[k] = props[k];
  return mapRoom(plan, floorId, roomId, (r) => ({ ...r, ...allowed }));
}

/** Delete a room and the openings that belong to it. */
export function deleteRoom(plan, floorId, roomId) {
  return updateFloor(plan, floorId, (f) => ({
    ...f,
    rooms: f.rooms.filter((r) => r.id !== roomId),
    openings: f.openings.filter((o) => o.room_id !== roomId),
  }));
}

/** Clamp an opening's centre offset so the opening stays on an edge of length L. */
export function clampOffset(offset, width, L) {
  if (width >= L) return roundMm(L / 2);
  return roundMm(clamp(offset, width / 2, L - width / 2));
}

/** World position of an opening centre on the given room points. */
function openingCentre(points, o) {
  const [a, b] = edgeOf(points, o.edge);
  const L = dist(a, b);
  if (L < EPS) return a;
  return add(a, [((b[0] - a[0]) * o.offset) / L, ((b[1] - a[1]) * o.offset) / L]);
}

/**
 * Re-attach the openings of a room after its points changed.
 * edgeMap(oldEdge) → new edge index. The opening's world centre on the old polygon is projected
 * onto the new edge, so an opening stays where it was as long as its wall stays.
 */
function reattachOpenings(openings, roomId, oldPts, newPts, edgeMap) {
  return openings.map((o) => {
    if (o.room_id !== roomId) return o;
    const ne = edgeMap(o.edge);
    const c = openingCentre(oldPts, o);
    const [a, b] = edgeOf(newPts, ne);
    const pr = projectOnSegment(c, a, b);
    const offset = clampOffset(pr.along, o.width || 0, pr.length);
    if (ne === o.edge && offset === o.offset) return o;
    return { ...o, edge: ne, offset };
  });
}

/** Array copy with a value inserted after index i (for per-edge arrays like wall_thickness). */
function insertAfter(arr, i, n) {
  if (!Array.isArray(arr)) return arr;
  const out = arr.slice();
  while (out.length < n) out.push(null);
  out.splice(i + 1, 0, out[i] ?? null);
  return out;
}

/** Move one corner of a room. */
export function moveVertex(plan, floorId, roomId, index, point) {
  const floor = getFloor(plan, floorId);
  const room = getRoom(floor, roomId);
  if (!room || index < 0 || index >= room.points.length) return plan;
  const p = roundPoint(point);
  const points = room.points.map((q, i) => (i === index ? p : q));
  return updateFloor(plan, floorId, (f) => ({
    ...f,
    rooms: f.rooms.map((r) => (r.id === roomId ? { ...r, points } : r)),
    openings: reattachOpenings(f.openings, roomId, room.points, points, (e) => e),
  }));
}

/**
 * Insert a corner on edge `edge` at the point closest to `point`. Openings on the split edge go to
 * the half that holds their centre; later edge indexes shift by one.
 * Returns { plan, index } with the new corner's index (null if nothing was inserted).
 */
export function insertVertex(plan, floorId, roomId, edge, point) {
  const floor = getFloor(plan, floorId);
  const room = getRoom(floor, roomId);
  if (!room) return { plan, index: null };
  const n = room.points.length;
  const [a, b] = edgeOf(room.points, edge);
  const pr = projectOnSegment(point, a, b);
  if (pr.along < 0.01 || pr.length - pr.along < 0.01) return { plan, index: null };
  const np = roundPoint(pr.point);
  const len1 = dist(a, np);
  const len2 = dist(np, b);
  const points = room.points.slice();
  points.splice(edge + 1, 0, np);
  const r2 = { ...room, points };
  if (Array.isArray(room.wall_thickness)) r2.wall_thickness = insertAfter(room.wall_thickness, edge, n);
  if (Array.isArray(room.wall_heights)) r2.wall_heights = insertAfter(room.wall_heights, edge, n);
  const openings = (f) =>
    f.openings.map((o) => {
      if (o.room_id !== roomId) return o;
      if (o.edge > edge) return { ...o, edge: o.edge + 1 };
      if (o.edge < edge) return o;
      if (o.offset <= len1) return { ...o, offset: clampOffset(o.offset, o.width || 0, len1) };
      return { ...o, edge: edge + 1, offset: clampOffset(o.offset - len1, o.width || 0, len2) };
    });
  return {
    plan: updateFloor(plan, floorId, (f) => ({
      ...f,
      rooms: f.rooms.map((r) => (r.id === roomId ? r2 : r)),
      openings: openings(f),
    })),
    index: edge + 1,
  };
}

/**
 * Delete corner `index` of a room (a room keeps at least three corners). The two edges at the corner
 * merge into one, which keeps the properties of the edge before the corner. Openings on either edge
 * move to the merged edge; later edge indexes shift down by one.
 */
export function deleteVertex(plan, floorId, roomId, index) {
  const floor = getFloor(plan, floorId);
  const room = getRoom(floor, roomId);
  if (!room) return plan;
  const n = room.points.length;
  if (n <= 3 || index < 0 || index >= n) return plan;
  const points = room.points.filter((_, i) => i !== index);
  const prev = (index - 1 + n) % n; // edge ending at the removed corner
  // old edge k → new edge
  const edgeMap = (k) => {
    if (index === 0) {
      // new points are old 1..n-1; new edge j = old edge j+1, merged edge is the last one
      return k === 0 || k === n - 1 ? n - 2 : k - 1;
    }
    if (k === index) return index - 1;
    return k < index ? k : k - 1;
  };
  const perEdge = (arr) => {
    if (!Array.isArray(arr)) return arr;
    const full = arr.slice();
    while (full.length < n) full.push(null);
    const out = new Array(n - 1).fill(null);
    for (let k = 0; k < n; k++) {
      if (k === index && k !== prev) continue; // merged edge keeps the value of `prev`
      out[edgeMap(k)] = full[k];
    }
    out[edgeMap(prev)] = full[prev];
    return out;
  };
  const r2 = { ...room, points };
  if (Array.isArray(room.wall_thickness)) r2.wall_thickness = perEdge(room.wall_thickness);
  if (Array.isArray(room.wall_heights)) r2.wall_heights = perEdge(room.wall_heights);
  return updateFloor(plan, floorId, (f) => ({
    ...f,
    rooms: f.rooms.map((r) => (r.id === roomId ? r2 : r)),
    openings: reattachOpenings(f.openings, roomId, room.points, points, edgeMap),
  }));
}

/**
 * Move a whole room by delta. Furniture whose centre lies in the room moves with it; openings are
 * stored relative to the edges and follow automatically.
 */
export function moveRoom(plan, floorId, roomId, delta, options = {}) {
  const { withFurniture = true } = options;
  const floor = getFloor(plan, floorId);
  const room = getRoom(floor, roomId);
  if (!room || (!delta[0] && !delta[1])) return plan;
  const points = room.points.map((p) => roundPoint(add(p, delta)));
  return updateFloor(plan, floorId, (f) => ({
    ...f,
    rooms: f.rooms.map((r) => (r.id === roomId ? { ...r, points } : r)),
    furniture: withFurniture
      ? f.furniture.map((it) =>
          pointInPolygon([it.x, it.z], room.points) ? { ...it, x: roundMm(it.x + delta[0]), z: roundMm(it.z + delta[1]) } : it,
        )
      : f.furniture,
  }));
}

// ---------------------------------------------------------------- walls on room edges

function setPerEdge(room, key, edge, value) {
  const n = room.points.length;
  const arr = Array.isArray(room[key]) ? room[key].slice() : new Array(n).fill(null);
  while (arr.length < n) arr.push(null);
  arr.length = n;
  arr[edge] = value;
  return { ...room, [key]: arr };
}

/** This edge plus the neighbour edges that lie completely on the same wall line. */
function sameWall(floor, roomId, edge) {
  return wallTargets(floor, roomId, edge).targets;
}

/**
 * Set the wall thickness of an edge (null = default from settings). A shared wall is also set on the
 * neighbour edges that lie completely on it, so the drawn interior wall gets exactly this thickness.
 * A neighbour edge that is only partly shared keeps its value (it may be thicker elsewhere).
 */
export function setWallThickness(plan, floorId, roomId, edge, thickness) {
  const floor = getFloor(plan, floorId);
  if (!getRoom(floor, roomId)) return plan;
  const value = thickness == null || !(thickness > 0) ? null : roundMm(thickness);
  const targets = sameWall(completeFloor(floor), roomId, edge);
  return updateFloor(plan, floorId, (f) => ({
    ...f,
    rooms: f.rooms.map((r) => {
      let out = r;
      for (const t of targets) if (t.room_id === r.id) out = setPerEdge(out, "wall_thickness", t.edge, value);
      return out;
    }),
  }));
}

/** Mark an edge as "no wall" (wall_heights[i] = 0) or give the wall back. Applies to shared edges on both sides. */
export function setNoWall(plan, floorId, roomId, edge, noWall) {
  const floor = getFloor(plan, floorId);
  if (!getRoom(floor, roomId)) return plan;
  const targets = sameWall(completeFloor(floor), roomId, edge);
  return updateFloor(plan, floorId, (f) => ({
    ...f,
    rooms: f.rooms.map((r) => {
      let out = r;
      for (const t of targets) {
        if (t.room_id !== r.id) continue;
        out = setPerEdge(out, "wall_heights", t.edge, noWall ? 0 : null);
        if (out.wall_heights.every((h) => h == null)) {
          const { wall_heights, ...rest } = out;
          out = rest;
        }
      }
      return out;
    }),
  }));
}

// ---------------------------------------------------------------- openings

/** Add a door or window on a room edge. Returns { plan, id }. */
export function addOpening(plan, floorId, roomId, edge, offset, type = "door", props = {}) {
  const floor = getFloor(plan, floorId);
  const room = getRoom(floor, roomId);
  if (!room) return { plan, id: null };
  const L = dist(...edgeOf(room.points, edge));
  const def = OPENING_DEFAULTS[type] || OPENING_DEFAULTS.door;
  let width = props.width ?? def.width;
  if (width > L - 0.1) width = roundMm(Math.max(0.3, L - 0.1));
  const id = props.id || newId(type, allFloorIds(completeFloor(floor)));
  const o = {
    id,
    room_id: roomId,
    edge,
    offset: clampOffset(offset, width, L),
    width,
    type,
    sill: props.sill ?? def.sill,
    height: props.height ?? def.height,
    hinge: props.hinge ?? def.hinge,
    swing: props.swing ?? def.swing,
    contact: props.contact ?? null,
  };
  return { plan: updateFloor(plan, floorId, (f) => ({ ...f, openings: [...f.openings, o] })), id };
}

/** Change opening fields; offset is kept on the edge when width changes. */
export function updateOpening(plan, floorId, id, props) {
  const floor = getFloor(plan, floorId);
  if (!floor) return plan;
  return updateFloor(plan, floorId, (f) => ({
    ...f,
    openings: f.openings.map((o) => {
      if (o.id !== id) return o;
      const next = { ...o, ...props };
      if (next.contact === "") next.contact = null;
      const room = getRoom(f, next.room_id);
      if (room) {
        const L = dist(...edgeOf(room.points, next.edge));
        if (next.width > L) next.width = roundMm(L);
        next.offset = clampOffset(next.offset, next.width, L);
      }
      return next;
    }),
  }));
}

/** Slide an opening along its edge to the point closest to p. */
export function moveOpeningTo(plan, floorId, id, p, grid = 0.05) {
  const floor = getFloor(plan, floorId);
  const o = floor && floor.openings.find((x) => x.id === id);
  const room = o && getRoom(floor, o.room_id);
  if (!room) return plan;
  const [a, b] = edgeOf(room.points, o.edge);
  const pr = projectOnSegment(p, a, b);
  let along = pr.along;
  if (grid) along = Math.round(along / grid) * grid;
  return updateOpening(plan, floorId, id, { offset: clampOffset(along, o.width, pr.length) });
}

export function deleteOpening(plan, floorId, id) {
  return updateFloor(plan, floorId, (f) => ({ ...f, openings: f.openings.filter((o) => o.id !== id) }));
}

// ---------------------------------------------------------------- free walls

export function addFreeWall(plan, floorId, a, b, props = {}) {
  const floor = getFloor(plan, floorId);
  if (!floor || dist(a, b) < 0.02) return { plan, id: null };
  const id = props.id || newId("wall", allFloorIds(completeFloor(floor)));
  const w = { id, a: roundPoint(a), b: roundPoint(b), thickness: props.thickness ?? 0.24, height: props.height ?? null };
  return { plan: updateFloor(plan, floorId, (f) => ({ ...f, walls: [...f.walls, w] })), id };
}

export function updateFreeWall(plan, floorId, id, props) {
  return updateFloor(plan, floorId, (f) => ({
    ...f,
    walls: f.walls.map((w) => {
      if (w.id !== id) return w;
      const next = { ...w, ...props };
      if (props.a) next.a = roundPoint(props.a);
      if (props.b) next.b = roundPoint(props.b);
      return next;
    }),
  }));
}

export function moveFreeWall(plan, floorId, id, delta) {
  const floor = getFloor(plan, floorId);
  const w = floor && floor.walls.find((x) => x.id === id);
  if (!w) return plan;
  return updateFreeWall(plan, floorId, id, { a: add(w.a, delta), b: add(w.b, delta) });
}

export function deleteFreeWall(plan, floorId, id) {
  return updateFloor(plan, floorId, (f) => ({ ...f, walls: f.walls.filter((w) => w.id !== id) }));
}

// ---------------------------------------------------------------- furniture

export function addFurniture(plan, floorId, type, x, z, props = {}) {
  const floor = getFloor(plan, floorId);
  if (!floor) return { plan, id: null };
  const size = FURNITURE_SIZE[type] || [1, 1, 1];
  const id = props.id || newId(type, allFloorIds(completeFloor(floor)));
  const it = {
    id,
    type,
    x: roundMm(x),
    z: roundMm(z),
    w: props.w ?? size[0],
    d: props.d ?? size[1],
    h: props.h ?? size[2],
    rotation: normDeg(props.rotation ?? 0),
  };
  return { plan: updateFloor(plan, floorId, (f) => ({ ...f, furniture: [...f.furniture, it] })), id };
}

export function updateFurniture(plan, floorId, id, props) {
  return updateFloor(plan, floorId, (f) => ({
    ...f,
    furniture: f.furniture.map((it) => {
      if (it.id !== id) return it;
      const next = { ...it, ...props };
      if ("rotation" in props) next.rotation = normDeg(props.rotation || 0);
      for (const k of ["x", "z", "w", "d", "h"]) if (k in props) next[k] = roundMm(Number(props[k]) || 0);
      return next;
    }),
  }));
}

export function deleteFurniture(plan, floorId, id) {
  return updateFloor(plan, floorId, (f) => ({ ...f, furniture: f.furniture.filter((it) => it.id !== id) }));
}

export { furnitureCorners };

// ---------------------------------------------------------------- background

/** Set or replace the floor background. bg: { image, x, z, width, rotation, opacity } or null. */
export function setBackground(plan, floorId, bg) {
  return updateFloor(plan, floorId, (f) => ({ ...f, background: bg ? { ...bg } : null }));
}

export function updateBackground(plan, floorId, props) {
  return updateFloor(plan, floorId, (f) => (f.background ? { ...f, background: { ...f.background, ...props } } : f));
}

// ---------------------------------------------------------------- generic

/** Delete whatever a selection points at. sel: { kind, id, index }. */
export function deleteSelection(plan, floorId, sel) {
  if (!sel) return plan;
  switch (sel.kind) {
    case "room":
      return deleteRoom(plan, floorId, sel.id);
    case "corner":
      return deleteVertex(plan, floorId, sel.id, sel.index);
    case "opening":
      return deleteOpening(plan, floorId, sel.id);
    case "wall":
      return deleteFreeWall(plan, floorId, sel.id);
    case "furniture":
      return deleteFurniture(plan, floorId, sel.id);
    case "background":
      return setBackground(plan, floorId, null);
    default:
      return plan;
  }
}

/** Translate whatever a selection points at by delta (keyboard nudging). */
export function nudgeSelection(plan, floorId, sel, delta) {
  if (!sel) return plan;
  const floor = getFloor(plan, floorId);
  if (!floor) return plan;
  switch (sel.kind) {
    case "room":
      return moveRoom(plan, floorId, sel.id, delta);
    case "corner": {
      const room = getRoom(floor, sel.id);
      return room ? moveVertex(plan, floorId, sel.id, sel.index, add(room.points[sel.index], delta)) : plan;
    }
    case "wall":
      return moveFreeWall(plan, floorId, sel.id, delta);
    case "furniture": {
      const it = floor.furniture.find((x) => x.id === sel.id);
      return it ? updateFurniture(plan, floorId, sel.id, { x: it.x + delta[0], z: it.z + delta[1] }) : plan;
    }
    case "opening": {
      const o = floor.openings.find((x) => x.id === sel.id);
      const room = o && getRoom(floor, o.room_id);
      if (!room) return plan;
      const [a, b] = edgeOf(room.points, o.edge);
      const L = dist(a, b);
      const d = sub(b, a);
      // move along the edge by the component of delta in the edge direction
      const along = L > EPS ? (delta[0] * d[0] + delta[1] * d[1]) / L : 0;
      return updateOpening(plan, floorId, sel.id, { offset: o.offset + along });
    }
    case "background": {
      const bg = floor.background;
      return bg ? updateBackground(plan, floorId, { x: roundMm((bg.x || 0) + delta[0]), z: roundMm((bg.z || 0) + delta[1]) }) : plan;
    }
    default:
      return plan;
  }
}

/** All vertices and edges of a floor's rooms and free walls, for snapping (optionally without one room). */
export function snapTargets(floor, exceptRoomId = null) {
  const vertices = [];
  const segments = [];
  for (const r of (floor && floor.rooms) || []) {
    if (r.id === exceptRoomId) continue;
    const pts = r.points || [];
    for (let i = 0; i < pts.length; i++) {
      vertices.push(pts[i]);
      segments.push(edgeOf(pts, i));
    }
  }
  for (const w of (floor && floor.walls) || []) {
    vertices.push(w.a, w.b);
    segments.push([w.a, w.b]);
  }
  return { vertices, segments };
}
