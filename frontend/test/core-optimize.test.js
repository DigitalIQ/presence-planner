import test from "node:test";
import assert from "node:assert/strict";
import { buildModel, evaluate, optimize } from "../src/core/index.js";
import { handleMessage } from "../src/core/worker.js";
import { demo, twoRooms } from "./core-helpers.js";

const angDiff = (a, b) => Math.abs(((a - b + 540) % 360) - 180);

function oneRoom(w = 4, d = 4) {
  return {
    version: 1, settings: { wall_exterior: 0.3, wall_interior: 0.115 },
    floors: [{ id: "f", name: "T", elevation: 0, height: 2.6, rooms: [{ id: "R", name: "Room", points: [[0, 0], [w, 0], [w, d], [0, d]], wall_thickness: [0.3, 0.3, 0.3, 0.3] }], openings: [], walls: [], furniture: [], outdoor: [], background: null }],
  };
}

test("optimize: result shape, ordering and distinct positions", () => {
  const m = buildModel(oneRoom(), "f");
  const res = optimize(m, "R", "aqara_fp300", { cell: 0.2 }, 1);
  assert.ok(res.length > 0 && res.length <= 5);
  for (const c of res) {
    assert.deepEqual(Object.keys(c), ["x", "z", "height", "phi", "tilt", "mount", "score", "coverage", "spill", "glass"]);
    assert.ok(c.x > 0 && c.x < 4 && c.z > 0 && c.z < 4);
  }
  for (let i = 1; i < res.length; i++) assert.ok(res[i - 1].score >= res[i].score);
  for (let i = 0; i < res.length; i++) for (let j = i + 1; j < res.length; j++) assert.ok(Math.hypot(res[i].x - res[j].x, res[i].z - res[j].z) >= 0.4);
});

test("optimize: ceiling-capable profile in a square room picks a ceiling mount near the centre", () => {
  const m = buildModel(oneRoom(), "f");
  const best = optimize(m, "R", "aqara_fp300", { cell: 0.2 }, 1)[0];
  assert.equal(best.mount, "ceiling");
  assert.equal(best.height, 2.6);
  assert.equal(best.tilt, 90);
  assert.ok(Math.hypot(best.x - 2, best.z - 2) <= 1, `best at ${best.x}, ${best.z}`);
  assert.ok(best.coverage > 0.9);
});

test("optimize: wall-only profile mounts 3 cm in front of a wall and looks into the room", () => {
  const m = buildModel(oneRoom(), "f");
  const res = optimize(m, "R", "everything_presence_one", { cell: 0.2 }, 1);
  const best = res[0];
  assert.ok(["wall", "corner"].includes(best.mount));
  assert.equal(best.height, 1.9);
  assert.equal(best.tilt, 10);
  const edge = Math.min(best.x, 4 - best.x, best.z, 4 - best.z);
  assert.ok(Math.abs(edge - 0.03) < 1e-6, `edge distance ${edge}`);
  // looking towards the room centre within 90 degrees
  const toCentre = (Math.atan2(2 - best.z, 2 - best.x) * 180) / Math.PI;
  assert.ok(angDiff(best.phi, toCentre) < 90);
  // the candidate really performs as reported
  const ev = evaluate(m, [{ entity_id: "c", floor_id: "f", profile: "everything_presence_one", x: best.x, z: best.z, height: best.height, phi: best.phi, tilt: best.tilt, mount: best.mount }], { cell: 0.2 });
  assert.ok(Math.abs(ev.rooms.R.coverage_mean - best.coverage) < 0.02, `${ev.rooms.R.coverage_mean} vs ${best.coverage}`);
});

test("optimize: a higher weight reduces spill into the neighbour", () => {
  const m = buildModel(twoRooms({ wall: 0.08 }), "f");
  const total = (c) => Object.values(c.spill).reduce((a, b) => a + b, 0);
  const free = optimize(m, "A", "everything_presence_one", { cell: 0.2 }, 0)[0];
  const strict = optimize(m, "A", "everything_presence_one", { cell: 0.2 }, 2)[0];
  assert.ok(total(strict) <= total(free) + 1e-9);
  assert.ok(strict.coverage <= free.coverage + 1e-9);
});

test("optimize: nothing spills through block walls", () => {
  const m = buildModel(twoRooms({ wall: 0.3 }), "f");
  const res = optimize(m, "A", "everything_presence_one", { cell: 0.2 }, 1);
  assert.ok(res.every((c) => Object.keys(c.spill).length === 0));
});

test("optimize: does not mount on doors, windows or tall furniture", () => {
  const openings = [{ id: "d", room_id: "R", edge: 1, offset: 2, width: 1, type: "door", sill: 0, height: 2, hinge: "left", swing: "in" }];
  const plan = oneRoom();
  plan.floors[0].openings = openings;
  plan.floors[0].furniture = [{ id: "w", type: "wardrobe", x: 2, z: 0.4, w: 1.6, d: 0.6, h: 2.2, rotation: 0 }];
  const m = buildModel(plan, "f");
  const all = optimize(m, "R", "everything_presence_one", { cell: 0.2 }, 0);
  for (const c of all) {
    const atDoor = Math.abs(c.x - 4) < 0.1 && c.z > 1.4 && c.z < 2.6;
    const atWardrobe = c.z < 0.8 && c.x > 1.1 && c.x < 2.9;
    assert.ok(!atDoor && !atWardrobe, `candidate at ${c.x}, ${c.z}`);
  }
});

test("optimize: unknown room throws, progress callback reports 0..1", () => {
  const m = buildModel(oneRoom(), "f");
  assert.throws(() => optimize(m, "nope", "aqara_fp300", {}, 1), /room not found/);
  const seen = [];
  optimize(m, "R", "aqara_fp300", { cell: 0.2 }, 1, undefined, (p) => seen.push(p));
  assert.ok(seen.length > 0 && seen.every((p) => p >= 0 && p <= 1) && seen.at(-1) === 1);
});

test("demo plan: optimize one room within the time budget", () => {
  const { plan } = demo();
  const m = buildModel(plan, "demo");
  const t0 = performance.now();
  const res = optimize(m, "living", "aqara_fp300", { cell: 0.2 }, 1);
  const ms = performance.now() - t0;
  assert.ok(ms < 8000, `optimize took ${ms.toFixed(0)} ms`);
  assert.ok(res.length >= 3);
  assert.ok(res[0].score > 0.5);
  // wall-mounted alternative exists and is scored
  const wall = optimize(m, "living", "everything_presence_lite", { cell: 0.2 }, 1);
  assert.ok(wall.every((c) => c.mount !== "ceiling"));
});

test("worker: optimize and optimizeAll messages", () => {
  const { plan } = demo();
  const out = [];
  handleMessage({ id: 7, type: "optimize", plan, floorId: "demo", roomId: "hall", profileId: "aqara_fp300", opts: { cell: 0.2 }, weight: 1 }, (m) => out.push(m));
  assert.ok(out.every((m) => m.id === 7));
  const progress = out.filter((m) => "progress" in m).map((m) => m.progress);
  assert.ok(progress.length > 0 && progress.every((p) => p >= 0 && p <= 1));
  assert.deepEqual(progress, [...progress].sort((a, b) => a - b));
  const last = out.at(-1);
  assert.ok(Array.isArray(last.result) && last.result.length > 0);
  assert.deepEqual(last.result, optimize(buildModel(plan, "demo"), "hall", "aqara_fp300", { cell: 0.2 }, 1));

  const all = [];
  handleMessage({ id: 8, type: "optimizeAll", plan, floorId: "demo", profileId: "aqara_fp300", opts: { cell: 0.2 }, weight: 1 }, (m) => all.push(m));
  const res = all.at(-1).result;
  assert.deepEqual(Object.keys(res), ["living", "bedroom", "kitchen", "hall", "bath"]);
  assert.ok(Object.values(res).every((list) => list.length > 0));
  assert.ok(all.filter((m) => "progress" in m).every((m) => m.progress >= 0 && m.progress <= 1));

  const bad = [];
  handleMessage({ id: 9, type: "nope" }, (m) => bad.push(m));
  assert.equal(bad[0].id, 9);
  assert.match(bad[0].error, /unknown message type/);
  handleMessage({ id: 10, type: "optimize", plan, floorId: "demo", roomId: "missing", profileId: "aqara_fp300" }, (m) => bad.push(m));
  assert.match(bad.at(-1).error, /room not found/);
});
