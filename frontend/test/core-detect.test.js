import test from "node:test";
import assert from "node:assert/strict";
import { buildModel, detect, resolveSensor, PROFILES } from "../src/core/index.js";
import { twoRooms, sensor } from "./core-helpers.js";

const close = (a, b, tol = 1e-3) => assert.ok(Math.abs(a - b) <= tol, `expected ${b}, got ${a}`);
const DEG = Math.PI / 180;
const roomModel = (extra) => buildModel(twoRooms(extra), "f");

// quality curve: 1 up to 0.58 * reach, then linear down to 0.6 at reach
const curve = (d, reach = 6) => (d <= 0.58 * reach ? 1 : 1 - (0.4 * (d - 0.58 * reach)) / (reach - 0.58 * reach));

test("straight ahead: full quality close, curve towards the reach", () => {
  const m = roomModel();
  const s = sensor({ x: 0.5, z: 2, height: 1.5 });
  close(detect(m, s, [2.5, 1.5, 2]), 1);          // 2 m
  close(detect(m, s, [3.9, 1.5, 2]), 1);          // 3.4 m <= 3.48
  close(detect(m, s, [5.5, 1.5, 2]), curve(5));   // 5 m
  close(detect(m, s, [5.5, 1.5, 2]), 0.7587, 1e-3);
});

test("behind the sensor and beyond the reach", () => {
  const m = roomModel();
  const s = sensor({ x: 3, z: 2, height: 1.5 });
  assert.equal(detect(m, s, [2, 1.5, 2]), 0);    // behind (v.f < 0)
  const far = sensor({ x: 0.1, z: 2, height: 1.5, reach: 5 });
  assert.equal(detect(m, far, [5.2, 1.5, 2]), 0); // 5.1 m > 5
});

test("outside the horizontal field of view (yaw)", () => {
  const m = roomModel();
  const s = sensor({ x: 1, z: 2 });
  // 70 deg to the side with fov_h 120 (half 60): outside
  assert.equal(detect(m, s, [1 + 2 * Math.cos(70 * DEG), 1.5, 2 + 2 * Math.sin(70 * DEG)]), 0);
  // 40 deg: inside, no taper (taper starts at half - 15 = 45 deg)
  close(detect(m, s, [1 + 2 * Math.cos(40 * DEG), 1.5, 2 + 2 * Math.sin(40 * DEG)]), 1);
});

test("edge taper in yaw: 59 deg has g = 0.6267", () => {
  const m = roomModel();
  const s = sensor({ x: 1, z: 0.3 });
  const g = 1 - 0.4 * ((59 - 45) / 15);
  const at = (d) => [1 + d * Math.cos(59 * DEG), 1.5, 0.3 + d * Math.sin(59 * DEG)];
  assert.ok(detect(m, s, at(3.5)) > 0);          // 3.5 <= 6 * 0.6267 = 3.76
  assert.equal(detect(m, s, at(3.9)), 0);         // 3.9 > 3.76
  close(g, 0.6267, 1e-3);
});

test("outside the vertical field of view (pitch) and pitch taper", () => {
  const m = roomModel();
  const s = sensor({ x: 0.5, z: 2, height: 2.4 });
  const below = (deg, d) => [0.5 + d * Math.cos(deg * DEG), 2.4 - d * Math.sin(deg * DEG), 2];
  assert.equal(detect(m, s, below(50, 2)), 0);    // fov_v 90 -> half 45
  assert.ok(detect(m, s, below(30, 2)) > 0);
  // 40 deg: taper (40 - 35) / 10 = 0.5 -> g = 0.8, so reach 4.8: 4.5 m ok, 5.0 m not
  assert.ok(detect(m, s, below(40, 2.2)) > 0);
  const tall = sensor({ x: 0.5, z: 2, height: 3.5 });
  assert.equal(detect(m, tall, [0.5 + 5.0 * Math.cos(40 * DEG), 3.5 - 5.0 * Math.sin(40 * DEG), 2]), 0);
});

test("tilt turns the field of view downwards", () => {
  const m = roomModel();
  // point 50 deg below the horizontal, 3 m away
  const p = [0.5 + 3 * Math.cos(50 * DEG), 2.4 - 3 * Math.sin(50 * DEG), 2];
  assert.equal(detect(m, sensor({ height: 2.4, tilt: 0 }), p), 0);
  assert.ok(detect(m, sensor({ height: 2.4, tilt: 30 }), p) > 0);   // pitch is only 20 deg now
  // along the tilted axis: quality 1
  const f = [0.5 + 3 * Math.cos(30 * DEG), 2.4 - 3 * Math.sin(30 * DEG), 2];
  close(detect(m, sensor({ height: 2.4, tilt: 30 }), f), 1);
});

test("viewing direction phi: 90 looks along +z (down the plan)", () => {
  const m = roomModel();
  const s = sensor({ x: 3, z: 0.5, phi: 90 });
  close(detect(m, s, [3, 1.5, 2.5]), 1);
  assert.equal(detect(m, s, [5, 1.5, 0.5]), 0);   // 90 deg to the side
});

test("ceiling mount: cone, taper and reach", () => {
  const m = roomModel();
  const s = resolveSensor({ ...sensor({ x: 3, z: 2, height: 2.6, mount: "ceiling", profile: "aqara_fp400" }), fov_h: undefined, fov_v: undefined, reach: undefined });
  assert.equal(s.reach, 4);             // ceiling reach from the profile
  assert.equal(s.ceiling_fov, 120);
  close(detect(m, s, [3, 0.9, 2]), 1);  // straight below
  const off = (r) => [3 + r, 0.9, 2];
  assert.equal(detect(m, s, off(3)), 0);   // 60.5 deg > 60
  // 2.2 m aside: angle 52.3 deg, g = 1 - 0.4 * (52.3 - 45) / 15, d = 2.78
  const ang = Math.atan2(2.2, 1.7) / DEG, g = 1 - 0.4 * ((ang - 45) / 15), d = Math.hypot(2.2, 1.7);
  assert.ok(d <= 4 * g);
  close(detect(m, s, off(2.2)), curve(d, 4));
  // 2.5 m aside: g = 0.712 -> effective reach 2.85 < d = 3.02
  assert.equal(detect(m, s, off(2.5)), 0);
});

test("block wall: nothing passes a 0.3 m wall", () => {
  const m = roomModel({ wall: 0.3 });
  assert.equal(m.segments.filter((s) => s.shared)[0].k, "block");
  const s = sensor({ x: 5.5, z: 2 });
  assert.ok(detect(m, s, [5.9, 1.5, 2]) > 0);
  assert.equal(detect(m, s, [6.5, 1.5, 2]), 0);
});

test("thin wall (< 0.10 m) costs thin_db", () => {
  const m = roomModel({ wall: 0.08 });
  assert.equal(m.segments.filter((s) => s.shared)[0].k, "thin");
  const s = sensor({ x: 5.5, z: 2 });
  // 10 dB -> factor 0.316 -> effective reach 1.897
  assert.ok(detect(m, s, [6.5, 1.5, 2]) > 0);                    // 1 m
  assert.equal(detect(m, s, [8.5, 1.5, 2]), 0);                  // 3 m
  // with 20 dB the factor is 0.1 -> effective reach 0.6
  assert.equal(detect(m, s, [6.5, 1.5, 2], { thin_db: 20 }), 0);
  assert.ok(detect(m, s, [6.05, 1.5, 2], { thin_db: 20 }) > 0);
});

test("brick wall (0.10 .. 0.20 m) costs 25 dB", () => {
  const m = roomModel({ wall: 0.15 });
  assert.equal(m.segments.filter((s) => s.shared)[0].k, "brick");
  const s = sensor({ x: 5.9, z: 2 });
  // factor 0.0562 -> effective reach 0.337
  assert.ok(detect(m, s, [6.1, 1.5, 2]) > 0);   // 0.2 m
  assert.equal(detect(m, s, [6.5, 1.5, 2]), 0); // 0.6 m
});

const door = (extra = {}) => ({ id: "dd", room_id: "A", edge: 1, offset: 2, width: 1, type: "door", sill: 0, height: 2, hinge: "left", swing: "in", contact: null, ...extra });

test("closed door adds 6 dB, open door is free", () => {
  const m = roomModel({ wall: 0.3, openings: [door()] });
  assert.equal(m.doors.length, 1);
  assert.deepEqual(m.doors[0].rooms.sort(), ["A", "B"]);
  const s = sensor({ x: 4, z: 2 });     // door centre at z = 2, sensor looks straight through
  // open: 2.5 m behind the door still seen, 4 m too
  assert.ok(detect(m, s, [8, 1.5, 2]) > 0);
  // closed: factor 0.501 -> effective reach 3.01: 2 m ok, 4 m not
  assert.ok(detect(m, s, [6, 1.5, 2], { doors: "closed" }) > 0);
  assert.equal(detect(m, s, [8.5, 1.5, 2], { doors: "closed" }), 0);
  assert.ok(detect(m, s, [8.5, 1.5, 2], { doors: "open" }) > 0);
  // per-door map: false = closed
  assert.equal(detect(m, s, [8.5, 1.5, 2], { doors: { dd: false } }), 0);
  assert.ok(detect(m, s, [8.5, 1.5, 2], { doors: { dd: true } }) > 0);
  // a ray beside the door still hits the block wall
  assert.equal(detect(m, sensor({ x: 4, z: 3.2 }), [7, 1.5, 3.2]), 0);
});

test("tall furniture damps rays that cross it below its top", () => {
  const shelf = { id: "s", type: "shelf", x: 3, z: 2, w: 0.4, d: 1, h: 2.0, rotation: 0 };
  const m = roomModel({ furniture: [shelf] });
  assert.equal(m.furniture[0].obstacle, true);
  const s = sensor({ x: 1, z: 2, height: 1.5 });
  // 10 dB -> effective reach 1.897: behind the shelf at 4 m nothing, in front 1 m fine
  assert.equal(detect(m, s, [5, 1.5, 2]), 0);
  assert.ok(detect(m, s, [2, 1.5, 2]) > 0);
  // sensor above the shelf top: the ray passes over it
  assert.ok(detect(m, sensor({ x: 1, z: 2, height: 2.4 }), [5, 2.2, 2]) > 0);
  // lower furniture and lamps are no obstacles
  const low = roomModel({ furniture: [{ ...shelf, h: 1.0 }] });
  assert.equal(low.furniture[0].obstacle, false);
  assert.ok(detect(low, s, [5, 1.5, 2]) > 0);
  const lamp = roomModel({ furniture: [{ ...shelf, type: "lamp_floor", h: 1.8 }] });
  assert.equal(lamp.furniture[0].obstacle, false);
});

test("tall free wall blocks, a low one does not", () => {
  const tall = roomModel({ walls: [{ id: "c", a: [3, 1.5], b: [3, 2.5], thickness: 0.4, height: null }] });
  assert.equal(tall.freeWalls[0].block, true);
  const s = sensor({ x: 1, z: 2 });
  assert.equal(detect(tall, s, [5, 1.5, 2]), 0);
  assert.ok(detect(tall, s, [5, 1.5, 3.8]) > 0);
  const low = roomModel({ walls: [{ id: "c", a: [3, 1.5], b: [3, 2.5], thickness: 0.4, height: 1.0 }] });
  assert.equal(low.freeWalls[0].block, false);
  assert.ok(detect(low, s, [5, 1.5, 2]) > 0);
});

test("resolveSensor fills profile defaults and keeps overrides", () => {
  const r = resolveSensor({ entity_id: "x", x: 0, z: 0, height: 1.9, phi: 0, tilt: 10, profile: "aqara_fp300" });
  assert.equal(r.fov_h, 120);
  assert.equal(r.fov_v, PROFILES.default_fov_v);
  assert.equal(r.fov_v_assumed, true);
  assert.equal(r.reach, 6);
  const o = resolveSensor({ profile: "everything_presence_one", reach: 12 });
  assert.equal(o.fov_v, 40);
  assert.equal(o.fov_v_assumed, undefined);
  assert.equal(o.reach, 12);
  assert.equal(resolveSensor({ profile: "does_not_exist" }).fov_h, 120); // falls back to custom
});
