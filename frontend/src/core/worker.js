// Web Worker entry: runs the optimizer off the main thread.
//   in:  {id, type: "optimize",    plan, floorId, roomId, profileId, opts, weight}
//        {id, type: "optimizeAll", plan, floorId, profileId, opts, weight}
//   out: {id, progress: 0..1} while running, then {id, result} (or {id, error})
// "optimize" returns the candidate list of one room, "optimizeAll" returns {roomId: candidates[]}.

import { buildModel } from "./model.js";
import { optimize } from "./optimize.js";
import { PROFILES } from "./profiles.js";

/** Handle one message; `post` receives the outgoing messages. Exported so node tests can drive it. */
export function handleMessage(msg, post) {
  const { id, type } = msg || {};
  try {
    if (type !== "optimize" && type !== "optimizeAll") throw new Error(`unknown message type: ${type}`);
    const model = buildModel(msg.plan, msg.floorId);
    const weight = msg.weight ?? 1;
    if (type === "optimize") {
      const result = optimize(model, msg.roomId, msg.profileId, msg.opts, weight, PROFILES, (p) => post({ id, progress: p }));
      post({ id, result });
    } else {
      const result = {};
      const n = model.rooms.length;
      model.rooms.forEach((room, i) => {
        result[room.id] = optimize(model, room.id, msg.profileId, msg.opts, weight, PROFILES, (p) => post({ id, progress: (i + p) / n }));
      });
      post({ id, progress: 1 });
      post({ id, result });
    }
  } catch (err) {
    post({ id, error: String(err && err.message ? err.message : err) });
  }
}

// Only attach in a worker scope.
if (typeof WorkerGlobalScope !== "undefined" && typeof self !== "undefined" && self instanceof WorkerGlobalScope) {
  self.onmessage = (e) => handleMessage(e.data, (m) => self.postMessage(m));
}
