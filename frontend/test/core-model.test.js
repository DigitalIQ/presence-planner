import test from "node:test";
import assert from "node:assert/strict";
import { PROFILES, buildModel, buildCells } from "../src/core/index.js";
import { demo, twoRooms, readJson, sharedPath } from "./core-helpers.js";

test("PROFILES is shared/profiles.json", () => {
  assert.deepEqual(PROFILES, readJson(sharedPath("profiles.json")));
  assert.ok(PROFILES.profiles.some((p) => p.id === "custom"));
  assert.equal(typeof PROFILES.default_fov_v, "number");
});

test("buildModel: wall categories, shared walls take the larger thickness", () => {
  const m = buildModel(twoRooms({ wall: 0.08 }), "f");
  const shared = m.segments.filter((s) => s.shared);
  assert.equal(shared.length, 1);
  assert.equal(shared[0].k, "thin");
  assert.ok(m.segments.filter((s) => !s.shared).every((s) => s.k === "block"));
  assert.equal(buildModel(twoRooms({ wall: 0.12 }), "f").segments.find((s) => s.shared).k, "brick");
  assert.equal(buildModel(twoRooms({ wall: 0.2 }), "f").segments.find((s) => s.shared).k, "block");
});

test("buildModel: wall rule draws shared walls centred and exterior walls outside", () => {
  const m = buildModel(twoRooms({ wall: 0.2 }), "f");
  // 4 edges of A + 4 edges of B, the shared one counted once = 7 bands
  assert.equal(m.bands.length, 7);
  const xs = m.bands.flat().map((p) => p[0]);
  assert.ok(Math.min(...xs) < 0 && Math.max(...xs) > 10);   // exterior bands lie outside the polygons
  const band = m.bands.find((b) => b.every((p) => p[0] >= 5.89 && p[0] <= 6.11));
  assert.ok(band, "shared wall band is centred on x = 6");
  // cells keep out of the walls: nothing between x = 5.9 and 6.1
  assert.ok(m.cells["0.1"].every((c) => c.x < 5.9 || c.x > 6.1));
});

test("buildModel: door is cut out of the wall, windows become glass", () => {
  const open = [
    { id: "d", room_id: "A", edge: 1, offset: 2, width: 1, type: "door", sill: 0, height: 2, hinge: "left", swing: "in" },
    { id: "w", room_id: "A", edge: 0, offset: 3, width: 1.2, type: "window", sill: 0.9, height: 1.3 },
    { id: "wi", room_id: "A", edge: 1, offset: 3.5, width: 0.4, type: "window", sill: 0.9, height: 1.3 },
  ];
  const m = buildModel(twoRooms({ wall: 0.3, openings: open }), "f");
  assert.equal(m.doors.length, 1);
  const d = m.doors[0];
  assert.deepEqual([d.a, d.b], [[6, 1.5], [6, 2.5]]);
  assert.deepEqual(d.hinge, d.a);                // hinge "left" = edge start side
  assert.deepEqual(d.other, d.b);
  assert.deepEqual(d.tip, [5, 1.5]);             // swings into room A (inward normal -x)
  assert.equal(d.outside, false);
  assert.deepEqual(d.rooms.sort(), ["A", "B"]);
  // the wall at x = 6 is split around the door span
  const wall = m.segments.filter((s) => s.a[0] === 6 && s.b[0] === 6);
  assert.equal(wall.length, 2);
  assert.equal(m.windows.length, 2);
  assert.equal(m.windows.find((w) => w.id === "w").exterior, true);
  assert.equal(m.windows.find((w) => w.id === "wi").exterior, false);
  assert.equal(m.glass.length, 1);               // only the exterior window
  const out = buildModel(twoRooms({ openings: [{ ...open[0], swing: "out", hinge: "right" }] }), "f").doors[0];
  assert.deepEqual(out.hinge, out.b);
  assert.deepEqual(out.tip, [7, 2.5]);
});

test("buildModel: edges are split at vertices of other rooms", () => {
  const plan = twoRooms();
  const f = plan.floors[0];
  f.rooms[1].points = [[6, 0], [10, 0], [10, 4], [8, 4], [6, 4]];
  f.rooms[1].wall_thickness = [0.3, 0.3, 0.115, 0.115, 0.3];
  f.rooms.push({ id: "C", name: "C", points: [[6, 4], [10, 4], [10, 6], [6, 6]], wall_thickness: [0.115, 0.3, 0.3, 0.3] });
  const m = buildModel(plan, "f");
  // C's top edge runs 6..10 but B has a vertex at x = 8: two shared pieces
  const pieces = m.segments.filter((s) => s.a[1] === 4 && s.b[1] === 4 && s.shared);
  assert.equal(pieces.length, 2);
  assert.deepEqual(pieces.map((s) => Math.abs(s.b[0] - s.a[0])).sort(), [2, 2]);
  assert.ok(m.faces.some((fc) => fc.room === "C"));
});

test("buildModel: tall furniture, zones and cells", () => {
  const furniture = [
    { id: "bed", type: "bed", x: 3, z: 2, w: 1.6, d: 2, h: 0.5, rotation: 0 },
    { id: "kit", type: "kitchen", x: 8, z: 1, w: 2, d: 0.6, h: 0.9, rotation: 0 },
    { id: "wardrobe", type: "wardrobe", x: 1, z: 2, w: 0.6, d: 1.6, h: 2.2, rotation: 90 },
    { id: "plant", type: "plant", x: 2, z: 3.5, w: 0.5, d: 0.5, h: 1.6, rotation: 0 },
  ];
  const m = buildModel(twoRooms({ furniture }), "f");
  assert.deepEqual(m.furniture.map((f) => f.obstacle), [false, false, true, false]);
  assert.deepEqual(m.zones.map((z) => [z.name, z.room, z.height]), [["bed", "A", 0.5], ["kitchen", "B", 1.3]]);
  assert.equal(m.zones[0].inner, null);
  assert.ok(m.zones[1].inner, "kitchen zone is a ring without the footprint");
  // furniture polygon: rotation 90 turns w along z
  const wd = m.furniture[2].poly;
  assert.ok(Math.abs(Math.max(...wd.map((p) => p[0])) - Math.min(...wd.map((p) => p[0])) - 1.6) < 1e-9);
  // cell grid: 0.1 grid over the room minus wall bands
  const cells = m.cells["0.1"], c2 = m.cells["0.2"];
  assert.ok(cells.length > 3.5 * c2.length && cells.length < 4.5 * c2.length);
  assert.deepEqual(buildCells(m, 0.1), cells);
  assert.ok(cells.every((c) => ["A", "B"].includes(c.room)));
});

test("demo plan: drawing data and sanity", () => {
  const { plan } = demo();
  const m = buildModel(plan, "demo");
  assert.deepEqual(Object.keys(m).filter((k) => !["entryZones", "outdoor"].includes(k)).sort(),
    ["bands", "bounds", "cells", "doors", "faces", "floor", "freeWalls", "furniture", "glass", "rooms", "segments", "windows", "zones"]);
  assert.equal(m.rooms.length, 5);
  assert.equal(m.doors.length, 5);
  assert.equal(m.windows.length, 4);
  assert.equal(m.glass.length, 4);
  assert.equal(m.freeWalls.length, 1);
  assert.equal(m.freeWalls[0].block, true);
  assert.equal(m.furniture.length, 13);
  assert.equal(m.furniture.filter((f) => f.obstacle).length, 4);
  assert.equal(m.doors.find((d) => d.id === "d_entry").outside, true);
  assert.equal(m.doors.find((d) => d.id === "d_living").contact, "binary_sensor.demo_living_door");
  assert.deepEqual(m.doors.find((d) => d.id === "d_living").rooms.sort(), ["hall", "living"]);
  assert.deepEqual(m.zones.map((z) => z.name), ["sofa", "desk", "bed", "kitchen", "dining", "wc", "shower", "washbasin"]);
  assert.ok(m.bounds.x0 < 0 && m.bounds.x1 > 8.6 && m.bounds.z1 > 7);
  assert.deepEqual(Object.keys(m.cells), ["0.1", "0.2"]);
  assert.ok(m.cells["0.1"].length > 5000 && m.cells["0.1"].length < 5700);
  // no cell lies in the chimney (free wall) and every cell is inside its room
  const chimney = m.freeWalls[0].poly;
  const xs = chimney.map((p) => p[0]), zs = chimney.map((p) => p[1]);
  assert.ok(m.cells["0.1"].every((c) => !(c.x > Math.min(...xs) && c.x < Math.max(...xs) && c.z > Math.min(...zs) && c.z < Math.max(...zs))));
  // the model is JSON serialisable (it is sent between worker and main thread)
  assert.doesNotThrow(() => JSON.stringify(m));
  assert.throws(() => buildModel(plan, "nope"), /floor not found/);
});
