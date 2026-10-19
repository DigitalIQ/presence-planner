// <pp-editor>: floor plan editor for own plans (rooms, walls, openings, free walls, furniture,
// background image). Works on an immutable pp-plan and emits `plan-changed` after every completed
// edit. All geometry and plan changes live in the pure modules next to this file.

import { LitElement, html, svg, nothing } from "lit";
import { live } from "lit/directives/live.js";
import { editorStyles } from "./styles.js";
import { icon } from "./icons.js";
import { formatNumber, parseNumber, translate } from "./strings.js";
import {
  add,
  backgroundCorners,
  backgroundScaleFromPoints,
  boundsOf,
  cross,
  dist,
  edgeOf,
  furnitureCorners,
  handleRotation,
  inwardNormal,
  lerp,
  polygonArea,
  polygonCentroid,
  rotate,
  roundMm,
  scale,
  signedArea,
  snapPoint,
  snapToGrid,
  snapTranslation,
  snapValue,
  sub,
} from "./geometry.js";
import { edgeInfo, freeWallPoly, nearestEdge, openingGeometry, wallBands } from "./walls.js";
import * as Ops from "./plan-ops.js";
import { canRedo, canUndo, createHistory, pushState, redo, replacePresent, undo } from "./history.js";
import { fitBounds, pinchView, toPlan, zoomAt } from "./view.js";
import { FURNITURE_GROUPS, isObstacle } from "./furniture.js";

const GRID = 0.05; // snap grid in metres
const SNAP_PX = 10; // snap distance on screen
const DRAG_PX = 4; // movement before a press becomes a drag
const HANDLE_PX = 6;
const HIT_PX = 14;
const EDGE_TOL_M = 0.3; // clicks this close to an edge pick it (wall, door, window tools)

const TOOLS = [
  { id: "select", key: "V", icon: "select" },
  { id: "room", key: "R", icon: "room" },
  { id: "wall", key: "W", icon: "wall" },
  { id: "door", key: "D", icon: "door" },
  { id: "window", key: "N", icon: "window" },
  { id: "freewall", key: "F", icon: "freewall" },
  { id: "furniture", key: "M", icon: "furniture" },
  { id: "background", key: "B", icon: "background" },
];

// which selection kinds each tool keeps when it is activated
const TOOL_SELECTION = {
  select: ["room", "corner", "opening", "wall", "furniture"],
  room: ["room", "corner"],
  wall: ["edge"],
  door: ["opening"],
  window: ["opening"],
  freewall: ["wall"],
  furniture: ["furniture"],
  background: ["background"],
};

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || "");

function polyD(points) {
  if (!points || !points.length) return "";
  return "M" + points.map((p) => `${p[0]} ${p[1]}`).join("L") + "Z";
}

function sameJson(a, b) {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image"));
    img.src = url;
  });
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = () => reject(fr.error);
    fr.readAsDataURL(file);
  });
}

export class PpEditor extends LitElement {
  static properties = {
    plan: { attribute: false },
    floorId: { attribute: "floor-id" },
    lang: { type: String },
    dark: { type: Boolean, reflect: true },
    areas: { attribute: false },
    floors: { attribute: false },
    _history: { state: true },
    _draft: { state: true },
    _floor: { state: true },
    _tool: { state: true },
    _sel: { state: true },
    _view: { state: true },
    _measure: { state: true },
    _draw: { state: true },
    _hover: { state: true },
    _hoverEdge: { state: true },
    _wallStart: { state: true },
    _calib: { state: true },
    _furnType: { state: true },
    _confirmDelete: { state: true },
    _panning: { state: true },
    _bgError: { state: true },
    _size: { state: true },
  };

  static styles = editorStyles;

  constructor() {
    super();
    this.plan = null;
    this.floorId = null;
    this.lang = "en";
    this.dark = false;
    this.areas = [];
    this.floors = [];
    this._history = createHistory(Ops.emptyPlan());
    this._draft = null;
    this._floor = null;
    this._tool = "select";
    this._sel = null;
    this._view = { scale: 50, tx: 24, ty: 24 };
    this._measure = true;
    this._draw = [];
    this._hover = null;
    this._hoverEdge = null;
    this._wallStart = null;
    this._calib = null;
    this._furnType = "sofa";
    this._confirmDelete = false;
    this._panning = false;
    this._bgError = false;
    this._size = null;
    this._emitted = undefined;
    this._needFit = true;
    this._userView = false;
    this._pointers = new Map();
    this._gesture = null;
    this._drag = null;
    this._aspects = new Map();
    this.addEventListener("keydown", (e) => this._onKey(e));
  }

  // ------------------------------------------------------------ state helpers

  get _plan() {
    return this._history.present;
  }

  get _shown() {
    return this._draft || this._plan;
  }

  get _floorObj() {
    return Ops.getFloor(this._shown, this._floor);
  }

  _t(key, vars) {
    return translate(this.lang, key, vars);
  }

  _n(v, digits = 2) {
    return formatNumber(this.lang, v, digits);
  }

  willUpdate(changed) {
    if (changed.has("plan")) this._syncPlan();
    if (changed.has("floorId") && this.floorId && this.floorId !== this._floor) {
      this._floor = this.floorId;
      this._resetInteraction();
      this._sel = null;
      this._needFit = true;
    }
    const floors = this._plan.floors || [];
    if (!floors.some((f) => f.id === this._floor)) {
      this._floor = floors.length ? floors[0].id : null;
      this._needFit = true;
    }
  }

  /** Take over a plan set by the host. An equal plan keeps the undo history. */
  _syncPlan() {
    const p = this.plan;
    if (p === this._emitted) return;
    this._emitted = p;
    const np = Ops.normalizePlan(p);
    if (np === this._plan) return;
    if (sameJson(np, this._plan)) {
      this._history = replacePresent(this._history, np);
      return;
    }
    this._history = createHistory(np);
    this._resetInteraction();
    this._sel = null;
    this._needFit = true;
  }

  firstUpdated() {
    const canvas = this.renderRoot.querySelector(".canvas");
    if (canvas && typeof ResizeObserver !== "undefined") {
      this._ro = new ResizeObserver((entries) => {
        const r = entries[0].contentRect;
        if (r.width > 0 && r.height > 0) {
          this._size = { w: r.width, h: r.height };
          // keep the plan fitted while the user has not zoomed or panned yet
          if (!this._userView) this._needFit = true;
        }
      });
      this._ro.observe(canvas);
    }
  }

  updated() {
    if (this._needFit && this._size && this._floorObj) this._fit();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._ro) this._ro.disconnect();
    this._ro = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.hasUpdated && !this._ro) this.firstUpdated();
  }

  _resetInteraction() {
    this._draft = null;
    this._drag = null;
    this._draw = [];
    this._hover = null;
    this._hoverEdge = null;
    this._wallStart = null;
    this._calib = null;
    this._confirmDelete = false;
  }

  _commit(next, sel) {
    this._draft = null;
    if (sel !== undefined) this._sel = sel;
    if (!next || next === this._plan) return false;
    this._history = pushState(this._history, next);
    this._emit();
    return true;
  }

  _emit() {
    const plan = this._plan;
    this._emitted = plan;
    this.dispatchEvent(new CustomEvent("plan-changed", { detail: { plan }, bubbles: true, composed: true }));
  }

  _undo() {
    if (!canUndo(this._history)) return;
    this._resetInteraction();
    this._history = undo(this._history);
    this._afterHistoryMove();
  }

  _redo() {
    if (!canRedo(this._history)) return;
    this._resetInteraction();
    this._history = redo(this._history);
    this._afterHistoryMove();
  }

  _afterHistoryMove() {
    if (!Ops.getFloor(this._plan, this._floor)) {
      const f = this._plan.floors[0];
      this._floor = f ? f.id : null;
    }
    this._validateSelection();
    this._emit();
  }

  _validateSelection() {
    const s = this._sel;
    const f = Ops.getFloor(this._plan, this._floor);
    if (!s || !f) {
      this._sel = null;
      return;
    }
    const room = (id) => f.rooms.find((r) => r.id === id);
    let ok = true;
    if (s.kind === "room") ok = !!room(s.id);
    else if (s.kind === "corner") ok = !!room(s.id) && s.index < room(s.id).points.length;
    else if (s.kind === "edge") ok = !!room(s.id) && s.index < room(s.id).points.length;
    else if (s.kind === "opening") ok = f.openings.some((o) => o.id === s.id);
    else if (s.kind === "wall") ok = f.walls.some((w) => w.id === s.id);
    else if (s.kind === "furniture") ok = f.furniture.some((x) => x.id === s.id);
    else if (s.kind === "background") ok = !!f.background;
    if (!ok) this._sel = null;
  }

  // ------------------------------------------------------------ floors

  _selectFloor(id) {
    if (id === this._floor) return;
    this._floor = id;
    this._resetInteraction();
    this._sel = null;
    this._needFit = true;
    this.dispatchEvent(new CustomEvent("floor-selected", { detail: { floorId: id }, bubbles: true, composed: true }));
  }

  _addFloor() {
    const n = (this._plan.floors || []).length + 1;
    const next = Ops.addFloor(this._plan, { name: this._t("floor_default_name", { n }) });
    const id = next.floors[next.floors.length - 1].id;
    this._commit(next, null);
    this._selectFloor(id);
  }

  _deleteFloor() {
    const next = Ops.deleteFloor(this._plan, this._floor);
    this._confirmDelete = false;
    this._commit(next, null);
    const f = next.floors[0];
    this._selectFloor(f ? f.id : null);
  }

  // ------------------------------------------------------------ view

  _fit() {
    const f = this._floorObj;
    const pts = [];
    if (f) {
      for (const r of f.rooms) pts.push(...r.points);
      for (const w of f.walls) pts.push(w.a, w.b);
      for (const it of f.furniture) pts.push(...furnitureCorners(it));
      if (f.background && f.background.image) pts.push(...backgroundCorners(f.background, this._aspect(f.background.image)));
    }
    const b = boundsOf(pts);
    const pad = 0.4;
    const bounds = b ? { x0: b.x0 - pad, x1: b.x1 + pad, z0: b.z0 - pad, z1: b.z1 + pad } : null;
    const { w, h } = this._size || { w: 800, h: 600 };
    this._view = fitBounds(bounds, w, h, 24);
    this._needFit = false;
    this._userView = false;
  }

  _zoom(k) {
    this._userView = true;
    const { w, h } = this._size || { w: 800, h: 600 };
    this._view = zoomAt(this._view, [w / 2, h / 2], k);
  }

  _aspect(url) {
    if (this._aspects.has(url)) return this._aspects.get(url);
    this._aspects.set(url, 0.75);
    loadImage(url)
      .then((img) => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          this._aspects.set(url, img.naturalHeight / img.naturalWidth);
          this.requestUpdate();
        }
      })
      .catch(() => {});
    return 0.75;
  }

  // ------------------------------------------------------------ tools

  _setTool(id) {
    if (id === this._tool) return;
    this._tool = id;
    this._resetInteraction();
    if (this._sel && !TOOL_SELECTION[id].includes(this._sel.kind)) this._sel = null;
    if (id === "background") {
      const f = this._floorObj;
      this._sel = f && f.background ? { kind: "background" } : null;
    }
  }

  _tolerance() {
    return SNAP_PX / this._view.scale;
  }

  _edgeTolerance() {
    return Math.max(HIT_PX / this._view.scale, EDGE_TOL_M);
  }

  /** Snap against the committed plan (vertices and edges of rooms and free walls). */
  _snap(p, opts = {}) {
    const floor = Ops.getFloor(this._plan, this._floor);
    const t = Ops.snapTargets(floor, opts.exceptRoom || null);
    let vertices = t.vertices;
    let segments = t.segments;
    if (opts.exceptWall) {
      const w = floor.walls.find((x) => x.id === opts.exceptWall);
      if (w) {
        vertices = vertices.filter((v) => v !== w.a && v !== w.b);
        segments = segments.filter((s) => s[0] !== w.a || s[1] !== w.b);
      }
    }
    const extra = opts.extra || [];
    if (extra.length) {
      vertices = [...vertices, ...extra];
      const segs = [];
      for (let i = 0; i + 1 < extra.length; i++) segs.push([extra[i], extra[i + 1]]);
      segments = [...segments, ...segs];
    }
    return snapPoint(p, { grid: GRID, tol: this._tolerance(), vertices, segments });
  }

  // ------------------------------------------------------------ pointer input

  _svgEl() {
    return this.renderRoot.querySelector("svg.plan");
  }

  _local(e) {
    const el = this._svgEl();
    const r = el ? el.getBoundingClientRect() : { left: 0, top: 0 };
    return [e.clientX - r.left, e.clientY - r.top];
  }

  _onPointerDown(e) {
    if (!this._floorObj) return;
    if (e.pointerType === "mouse" && e.button !== 0 && e.button !== 1) return;
    const el = e.currentTarget;
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* capture is optional */
    }
    const canvas = this.renderRoot.querySelector(".canvas");
    if (canvas && this.shadowRoot.activeElement !== canvas) canvas.focus({ preventScroll: true });
    const s = this._local(e);
    // a primary pointer starts a fresh interaction; drop pointers whose "up" never arrived
    if (e.isPrimary) {
      this._pointers.clear();
      this._gesture = null;
    }
    this._pointers.set(e.pointerId, s);
    if (this._pointers.size >= 2) {
      // a second finger: drop the running edit and start a pinch
      this._draft = null;
      this._drag = null;
      const pts = [...this._pointers.values()].slice(0, 2);
      this._gesture = { startView: this._view, start: pts };
      return;
    }
    const p = toPlan(this._view, s);
    const hitEl = e.target && e.target.closest ? e.target.closest("[data-hit]") : null;
    const hit = hitEl
      ? { kind: hitEl.dataset.hit, id: hitEl.dataset.id || null, index: hitEl.dataset.index != null ? Number(hitEl.dataset.index) : null }
      : null;
    const mode = e.button === 1 ? "pan" : this._modeFor(hit);
    this._drag = { mode, hit, startS: s, startP: p, startView: this._view, base: this._plan, moved: false };
    e.preventDefault();
  }

  /** What a press does with the current tool and the element under the pointer. Selects on press. */
  _modeFor(hit) {
    const tool = this._tool;
    const k = hit && hit.kind;
    if (tool === "select") {
      if (k === "corner") {
        this._sel = { kind: "corner", id: hit.id, index: hit.index };
        return "corner";
      }
      if (k === "mid") return "insert";
      if (k === "rot") return "rotate";
      if (k === "wallend") return "wallend";
      if (k === "opening") {
        this._sel = { kind: "opening", id: hit.id };
        return "opening";
      }
      if (k === "furniture") {
        this._sel = { kind: "furniture", id: hit.id };
        return "furniture";
      }
      if (k === "freewall") {
        this._sel = { kind: "wall", id: hit.id };
        return "freewall";
      }
      if (k === "room") {
        this._sel = { kind: "room", id: hit.id };
        return "room";
      }
      return "pan";
    }
    if ((tool === "door" || tool === "window") && k === "opening") {
      this._sel = { kind: "opening", id: hit.id };
      return "opening";
    }
    if (tool === "furniture") {
      if (k === "furniture") {
        this._sel = { kind: "furniture", id: hit.id };
        return "furniture";
      }
      if (k === "rot") return "rotate";
    }
    if (tool === "freewall" && k === "wallend" && !this._wallStart) return "wallend";
    if (tool === "background") {
      if (this._calib) return "click";
      if (k === "bg") {
        this._sel = { kind: "background" };
        return "bg";
      }
      return "pan";
    }
    return "click";
  }

  _onPointerMove(e) {
    const s = this._local(e);
    if (this._pointers.has(e.pointerId)) this._pointers.set(e.pointerId, s);
    if (this._gesture) {
      if (this._pointers.size >= 2) {
        const pts = [...this._pointers.values()].slice(0, 2);
        this._view = pinchView(this._gesture.startView, this._gesture.start, pts);
        this._userView = true;
      }
      return;
    }
    const p = toPlan(this._view, s);
    const d = this._drag;
    if (!d) {
      if (e.pointerType === "mouse" || e.pointerType === "pen") this._updateHover(p);
      return;
    }
    if (!d.moved && Math.hypot(s[0] - d.startS[0], s[1] - d.startS[1]) < DRAG_PX) return;
    d.moved = true;
    if (d.mode === "pan" || d.mode === "click") {
      this._panning = true;
      this._userView = true;
      this._view = { ...d.startView, tx: d.startView.tx + s[0] - d.startS[0], ty: d.startView.ty + s[1] - d.startS[1] };
      return;
    }
    this._dragEdit(d, p, e);
  }

  _dragEdit(d, p, e) {
    const F = this._floor;
    const floor = Ops.getFloor(d.base, F);
    const delta = sub(p, d.startP);
    const id = d.hit && d.hit.id;
    let next = null;
    switch (d.mode) {
      case "insert": {
        // first movement on a "+" handle: insert the corner, then drag it
        const res = Ops.insertVertex(d.base, F, id, d.hit.index, d.startP);
        if (res.index == null) return;
        d.base = res.plan;
        d.mode = "corner";
        d.hit = { kind: "corner", id, index: res.index };
        this._sel = { kind: "corner", id, index: res.index };
        this._dragEdit(d, p, e);
        return;
      }
      case "corner": {
        const sn = this._snap(p, { exceptRoom: id });
        this._hover = sn;
        next = Ops.moveVertex(d.base, F, id, d.hit.index, sn.point);
        break;
      }
      case "room": {
        const room = Ops.getRoom(floor, id);
        if (!room) return;
        const targets = Ops.snapTargets(floor, id).vertices;
        const dd = snapTranslation(room.points, delta, { grid: GRID, tol: this._tolerance(), targets });
        next = Ops.moveRoom(d.base, F, id, dd);
        break;
      }
      case "furniture": {
        const it = floor.furniture.find((x) => x.id === id);
        if (!it) return;
        next = Ops.updateFurniture(d.base, F, id, { x: snapValue(it.x + delta[0], GRID), z: snapValue(it.z + delta[1], GRID) });
        break;
      }
      case "rotate": {
        const it = floor.furniture.find((x) => x.id === id);
        if (!it) return;
        let r = handleRotation([it.x, it.z], p);
        if (!e.shiftKey) r = Math.round(r / 15) * 15;
        next = Ops.updateFurniture(d.base, F, id, { rotation: r });
        break;
      }
      case "freewall": {
        const w = floor.walls.find((x) => x.id === id);
        if (!w) return;
        const targets = Ops.snapTargets(floor).vertices.filter((v) => v !== w.a && v !== w.b);
        const dd = snapTranslation([w.a, w.b], delta, { grid: GRID, tol: this._tolerance(), targets });
        next = Ops.moveFreeWall(d.base, F, id, dd);
        break;
      }
      case "wallend": {
        const sn = this._snap(p, { exceptWall: id });
        this._hover = sn;
        next = Ops.updateFreeWall(d.base, F, id, { [d.hit.index ? "b" : "a"]: sn.point });
        break;
      }
      case "opening":
        next = Ops.moveOpeningTo(d.base, F, id, p, GRID);
        break;
      case "bg": {
        const bg = floor.background;
        if (!bg) return;
        next = Ops.updateBackground(d.base, F, { x: roundMm((bg.x || 0) + delta[0]), z: roundMm((bg.z || 0) + delta[1]) });
        break;
      }
      default:
        return;
    }
    this._draft = next;
  }

  _onPointerUp(e) {
    const known = this._pointers.delete(e.pointerId);
    if (this._gesture) {
      if (this._pointers.size < 2) this._gesture = null;
      this._drag = null;
      return;
    }
    const d = this._drag;
    this._drag = null;
    this._panning = false;
    if (!d || !known) return;
    if (d.moved) {
      if (d.mode !== "pan" && d.mode !== "click") {
        this._hover = null;
        if (this._draft) this._commit(this._draft);
        else this._draft = null;
      }
      return;
    }
    this._click(d);
  }

  _onPointerCancel(e) {
    this._pointers.delete(e.pointerId);
    if (this._pointers.size < 2) this._gesture = null;
    this._drag = null;
    this._draft = null;
    this._panning = false;
  }

  _onPointerLeave() {
    if (!this._drag) {
      this._hover = null;
      this._hoverEdge = null;
    }
  }

  _onWheel(e) {
    e.preventDefault();
    const s = this._local(e);
    this._userView = true;
    const unit = e.deltaMode === 1 ? 0.05 : e.deltaMode === 2 ? 1 : 0.0015;
    this._view = zoomAt(this._view, s, Math.exp(-e.deltaY * unit));
  }

  _onDblClick() {
    if (this._tool === "room" && this._draw.length >= 3) this._finishRoom();
  }

  _updateHover(p) {
    const tool = this._tool;
    if (tool === "room" || tool === "freewall") {
      this._hover = this._snap(p, { extra: tool === "room" ? this._draw : [] });
      return;
    }
    if (tool === "wall" || tool === "door" || tool === "window") {
      const f = this._floorObj;
      const ne = f ? nearestEdge(f, p, this._edgeTolerance()) : null;
      const prev = this._hoverEdge;
      if (!ne && !prev) return;
      if (ne && prev && ne.room_id === prev.room_id && ne.edge === prev.edge) return;
      this._hoverEdge = ne;
    }
  }

  /** A press without movement. */
  _click(d) {
    const F = this._floor;
    const p = d.startP;
    const hit = d.hit;
    const plan = this._plan;
    const floor = Ops.getFloor(plan, F);
    switch (this._tool) {
      case "select":
        if (hit && hit.kind === "mid") {
          const res = Ops.insertVertex(plan, F, hit.id, hit.index, p);
          if (res.index != null) this._commit(res.plan, { kind: "corner", id: hit.id, index: res.index });
        } else if (!hit) {
          this._sel = null;
        }
        break;
      case "room":
        this._addDrawPoint(p);
        break;
      case "wall": {
        const ne = nearestEdge(floor, p, this._edgeTolerance());
        this._sel = ne ? { kind: "edge", id: ne.room_id, index: ne.edge } : null;
        break;
      }
      case "door":
      case "window": {
        if (hit && hit.kind === "opening") break;
        const ne = nearestEdge(floor, p, this._edgeTolerance());
        if (!ne) break;
        const res = Ops.addOpening(plan, F, ne.room_id, ne.edge, snapValue(ne.along, GRID), this._tool);
        if (res.id) this._commit(res.plan, { kind: "opening", id: res.id });
        break;
      }
      case "freewall": {
        const sn = this._snap(p);
        if (!this._wallStart) {
          this._wallStart = sn.point;
          this._sel = null;
        } else {
          const res = Ops.addFreeWall(plan, F, this._wallStart, sn.point);
          this._wallStart = null;
          if (res.id) this._commit(res.plan, { kind: "wall", id: res.id });
        }
        break;
      }
      case "furniture": {
        if (hit && (hit.kind === "furniture" || hit.kind === "rot")) break;
        const q = snapToGrid(p, GRID);
        const res = Ops.addFurniture(plan, F, this._furnType, q[0], q[1]);
        if (res.id) this._commit(res.plan, { kind: "furniture", id: res.id });
        break;
      }
      case "background": {
        const c = this._calib;
        if (c) {
          if (!c.p1 || c.p2) this._calib = { p1: p, p2: null, length: "" };
          else this._calib = { ...c, p2: p };
        }
        break;
      }
      default:
        break;
    }
  }

  _addDrawPoint(p) {
    const pts = this._draw;
    const sn = this._snap(p, { extra: pts });
    if (pts.length >= 3 && (dist(sn.point, pts[0]) < 0.005 || dist(p, pts[0]) <= this._tolerance() * 1.2)) {
      this._finishRoom();
      return;
    }
    if (pts.length && dist(sn.point, pts[pts.length - 1]) < 0.01) return;
    this._draw = [...pts, sn.point];
  }

  _finishRoom() {
    const pts = this._draw;
    if (pts.length < 3) return;
    const floor = Ops.getFloor(this._plan, this._floor);
    const name = this._t("room_default_name", { n: floor.rooms.length + 1 });
    const res = Ops.addRoom(this._plan, this._floor, pts, { name });
    this._draw = [];
    this._hover = null;
    if (res.id) this._commit(res.plan, { kind: "room", id: res.id });
  }

  // ------------------------------------------------------------ keyboard

  _onKey(e) {
    const target = e.composedPath()[0];
    const tag = target && target.tagName;
    if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") {
      if (e.key === "Escape" && target.blur) target.blur();
      return;
    }
    const mod = e.ctrlKey || e.metaKey;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (mod && key === "z") {
      if (e.shiftKey) this._redo();
      else this._undo();
      e.preventDefault();
      return;
    }
    if (mod && key === "y") {
      this._redo();
      e.preventDefault();
      return;
    }
    if (mod || e.altKey) return;
    const onButton = tag === "BUTTON" || tag === "LABEL";
    switch (key) {
      case "Escape":
        this._escape();
        e.preventDefault();
        return;
      case "Enter":
        if (!onButton && this._tool === "room" && this._draw.length >= 3) {
          this._finishRoom();
          e.preventDefault();
        }
        return;
      case "Delete":
      case "Backspace":
        if (this._tool === "room" && this._draw.length) this._draw = this._draw.slice(0, -1);
        else this._deleteSelection();
        e.preventDefault();
        return;
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
      case "ArrowDown": {
        if (onButton) return;
        const step = e.shiftKey ? 0.01 : GRID;
        const dir = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[key];
        if (this._sel && this._sel.kind !== "edge") {
          this._commit(Ops.nudgeSelection(this._plan, this._floor, this._sel, scale(dir, step)));
        } else {
          this._view = { ...this._view, tx: this._view.tx - dir[0] * 40, ty: this._view.ty - dir[1] * 40 };
          this._userView = true;
        }
        e.preventDefault();
        return;
      }
      case "+":
      case "=":
        this._zoom(1.25);
        return;
      case "-":
        this._zoom(0.8);
        return;
      case "0":
        this._fit();
        return;
      case "l":
        this._measure = !this._measure;
        return;
      default: {
        const tool = TOOLS.find((t) => t.key.toLowerCase() === key);
        if (tool) {
          this._setTool(tool.id);
          e.preventDefault();
        }
      }
    }
  }

  _escape() {
    if (this._drag) {
      this._drag = null;
      this._draft = null;
      this._panning = false;
      return;
    }
    if (this._draw.length) {
      this._draw = [];
      return;
    }
    if (this._wallStart) {
      this._wallStart = null;
      return;
    }
    if (this._calib) {
      this._calib = null;
      return;
    }
    this._sel = null;
  }

  _deleteSelection() {
    const s = this._sel;
    if (!s || s.kind === "edge") return;
    const next = Ops.deleteSelection(this._plan, this._floor, s);
    if (next === this._plan) return;
    const sel = s.kind === "corner" ? { kind: "room", id: s.id } : null;
    this._commit(next, sel);
  }

  // ------------------------------------------------------------ background upload

  async _onUpload(e) {
    const input = e.target;
    const file = input.files && input.files[0];
    input.value = "";
    if (!file) return;
    try {
      const url = await readAsDataURL(file);
      const img = await loadImage(url);
      let data = url;
      const w = img.naturalWidth || 1000;
      const h = img.naturalHeight || 750;
      const MAX = 3000;
      if (img.naturalWidth && (w > MAX || h > MAX || file.size > 2_000_000)) {
        // keep the stored plan small: downscale big photos and re-encode them as JPEG
        const k = Math.min(1, MAX / Math.max(w, h));
        const c = document.createElement("canvas");
        c.width = Math.round(w * k);
        c.height = Math.round(h * k);
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        data = c.toDataURL("image/jpeg", 0.85);
      }
      this._aspects.set(data, h / w);
      const floor = Ops.getFloor(this._plan, this._floor);
      const old = floor.background;
      const b = boundsOf(floor.rooms.flatMap((r) => r.points));
      const bg = old
        ? { ...old, image: data }
        : { image: data, x: b ? b.x0 : 0, z: b ? b.z0 : 0, width: b ? roundMm(Math.max(4, b.x1 - b.x0) + 1) : 10, rotation: 0, opacity: 0.5 };
      this._bgError = false;
      this._commit(Ops.setBackground(this._plan, this._floor, bg), { kind: "background" });
      if (!b) this._needFit = true;
    } catch {
      this._bgError = true;
    }
  }

  // ------------------------------------------------------------ render

  render() {
    const floor = this._floorObj;
    const canvasClass = ["canvas", `tool-${this._tool}`, this._calib ? "calib" : "", this._panning ? "panning" : ""].join(" ");
    return html`
      <div class="root">
        ${this._renderFloorBar()} ${this._renderToolbar()}
        <div class="main">
          <div class=${canvasClass} tabindex="0" role="application" aria-label=${this._t("canvas_label")}>
            ${floor
              ? this._renderPlan(this._shown, floor)
              : html`<div class="empty">
                  <p>${this._t("no_floor")}</p>
                  <button class="primary" @click=${() => this._addFloor()}>${icon("plus")}<span>${this._t("floor_add")}</span></button>
                </div>`}
            ${floor
              ? html`<div class="zoom">
                  <button title=${this._t("shortcut", { label: this._t("zoom_in"), key: "+" })} aria-label=${this._t("zoom_in")} @click=${() => this._zoom(1.25)}>
                    ${icon("zoomIn")}
                  </button>
                  <button title=${this._t("shortcut", { label: this._t("zoom_out"), key: "−" })} aria-label=${this._t("zoom_out")} @click=${() => this._zoom(0.8)}>
                    ${icon("zoomOut")}
                  </button>
                  <button title=${this._t("shortcut", { label: this._t("zoom_fit"), key: "0" })} aria-label=${this._t("zoom_fit")} @click=${() => this._fit()}>
                    ${icon("fit")}
                  </button>
                </div>`
              : nothing}
          </div>
          <aside class="panel" aria-live="polite">${this._renderPanel(this._shown, floor)}</aside>
        </div>
      </div>
    `;
  }

  _renderFloorBar() {
    const floors = this._plan.floors || [];
    return html`<div class="bar">
      ${floors.length
        ? html`<label class="visually-hidden" for="pp-floor">${this._t("floor")}</label>
            <select id="pp-floor" class="floor-select" @change=${(e) => this._selectFloor(e.target.value)}>
              ${floors.map((f) => html`<option value=${f.id} ?selected=${f.id === this._floor}>${f.name || f.id}</option>`)}
            </select>`
        : nothing}
      <button @click=${() => this._addFloor()}>${icon("plus")}<span>${this._t("floor_add")}</span></button>
    </div>`;
  }

  _renderToolbar() {
    const mod = isMac ? "⌘" : "Ctrl+";
    const undoKey = isMac ? "⌘Z" : "Ctrl+Z";
    const redoKey = isMac ? "⇧⌘Z" : "Shift+Ctrl+Z";
    const disabled = !this._floor;
    return html`<div class="toolbar" role="toolbar" aria-label=${this._t("toolbar_label")}>
      ${TOOLS.map(
        (t) => html`<button
          class="tool"
          aria-pressed=${String(this._tool === t.id)}
          ?disabled=${disabled}
          title=${this._t("shortcut", { label: this._t(`tool_${t.id}`), key: t.key })}
          aria-keyshortcuts=${t.key}
          @click=${() => this._setTool(t.id)}
        >
          ${icon(t.icon)}<span>${this._t(`tool_${t.id}_short`)}</span>
        </button>`,
      )}
      <span class="sep" role="separator"></span>
      <button
        class="tool"
        aria-pressed=${String(this._measure)}
        title=${this._t("shortcut", { label: this._t("tool_measure"), key: "L" })}
        aria-keyshortcuts="L"
        @click=${() => (this._measure = !this._measure)}
      >
        ${icon("measure")}<span>${this._t("tool_measure_short")}</span>
      </button>
      <button
        class="tool"
        ?disabled=${!canUndo(this._history)}
        title=${this._t("shortcut", { label: this._t("undo"), key: undoKey })}
        aria-keyshortcuts=${isMac ? "Meta+Z" : "Control+Z"}
        @click=${() => this._undo()}
      >
        ${icon("undo")}<span>${this._t("undo")}</span>
      </button>
      <button
        class="tool"
        ?disabled=${!canRedo(this._history)}
        title=${this._t("shortcut", { label: this._t("redo"), key: redoKey })}
        aria-keyshortcuts=${isMac ? "Shift+Meta+Z" : "Shift+Control+Z"}
        data-mod=${mod}
        @click=${() => this._redo()}
      >
        ${icon("redo")}<span>${this._t("redo")}</span>
      </button>
    </div>`;
  }

  // ------------------------------------------------------------ plan drawing

  _renderPlan(plan, floor) {
    const v = this._view;
    const px = 1 / v.scale; // metres per screen pixel
    return html`<svg
      class="plan"
      @pointerdown=${this._onPointerDown}
      @pointermove=${this._onPointerMove}
      @pointerup=${this._onPointerUp}
      @pointercancel=${this._onPointerCancel}
      @pointerleave=${this._onPointerLeave}
      @wheel=${this._onWheel}
      @dblclick=${this._onDblClick}
    >
      <g transform="translate(${v.tx} ${v.ty}) scale(${v.scale})">
        ${this._renderGrid(px)} ${this._renderBackground(floor, px)} ${this._renderRooms(floor)} ${this._renderWalls(plan, floor)}
        ${this._renderOpenings(plan, floor, px)} ${this._renderFurniture(floor, px)} ${this._renderLabels(floor, px)}
        ${this._renderSelection(plan, floor, px)} ${this._renderPreview(px)}
      </g>
    </svg>`;
  }

  _renderGrid(px) {
    const { w, h } = this._size || { w: 800, h: 600 };
    const v = this._view;
    const [x0, z0] = toPlan(v, [0, 0]);
    const [x1, z1] = toPlan(v, [w, h]);
    const step = v.scale >= 40 ? 0.25 : v.scale >= 12 ? 1 : 5;
    const major = step < 1 ? 1 : 5;
    let minor = "";
    let maj = "";
    const lines = (s, isMajor) => {
      let d = "";
      const sx = Math.floor(x0 / s) * s;
      const sz = Math.floor(z0 / s) * s;
      let count = 0;
      for (let x = sx; x <= x1 && count < 600; x += s, count++) {
        const onMajor = Math.abs(x / major - Math.round(x / major)) < 1e-6;
        if (isMajor === onMajor) d += `M${x} ${z0}V${z1}`;
      }
      count = 0;
      for (let z = sz; z <= z1 && count < 600; z += s, count++) {
        const onMajor = Math.abs(z / major - Math.round(z / major)) < 1e-6;
        if (isMajor === onMajor) d += `M${x0} ${z}H${x1}`;
      }
      return d;
    };
    minor = lines(step, false);
    maj = lines(major, true);
    return svg`<path class="grid-line" d=${minor} stroke-width=${px} fill="none" pointer-events="none"></path>
      <path class="grid-major" d=${maj} stroke-width=${px} fill="none" pointer-events="none"></path>`;
  }

  _renderBackground(floor, px) {
    const bg = floor.background;
    if (!bg || !bg.image) return nothing;
    const aspect = this._aspect(bg.image);
    const w = bg.width || 10;
    const movable = this._tool === "background" && !this._calib;
    return svg`<g transform="translate(${bg.x || 0} ${bg.z || 0}) rotate(${bg.rotation || 0})">
      <image class="bg-image ${movable ? "movable" : ""}" href=${bg.image} x="0" y="0" width=${w} height=${w * aspect}
        opacity=${bg.opacity ?? 0.5} preserveAspectRatio="none" pointer-events=${movable ? "all" : "none"}
        data-hit=${movable ? "bg" : nothing}></image>
      ${this._tool === "background" ? svg`<rect class="bg-outline" x="0" y="0" width=${w} height=${w * aspect} pointer-events="none"></rect>` : nothing}
    </g>`;
  }

  _renderRooms(floor) {
    const sel = this._sel;
    return floor.rooms.map((r) => {
      const selected = sel && (sel.kind === "room" || sel.kind === "corner" || sel.kind === "edge") && sel.id === r.id;
      return svg`<path class="room ${selected ? "selected" : ""}" d=${polyD(r.points)} data-hit="room" data-id=${r.id}></path>`;
    });
  }

  _renderWalls(plan, floor) {
    const bands = wallBands(plan, floor);
    const sel = this._sel;
    return svg`${bands.map((b) => svg`<path class="band ${b.kind}" d=${polyD(b.poly)} pointer-events="none"></path>`)}
      ${floor.walls.map(
        (w) => svg`<path class="free-wall ${sel && sel.kind === "wall" && sel.id === w.id ? "selected" : ""}" d=${polyD(freeWallPoly(w))}
          data-hit="freewall" data-id=${w.id}></path>`,
      )}`;
  }

  _renderOpenings(plan, floor, px) {
    const sel = this._sel;
    return floor.openings.map((o) => {
      const g = openingGeometry(plan, floor, o);
      if (!g) return nothing;
      const band = (n0, n1) => [add(g.a, scale(g.normal, n0)), add(g.b, scale(g.normal, n0)), add(g.b, scale(g.normal, n1)), add(g.a, scale(g.normal, n1))];
      const gap = band(g.n0 - px, g.n1 + px);
      const hitPoly = band(g.n0 - 6 * px, g.n1 + 6 * px);
      const selected = sel && sel.kind === "opening" && sel.id === o.id;
      let symbol;
      if (o.type === "door") {
        const sweep = cross(sub(g.closed, g.hinge), sub(g.tip, g.hinge)) > 0 ? 1 : 0;
        symbol = svg`<line class="opening-line" x1=${g.hinge[0]} y1=${g.hinge[1]} x2=${g.tip[0]} y2=${g.tip[1]}></line>
          <path class="opening-arc" d="M${g.closed[0]} ${g.closed[1]}A${g.width} ${g.width} 0 0 ${sweep} ${g.tip[0]} ${g.tip[1]}"></path>`;
      } else {
        const mid = (g.n0 + g.n1) / 2;
        const a = add(g.a, scale(g.normal, mid));
        const b = add(g.b, scale(g.normal, mid));
        symbol = svg`<path class="window-pane" d=${polyD(band(g.n0, g.n1))}></path>
          <line class="opening-line" x1=${a[0]} y1=${a[1]} x2=${b[0]} y2=${b[1]}></line>`;
      }
      return svg`<g>
        <path class="opening-gap" d=${polyD(gap)} pointer-events="none"></path>
        <g pointer-events="none">${symbol}</g>
        <path class="opening-hit ${selected ? "selected" : ""}" d=${polyD(hitPoly)} data-hit="opening" data-id=${o.id}></path>
      </g>`;
    });
  }

  _renderFurniture(floor, px) {
    const sel = this._sel;
    return floor.furniture.map((it) => {
      const c = furnitureCorners(it);
      const selected = sel && sel.kind === "furniture" && sel.id === it.id;
      const label = this._t(`furn_${it.type}`);
      const fs = 10 * px;
      const fits = Math.min(it.w, it.d) / px > 22 && Math.max(it.w, it.d) / px > label.length * 6;
      return svg`<g>
        <path class="item ${isObstacle(it) ? "obstacle" : ""} ${selected ? "selected" : ""}" d=${polyD(c)} data-hit="furniture" data-id=${it.id}>
          <title>${label}</title>
        </path>
        ${fits ? svg`<text class="label muted" x=${it.x} y=${it.z} font-size=${fs} stroke-width=${2 * px} text-anchor="middle" dominant-baseline="central">${label}</text>` : nothing}
      </g>`;
    });
  }

  _renderLabels(floor, px) {
    const out = [];
    const fs = 12 * px;
    for (const r of floor.rooms) {
      if (r.points.length < 3) continue;
      const c = polygonCentroid(r.points);
      out.push(svg`<text class="label" x=${c[0]} y=${c[1]} font-size=${fs} stroke-width=${3 * px} text-anchor="middle" font-weight="600">${r.name || r.id}</text>`);
      if (this._measure) {
        out.push(
          svg`<text class="label muted" x=${c[0]} y=${c[1] + fs * 1.3} font-size=${fs * 0.9} stroke-width=${3 * px} text-anchor="middle">${this._t("area_value", { v: this._n(polygonArea(r.points), 2) })}</text>`,
        );
        const area = signedArea(r.points);
        for (let i = 0; i < r.points.length; i++) {
          const [a, b] = edgeOf(r.points, i);
          const L = dist(a, b);
          if (L / px < 36) continue;
          const n = inwardNormal(a, b, area);
          const m = add(lerp(a, b, 0.5), scale(n, 11 * px));
          out.push(
            svg`<text class="label dim" x=${m[0]} y=${m[1]} font-size=${10 * px} stroke-width=${3 * px} text-anchor="middle" dominant-baseline="central">${this._n(L, 2)}</text>`,
          );
        }
      }
    }
    if (this._measure) {
      for (const w of floor.walls) {
        const L = dist(w.a, w.b);
        if (L / px < 36) continue;
        const m = lerp(w.a, w.b, 0.5);
        out.push(
          svg`<text class="label dim" x=${m[0]} y=${m[1] - (w.thickness / 2 + 8 * px)} font-size=${10 * px} stroke-width=${3 * px} text-anchor="middle">${this._n(L, 2)}</text>`,
        );
      }
    }
    return out;
  }

  _handle(p, px, hit, cls = "", extra = nothing) {
    return svg`<g>
      <circle class="handle ${cls}" cx=${p[0]} cy=${p[1]} r=${HANDLE_PX * px} pointer-events="none"></circle>
      ${extra}
      <circle class="handle-hit" cx=${p[0]} cy=${p[1]} r=${HIT_PX * px} data-hit=${hit.kind} data-id=${hit.id} data-index=${hit.index ?? nothing}></circle>
    </g>`;
  }

  _renderSelection(plan, floor, px) {
    const sel = this._sel;
    const out = [];
    const tool = this._tool;
    if (this._hoverEdge && (tool === "wall" || tool === "door" || tool === "window")) {
      const r = floor.rooms.find((x) => x.id === this._hoverEdge.room_id);
      if (r) {
        const [a, b] = edgeOf(r.points, this._hoverEdge.edge);
        out.push(svg`<line class="edge-hover" x1=${a[0]} y1=${a[1]} x2=${b[0]} y2=${b[1]} pointer-events="none"></line>`);
      }
    }
    if (!sel) return out;
    if (sel.kind === "edge") {
      const r = floor.rooms.find((x) => x.id === sel.id);
      if (r) {
        const [a, b] = edgeOf(r.points, sel.index);
        out.push(svg`<line class="edge-selected" x1=${a[0]} y1=${a[1]} x2=${b[0]} y2=${b[1]} pointer-events="none"></line>`);
      }
    }
    if ((sel.kind === "room" || sel.kind === "corner") && tool === "select") {
      const r = floor.rooms.find((x) => x.id === sel.id);
      if (r) {
        for (let i = 0; i < r.points.length; i++) {
          const [a, b] = edgeOf(r.points, i);
          if (dist(a, b) / px < 44) continue;
          const m = lerp(a, b, 0.5);
          const k = 3 * px;
          const plus = svg`<path class="handle-plus" d="M${m[0] - k} ${m[1]}H${m[0] + k}M${m[0]} ${m[1] - k}V${m[1] + k}"></path>`;
          out.push(this._handle(m, px, { kind: "mid", id: r.id, index: i }, "add", plus));
        }
        r.points.forEach((p, i) => {
          const active = sel.kind === "corner" && sel.index === i;
          out.push(this._handle(p, px, { kind: "corner", id: r.id, index: i }, active ? "active" : ""));
        });
      }
    }
    if (sel.kind === "furniture" && (tool === "select" || tool === "furniture")) {
      const it = floor.furniture.find((x) => x.id === sel.id);
      if (it) {
        const c = [it.x, it.z];
        const top = add(c, rotate([0, -it.d / 2], it.rotation || 0));
        const hp = add(c, rotate([0, -it.d / 2 - 24 * px], it.rotation || 0));
        out.push(svg`<line class="rot-line" x1=${top[0]} y1=${top[1]} x2=${hp[0]} y2=${hp[1]} pointer-events="none"></line>`);
        out.push(this._handle(hp, px, { kind: "rot", id: it.id }, "", svg`<title>${this._t("rotate_handle")}</title>`));
      }
    }
    if (sel.kind === "wall" && (tool === "select" || tool === "freewall")) {
      const w = floor.walls.find((x) => x.id === sel.id);
      if (w) {
        out.push(this._handle(w.a, px, { kind: "wallend", id: w.id, index: 0 }));
        out.push(this._handle(w.b, px, { kind: "wallend", id: w.id, index: 1 }));
      }
    }
    return out;
  }

  _renderPreview(px) {
    const out = [];
    const hv = this._hover;
    if (hv && hv.kind !== "grid" && hv.kind !== "none") {
      const k = 7 * px;
      const p = hv.point;
      out.push(
        hv.kind === "vertex"
          ? svg`<rect class="snap-mark" x=${p[0] - k} y=${p[1] - k} width=${2 * k} height=${2 * k}></rect>`
          : svg`<path class="snap-mark" d="M${p[0]} ${p[1] - k}L${p[0] + k} ${p[1]}L${p[0]} ${p[1] + k}L${p[0] - k} ${p[1]}Z"></path>`,
      );
    }
    if (this._tool === "room" && this._draw.length) {
      const pts = this._draw;
      const end = hv ? hv.point : null;
      const all = end ? [...pts, end] : pts;
      out.push(svg`<path class="draft-line" d=${"M" + all.map((p) => `${p[0]} ${p[1]}`).join("L")} pointer-events="none"></path>`);
      pts.forEach((p, i) => out.push(svg`<circle class="draft-point" cx=${p[0]} cy=${p[1]} r=${(i === 0 ? 6 : 4) * px} pointer-events="none"></circle>`));
      if (end) {
        const last = pts[pts.length - 1];
        const m = lerp(last, end, 0.5);
        out.push(
          svg`<text class="label dim" x=${m[0]} y=${m[1] - 8 * px} font-size=${11 * px} stroke-width=${3 * px} text-anchor="middle">${this._t("length_value", { v: this._n(dist(last, end), 2) })}</text>`,
        );
      }
    }
    if (this._tool === "freewall" && this._wallStart) {
      const a = this._wallStart;
      out.push(svg`<circle class="draft-point" cx=${a[0]} cy=${a[1]} r=${4 * px} pointer-events="none"></circle>`);
      if (hv) {
        const b = hv.point;
        out.push(svg`<path class="draft-line" d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" pointer-events="none"></path>`);
        const m = lerp(a, b, 0.5);
        out.push(
          svg`<text class="label dim" x=${m[0]} y=${m[1] - 8 * px} font-size=${11 * px} stroke-width=${3 * px} text-anchor="middle">${this._t("length_value", { v: this._n(dist(a, b), 2) })}</text>`,
        );
      }
    }
    const c = this._calib;
    if (c && c.p1) {
      out.push(svg`<circle class="calib-point" cx=${c.p1[0]} cy=${c.p1[1]} r=${5 * px} pointer-events="none"></circle>`);
      if (c.p2) {
        out.push(svg`<line class="calib-line" x1=${c.p1[0]} y1=${c.p1[1]} x2=${c.p2[0]} y2=${c.p2[1]} pointer-events="none"></line>`);
        out.push(svg`<circle class="calib-point" cx=${c.p2[0]} cy=${c.p2[1]} r=${5 * px} pointer-events="none"></circle>`);
      }
    }
    return out;
  }

  // ------------------------------------------------------------ side panel

  _hint() {
    switch (this._tool) {
      case "room":
        return this._t("hint_room");
      case "wall":
        return this._t("hint_wall");
      case "door":
        return this._t("hint_door");
      case "window":
        return this._t("hint_window");
      case "freewall":
        return this._t(this._wallStart ? "hint_freewall_second" : "hint_freewall");
      case "furniture":
        return this._t("hint_furniture");
      case "background":
        if (this._calib) return this._t(this._calib.p1 && !this._calib.p2 ? "bg_calib_second" : this._calib.p2 ? "bg_calib_length" : "bg_calib_first");
        return this._t("hint_background");
      default:
        return this._t("hint_select");
    }
  }

  _renderPanel(plan, floor) {
    if (!floor) return html`<p class="hint">${this._t("no_floor")}</p>`;
    const sel = this._sel;
    const parts = [html`<p class="hint">${this._hint()}</p>`];
    if (this._tool === "room" && this._draw.length) {
      parts.push(html`<div class="actions">
        <button class="primary" ?disabled=${this._draw.length < 3} @click=${() => this._finishRoom()}>${icon("check")}<span>${this._t("room_finish")}</span></button>
        <button @click=${() => (this._draw = this._draw.slice(0, -1))}>${this._t("room_undo_point")}</button>
        <button @click=${() => (this._draw = [])}>${this._t("cancel")}</button>
      </div>`);
    }
    if (this._tool === "freewall" && this._wallStart) {
      parts.push(html`<div class="actions"><button @click=${() => (this._wallStart = null)}>${this._t("cancel")}</button></div>`);
    }
    if (this._tool === "furniture") {
      parts.push(this._furnitureTypeSelect(this._t("furniture_new_type"), this._furnType, (v) => (this._furnType = v)));
    }
    if (this._tool === "background") {
      parts.push(this._renderBackgroundPanel(floor));
      return parts;
    }
    if (!sel) {
      if (this._tool === "select") parts.push(this._renderFloorPanel(floor));
      return parts;
    }
    switch (sel.kind) {
      case "room":
      case "corner":
        parts.push(this._renderRoomPanel(floor, sel));
        break;
      case "edge":
        parts.push(this._renderEdgePanel(plan, floor, sel));
        break;
      case "opening":
        parts.push(this._renderOpeningPanel(floor, sel));
        break;
      case "wall":
        parts.push(this._renderFreeWallPanel(floor, sel));
        break;
      case "furniture":
        parts.push(this._renderFurniturePanel(floor, sel));
        break;
      default:
        break;
    }
    return parts;
  }

  /** Text field for a number; commits on change (Enter or leaving the field). */
  _num(label, value, onCommit, opts = {}) {
    const { digits = 2, allowEmpty = false, min = null, max = null, placeholder = "" } = opts;
    const shown = value == null ? "" : this._n(value, digits);
    return html`<label class="field"
      ><span>${label}</span>
      <input
        type="text"
        inputmode="decimal"
        autocomplete="off"
        .value=${live(shown)}
        placeholder=${placeholder}
        @keydown=${(e) => e.key === "Enter" && e.target.blur()}
        @change=${(e) => {
          const v = parseNumber(e.target.value);
          if (v === null && allowEmpty) onCommit(null);
          else if (v !== null && Number.isFinite(v) && (min == null || v >= min) && (max == null || v <= max)) onCommit(v);
          e.target.value = shown;
          this.requestUpdate();
        }}
    /></label>`;
  }

  _text(label, value, onCommit, placeholder = "") {
    return html`<label class="field"
      ><span>${label}</span>
      <input
        type="text"
        autocomplete="off"
        spellcheck="false"
        .value=${live(value || "")}
        placeholder=${placeholder}
        @keydown=${(e) => e.key === "Enter" && e.target.blur()}
        @change=${(e) => onCommit(e.target.value.trim())}
    /></label>`;
  }

  _select(label, value, options, onChange) {
    return html`<label class="field"
      ><span>${label}</span>
      <select @change=${(e) => onChange(e.target.value)}>
        ${options.map((o) => html`<option value=${o.value} ?selected=${o.value === (value ?? "")}>${o.label}</option>`)}
      </select></label
    >`;
  }

  _furnitureTypeSelect(label, value, onChange) {
    return html`<label class="field"
      ><span>${label}</span>
      <select @change=${(e) => onChange(e.target.value)}>
        ${Object.entries(FURNITURE_GROUPS).map(
          ([g, types]) => html`<optgroup label=${this._t(`group_${g}`)}>
            ${types.map((ty) => html`<option value=${ty} ?selected=${ty === value}>${this._t(`furn_${ty}`)}</option>`)}
          </optgroup>`,
        )}
      </select></label
    >`;
  }

  _renderFloorPanel(floor) {
    const F = floor.id;
    const haFloors = this.floors || [];
    const set = (props) => this._commit(Ops.setFloorProps(this._plan, F, props));
    return html`<h3>${this._t("floor_settings")}</h3>
      ${this._text(this._t("floor_name"), floor.name, (v) => set({ name: v || floor.id }))}
      ${this._select(
        this._t("floor_ha"),
        floor.ha_floor || "",
        [{ value: "", label: this._t("none") }, ...haFloors.map((f) => ({ value: f.floor_id, label: f.name || f.floor_id }))],
        (v) => {
          const props = { ha_floor: v || null };
          const ha = haFloors.find((f) => f.floor_id === v);
          const isDefault = !floor.name || floor.name === floor.id || /^(Floor|Etage) \d+$/.test(floor.name);
          if (ha && isDefault) props.name = ha.name;
          set(props);
        },
      )}
      <div class="row">
        ${this._num(this._t("floor_height"), floor.height ?? Ops.DEFAULT_FLOOR_HEIGHT, (v) => set({ height: roundMm(v) }), { min: 1, max: 20 })}
        ${this._num(this._t("floor_elevation"), floor.elevation ?? 0, (v) => set({ elevation: roundMm(v) }), { min: -50, max: 500 })}
      </div>
      ${this._confirmDelete
        ? html`<p class="hint">${this._t("floor_delete_confirm")}</p>
            <div class="actions">
              <button class="danger" @click=${() => this._deleteFloor()}>${icon("trash")}<span>${this._t("delete")}</span></button>
              <button @click=${() => (this._confirmDelete = false)}>${this._t("keep")}</button>
            </div>`
        : html`<div class="actions">
            <button class="danger" @click=${() => (this._confirmDelete = true)}>${icon("trash")}<span>${this._t("floor_delete")}</span></button>
          </div>`}`;
  }

  _renderRoomPanel(floor, sel) {
    const F = floor.id;
    const r = Ops.getRoom(floor, sel.id);
    if (!r) return nothing;
    const areas = this.areas || [];
    const set = (props) => this._commit(Ops.setRoomProps(this._plan, F, r.id, props));
    const corner = sel.kind === "corner" ? r.points[sel.index] : null;
    return html`<h3>${this._t("room")}</h3>
      ${this._text(this._t("room_name"), r.name, (v) => set({ name: v || r.id }))}
      ${this._select(
        this._t("room_area_ha"),
        r.area_id || "",
        [{ value: "", label: this._t("none") }, ...areas.map((a) => ({ value: a.area_id, label: a.name || a.area_id }))],
        (v) => {
          const props = { area_id: v || null };
          const a = areas.find((x) => x.area_id === v);
          const isDefault = !r.name || r.name === r.id || /^(Room|Raum) \d+$/.test(r.name);
          if (a && isDefault) props.name = a.name;
          set(props);
        },
      )}
      ${this._num(this._t("room_ceiling"), r.ceiling_height ?? null, (v) => set({ ceiling_height: v == null ? null : roundMm(v) }), {
        allowEmpty: true,
        min: 1,
        max: 20,
        placeholder: this._n(floor.height ?? Ops.DEFAULT_FLOOR_HEIGHT, 2),
      })}
      <div class="field">
        <span>${this._t("room_size")}</span>
        <span class="value">${this._t("area_value", { v: this._n(polygonArea(r.points), 2) })}</span>
      </div>
      ${corner
        ? html`<h3>${this._t("corner", { n: sel.index + 1 })}</h3>
            <div class="row">
              ${this._num(this._t("pos_x"), corner[0], (v) => this._commit(Ops.moveVertex(this._plan, F, r.id, sel.index, [v, corner[1]])), { digits: 3 })}
              ${this._num(this._t("pos_z"), corner[1], (v) => this._commit(Ops.moveVertex(this._plan, F, r.id, sel.index, [corner[0], v])), { digits: 3 })}
            </div>
            <div class="actions">
              <button ?disabled=${r.points.length <= 3} @click=${() => this._deleteSelection()}>${icon("trash")}<span>${this._t("corner_delete")}</span></button>
            </div>
            ${r.points.length <= 3 ? html`<p class="hint">${this._t("corner_min")}</p>` : nothing}`
        : nothing}
      <div class="actions">
        <button class="danger" @click=${() => this._commit(Ops.deleteRoom(this._plan, F, r.id), null)}>${icon("trash")}<span>${this._t("room_delete")}</span></button>
      </div>`;
  }

  _renderEdgePanel(plan, floor, sel) {
    const F = floor.id;
    const r = Ops.getRoom(floor, sel.id);
    const info = r && edgeInfo(plan, floor, r.id, sel.index);
    if (!info) return nothing;
    const names = info.neighbours.map((id) => (Ops.getRoom(floor, id) || {}).name || id).join(", ");
    const s = { ...{ wall_exterior: 0.24, wall_interior: 0.12 }, ...(plan.settings || {}) };
    const def = info.shared ? s.wall_interior : s.wall_exterior;
    return html`<h3>${this._t("wall")} · ${r.name || r.id}</h3>
      <div class="field">
        <span>${this._t("wall_length")}</span><span class="value">${this._t("length_value", { v: this._n(info.length, 2) })}</span>
      </div>
      <p class="hint">${info.shared ? this._t("wall_interior", { rooms: names }) : this._t("wall_exterior")}</p>
      ${info.partial.length
        ? html`<p class="hint">${this._t("wall_partial", { rooms: info.partial.map((id) => (Ops.getRoom(floor, id) || {}).name || id).join(", ") })}</p>`
        : nothing}
      ${this._num(this._t("wall_thickness"), info.thickness, (v) => this._commit(Ops.setWallThickness(this._plan, F, r.id, sel.index, v)), {
        digits: 3,
        min: 0.01,
        max: 2,
        allowEmpty: true,
      })}
      <div class="actions">
        <button ?disabled=${info.stored == null} @click=${() => this._commit(Ops.setWallThickness(this._plan, F, r.id, sel.index, null))}>
          ${this._t("wall_reset")}
        </button>
        <span class="hint">${this._t("wall_default", { v: this._n(def, 3) })}</span>
      </div>
      <label class="check">
        <input type="checkbox" .checked=${live(info.noWall)} @change=${(e) => this._commit(Ops.setNoWall(this._plan, F, r.id, sel.index, e.target.checked))} />
        <span>${this._t("wall_none")}</span>
      </label>`;
  }

  _renderOpeningPanel(floor, sel) {
    const F = floor.id;
    const o = floor.openings.find((x) => x.id === sel.id);
    if (!o) return nothing;
    const room = Ops.getRoom(floor, o.room_id);
    const set = (props) => this._commit(Ops.updateOpening(this._plan, F, o.id, props));
    const isDoor = o.type === "door";
    return html`<h3>${this._t(isDoor ? "opening_door" : "opening_window")}</h3>
      ${this._select(
        this._t("opening_type"),
        o.type,
        [
          { value: "door", label: this._t("opening_door") },
          { value: "window", label: this._t("opening_window") },
        ],
        (v) => set({ type: v, ...Ops.OPENING_DEFAULTS[v], width: o.width, hinge: o.hinge, swing: o.swing }),
      )}
      <div class="field">
        <span>${this._t("opening_room")}</span><span>${room ? room.name || room.id : o.room_id}</span>
      </div>
      <div class="row">
        ${this._num(this._t("width"), o.width, (v) => set({ width: roundMm(v) }), { min: 0.2, max: 10 })}
        ${this._num(this._t("opening_offset"), o.offset, (v) => set({ offset: roundMm(v) }), { min: 0 })}
        ${this._num(this._t("height"), o.height, (v) => set({ height: roundMm(v) }), { min: 0.1, max: 10 })}
        ${this._num(this._t("sill"), o.sill ?? 0, (v) => set({ sill: roundMm(v) }), { min: 0, max: 10 })}
      </div>
      ${isDoor
        ? html`<div class="row">
              ${this._select(
                this._t("hinge"),
                o.hinge || "left",
                [
                  { value: "left", label: this._t("hinge_left") },
                  { value: "right", label: this._t("hinge_right") },
                ],
                (v) => set({ hinge: v }),
              )}
              ${this._select(
                this._t("swing"),
                o.swing || "in",
                [
                  { value: "in", label: this._t("swing_in") },
                  { value: "out", label: this._t("swing_out") },
                ],
                (v) => set({ swing: v }),
              )}
            </div>
            ${this._text(this._t("contact"), o.contact, (v) => set({ contact: v || null }), "binary_sensor.")}
            <p class="hint">${this._t("contact_hint")}</p>`
        : nothing}
      <div class="actions">
        <button class="danger" @click=${() => this._commit(Ops.deleteOpening(this._plan, F, o.id), null)}>${icon("trash")}<span>${this._t("opening_delete")}</span></button>
      </div>`;
  }

  _renderFreeWallPanel(floor, sel) {
    const F = floor.id;
    const w = floor.walls.find((x) => x.id === sel.id);
    if (!w) return nothing;
    const set = (props) => this._commit(Ops.updateFreeWall(this._plan, F, w.id, props));
    return html`<h3>${this._t("freewall")}</h3>
      <div class="field">
        <span>${this._t("wall_length")}</span><span class="value">${this._t("length_value", { v: this._n(dist(w.a, w.b), 2) })}</span>
      </div>
      <div class="row">
        ${this._num(this._t("thickness"), w.thickness, (v) => set({ thickness: roundMm(v) }), { digits: 3, min: 0.01, max: 5 })}
        ${this._num(this._t("freewall_height"), w.height ?? null, (v) => set({ height: v == null ? null : roundMm(v) }), {
          allowEmpty: true,
          min: 0.05,
          max: 20,
          placeholder: this._n(floor.height ?? Ops.DEFAULT_FLOOR_HEIGHT, 2),
        })}
      </div>
      <div class="actions">
        <button class="danger" @click=${() => this._commit(Ops.deleteFreeWall(this._plan, F, w.id), null)}>${icon("trash")}<span>${this._t("freewall_delete")}</span></button>
      </div>`;
  }

  _renderFurniturePanel(floor, sel) {
    const F = floor.id;
    const it = floor.furniture.find((x) => x.id === sel.id);
    if (!it) return nothing;
    const set = (props) => this._commit(Ops.updateFurniture(this._plan, F, it.id, props));
    return html`<h3>${this._t("furniture")}</h3>
      ${this._furnitureTypeSelect(this._t("furniture_type"), it.type, (v) => set({ type: v }))}
      <div class="row">
        ${this._num(this._t("width"), it.w, (v) => set({ w: v }), { min: 0.01, max: 20 })}
        ${this._num(this._t("depth"), it.d, (v) => set({ d: v }), { min: 0.01, max: 20 })}
        ${this._num(this._t("height"), it.h, (v) => set({ h: v }), { min: 0, max: 10 })}
        ${this._num(this._t("rotation"), it.rotation || 0, (v) => set({ rotation: v }), { digits: 1 })}
        ${this._num(this._t("pos_x"), it.x, (v) => set({ x: v }), { digits: 3 })}
        ${this._num(this._t("pos_z"), it.z, (v) => set({ z: v }), { digits: 3 })}
      </div>
      <div class="actions">
        <button title=${this._t("rotate_left")} aria-label=${this._t("rotate_left")} @click=${() => set({ rotation: (it.rotation || 0) - 90 })}>
          ${icon("rotateLeft")}
        </button>
        <button title=${this._t("rotate_right")} aria-label=${this._t("rotate_right")} @click=${() => set({ rotation: (it.rotation || 0) + 90 })}>
          ${icon("rotateRight")}
        </button>
        <button class="danger" @click=${() => this._commit(Ops.deleteFurniture(this._plan, F, it.id), null)}>${icon("trash")}<span>${this._t("furniture_delete")}</span></button>
      </div>`;
  }

  _renderBackgroundPanel(floor) {
    const F = floor.id;
    const bg = floor.background;
    const upload = html`<label class="file">
      ${icon("upload")}<span>${this._t(bg ? "bg_replace" : "bg_upload")}</span>
      <input class="visually-hidden" type="file" accept="image/*" @change=${(e) => this._onUpload(e)} />
    </label>`;
    const error = this._bgError ? html`<p class="hint" role="alert">${this._t("bg_error")}</p>` : nothing;
    if (!bg) return html`<p class="hint">${this._t("bg_none")}</p><div class="actions">${upload}</div>${error}`;
    const set = (props) => this._commit(Ops.updateBackground(this._plan, F, props));
    const c = this._calib;
    let calib;
    if (!c) {
      calib = html`<button @click=${() => (this._calib = { p1: null, p2: null, length: "" })}>${icon("ruler")}<span>${this._t("bg_calibrate")}</span></button>`;
    } else if (c.p1 && c.p2) {
      const measured = dist(c.p1, c.p2);
      calib = html`<p class="hint">${this._t("bg_calib_measured", { v: this._n(measured, 2) })}</p>
        <label class="field"
          ><span>${this._t("bg_calib_length")}</span>
          <input
            type="text"
            inputmode="decimal"
            autocomplete="off"
            .value=${live(c.length)}
            @input=${(e) => (this._calib = { ...this._calib, length: e.target.value })}
            @keydown=${(e) => e.key === "Enter" && this._applyCalibration()}
        /></label>
        <div class="actions">
          <button class="primary" ?disabled=${!(parseNumber(c.length) > 0)} @click=${() => this._applyCalibration()}>${this._t("bg_calib_apply")}</button>
          <button @click=${() => (this._calib = null)}>${this._t("cancel")}</button>
        </div>`;
    } else {
      calib = html`<div class="actions"><button @click=${() => (this._calib = null)}>${this._t("cancel")}</button></div>`;
    }
    return html`<p class="hint">${this._t("bg_move_hint")}</p>
      <label class="field"
        ><span>${this._t("bg_opacity")} · ${Math.round((bg.opacity ?? 0.5) * 100)} %</span>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.05"
          .value=${live(String(bg.opacity ?? 0.5))}
          @input=${(e) => (this._draft = Ops.updateBackground(this._plan, F, { opacity: Number(e.target.value) }))}
          @change=${(e) => set({ opacity: Number(e.target.value) })}
      /></label>
      <div class="row">
        ${this._num(this._t("bg_width"), bg.width, (v) => set({ width: roundMm(v) }), { digits: 3, min: 0.1, max: 1000 })}
        ${this._num(this._t("bg_rotation"), bg.rotation || 0, (v) => set({ rotation: v }), { digits: 1 })}
        ${this._num(this._t("pos_x"), bg.x || 0, (v) => set({ x: roundMm(v) }), { digits: 3 })}
        ${this._num(this._t("pos_z"), bg.z || 0, (v) => set({ z: roundMm(v) }), { digits: 3 })}
      </div>
      ${calib}
      <div class="actions">
        ${upload}
        <button class="danger" @click=${() => this._commit(Ops.setBackground(this._plan, F, null), null)}>${icon("trash")}<span>${this._t("bg_remove")}</span></button>
      </div>
      ${error}`;
  }

  _applyCalibration() {
    const c = this._calib;
    const L = parseNumber(c && c.length);
    const floor = Ops.getFloor(this._plan, this._floor);
    if (!c || !c.p1 || !c.p2 || !(L > 0) || !floor.background) return;
    const next = backgroundScaleFromPoints(floor.background, c.p1, c.p2, L);
    this._calib = null;
    this._commit(Ops.setBackground(this._plan, this._floor, next), { kind: "background" });
  }
}

if (!customElements.get("pp-editor")) customElements.define("pp-editor", PpEditor);
