// WebSocket client for the presence_planner commands (see ARCHITECTURE.md, "Integration").
// Works with any object that has `sendMessagePromise` and `subscribeMessage`
// (the Home Assistant `hass.connection`), so it can be tested with a fake connection.

export const DOMAIN = "presence_planner";

/** Error with a stable code and an i18n key for the UI. */
export class PlannerError extends Error {
  constructor(code, message, i18nKey) {
    super(message || code);
    this.name = "PlannerError";
    this.code = code;
    this.i18nKey = i18nKey;
  }
}

const KEY_BY_CODE = {
  unauthorized: "error.unauthorized",
  unknown_command: "error.not_loaded",
  not_loaded: "error.not_loaded",
  no_plan: "error.no_plan",
  not_found: "error.not_found",
  not_supported: "error.not_supported",
  invalid_format: "error.invalid_format",
  invalid_plan: "error.invalid_format",
  timeout: "error.timeout",
};

/** Maps a raw Home Assistant WebSocket error (or anything thrown) to a PlannerError. */
export function mapError(err) {
  if (err instanceof PlannerError) return err;
  const code = (err && (err.code || (err.error && err.error.code))) || "unknown";
  const message = (err && (err.message || (err.error && err.error.message))) || String(err);
  let mapped = KEY_BY_CODE[code];
  if (!mapped && /unauthori[sz]ed|admin/i.test(message)) return new PlannerError("unauthorized", message, KEY_BY_CODE.unauthorized);
  return new PlannerError(code, message, mapped || "error.generic");
}

/**
 * Normalises the answer of `presence_planner/device_profiles` into `{ entity_id: profile_id }`.
 * Accepted shapes: a plain map, `{ profiles: map }`, `{ suggestions: map }` or a list of
 * `{ entity_id, profile }` / `{ entity_id, profile_id }`.
 */
export function normaliseDeviceProfiles(res) {
  if (!res) return {};
  let src = res;
  if (!Array.isArray(src) && typeof src === "object") src = src.suggestions || src.devices || src.profiles || src;
  const out = {};
  if (Array.isArray(src)) {
    for (const item of src) {
      if (!item || !item.entity_id) continue;
      const id = item.profile_id || item.profile || (item.suggestion && item.suggestion.id);
      if (id) out[item.entity_id] = typeof id === "object" ? id.id : id;
    }
    return out;
  }
  for (const [eid, v] of Object.entries(src)) {
    if (!v) continue;
    out[eid] = typeof v === "object" ? v.profile_id || v.profile || v.id : v;
  }
  return out;
}

export class PlannerClient {
  constructor(connection) {
    this.connection = connection;
  }

  async _call(type, data = {}) {
    if (!this.connection) throw new PlannerError("no_connection", "No connection", "error.generic");
    try {
      return await this.connection.sendMessagePromise({ type: `${DOMAIN}/${type}`, ...data });
    } catch (err) {
      throw mapError(err);
    }
  }

  /** → { revision, plan, sensors, profiles, options } */
  get() {
    return this._call("get");
  }

  /** Subscribes to `{ revision }` events. Resolves to an unsubscribe function. */
  async subscribe(callback) {
    if (!this.connection) throw new PlannerError("no_connection", "No connection", "error.generic");
    try {
      return await this.connection.subscribeMessage((ev) => callback(ev || {}), { type: `${DOMAIN}/subscribe` });
    } catch (err) {
      throw mapError(err);
    }
  }

  saveSensors(sensors) {
    return this._call("save_sensors", { sensors });
  }

  savePlan(plan) {
    return this._call("save_plan", { plan });
  }

  /** `plan` (admins only) exports that plan instead of the saved one, e.g. unsaved editor changes. */
  exportPlan(plan) {
    return this._call("export", plan ? { plan } : {});
  }

  importPlan(data) {
    return this._call("import", { data });
  }

  async deviceProfiles() {
    return normaliseDeviceProfiles(await this._call("device_profiles"));
  }
}
