// Same limits as presence_planner/validation.py. Count candidate work before any allocation.
export const MAX_GRID_WORK = 100000;
export const MAX_WEIGHTED_WORK = 20000000;
const reject = (reason) => { throw new Error(reason); };
const number = (v) => { if (typeof v !== "number" || !Number.isFinite(v) || Math.abs(v) > 1000) reject("invalid_number"); return v; };
const point = (p) => { if (!Array.isArray(p) || p.length !== 2) reject("invalid_point"); p.forEach(number); };

export function gridWork(rooms, step) {
  if (!Array.isArray(rooms) || rooms.length > 64) reject("invalid_rooms");
  if (typeof step !== "number" || !Number.isFinite(step) || Math.abs(step) > 1e100 || step <= 0) reject("invalid_grid_step");
  let work = 0;
  for (const r of rooms) {
    if (!Array.isArray(r.points) || r.points.length < 3 || r.points.length > 128) reject("invalid_polygon");
    r.points.forEach(point);
    const xs = r.points.map((p) => p[0]), zs = r.points.map((p) => p[1]);
    const dx = (Math.max(...xs) - Math.min(...xs)) / step, dz = (Math.max(...zs) - Math.min(...zs)) / step;
    if (!Number.isFinite(dx) || !Number.isFinite(dz) || Math.max(dx, dz) > MAX_GRID_WORK) reject("grid_budget_exceeded");
    const nx = Math.ceil(dx), nz = Math.ceil(dz);
    work += nx + nx * nz;
    if (work > MAX_GRID_WORK) reject("grid_budget_exceeded");
  }
  return work;
}

export function validatePlan(plan) {
  let nodes = 50000, text = 0;
  const walk = (v, depth = 0) => {
    if (--nodes < 0 || depth > 20) reject("plan_too_complex");
    if (typeof v === "number" && !Number.isFinite(v)) reject("non_finite_number");
    if (typeof v === "string" && (text += v.length) > 8000000) reject("plan_too_large");
    if (v && typeof v === "object") {
      const values = Object.values(v);
      if (values.length > 2048) reject("too_many_objects");
      for (const child of values) walk(child, depth + 1);
    }
  };
  walk(plan);
  if (!plan || plan.version !== 1 || !Array.isArray(plan.floors)) reject("invalid_plan");
  if (plan.settings != null && (typeof plan.settings !== "object" || Array.isArray(plan.settings))) reject("invalid_settings");
  const objects = (p, key, max) => {
    const values = key in p ? p[key] : [];
    if (!Array.isArray(values) || values.length > max) reject(`invalid_${key}`);
    const ids = new Set();
    for (const v of values) {
      if (!v || typeof v.id !== "string" || !v.id || ids.has(v.id)) reject(`invalid_${key}_id`);
      ids.add(v.id);
    }
    return values;
  };
  let total = 0, weighted = 0;
  for (const f of objects(plan, "floors", 16)) {
    if (f.background?.image != null && (typeof f.background.image !== "string" || !f.background.image.startsWith("data:image/"))) reject("background_must_be_inline_image");
    const rooms = objects(f, "rooms", 64), walls = objects(f, "walls", 256), openings = objects(f, "openings", 256), furniture = objects(f, "furniture", 256);
    const outdoor = "outdoor" in f ? f.outdoor : [];
    if (!Array.isArray(outdoor) || outdoor.length > 64) reject("invalid_outdoor");
    for (const area of outdoor) {
      if (!area || !Array.isArray(area.points) || area.points.length < 3 || area.points.length > 128) reject("invalid_outdoor");
      area.points.forEach(point);
    }
    let vertices = 0;
    for (const r of rooms) {
      if (!Array.isArray(r.points) || r.points.length < 3 || r.points.length > 128) reject("invalid_polygon");
      r.points.forEach(point);
      vertices += r.points.length;
      for (const key of ["wall_thickness", "wall_heights"]) if (r[key] != null) {
        if (!Array.isArray(r[key]) || r[key].length !== r.points.length) reject(`invalid_${key}`);
        r[key].forEach((v) => { if (v != null && number(v) < 0) reject(`invalid_${key}`); });
      }
      if (r.ceiling_height != null && !(number(r.ceiling_height) > 0 && r.ceiling_height <= 20)) reject("invalid_ceiling_height");
    }
    if (vertices > 1024) reject("too_many_vertices");
    if (f.height != null && !(number(f.height) > 0 && f.height <= 20)) reject("invalid_floor_height");
    for (const key of ["wall_exterior", "wall_interior"]) if (plan.settings?.[key] != null && number(plan.settings[key]) < 0) reject("invalid_settings");
    for (const w of walls) { point(w.a); point(w.b); }
    for (const o of openings) {
      if (o.wall) { if (!walls.some((w) => w.id === o.wall)) reject("missing_opening_wall"); }
      else {
        const r = rooms.find((r) => r.id === o.room_id);
        if (!r || !Number.isInteger(o.edge) || o.edge < 0 || o.edge >= r.points.length) reject("invalid_opening_room_edge");
      }
      for (const k of ["offset", "width"]) if (number(o[k]) < 0) reject(`invalid_${k}`);
    }
    for (const item of furniture) {
      if (typeof item.type !== "string") reject("invalid_furniture_type");
      for (const k of ["x", "z", "w", "d", "h"]) number(item[k]);
    }
    for (const item of [f, ...walls, ...openings, ...furniture]) for (const k of ["height", "thickness", "rotation", "sill", "elevation"]) if (item[k] != null) number(item[k]);
    const work = gridWork(rooms, 0.1) + gridWork(rooms, 0.2);
    total += work;
    weighted += work * (vertices + walls.length + openings.length + furniture.length + 1);
    if (total > 500000 || weighted > MAX_WEIGHTED_WORK) reject("plan_budget_exceeded");
  }
  return plan;
}
