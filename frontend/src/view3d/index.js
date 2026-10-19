// <pp-view3d>: rotatable 3D view of one floor with sensor fields of view and a
// coverage overlay. Rendering only, no state. Boundary (see ARCHITECTURE.md):
//   properties  model, sensors, evaluation, height, selected, dark, colors, labels
//   event       select  { detail: { entityId } }  when a sensor is clicked

import { LitElement, css, html } from 'lit';
import { SceneController } from './scene.js';

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
      display: flex;
      gap: 6px;
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
  }

  render() {
    const l = { reset: 'Reset view', top: 'Top view', ...(this.labels || {}) };
    return html`
      <div class="stage"></div>
      <div class="bar">
        <button type="button" @click=${() => this.resetView()}>${l.reset}</button>
        <button type="button" @click=${() => this.topView()}>${l.top}</button>
      </div>
    `;
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
    });
  }
}

if (typeof customElements !== 'undefined' && !customElements.get('pp-view3d')) {
  customElements.define('pp-view3d', PPView3D);
}
