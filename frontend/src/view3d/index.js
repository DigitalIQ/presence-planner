// <pp-view3d>: rotatable 3D view of one floor with sensor fields of view and the coverage, shown as a
// plane at the selected height, as voxels or as a point cloud. Boundary (see ARCHITECTURE.md):
//   properties  model, sensors, evaluation, height, selected, dark, colors, labels, coreOpts
//   event       select  { detail: { entityId } }  when a sensor is clicked
// For voxels and points the element evaluates the coverage volume itself (many heights, 20 cm cells) with
// the panel's model options (`coreOpts`: doors, thin_db), so the volume follows the same assumptions.

import { LitElement, css, html } from 'lit';
import { evaluate } from '../core/index.js';
import { volumeHeights } from './geometry.js';
import { SceneController } from './scene.js';

const MODES = ['flat', 'voxels', 'points'];
const MODE_KEY = 'pp-view3d-mode';
const VOLUME_CELL = 0.2;

function readMode() {
  try {
    const m = localStorage.getItem(MODE_KEY);
    return MODES.includes(m) ? m : 'voxels';
  } catch {
    return 'voxels';
  }
}

export class PPView3D extends LitElement {
  static properties = {
    model: { attribute: false },
    sensors: { attribute: false },
    evaluation: { attribute: false },
    height: { type: Number },
    selected: { type: String },
    dark: { type: Boolean },
    colors: { attribute: false },
    labels: { attribute: false },
    coreOpts: { attribute: false },
    _mode: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      position: relative;
      height: 100%;
      min-height: 240px;
      overflow: hidden;
    }
    .stage {
      position: absolute;
      inset: 0;
    }
    .bar {
      position: absolute;
      top: 8px;
      right: 8px;
      left: 8px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 6px;
      pointer-events: none;
    }
    .bar > * {
      pointer-events: auto;
    }
    .seg {
      display: inline-flex;
    }
    .seg button {
      border-radius: 0;
      margin-left: -1px;
    }
    .seg button:first-child {
      border-radius: 6px 0 0 6px;
      margin-left: 0;
    }
    .seg button:last-child {
      border-radius: 0 6px 6px 0;
    }
    .seg button[aria-pressed='true'] {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      position: relative;
    }
    button {
      font: inherit;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.5));
      background: var(--card-background-color, rgba(255, 255, 255, 0.85));
      color: var(--primary-text-color, inherit);
      cursor: pointer;
    }
    button:hover {
      border-color: var(--primary-color, #03a9f4);
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 1px;
    }
  `;

  constructor() {
    super();
    this.height = 0.9;
    this.dark = false;
    this.labels = {};
    this._ctl = null;
    this._mode = readMode();
    this._volume = null;
    this._volumeKey = null;
    this._volumeTimer = 0;
  }

  render() {
    const l = {
      reset: 'Reset view',
      top: 'Top view',
      mode: 'Display',
      flat: 'Plane',
      voxels: 'Voxels',
      points: 'Point cloud',
      ...(this.labels || {}),
    };
    return html`
      <div class="stage"></div>
      <div class="bar">
        <div class="seg" role="group" aria-label=${l.mode}>
          ${MODES.map(
            (m) => html`<button type="button" aria-pressed=${this._mode === m ? 'true' : 'false'} @click=${() => this.setMode(m)}>${l[m]}</button>`,
          )}
        </div>
        <button type="button" @click=${() => this.resetView()}>${l.reset}</button>
        <button type="button" @click=${() => this.topView()}>${l.top}</button>
      </div>
    `;
  }

  setMode(mode) {
    if (!MODES.includes(mode) || mode === this._mode) return;
    this._mode = mode;
    try {
      localStorage.setItem(MODE_KEY, mode);
    } catch {
      /* the choice just is not remembered */
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // Re-attached after a disconnect: the first render already happened.
    if (this.hasUpdated) this._setup();
  }

  firstUpdated() {
    this._setup();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._teardown();
  }

  updated() {
    this._scheduleVolume();
    this._push();
  }

  /** Inputs of the volume; the expensive evaluation runs only when they really change. */
  _volumeInputs() {
    if (!this.model) return null;
    if (this._keyModel !== this.model) {
      this._keyModel = this.model;
      this._modelSeq = (this._modelSeq || 0) + 1;
    }
    const sensors = (this.sensors || []).map((s) => [
      s.entity_id, s.x, s.z, s.height, s.phi, s.tilt, s.fov_h, s.fov_v, s.reach, s.mount, s.active, s.profile,
    ]);
    const { doors, thin_db } = this.coreOpts || {};
    return { key: JSON.stringify([this._modelSeq, sensors, doors ?? null, thin_db ?? null]), doors, thin_db };
  }

  _scheduleVolume() {
    if (this._mode === 'flat') return;
    const inputs = this._volumeInputs();
    if (!inputs || inputs.key === this._volumeKey || inputs.key === this._pendingKey) return;
    this._pendingKey = inputs.key;
    clearTimeout(this._volumeTimer);
    // short delay: while a sensor is dragged, only the last position is evaluated
    this._volumeTimer = setTimeout(() => this._computeVolume(inputs), 120);
  }

  _computeVolume(inputs) {
    this._pendingKey = null;
    if (!this.model) return;
    const heights = volumeHeights(this.model.floor?.height, VOLUME_CELL);
    try {
      const opts = { ...(this.coreOpts || {}), heights, cell: VOLUME_CELL, grid: true };
      if (inputs.doors !== undefined) opts.doors = inputs.doors;
      if (inputs.thin_db !== undefined) opts.thin_db = inputs.thin_db;
      const ev = evaluate(this.model, this.sensors || [], opts);
      this._volume = { grid: ev.grid, heights, cell: VOLUME_CELL, step: VOLUME_CELL };
    } catch (err) {
      console.warn('pp-view3d: volume evaluation failed', err);
      this._volume = null;
    }
    this._volumeKey = inputs.key;
    this._push();
  }

  resetView() {
    this._ctl?.resetView();
  }

  topView() {
    this._ctl?.topView();
  }

  _setup() {
    if (this._ctl) return;
    const stage = this.renderRoot.querySelector('.stage');
    if (!stage) return;
    try {
      this._ctl = new SceneController(stage, {
        onSelect: (entityId) =>
          this.dispatchEvent(new CustomEvent('select', { detail: { entityId }, bubbles: true, composed: true })),
      });
    } catch (err) {
      console.warn('pp-view3d: WebGL unavailable', err);
      this._ctl = null;
      return;
    }
    this._push(true);
  }

  _teardown() {
    clearTimeout(this._volumeTimer);
    this._pendingKey = null;
    this._ctl?.dispose();
    this._ctl = null;
  }

  _push() {
    this._ctl?.setState({
      model: this.model,
      sensors: this.sensors,
      evaluation: this.evaluation,
      height: this.height,
      selected: this.selected,
      dark: this.dark,
      colors: this.colors,
      mode: this._mode,
      volume: this._mode === 'flat' ? null : this._volume,
    });
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('pp-view3d')) {
  customElements.define('pp-view3d', PPView3D);
}
