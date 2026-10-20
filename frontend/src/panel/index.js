// Home Assistant custom panel <presence-planner-panel>.
// HA sets `hass`, `narrow`, `route` and `panel`. The panel owns the state, talks to the
// presence_planner WebSocket API, runs the JS core for the 2D map and the statistics,
// and hosts <pp-view3d> and <pp-editor>.
import { LitElement, html, nothing } from "lit";
import { PROFILES, resolveSensor, buildModel, evaluate, optimize } from "../core/index.js";
import "../view3d/index.js";
import "../editor/index.js";
import "./map2d.js";
import { PlannerClient, mapError } from "../api/client.js";
import { createTranslator, createFormatter } from "../i18n/index.js";
import * as S from "./state.js";
import { roomAt, labelPoint } from "./geometry.js";
import { sensorColors, PALETTE } from "./colors.js";
import { OptimizerRunner, workerUrl } from "./optimizer.js";
import { panelStyles } from "./styles.js";
import { renderSensors, renderResults, renderOptimizer, renderAssumptions } from "./side.js";

const OPTIMIZER_CELL = 0.2;

export class PresencePlannerPanel extends LitElement {
  static properties = {
    hass: { attribute: false },
    narrow: { type: Boolean, reflect: true },
    route: { attribute: false },
    panel: { attribute: false },
    _s: { state: true },
    _eval: { state: true },
    _stats: { state: true },
    _model: { state: true },
    _status: { state: true },
    _busy: { state: true },
    _opt: { state: true },
    _addEntity: { state: true },
  };

  static styles = panelStyles;

  constructor() {
    super();
    this._s = S.initialState();
    this._eval = null;
    this._stats = null;
    this._model = null;
    this._status = null;
    this._busy = false;
    this._opt = { roomId: null, profileId: null, target: null, running: false, progress: 0, results: null, error: null, scope: null };
    this._addEntity = "";
    this._client = null;
    this._unsub = null;
    this._evalFast = false;
    this._contactSig = "";
    this._runner = new OptimizerRunner({
      createWorker: () => new Worker(workerUrl(import.meta.url), { type: "module" }),
      fallback: (req) => optimize(this._modelFor(req.plan, req.floorId), req.roomId, req.profileId, req.opts, req.weight, req.profiles),
    });
  }

  /* ---------- lifecycle ---------- */

  connectedCallback() {
    super.connectedCallback();
    if (this._client && !this._unsub) this._subscribe();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribe();
    this._runner.cancel();
    cancelAnimationFrame(this._evalRaf);
  }

  willUpdate(changed) {
    if (changed.has("hass") && this.hass) {
      if (!this._t || this._t.lang !== createTranslator(this.hass.language).lang) {
        this._t = createTranslator(this.hass.language);
        this._f = createFormatter(this.hass.language);
      }
      const dark = !!(this.hass.themes && this.hass.themes.darkMode);
      if (dark !== this._dark) {
        this._dark = dark;
        this.toggleAttribute("dark", dark);
      }
      if (!this._client || this._client.connection !== this.hass.connection) {
        this._client = new PlannerClient(this.hass.connection);
        this._unsubscribe();
        this._load();
        this._subscribe();
        this._loadDeviceProfiles();
      }
      if (this._s.doorsMode === "live") {
        const sig = this._contactSignature();
        if (sig !== this._contactSig) {
          this._contactSig = sig;
          this._scheduleEval(false);
        }
      }
    }
  }

  get t() {
    return this._t || (this._t = createTranslator("en"));
  }

  get fmt() {
    return this._f || (this._f = createFormatter("en"));
  }

  /* ---------- data loading ---------- */

  /** Loads plan and sensors; true on success. Retries while the integration reloads (`not_loaded`). */
  async _load() {
    if (!this._client) return false;
    this._busy = true;
    this._status = { key: "status.loading" };
    try {
      let res;
      for (let attempt = 0; ; attempt++) {
        try {
          res = await this._client.get();
          break;
        } catch (e) {
          if (mapError(e).code !== "not_loaded" || attempt >= 3) throw e;
          await new Promise((r) => setTimeout(r, 1000));
        }
      }
      this._setState(S.applyLoad(this._s, res));
      this._status = null;
      // The backend reports NeonPlan problems in `neonplan.error` and falls back to the own plan.
      const npErr = res.neonplan && (res.neonplan.error || (res.neonplan.incompatible && "neonplan_incompatible"));
      if (npErr) this._status = { key: mapError({ code: npErr, message: npErr }).i18nKey, error: true, detail: npErr };
      return true;
    } catch (e) {
      const err = mapError(e);
      this._s = { ...this._s, loading: false, error: err };
      this._status = { key: err.i18nKey, error: true, detail: err.message };
      return false;
    } finally {
      this._busy = false;
    }
  }

  async _loadDeviceProfiles() {
    try {
      const map = await this._client.deviceProfiles();
      this._s = { ...this._s, deviceProfiles: map };
    } catch (e) {
      /* suggestions are optional */
    }
  }

  async _subscribe() {
    if (!this._client || this._unsub) return;
    try {
      this._unsub = await this._client.subscribe((ev) => {
        // our own save triggers these events too; save() loads the result itself afterwards
        if (this._saving) return;
        const { state, reload } = S.onRemoteRevision(this._s, ev.revision);
        this._s = state;
        if (reload) this._load();
      });
    } catch (e) {
      /* without live updates the panel still works */
    }
  }

  _unsubscribe() {
    if (this._unsub) {
      try {
        this._unsub();
      } catch (e) {
        /* ignore */
      }
    }
    this._unsub = null;
  }

  /* ---------- state, model, evaluation ---------- */

  _setState(next, { fast = false } = {}) {
    const prev = this._s;
    this._s = next;
    if (next.editPlan !== prev.editPlan || next.floorId !== prev.floorId || !this._model) this._rebuildModel();
    if (next.profiles !== prev.profiles) this._profilesDict = null;
    if (next.doorsMode === "live" && prev.doorsMode !== "live") this._contactSig = this._contactSignature();
    this._scheduleEval(fast);
  }

  get profiles() {
    if (!this._profilesDict) this._profilesDict = S.profileDict(this._s.profiles || PROFILES);
    return this._profilesDict;
  }

  _modelFor(plan, floorId) {
    if (plan === this._s.editPlan && floorId === this._s.floorId && this._model) return this._model;
    return buildModel(plan, floorId);
  }

  _rebuildModel() {
    const plan = this._s.editPlan;
    const floorId = this._s.floorId;
    if (!plan || !floorId) {
      this._model = null;
      return;
    }
    try {
      this._model = buildModel(plan, floorId);
      this._modelError = null;
    } catch (e) {
      this._model = null;
      this._modelError = e;
      this._status = { key: "error.model", error: true, detail: e.message };
    }
  }

  _resolved(sensors) {
    return sensors.map((s) => {
      try {
        return resolveSensor(s, this.profiles);
      } catch (e) {
        return s;
      }
    });
  }

  _scheduleEval(fast) {
    this._evalFast = fast;
    cancelAnimationFrame(this._evalRaf);
    clearTimeout(this._evalTimer);
    const run = () => this._runEval(fast);
    if (fast) this._evalRaf = requestAnimationFrame(run);
    else this._evalTimer = setTimeout(run, 0);
  }

  /** Model options for the 3D volume (doors, thin walls); same object while they do not change. */
  _coreOpts3d() {
    const o = S.coreOptions(this._s, this.hass && this.hass.states, { fast: false });
    const key = JSON.stringify([o.doors, o.thin_db]);
    if (this._opts3dKey !== key) {
      this._opts3dKey = key;
      this._opts3d = { doors: o.doors, thin_db: o.thin_db };
    }
    return this._opts3d;
  }

  _runEval(fast) {
    if (!this._model) {
      this._eval = null;
      this._stats = null;
      return;
    }
    const opts = S.coreOptions(this._s, this.hass && this.hass.states, { fast });
    try {
      const ev = evaluate(this._model, this._resolved(S.sensorsOnFloor(this._s)), opts);
      this._eval = { ...ev, cell: opts.cell, fast };
      // Statistics only from full evaluations, so the tables do not flicker while dragging.
      if (!fast) this._stats = this._eval;
    } catch (e) {
      this._eval = null;
      this._status = { key: "error.model", error: true, detail: e.message };
    }
  }

  _contactSignature() {
    const floor = S.floorOf(this._s);
    const states = (this.hass && this.hass.states) || {};
    return ((floor && floor.openings) || []).filter((o) => o.contact).map((o) => `${o.id}:${(states[o.contact] || {}).state}`).join("|");
  }

  /* ---------- helpers for templates ---------- */

  name(entityId) {
    const st = this.hass && this.hass.states[entityId];
    return (st && st.attributes && st.attributes.friendly_name) || entityId;
  }

  roomName(roomId) {
    const r = this._model && (this._model.rooms || []).find((x) => x.id === roomId);
    return r ? r.name || r.id : this.t("room.outside");
  }

  roomOf(sensor) {
    return roomAt(this._model, sensor.x, sensor.z);
  }

  roomHeight(roomId) {
    const r = this._model && (this._model.rooms || []).find((x) => x.id === roomId);
    const f = S.floorOf(this._s);
    return (r && r.height) || (f && f.height) || 2.5;
  }

  get colors() {
    return sensorColors(this._s.sensors, this._dark);
  }

  get isAdmin() {
    return !this.hass || !this.hass.user || this.hass.user.is_admin !== false;
  }

  /* ---------- actions (also called from side.js) ---------- */

  _selectId(detail) {
    if (typeof detail === "string") return detail;
    return (detail && (detail.entityId || detail.entity_id)) || null;
  }

  select(entityId) {
    if (!entityId || entityId === this._s.selected) return;
    this._s = { ...this._s, selected: entityId };
  }

  patchSensor(entityId, patch, fast = false) {
    this._setState(S.updateSensor(this._s, entityId, patch), { fast });
  }

  setProfile(entityId, profileId) {
    this._setState(S.setProfile(this._s, entityId, profileId));
  }

  setMount(entityId, mount) {
    const s = S.getSensor(this._s, entityId);
    this._setState(S.setMount(this._s, entityId, mount, s ? this.roomHeight(this.roomOf(s)) : undefined));
  }

  removeSensor(entityId) {
    this._setState(S.removeSensor(this._s, entityId));
  }

  setOption(key, value, fast = false) {
    const next = { ...this._s, [key]: value };
    if (key === "thinDb") next.thinTouched = true;
    if (["height", "doorsMode", "thinDb"].includes(key)) this._setState(next, { fast });
    else this._s = next;
  }

  addSensor() {
    const eid = this._addEntity || (S.sensorCandidates(this.hass.states, this._s.sensors)[0] || {}).entity_id;
    if (!eid || !this._model) return;
    const rooms = this._model.rooms || [];
    const occupied = new Set(S.sensorsOnFloor(this._s).map((s) => this.roomOf(s)));
    const room = rooms.find((r) => !occupied.has(r.id)) || rooms[0];
    const at = room ? labelPoint(room.points) : { x: 0, z: 0 };
    const sensor = S.newSensor(eid, {
      floorId: this._s.floorId,
      x: at.x,
      z: at.z,
      profileId: this._s.deviceProfiles[eid] || "custom",
      profiles: this.profiles,
    });
    this._addEntity = "";
    this._setState(S.addSensor(this._s, sensor));
  }

  async save() {
    if (!this._client) return;
    this._busy = true;
    this._saving = true;
    this._status = { key: "status.saving" };
    try {
      if (this._s.planDirty && S.editorAvailable(this._s)) await this._client.savePlan(this._s.editPlan);
      let revision;
      if (this._s.dirty) {
        const res = await this._client.saveSensors(S.sensorsForSave(this._s));
        revision = res && res.revision;
        this._s = S.markSaved(this._s, revision);
      }
      // _load sets its own error status when it fails; only a successful load confirms the save
      if (await this._load()) this._status = { key: "status.saved" };
    } catch (e) {
      const err = mapError(e);
      this._status = { key: err.i18nKey, error: true, detail: err.message };
    } finally {
      this._busy = false;
      this._saving = false;
    }
  }

  reset() {
    if (this._s.remoteChanged) {
      this._load();
      return;
    }
    this._setState(S.resetChanges(this._s));
    this._status = null;
  }

  async exportPlan() {
    try {
      const data = await this._client.exportPlan();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "presence-planner-neonplan-import.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      this._status = { key: "status.exported" };
    } catch (e) {
      const err = mapError(e);
      this._status = { key: err.i18nKey, error: true, detail: err.message };
    }
  }

  _pickImport() {
    this.renderRoot.querySelector("#import-file").click();
  }

  async _importFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    let data;
    try {
      data = JSON.parse(await file.text());
    } catch (err) {
      this._status = { key: "error.invalid_json", error: true };
      return;
    }
    if ((this._s.dirty || this._s.planDirty || this._s.plan) && !window.confirm(this.t("import.confirm"))) return;
    this._busy = true;
    try {
      await this._client.importPlan(data);
      await this._load();
      this._status = { key: "status.imported" };
    } catch (err) {
      const m = mapError(err);
      this._status = { key: m.i18nKey, error: true, detail: m.message };
    } finally {
      this._busy = false;
    }
  }

  async linkNeonplan() {
    try {
      await this._client.linkNeonplan();
      this._status = { key: "status.linked" };
      await this._load();
    } catch (e) {
      const err = mapError(e);
      this._status = { key: err.i18nKey, error: true, detail: err.message };
    }
  }

  /* ---------- optimizer ---------- */

  setOpt(patch) {
    this._opt = { ...this._opt, ...patch };
  }

  optimizerRoom() {
    const rooms = (this._model && this._model.rooms) || [];
    if (rooms.some((r) => r.id === this._opt.roomId)) return this._opt.roomId;
    const sel = S.getSensor(this._s, this._s.selected);
    const r = sel ? this.roomOf(sel) : null;
    return r || (rooms[0] && rooms[0].id) || null;
  }

  optimizerProfile() {
    if (this._opt.profileId) return this._opt.profileId;
    const sel = S.getSensor(this._s, this._s.selected);
    return (sel && sel.profile) || "aqara_fp300";
  }

  optimizerTarget(roomId) {
    if (this._opt.target && this._opt.scope !== "all") {
      if (this._opt.target === "-") return null;
      if (S.getSensor(this._s, this._opt.target)) return this._opt.target;
    }
    return S.optimizerTarget(this._s, roomId, (s) => this.roomOf(s));
  }

  async runOptimizer(all) {
    if (!this._model || this._opt.running) return;
    const roomIds = all ? (this._model.rooms || []).map((r) => r.id) : [this.optimizerRoom()].filter(Boolean);
    if (!roomIds.length) return;
    const opts = { ...S.coreOptions(this._s, this.hass && this.hass.states, { grid: false }), cell: OPTIMIZER_CELL };
    this.setOpt({ running: true, progress: 0, results: null, error: null, scope: all ? "all" : "room", currentRoom: roomIds[0] });
    try {
      const results = await this._runner.run(
        { plan: this._s.editPlan, floorId: this._s.floorId, roomIds, profileId: this.optimizerProfile(), opts, weight: this._s.weight, profiles: this.profiles },
        (p, roomId) => this.setOpt({ progress: p, currentRoom: roomId }),
      );
      this.setOpt({ running: false, results, progress: 1 });
    } catch (e) {
      this.setOpt({ running: false, error: e.message || String(e) });
    }
  }

  cancelOptimizer() {
    this._runner.cancel();
    this.setOpt({ running: false, progress: 0 });
  }

  applyCandidate(entityId, cand) {
    if (!entityId) return;
    this._setState({ ...S.applyCandidate(this._s, entityId, cand), selected: entityId });
  }

  /* ---------- render ---------- */

  render() {
    const t = this.t;
    const st = this._s;
    if (!this.hass) return html``;
    const floors = (st.plan && st.plan.floors) || [];
    const dirty = st.dirty || st.planDirty;
    return html`<div class="app">
      ${this._renderTop(floors, dirty)}
      ${st.remoteChanged
        ? html`<div class="banner" role="alert"><span>${t("banner.remote_changed")}</span><button @click=${() => this._load()}>${t("action.reload")}</button></div>`
        : nothing}
      ${!this.isAdmin ? html`<div class="banner" role="note"><span>${t("banner.read_only")}</span></div>` : nothing}
      ${st.loading && !st.plan ? html`<div class="empty">${t("status.loading")}</div>` : st.error && !st.plan ? this._renderError() : !st.plan ? this._renderNoPlan() : this._renderBody()}
    </div>`;
  }

  _renderTop(floors, dirty) {
    const t = this.t;
    const st = this._s;
    const status = this._status;
    const statusText = status
      ? t(status.key, { detail: status.detail || "" }) + (status.error && status.detail && !t(status.key).includes("{detail}") ? ` (${status.detail})` : "")
      : st.plan
        ? [st.revision !== null ? t("status.revision", { revision: st.revision }) : null, t("status.sensors", { count: S.sensorsOnFloor(st).length }), dirty ? t("status.unsaved") : null].filter(Boolean).join(" · ")
        : "";
    return html`<header class="top">
      <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
      <h1>${t("title")}</h1>
      ${st.source
        ? html`<span class="badge ${st.source === "neonplan" ? "np" : ""}">${st.source === "neonplan" ? t("source.neonplan") : t("source.own")}</span>`
        : nothing}
      ${floors.length > 1
        ? html`<select aria-label=${t("floor.select")} .value=${st.floorId || ""} @change=${(e) => this._setState({ ...st, floorId: e.target.value, selected: null })}>
            ${floors.map((f) => html`<option value=${f.id} ?selected=${f.id === st.floorId}>${f.name || f.id}</option>`)}
          </select>`
        : nothing}
      <span class="status ${status && status.error ? "err" : ""}" role="status" aria-live="polite">${statusText}</span>
      <div class="actions">
        <button class="primary" ?disabled=${!dirty || this._busy || !this.isAdmin} @click=${() => this.save()}>${t("action.save")}</button>
        <button ?disabled=${(!dirty && !st.remoteChanged) || this._busy} @click=${() => this.reset()}>${t("action.reset")}</button>
        <button ?disabled=${!st.plan || this._busy} @click=${() => this.exportPlan()}>${t("action.export")}</button>
        <button ?disabled=${this._busy || !this.isAdmin} @click=${() => this._pickImport()}>${t("action.import")}</button>
        <input id="import-file" type="file" accept=".json,application/json" hidden @change=${(e) => this._importFile(e)} />
        ${S.canLinkNeonplan(st) ? html`<button ?disabled=${this._busy || !this.isAdmin} @click=${() => this.linkNeonplan()}>${t("action.link_neonplan")}</button>` : nothing}
      </div>
    </header>`;
  }

  _renderError() {
    const t = this.t;
    return html`<div class="empty"><p>${t(this._s.error.i18nKey || "error.generic", { detail: this._s.error.message })}</p><button @click=${() => this._load()}>${t("action.reload")}</button></div>`;
  }

  _renderNoPlan() {
    const t = this.t;
    return html`<div class="empty">
      <p>${t("empty.no_plan")}</p>
      <div class="row" style="justify-content:center">
        <button @click=${() => this._pickImport()} ?disabled=${!this.isAdmin}>${t("action.import")}</button>
        ${S.editorAvailable(this._s) ? html`<button class="primary" @click=${() => this._startOwnPlan()}>${t("empty.start_editor")}</button>` : nothing}
      </div>
    </div>`;
  }

  _startOwnPlan() {
    const plan = { version: 1, settings: { wall_exterior: 0.24, wall_interior: 0.12 }, floors: [{ id: "f1", name: this.t("floor.default_name"), ha_floor: null, elevation: 0, height: 2.5, rooms: [], openings: [], walls: [], furniture: [], outdoor: [], background: null }] };
    this._setState({ ...this._s, plan, editPlan: plan, floorId: "f1", planDirty: true, tab: "editor" });
  }

  _renderBody() {
    const t = this.t;
    const st = this._s;
    const editor = S.editorAvailable(st);
    const tab = editor ? st.tab : "planner";
    return html`
      <nav class="tabs" role="tablist" aria-label=${t("tabs.label")} @keydown=${(e) => this._tabKey(e, editor)}>
        <button role="tab" id="tab-planner" aria-controls="tp-planner" aria-selected=${tab === "planner" ? "true" : "false"} tabindex=${tab === "planner" ? 0 : -1} @click=${() => this.setOption("tab", "planner")}>${t("tabs.planner")}</button>
        ${editor
          ? html`<button role="tab" id="tab-editor" aria-controls="tp-editor" aria-selected=${tab === "editor" ? "true" : "false"} tabindex=${tab === "editor" ? 0 : -1} @click=${() => this.setOption("tab", "editor")}>${t("tabs.editor")}</button>`
          : nothing}
      </nav>
      ${tab === "editor" ? this._renderEditor() : this._renderPlanner()}`;
  }

  _tabKey(e, editor) {
    if (!editor || (e.key !== "ArrowLeft" && e.key !== "ArrowRight")) return;
    const next = this._s.tab === "planner" ? "editor" : "planner";
    this.setOption("tab", next);
    this.updateComplete.then(() => {
      const b = this.renderRoot.querySelector(`#tab-${next}`);
      if (b) b.focus();
    });
  }

  /** HA areas and floors as sorted lists for the editor; recomputed only when HA sends new registries. */
  _haRegistries() {
    const areas = this.hass?.areas;
    const floors = this.hass?.floors;
    if (this._regCache && this._regCache.areas === areas && this._regCache.floors === floors) return this._regCache;
    const byName = (a, b) => String(a.name || "").localeCompare(String(b.name || ""));
    this._regCache = {
      areas,
      floors,
      areaList: Object.values(areas || {}).sort(byName),
      floorList: Object.values(floors || {}).sort((a, b) => (a.level ?? 0) - (b.level ?? 0) || byName(a, b)),
    };
    return this._regCache;
  }

  _renderEditor() {
    const reg = this._haRegistries();
    return html`<section id="tp-editor" role="tabpanel" aria-labelledby="tab-editor" class="editor">
      <pp-editor .plan=${this._s.editPlan} .floorId=${this._s.floorId} .hass=${this.hass} .dark=${!!this._dark}
        .lang=${this.hass?.language || "en"} .areas=${reg.areaList} .floors=${reg.floorList}
        @plan-changed=${(e) => this._onPlanChanged(e)}></pp-editor>
    </section>`;
  }

  _onPlanChanged(e) {
    const d = e.detail;
    const plan = d && d.plan ? d.plan : d;
    if (!plan || !plan.floors) return;
    let floorId = this._s.floorId;
    if (d && d.floorId) floorId = d.floorId;
    if (!plan.floors.some((f) => f.id === floorId)) floorId = plan.floors[0] ? plan.floors[0].id : null;
    this._setState({ ...S.setEditPlan(this._s, plan), floorId });
  }

  _renderPlanner() {
    const t = this.t;
    const st = this._s;
    const sensors = S.sensorsOnFloor(st);
    const resolved = this._resolved(sensors);
    const colors = this.colors;
    const names = Object.fromEntries(sensors.map((s) => [s.entity_id, this.name(s.entity_id)]));
    const view = st.view;
    const pal = PALETTE[this._dark ? "dark" : "light"];
    return html`<div id="tp-planner" role="tabpanel" aria-labelledby="tab-planner" class="planner">
      <section class="stage" aria-label=${t("stage.label")}>
        <div class="toolbar">
          <div class="seg" role="group" aria-label=${t("view.label")}>
            ${S.VIEWS.map((v) => html`<button aria-pressed=${view === v ? "true" : "false"} @click=${() => this.setOption("view", v)}>${t(`view.${v}`)}</button>`)}
          </div>
          <div class="seg" role="group" aria-label=${t("height.label")}>
            ${S.HEIGHTS.map((h) => html`<button aria-pressed=${st.height === h ? "true" : "false"} title=${t(`height.h${String(h).replace(".", "")}`)} @click=${() => this.setOption("height", h)}>${t(`height.short${String(h).replace(".", "")}`)}</button>`)}
          </div>
          <div class="legend">
            <span><i style="background:${pal[0]};opacity:.6"></i>${t("legend.own")}</span>
            <span><i style="background:var(--error-color, #db4437)"></i>${t("legend.spill")}</span>
          </div>
        </div>
        ${this._model
          ? html`<div class="views ${view}">
              ${view !== "3d"
                ? html`<div class="view"><pp-map2d .model=${this._model} .sensors=${resolved} .evaluation=${this._eval} .colors=${colors} .names=${names}
                    .height=${st.height} .cell=${(this._eval && this._eval.cell) || 0.1} .selected=${st.selected} ?dark=${!!this._dark} ?cones=${st.cones} ?snap=${st.snap}
                    ?readonly=${false} .t=${t}
                    @select=${(e) => this.select(this._selectId(e.detail))}
                    @sensor-move=${(e) => this.patchSensor(e.detail.entity_id, e.detail.patch, !e.detail.final)}></pp-map2d></div>`
                : nothing}
              ${view !== "2d"
                ? html`<div class="view"><pp-view3d .model=${this._model} .sensors=${resolved} .evaluation=${this._eval} .height=${st.height}
                    .selected=${st.selected} .dark=${!!this._dark} .colors=${colors} .coreOpts=${this._coreOpts3d()}
                    .labels=${{ reset: t("view3d.reset"), top: t("view3d.top"), mode: t("view3d.mode"), flat: t("view3d.mode_flat"), voxels: t("view3d.mode_voxels"), points: t("view3d.mode_points") }}
                    @select=${(e) => this.select(this._selectId(e.detail))}></pp-view3d></div>`
                : nothing}
            </div>
            <p class="hint">${t("map.help")}</p>`
          : html`<div class="empty">${this._modelError ? t("error.model", { detail: this._modelError.message }) : t("empty.no_floor")}</div>`}
      </section>
      <aside class="side">
        ${renderSensors(this, sensors)}
        ${renderResults(this)}
        ${renderOptimizer(this)}
        ${renderAssumptions(this)}
      </aside>
    </div>`;
  }
}

if (!customElements.get("presence-planner-panel")) customElements.define("presence-planner-panel", PresencePlannerPanel);
