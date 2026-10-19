// Shared helpers for the core tests: tiny synthetic plans and the demo plan.
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const sharedPath = (...p) => path.join(root, "shared", ...p);
export const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
export const demo = () => readJson(sharedPath("demo-plan.json"));

/**
 * Two rooms side by side: A = [0,6] x [0,4], B = [6,10] x [0,4], exterior walls 0.3 m,
 * the wall between them has the given thickness. Optional openings and furniture.
 */
export function twoRooms({ wall = 0.3, openings = [], furniture = [], walls = [] } = {}) {
  return {
    version: 1,
    settings: { wall_exterior: 0.3, wall_interior: 0.115 },
    floors: [{
      id: "f", name: "Test", elevation: 0, height: 2.6,
      rooms: [
        { id: "A", name: "A", points: [[0, 0], [6, 0], [6, 4], [0, 4]], wall_thickness: [0.3, wall, 0.3, 0.3] },
        { id: "B", name: "B", points: [[6, 0], [10, 0], [10, 4], [6, 4]], wall_thickness: [0.3, 0.3, 0.3, wall] },
      ],
      openings, walls, furniture, outdoor: [], background: null,
    }],
  };
}

/** A fully specified sensor record (no profile lookup needed). */
export function sensor(over = {}) {
  return {
    entity_id: "binary_sensor.test", floor_id: "f", x: 0.5, z: 2, height: 1.5, phi: 0, tilt: 0, mount: "wall",
    profile: "custom", fov_h: 120, fov_v: 90, reach: 6, active: true, ...over,
  };
}

export const near = (assertEq, a, b, tol, msg) => assertEq(Math.abs(a - b) <= tol, true, `${msg || ""} expected ${b} +- ${tol}, got ${a}`);
