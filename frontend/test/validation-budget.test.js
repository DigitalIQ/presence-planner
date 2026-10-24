import test from "node:test";
import assert from "node:assert/strict";
import { kernelWeight, kernelWork, validatePlan, validateSensors } from "../src/core/validation.js";

// Mirrors tests/core/test_plan_limits.py: the same plans must be refused and accepted by both validators.
const room = { id: "r", points: [[0, 0], [24.9, 0], [24.9, 25], [0, 25]] };
const plan = (furniture = 0, tallWalls = 0) => ({
  version: 1,
  floors: [{
    id: "f", rooms: [room],
    furniture: Array.from({ length: furniture }, (_, i) => ({ id: `w${i}`, type: "wardrobe", x: 4 + i * 0.4, z: 4, w: 0.4, d: 0.4, h: 2.0 })),
    walls: Array.from({ length: tallWalls }, (_, i) => ({ id: `t${i}`, a: [4, 5 + i * 0.3], b: [4.2, 5 + i * 0.3], thickness: 0.1 })),
  }],
});
const sensors = (count, reach = 100, fov_h = 360) => Array.from({ length: count }, (_, i) => ({
  entity_id: `binary_sensor.s${i}`, floor_id: "f", x: 1 + i * 0.5, z: 1, height: 1.9, phi: 0, tilt: 0, mount: "wall", fov_h, fov_v: 180, reach,
}));

test("the ray casting budget counts obstacles, tall walls and the reach of the sensors", () => {
  assert.throws(() => validateSensors(sensors(64), plan(200)), /sensor_work_budget_exceeded/);
  assert.throws(() => validateSensors(sensors(8), plan(40)), /sensor_work_budget_exceeded/);
  assert.throws(() => validateSensors(sensors(4), plan(0, 120)), /sensor_work_budget_exceeded/);
  validateSensors(sensors(8), plan(8));
  validateSensors(sensors(64, 6, 120), plan(20, 20));
  const low = plan(200);
  low.floors[0].furniture.forEach((f) => { f.h = 0.8; });
  validateSensors(sensors(8), low);
});

test("kernel weight and work equal the Python numbers", () => {
  const floor = plan(10, 10).floors[0];
  floor.walls[0].height = 1.0;
  assert.equal(kernelWeight(floor), 64 + 4 + 8 * 9 + 1 + 16 * 10);
  assert.equal(kernelWork(floor, []), kernelWork(floor, sensors(1, 100, 360)));
});

test("sensors of unknown floors are refused", () => {
  assert.throws(() => validateSensors([{ ...sensors(1)[0], floor_id: "gone" }], plan()), /sensor_floor_missing/);
  assert.throws(() => validateSensors([{ ...sensors(1)[0], x: 1e9 }], plan()), /invalid_number/);
});

test("door contacts must be entity ids", () => {
  const withContact = (opening) => ({ version: 1, floors: [{ id: "f", rooms: [room], openings: [{ id: "d", room_id: "r", edge: 0, offset: 1, width: 0.8, ...opening }] }] });
  for (const opening of [{ contact: { a: 1 } }, { contact: ["binary_sensor.door"] }, { contact: 5 }, { contact: "no_domain" }, { contact: "Binary_Sensor.Door" }, { contact: "binary_sensor.door", contact_invert: "yes" }]) {
    assert.throws(() => validatePlan(withContact(opening)), `${JSON.stringify(opening)}`);
  }
  for (const opening of [{}, { contact: null }, { contact: "binary_sensor.door", contact_invert: true }]) validatePlan(withContact(opening));
});
