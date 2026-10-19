// <pp-map2d>: 2D canvas map of one floor with coverage, walls, openings, furniture and sensors.
// Rendering and pointer/keyboard interaction only; the panel owns the state.
// Events: `select` { entity_id }, `sensor-move` { entity_id, patch, final }.
import { LitElement, html, css } from "lit";
import { fitViewport, boundsOf, snapToFaces, angleTo, hitTest, handlePos, conePolygon, labelPoint, segmentRect, allowedPosition } from "./geometry.js";
import { withAlpha } from "./colors.js";
import { keyPatch } from "./state.js";

export class PpMap2d extends LitElement {
  static properties = {
    model: { attribute: false },
    sensors: { attribute: false },
    evaluation: { attribute: false },
    colors: { attribute: false },
    names: { attribute: false },
    height: { type: Number },
    cell: { type: Number },
    selected: { type: String },
    dark: { type: Boolean },
    cones: { type: Boolean },
    snap: { type: Boolean },
    readonly: { type: Boolean },
    t: { attribute: false },
  };

  static styles = css`
    :host { display: block; position: relative; min-width: 0; }
    .wrap { position: relative; width: 100%; height: 100%; min-height: 240px; }
    canvas { display: block; width: 100%; height: 100%; touch-action: none; border-radius: 8px; }
    canvas:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  `;

  constructor() {
    super();
    this.sensors = [];
    this.colors = {};
    this.names = {};
    this.height = 1.3;
    this.cell = 0.1;
    this.cones = true;
    this.snap = true;
    this.t = (k) => k;
    this._drag = null;
    this._labels = null;
    this._labelModel = null;
    this._w = 0;
    this._h = 0;
  }

  render() {
    const s = (this.sensors || []).find((x) => x.entity_id === this.selected);
    const desc = s ? this.t("map.selected", { name: this.names[s.entity_id] || s.entity_id, x: s.x.toFixed(2), z: s.z.toFixed(2), phi: Math.round(s.phi) }) : this.t("map.none_selected");
    return html`<div class="wrap">
      <canvas tabindex="0" role="application" aria-label=${this.t("map.aria")} aria-describedby="desc"
        @pointerdown=${this._down} @pointermove=${this._move} @pointerup=${this._up} @pointercancel=${this._up}
        @keydown=${this._key}></canvas>
      <div id="desc" class="sr" aria-live="polite">${desc}</div>
    </div>`;
  }

  firstUpdated() {
    this._canvas = this.renderRoot.querySelector("canvas");
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(this.renderRoot.querySelector(".wrap"));
    this._resize();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._ro) this._ro.disconnect();
    cancelAnimationFrame(this._raf);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._ro && this.renderRoot.querySelector(".wrap")) this._ro.observe(this.renderRoot.querySelector(".wrap"));
  }

  updated() {
    this._schedule();
  }

  _schedule() {
    cancelAnimationFrame(this._raf);
    this._raf = requestAnimationFrame(() => this._draw());
  }

  _resize() {
    const wrap = this.renderRoot.querySelector(".wrap");
    if (!wrap || !this._canvas) return;
    const w = Math.max(200, wrap.clientWidth);
    const h = Math.max(200, wrap.clientHeight);
    const dpr = window.devicePixelRatio || 1;
    if (w === this._w && h === this._h && dpr === this._dpr) return;
    this._w = w;
    this._h = h;
    this._dpr = dpr;
    this._canvas.width = Math.round(w * dpr);
    this._canvas.height = Math.round(h * dpr);
    this._draw();
  }

  get _vp() {
    return fitViewport(boundsOf(this.model), this._w, this._h, 12);
  }

  _palette() {
    const cs = getComputedStyle(this);
    const tok = (n, f) => (cs.getPropertyValue(n) || "").trim() || f;
    return {
      ink: tok("--primary-text-color", this.dark ? "#e1e1e1" : "#212121"),
      muted: tok("--secondary-text-color", this.dark ? "#9b9b9b" : "#727272"),
      floor: tok("--card-background-color", this.dark ? "#1c1c1c" : "#ffffff"),
      line: tok("--divider-color", this.dark ? "#3a3a3a" : "#cccccc"),
      spill: tok("--error-color", "#db4437"),
      accent: tok("--primary-color", "#03a9f4"),
      glass: this.dark ? "#62a9ee" : "#3b86cf",
    };
  }

  _rgba(color, a) {
    const out = withAlpha(color, a);
    if (out.startsWith("rgba")) return out;
    // Named colours or other CSS formats: let a canvas normalise the value.
    const c = this._cc || (this._cc = document.createElement("canvas").getContext("2d"));
    c.fillStyle = "#000";
    c.fillStyle = color;
    return withAlpha(c.fillStyle, a);
  }

  _path(g, vp, pts) {
    g.beginPath();
    pts.forEach((p, i) => (i ? g.lineTo(vp.sx(p[0]), vp.sz(p[1])) : g.moveTo(vp.sx(p[0]), vp.sz(p[1]))));
    g.closePath();
  }

  _poly(g, vp, pts, fill, stroke, lw = 1) {
    this._path(g, vp, pts);
    if (fill) {
      g.fillStyle = fill;
      g.fill();
    }
    if (stroke) {
      g.strokeStyle = stroke;
      g.lineWidth = lw;
      g.stroke();
    }
  }

  _roomLabels() {
    if (this._labelModel !== this.model) {
      this._labelModel = this.model;
      this._labels = {};
      for (const r of (this.model && this.model.rooms) || []) this._labels[r.id] = labelPoint(r.points);
    }
    return this._labels;
  }

  _draw() {
    const g = this._canvas && this._canvas.getContext("2d");
    if (!g || !this._w) return;
    const C = this._palette();
    g.setTransform(this._dpr, 0, 0, this._dpr, 0, 0);
    g.clearRect(0, 0, this._w, this._h);
    const M = this.model;
    if (!M) return;
    const vp = this._vp;
    const S = vp.scale;

    for (const r of M.rooms || []) this._poly(g, vp, r.points, this._rgba(C.ink, 0.03));

    // Coverage grid: own sensor colour by quality, red where a foreign sensor sees in.
    const grid = this.evaluation && this.evaluation.grid ? this.evaluation.grid[String(this.height)] : null;
    if (grid) {
      const half = (this.cell || 0.1) / 2;
      for (const c of grid) {
        const hasOwn = c.own > 0 && c.own_sensor;
        const spill = c.spill && c.spill.length;
        if (!hasOwn && !spill) continue;
        const x = Math.round(vp.sx(c.x - half));
        const y = Math.round(vp.sz(c.z - half));
        const w = Math.round(vp.sx(c.x + half)) - x;
        const h = Math.round(vp.sz(c.z + half)) - y;
        if (hasOwn) {
          g.fillStyle = this._rgba(this.colors[c.own_sensor] || C.accent, 0.14 + 0.22 * c.own);
          g.fillRect(x, y, w, h);
        }
        if (spill) {
          g.fillStyle = this._rgba(C.spill, 0.5);
          g.fillRect(x, y, w, h);
        }
      }
    }

    for (const f of M.furniture || []) this._poly(g, vp, f.poly, this._rgba(C.line, f.obstacle ? 0.75 : 0.45), this._rgba(C.muted, 0.6), 0.7);
    for (const b of M.bands || []) this._poly(g, vp, b, C.ink);
    for (const w of M.freeWalls || []) this._poly(g, vp, w.poly, this._rgba(C.ink, w.block ? 0.65 : 0.3));

    // Door and window cut-outs, clipped to the wall bands.
    // Each band is clipped on its own: a union clip path would cancel out where bands overlap.
    const cuts = [
      ...(M.doors || []).filter((d) => d.a && d.b).map((d) => [segmentRect(d.a, d.b, 0.45), C.floor, null]),
      ...(M.windows || []).filter((w) => w.a && w.b).map((w) => [segmentRect(w.a, w.b, 0.45), C.floor, this._rgba(C.glass, 0.45)]),
    ];
    if (cuts.length) {
      for (const b of M.bands || []) {
        g.save();
        this._path(g, vp, b);
        g.clip();
        for (const [rect, fill, tint] of cuts) {
          this._poly(g, vp, rect, fill);
          if (tint) this._poly(g, vp, rect, tint);
        }
        g.restore();
      }
    }
    g.strokeStyle = C.glass;
    g.lineWidth = 2;
    for (const w of M.windows || []) {
      g.beginPath();
      g.moveTo(vp.sx(w.a[0]), vp.sz(w.a[1]));
      g.lineTo(vp.sx(w.b[0]), vp.sz(w.b[1]));
      g.stroke();
    }
    g.lineWidth = 1.3;
    for (const d of M.doors || []) {
      if (!d.hinge || !d.tip) continue;
      g.strokeStyle = C.muted;
      g.beginPath();
      g.moveTo(vp.sx(d.hinge[0]), vp.sz(d.hinge[1]));
      g.lineTo(vp.sx(d.tip[0]), vp.sz(d.tip[1]));
      g.stroke();
      if (d.other) {
        const a0 = Math.atan2(d.tip[1] - d.hinge[1], d.tip[0] - d.hinge[0]);
        const a1 = Math.atan2(d.other[1] - d.hinge[1], d.other[0] - d.hinge[0]);
        const diff = ((a1 - a0 + 3 * Math.PI) % (2 * Math.PI)) - Math.PI;
        const r = (d.w || Math.hypot(d.tip[0] - d.hinge[0], d.tip[1] - d.hinge[1])) * S;
        g.setLineDash([3, 3]);
        g.beginPath();
        g.arc(vp.sx(d.hinge[0]), vp.sz(d.hinge[1]), r, a0, a0 + diff, diff < 0);
        g.stroke();
        g.setLineDash([]);
      }
    }

    // Room names.
    const labels = this._roomLabels();
    const font = getComputedStyle(this).fontFamily || "Roboto, sans-serif";
    g.fillStyle = C.ink;
    g.font = `500 ${Math.max(11, Math.min(15, S * 0.26))}px ${font}`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    for (const r of M.rooms || []) {
      const l = labels[r.id];
      if (l) g.fillText(String(r.name || r.id).toUpperCase(), vp.sx(l.x), vp.sz(l.z));
    }

    // Scale bar.
    const mx = 12;
    const my = this._h - 12;
    g.strokeStyle = C.muted;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(mx, my);
    g.lineTo(mx + S, my);
    g.stroke();
    g.fillStyle = C.muted;
    g.font = `11px ${font}`;
    g.textAlign = "left";
    g.textBaseline = "alphabetic";
    g.fillText("1 m", mx, my - 5);

    // Sensors.
    (this.sensors || []).forEach((s, idx) => {
      const col = s.active === false ? C.muted : this.colors[s.entity_id] || C.accent;
      const x = vp.sx(s.x);
      const y = vp.sz(s.z);
      const sel = s.entity_id === this.selected;
      if (this.cones && s.active !== false) {
        this._path(g, vp, conePolygon(s));
        g.strokeStyle = this._rgba(col, sel ? 0.95 : 0.5);
        g.lineWidth = sel ? 1.6 : 1;
        g.setLineDash([5, 4]);
        g.stroke();
        g.setLineDash([]);
      }
      if (s.mount !== "ceiling") {
        const [hx, hy] = handlePos(vp, s);
        g.strokeStyle = col;
        g.lineWidth = 3;
        g.beginPath();
        g.moveTo(x, y);
        g.lineTo(hx, hy);
        g.stroke();
        g.beginPath();
        g.arc(hx, hy, sel ? 7 : 5, 0, 2 * Math.PI);
        g.fillStyle = C.floor;
        g.fill();
        g.strokeStyle = col;
        g.lineWidth = 2;
        g.stroke();
      }
      g.beginPath();
      g.arc(x, y, sel ? 12 : 10, 0, 2 * Math.PI);
      g.fillStyle = s.active === false ? C.floor : col;
      g.fill();
      g.strokeStyle = sel ? C.accent : s.active === false ? col : C.floor;
      g.lineWidth = sel ? 3 : 2;
      g.stroke();
      g.fillStyle = s.active === false ? col : "#fff";
      g.font = `600 11px ${font}`;
      g.textAlign = "center";
      g.textBaseline = "middle";
      g.fillText(String(idx + 1), x, y + 0.5);
      g.textBaseline = "alphabetic";
    });

    // Distance read-out while snapped to a wall face.
    if (this._drag && this._drag.snapInfo) {
      const s = (this.sensors || []).find((t) => t.entity_id === this._drag.entity_id);
      if (s) {
        const [a, b] = this._drag.snapInfo.along;
        const txt = this.t("map.snap_readout", { a: Math.round(a * 100), b: Math.round(b * 100) });
        g.font = `12px ${font}`;
        g.textAlign = "left";
        const tw = g.measureText(txt).width;
        const tx = Math.max(4, Math.min(this._w - tw - 8, vp.sx(s.x) + 16));
        const ty = Math.max(16, vp.sz(s.z) - 16);
        g.fillStyle = this._rgba(C.floor, 0.92);
        g.fillRect(tx - 4, ty - 13, tw + 8, 18);
        g.fillStyle = C.ink;
        g.fillText(txt, tx, ty);
      }
    }
  }

  _pos(e) {
    const r = this._canvas.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }

  _emit(name, detail) {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  _down(e) {
    if (!this.model) return;
    const [px, py] = this._pos(e);
    const hit = hitTest(this._vp, this.sensors, px, py);
    if (!hit) return;
    if (hit.entity_id !== this.selected) this._emit("select", { entity_id: hit.entity_id });
    if (this.readonly) return;
    this._drag = { ...hit, snapInfo: null, moved: false };
    this._canvas.setPointerCapture(e.pointerId);
    this._canvas.focus({ preventScroll: true });
    e.preventDefault();
  }

  _move(e) {
    if (!this.model) return;
    const [px, py] = this._pos(e);
    const vp = this._vp;
    if (!this._drag) {
      this._canvas.style.cursor = hitTest(vp, this.sensors, px, py) ? "grab" : "default";
      return;
    }
    const s = (this.sensors || []).find((t) => t.entity_id === this._drag.entity_id);
    if (!s) return;
    let patch;
    if (this._drag.mode === "rotate") {
      patch = { phi: Math.round(angleTo(s.x, s.z, vp.wx(px), vp.wz(py), e.shiftKey ? 0 : 5)) % 360 };
    } else {
      let p = [vp.wx(px), vp.wz(py)];
      this._drag.snapInfo = null;
      if (this.snap && s.mount !== "ceiling" && !e.altKey) {
        const sn = snapToFaces(this.model.faces, p, { maxDist: 0.4 });
        if (sn) {
          p = [sn.x, sn.z];
          this._drag.snapInfo = sn;
        }
      }
      if (!allowedPosition(this.model, p[0], p[1])) return;
      patch = { x: Math.round(p[0] * 1000) / 1000, z: Math.round(p[1] * 1000) / 1000 };
    }
    this._drag.moved = true;
    this._drag.last = patch;
    this._canvas.style.cursor = "grabbing";
    this._emit("sensor-move", { entity_id: s.entity_id, patch, final: false });
  }

  _up() {
    if (!this._drag) return;
    const d = this._drag;
    this._drag = null;
    this._canvas.style.cursor = "default";
    if (d.moved) this._emit("sensor-move", { entity_id: d.entity_id, patch: d.last || {}, final: true });
    this._schedule();
  }

  _key(e) {
    const list = this.sensors || [];
    if ((e.key === "n" || e.key === "p" || e.key === "N" || e.key === "P") && list.length) {
      const i = list.findIndex((s) => s.entity_id === this.selected);
      const dir = e.key.toLowerCase() === "n" ? 1 : -1;
      this._emit("select", { entity_id: list[(i + dir + list.length) % list.length].entity_id });
      e.preventDefault();
      return;
    }
    if (this.readonly) return;
    const s = list.find((t) => t.entity_id === this.selected);
    const patch = keyPatch(s, e.key, e.shiftKey);
    if (!patch) return;
    e.preventDefault();
    const nx = patch.x === undefined ? s.x : patch.x;
    const nz = patch.z === undefined ? s.z : patch.z;
    if (!allowedPosition(this.model, nx, nz)) return;
    this._emit("sensor-move", { entity_id: s.entity_id, patch, final: true });
  }
}

if (!customElements.get("pp-map2d")) customElements.define("pp-map2d", PpMap2d);
