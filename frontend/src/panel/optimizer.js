// Runs the optimizer in the Web Worker (`presence-planner-worker.js`), one room per request.
// No DOM; the Worker constructor is injected so node:test can use a fake.
//
// Message protocol of core/worker.js (panel → worker):
//   { id, type: "optimize", plan, floorId, roomId, profileId, opts, weight }
// Worker → panel:
//   { id, progress: 0…1 } while running, then { id, result: [candidate…] } or { id, error }
// Typed variants ({ type: "progress" | "result" | "error", value, done/total, message }) are accepted too.
// If no worker can be created, `fallback(request)` runs the optimizer on the main thread.

export const WORKER_FILE = "presence-planner-worker.js";
export const WORKER_PATH = "/presence_planner/frontend/presence-planner-worker.js";

/** Worker URL next to the panel bundle (keeps cache-busting query strings), else the fixed path. */
export function workerUrl(baseUrl) {
  try {
    if (baseUrl && /^https?:/.test(baseUrl)) {
      const u = new URL(WORKER_FILE, baseUrl);
      const q = new URL(baseUrl).search;
      if (q) u.search = q;
      return u.href;
    }
  } catch (e) {
    /* fall through */
  }
  return WORKER_PATH;
}

const progressOf = (msg) => {
  if (typeof msg.value === "number") return msg.value;
  if (typeof msg.progress === "number") return msg.progress;
  if (msg.total) return (msg.done || 0) / msg.total;
  return null;
};
const resultOf = (msg) => msg.result || msg.results || msg.candidates || [];

export class OptimizerRunner {
  /**
   * @param {{ createWorker?: () => Worker, fallback?: (req) => Promise<Array>|Array }} deps
   */
  constructor({ createWorker, fallback } = {}) {
    this.createWorker = createWorker;
    this.fallback = fallback;
    this.worker = null;
    this.nextId = 1;
    this.pending = new Map();
    this.cancelled = false;
    this.running = false;
  }

  _ensureWorker() {
    if (this.worker || !this.createWorker) return this.worker;
    try {
      this.worker = this.createWorker();
    } catch (e) {
      this.createWorker = null;
      return null;
    }
    this.worker.onmessage = (ev) => this._onMessage(ev.data || {});
    this.worker.onerror = (ev) => {
      const err = new Error((ev && ev.message) || "worker error");
      for (const p of this.pending.values()) p.reject(err);
      this.pending.clear();
      this._dropWorker();
    };
    return this.worker;
  }

  _dropWorker() {
    if (this.worker) {
      try {
        this.worker.terminate();
      } catch (e) {
        /* ignore */
      }
    }
    this.worker = null;
  }

  _onMessage(msg) {
    const p = this.pending.get(msg.id);
    if (!p) return;
    if (msg.type === "error" || msg.error !== undefined) {
      this.pending.delete(msg.id);
      p.reject(new Error(msg.message || msg.error || "optimizer error"));
    } else if (msg.type === "result" || msg.result !== undefined || msg.results !== undefined || msg.candidates !== undefined) {
      this.pending.delete(msg.id);
      p.resolve(resultOf(msg));
    } else {
      const v = progressOf(msg);
      if (v !== null) p.onProgress(Math.max(0, Math.min(1, v)));
    }
  }

  _runOne(req, onProgress) {
    const worker = this._ensureWorker();
    if (!worker) {
      if (!this.fallback) return Promise.reject(new Error("no optimizer available"));
      return Promise.resolve().then(() => this.fallback(req));
    }
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject, onProgress });
      worker.postMessage({ id, type: "optimize", ...req });
    });
  }

  /**
   * Optimizes each room in `roomIds` in turn.
   * @returns {Promise<Object<string, Array>>} candidates per room id; rooms that failed carry `{ error }`.
   */
  async run({ plan, floorId, roomIds, profileId, opts, weight, profiles }, onProgress = () => {}) {
    this.cancelled = false;
    this.running = true;
    const out = {};
    const n = roomIds.length || 1;
    try {
      for (let i = 0; i < roomIds.length; i++) {
        if (this.cancelled) break;
        const roomId = roomIds[i];
        onProgress(i / n, roomId);
        const req = { plan, floorId, roomId, profileId, opts, weight, profiles };
        try {
          out[roomId] = await this._runOne(req, (v) => onProgress((i + v) / n, roomId));
        } catch (e) {
          if (this.cancelled) break;
          out[roomId] = { error: e.message || String(e) };
        }
      }
      if (!this.cancelled) onProgress(1, null);
      return out;
    } finally {
      this.running = false;
    }
  }

  /** Stops the current run: the worker is terminated and recreated on the next run. */
  cancel() {
    this.cancelled = true;
    const err = new Error("cancelled");
    for (const p of this.pending.values()) p.reject(err);
    this.pending.clear();
    this._dropWorker();
  }

  dispose() {
    this.cancel();
    this.createWorker = null;
  }
}
