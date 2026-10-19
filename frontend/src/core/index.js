// Pure JS presence model. Same algorithms and numbers as the Python core (custom_components/presence_planner/core).
// No DOM access: runs in the panel, in the optimizer Web Worker and in node.

import { PROFILES } from "./profiles.js";
import { buildModel, buildCells, snapPoint } from "./model.js";
import { resolveSensor, detectPoint, DEFAULT_OPTS } from "./engine.js";
import { evaluate, spillDetail } from "./evaluate.js";
import { optimize } from "./optimize.js";

/**
 * Quality 0..1 of one sensor at point [x, y, z] (y = height in metres).
 * `model` comes from buildModel; the sensor may be unresolved (profile defaults are filled in).
 */
export function detect(model, sensor, point, opts) {
  return detectPoint(model, sensor, point, opts);
}

export { PROFILES, resolveSensor, buildModel, buildCells, snapPoint, evaluate, spillDetail, optimize, DEFAULT_OPTS };
