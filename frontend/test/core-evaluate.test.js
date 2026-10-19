import test from "node:test";
import assert from "node:assert/strict";
import { buildModel, evaluate, spillDetail } from "../src/core/index.js";
import { demo, twoRooms, sensor } from "./core-helpers.js";

const close = (a, b, tol = 1e-4) => assert.ok(Math.abs(a - b) <= tol, `expected ${b}, got ${a}`);
const door = { id: "dd", room_id: "A", edge: 1, offset: 2, width: 1, type: "door", sill: 0, height: 2, hinge: "left", swing: "in", contact: null };
const H = { heights: [1.3] };

test("evaluate: own coverage, nothing leaks through a block wall", () => {
  const m = buildModel(twoRooms({ wall: 0.3 }), "f");
  const ev = evaluate(m, [sensor({ x: 0.5, z: 2, height: 1.3 })], H);
  assert.deepEqual(Object.keys(ev), ["rooms", "sensors", "zones", "grid"]);
  assert.deepEqual(ev.grid, {});
  const a = ev.rooms.A, b = ev.rooms.B;
  assert.deepEqual(a.own_sensors, ["binary_sensor.test"]);
  assert.deepEqual(b.own_sensors, []);
  assert.ok(a.coverage["1.3"] > 0.3 && a.coverage["1.3"] < 1);
  assert.ok(a.seen["1.3"] >= a.coverage["1.3"]);
  assert.equal(a.coverage_mean, a.coverage["1.3"]);
  assert.equal(b.coverage["1.3"], 0);
  assert.equal(b.misfire_risk, 0);
  assert.deepEqual(ev.sensors["binary_sensor.test"], { room: "A", glass: ev.sensors["binary_sensor.test"].glass, spill: { B: 0 } });
});

test("evaluate: misfire through a thin wall, from/spill/misfire agree", () => {
  const m = buildModel(twoRooms({ wall: 0.08 }), "f");
  const s = sensor({ x: 5.5, z: 2, height: 1.3 });
  const ev = evaluate(m, [s], H);
  const share = ev.rooms.B.from["binary_sensor.test"];
  assert.ok(share > 0.05 && share < 0.5, `share ${share}`);
  assert.equal(ev.sensors["binary_sensor.test"].spill.B, share);
  assert.equal(ev.rooms.B.misfire_risk, share);
  // with 10 dB the effective reach is 1.9 m: cells further than that behind the wall stay unseen
  const m2 = buildModel(twoRooms({ wall: 0.08 }), "f");
  const ev2 = evaluate(m2, [s], { ...H, thin_db: 20 });
  assert.ok(ev2.rooms.B.misfire_risk < share);
});

test("evaluate: misfire always uses open doors, even with closed doors in the options", () => {
  const m = buildModel(twoRooms({ wall: 0.3, openings: [door] }), "f");
  const s = sensor({ x: 4, z: 2, height: 1.3 });
  const open = evaluate(m, [s], { ...H, doors: "open" });
  const closed = evaluate(m, [s], { ...H, doors: "closed" });
  assert.ok(open.rooms.B.misfire_risk > 0);
  assert.equal(closed.rooms.B.misfire_risk, open.rooms.B.misfire_risk);
  // a sensor in B sees A's door only when it is open: own coverage of B is not affected here
  assert.equal(closed.rooms.A.coverage["1.3"], open.rooms.A.coverage["1.3"]);
});

test("evaluate: inactive sensors and other floors are ignored, floor_id optional", () => {
  const m = buildModel(twoRooms({ wall: 0.3 }), "f");
  const ev = evaluate(m, [sensor({ active: false }), sensor({ floor_id: "other", entity_id: "x" }), sensor({ floor_id: undefined, entity_id: "y", height: 1.3 })], H);
  assert.deepEqual(ev.rooms.A.own_sensors, ["y"]);
  assert.deepEqual(Object.keys(ev.sensors), ["y"]);
  const none = evaluate(m, [], H);
  assert.equal(none.rooms.A.coverage["1.3"], 0);
  assert.deepEqual(none.rooms.A.from, {});
});

test("evaluate: zones are seen at their own height", () => {
  const furniture = [
    { id: "bed", type: "bed", x: 3, z: 2, w: 1.6, d: 2, h: 0.5, rotation: 0 },
    { id: "far", type: "sofa", x: 1, z: 3.6, w: 1, d: 0.5, h: 0.8, rotation: 0 },
  ];
  const m = buildModel(twoRooms({ wall: 0.3, furniture }), "f");
  const ev = evaluate(m, [sensor({ x: 0.5, z: 2, height: 1.3, tilt: 0 })], { heights: [0.5, 0.9, 1.3] });
  const bed = ev.zones.find((z) => z.name === "bed");
  assert.equal(bed.height, 0.5);
  assert.equal(bed.share, 1);                  // 2.5 m away, straight ahead
  assert.equal(ev.zones.find((z) => z.name === "sofa").height, 0.9);
});

test("evaluate: grid option returns cells per height", () => {
  const m = buildModel(twoRooms({ wall: 0.08 }), "f");
  const s = sensor({ x: 5.5, z: 2, height: 1.3 });
  const ev = evaluate(m, [s], { heights: [0.9, 1.3], grid: true });
  assert.deepEqual(Object.keys(ev.grid), ["0.9", "1.3"]);
  const rows = ev.grid["1.3"];
  assert.equal(rows.length, m.cells["0.1"].length);
  const inA = rows.filter((r) => r.room === "A" && r.own > 0);
  assert.ok(inA.length > 0 && inA.every((r) => r.own_sensor === "binary_sensor.test" && r.spill.length === 0));
  const inB = rows.filter((r) => r.room === "B" && r.spill.length);
  assert.ok(inB.length > 0 && inB.every((r) => r.own === 0 && r.own_sensor === null && r.spill[0] === "binary_sensor.test"));
  close(inB.length / rows.filter((r) => r.room === "B").length, ev.rooms.B.misfire_risk, 1e-3);
});

test("evaluate: other cell sizes work", () => {
  const m = buildModel(twoRooms({ wall: 0.3 }), "f");
  const a = evaluate(m, [sensor({ height: 1.3 })], { ...H, cell: 0.1 });
  const b = evaluate(m, [sensor({ height: 1.3 })], { ...H, cell: 0.25 });
  close(a.rooms.A.coverage["1.3"], b.rooms.A.coverage["1.3"], 0.03);
});

test("spillDetail: walls versus doors", () => {
  const withDoor = buildModel(twoRooms({ wall: 0.3, openings: [door] }), "f");
  const s = sensor({ x: 4, z: 2, height: 1.3 });
  const sd = spillDetail(withDoor, s);
  assert.deepEqual(Object.keys(sd), ["B"]);
  assert.ok(sd.B.total > 0);
  assert.equal(sd.B.walls, 0);
  assert.deepEqual(Object.keys(sd.B.doors), ["dd"]);
  close(sd.B.doors.dd, sd.B.total);

  const thin = buildModel(twoRooms({ wall: 0.08 }), "f");
  const st = spillDetail(thin, sensor({ x: 5.5, z: 2, height: 1.3 }));
  assert.ok(st.B.total > 0);
  close(st.B.walls, st.B.total);
  assert.deepEqual(st.B.doors, {});
  // spill detail agrees with evaluate
  close(st.B.total, evaluate(thin, [sensor({ x: 5.5, z: 2, height: 1.3 })], H).sensors["binary_sensor.test"].spill.B, 1e-4);
});

test("spillDetail: door and wall share add up (thin wall plus open door)", () => {
  const m = buildModel(twoRooms({ wall: 0.08, openings: [door] }), "f");
  const sd = spillDetail(m, sensor({ x: 5.2, z: 2, height: 1.3 }));
  close(sd.B.walls + sd.B.doors.dd, sd.B.total, 2e-4);
  assert.ok(sd.B.walls > 0 && sd.B.doors.dd > 0);
});

test("demo plan: evaluate sanity and timing", () => {
  const { plan, sensors } = demo();
  const m = buildModel(plan, "demo");
  const t0 = performance.now();
  const ev = evaluate(m, sensors, { heights: [0.5, 0.9, 1.3], cell: 0.1 });
  const ms = performance.now() - t0;
  assert.ok(ms < 1500, `evaluate took ${ms.toFixed(0)} ms`);
  assert.deepEqual(Object.keys(ev.rooms), ["living", "bedroom", "kitchen", "hall", "bath"]);
  for (const r of Object.values(ev.rooms)) {
    assert.equal(r.own_sensors.length, 1);
    assert.ok(r.coverage_mean > 0.5 && r.coverage_mean <= 1, `coverage ${r.coverage_mean}`);
    assert.ok(r.misfire_risk >= 0 && r.misfire_risk <= 1);
    for (const h of ["0.5", "0.9", "1.3"]) assert.ok(r.seen[h] >= r.coverage[h]);
  }
  // sitting height sees at least as much as lying height for the bedroom sensor on the wall
  assert.ok(ev.rooms.bedroom.coverage["1.3"] >= ev.rooms.bedroom.coverage["0.5"]);
  assert.equal(ev.sensors["binary_sensor.demo_hall_motion"].room, "hall");
  assert.equal(ev.sensors["binary_sensor.demo_hall_motion"].glass, 0);   // ceiling mount
  assert.ok(ev.zones.some((z) => z.name === "entry" && z.room === "hall"));
  assert.ok(ev.zones.every((z) => z.share >= 0 && z.share <= 1));
});
