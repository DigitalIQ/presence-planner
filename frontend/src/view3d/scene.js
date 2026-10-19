// three.js scene controller for <pp-view3d>. Owns the renderer, camera, controls and
// all GPU resources; the Lit element only forwards properties via setState().
// Rendering is on demand: a frame is requested on property changes and while the
// camera is moving (user input or damping), never continuously.

import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  DataTexture,
  DirectionalLight,
  DoubleSide,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineSegments,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  NearestFilter,
  PerspectiveCamera,
  Raycaster,
  RGBAFormat,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  UnsignedByteType,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  boundsChanged,
  buildStaticData,
  colourRgb,
  frameBounds,
  frustumGeometry,
  getPalette,
  parseColor,
  rasterizeCells,
  sensorColourIndex,
  sensorColourMap,
  sensorMeshBasis,
  sensorPosition,
} from './geometry.js';

const FOV = 40;
const OVERLAY_LIFT = 0.004;

function toGeometry(data) {
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(new Float32Array(data.positions), 3));
  g.setIndex(new BufferAttribute(new Uint32Array(data.indices), 1));
  g.computeVertexNormals();
  return g;
}

function colorOf(css, fallback = '#808080') {
  const rgb = parseColor(css) || parseColor(fallback);
  return new Color().setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, SRGBColorSpace);
}

function disposeObject(root) {
  root.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
    for (const m of mats) {
      if (m.map) m.map.dispose();
      m.dispose();
    }
  });
}

function clearGroup(group, keepMaterials = false) {
  for (const child of [...group.children]) {
    group.remove(child);
    if (keepMaterials) child.traverse((o) => o.geometry && o.geometry.dispose());
    else disposeObject(child);
  }
}

export class SceneController {
  constructor(container, { onSelect } = {}) {
    this.container = container;
    this.onSelect = onSelect || (() => {});
    this.state = {};
    this._raf = 0;
    this._disposed = false;
    this._framedBounds = null;
    this._hover = null;
    this._down = null;

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;outline:none';
    container.appendChild(canvas);
    this.canvas = canvas;

    this.renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(FOV, 1.5, 0.1, 200);
    this.scene.add(new AmbientLight(0xffffff, 1.7));
    const sun = new DirectionalLight(0xffffff, 1.6);
    sun.position.set(-4, 10, 6);
    this.scene.add(sun);

    this.staticGroup = new Group();
    this.sensorGroup = new Group();
    this.overlayGroup = new Group();
    this.scene.add(this.staticGroup, this.overlayGroup, this.sensorGroup);

    this.mats = {
      floor: new MeshLambertMaterial({ side: DoubleSide }),
      wall: new MeshLambertMaterial({ side: DoubleSide }),
      freeWall: new MeshLambertMaterial({ side: DoubleSide }),
      furniture: new MeshLambertMaterial({ transparent: true, opacity: 0.42, depthWrite: false, side: DoubleSide }),
      obstacle: new MeshLambertMaterial({ transparent: true, opacity: 0.55, depthWrite: false, side: DoubleSide }),
      window: new MeshBasicMaterial({ transparent: true, opacity: 0.35, depthWrite: false, side: DoubleSide }),
      door: new MeshBasicMaterial({ side: DoubleSide }),
    };

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.screenSpacePanning = true;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
    this.controls.addEventListener('change', () => this._request());
    // Until the user moves the camera, every resize frames the model again (the split
    // layout settles after the first frame, which would otherwise leave it zoomed out).
    this._userMoved = false;
    this._lastView = 'iso';
    this.controls.addEventListener('start', () => { this._userMoved = true; });

    this.raycaster = new Raycaster();
    this._onPointerDown = (e) => this._pointerDown(e);
    this._onPointerUp = (e) => this._pointerUp(e);
    this._onPointerMove = (e) => this._pointerMove(e);
    canvas.addEventListener('pointerdown', this._onPointerDown);
    canvas.addEventListener('pointerup', this._onPointerUp);
    canvas.addEventListener('pointermove', this._onPointerMove);

    this._motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    this._onMotion = () => this._applyMotion();
    if (this._motionQuery) this._motionQuery.addEventListener?.('change', this._onMotion);
    this._applyMotion();

    this._resizeObserver = new ResizeObserver(() => this.resize());
    this._resizeObserver.observe(container);
    this.resize();
  }

  // ------------------------------------------------------------ public API

  /** Apply new element properties; only the affected parts are rebuilt. */
  setState(next) {
    if (this._disposed) return;
    const prev = this.state;
    const s = { dark: false, height: 0.9, ...next };
    this.state = s;
    const modelChanged = s.model !== prev.model;
    const darkChanged = s.dark !== prev.dark || !prev.palette;
    if (darkChanged) {
      this.palette = getPalette(s.dark);
      this._applyPalette();
    }
    if (modelChanged) this._buildStatic();
    const sensorsChanged = modelChanged || darkChanged || s.sensors !== prev.sensors || s.colors !== prev.colors || s.selected !== prev.selected;
    if (sensorsChanged) this._buildSensors();
    if (
      sensorsChanged ||
      s.evaluation !== prev.evaluation ||
      s.height !== prev.height
    ) {
      this._buildOverlay();
    }
    this.state.palette = this.palette;
    this._request();
  }

  resetView() {
    this._frame('iso');
  }

  topView() {
    this._frame('top');
  }

  resize() {
    if (this._disposed) return;
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (w < 2 || h < 2) return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.state.model && (!this._sized || !this._userMoved)) {
      // The first real size arrives after the model: frame again with the right aspect.
      this._sized = true;
      this._frame(this._lastView);
    }
    this._request();
  }

  dispose() {
    if (this._disposed) return;
    this._disposed = true;
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = 0;
    this._resizeObserver.disconnect();
    if (this._motionQuery) this._motionQuery.removeEventListener?.('change', this._onMotion);
    this.canvas.removeEventListener('pointerdown', this._onPointerDown);
    this.canvas.removeEventListener('pointerup', this._onPointerUp);
    this.canvas.removeEventListener('pointermove', this._onPointerMove);
    this.controls.dispose();
    disposeObject(this.scene);
    for (const m of Object.values(this.mats)) m.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.canvas.remove();
  }

  // ------------------------------------------------------------ rendering

  _request() {
    if (this._raf || this._disposed) return;
    this._raf = requestAnimationFrame(() => {
      this._raf = 0;
      if (this._disposed) return;
      const moved = this.controls.update();
      this.renderer.render(this.scene, this.camera);
      if (moved) this._request();
    });
  }

  _applyMotion() {
    this.controls.enableDamping = !(this._motionQuery && this._motionQuery.matches);
  }

  _frame(view) {
    this._lastView = view;
    this._userMoved = false;
    const b = this.state.model?.bounds;
    const f = frameBounds(b, {
      fov: FOV,
      aspect: this.camera.aspect,
      height: this.state.model?.floor?.height,
      // model.bounds carries a 0.4 m drawing margin; the 3D view frames the walls themselves
      inset: 0.35,
      view,
    });
    this.camera.near = f.near;
    this.camera.far = f.far;
    this.camera.updateProjectionMatrix();
    this.camera.position.set(...f.position);
    this.controls.target.set(...f.target);
    this.controls.minDistance = f.minDistance;
    this.controls.maxDistance = f.maxDistance;
    this.controls.update();
    this._request();
  }

  _applyPalette() {
    const p = this.palette;
    this.scene.background = colorOf(p.background);
    this.mats.floor.color = colorOf(p.floor);
    this.mats.wall.color = colorOf(p.wall);
    this.mats.freeWall.color = colorOf(p.freeWall);
    this.mats.furniture.color = colorOf(p.furniture);
    this.mats.obstacle.color = colorOf(p.obstacle);
    this.mats.window.color = colorOf(p.window);
    this.mats.door.color = colorOf(p.door);
    for (const m of Object.values(this.mats)) m.needsUpdate = true;
  }

  // ------------------------------------------------------------ scene content

  _buildStatic() {
    clearGroup(this.staticGroup, true);
    const model = this.state.model;
    if (!model) return;
    const d = buildStaticData(model);
    this._wallHeight = d.wallHeight;
    const add = (data, mat, order = 0) => {
      if (!data.indices.length) return;
      const mesh = new Mesh(toGeometry(data), mat);
      mesh.renderOrder = order;
      this.staticGroup.add(mesh);
    };
    add(d.floors, this.mats.floor);
    add(d.thresholds, this.mats.door);
    add(d.walls, this.mats.wall);
    add(d.freeWalls, this.mats.freeWall);
    add(d.furniture, this.mats.furniture, 2);
    add(d.obstacles, this.mats.obstacle, 2);
    add(d.windows, this.mats.window, 3);
    if (boundsChanged(this._framedBounds, model.bounds)) {
      this._framedBounds = model.bounds ? { ...model.bounds } : null;
      this._frame('iso');
    }
  }

  _buildSensors() {
    clearGroup(this.sensorGroup);
    const { sensors, colors, selected } = this.state;
    const p = this.palette;
    const H = this._wallHeight ?? 2.6;
    const anySelected = !!selected && (sensors || []).some((s) => s.entity_id === selected);
    this._hitMeshes = [];
    (sensors || []).forEach((s, i) => {
      if (!Number.isFinite(s.x) || !Number.isFinite(s.z)) return;
      const rgb = colourRgb(colors, sensorColourIndex(s, i));
      const col = new Color().setRGB(rgb[0] / 255, rgb[1] / 255, rgb[2] / 255, SRGBColorSpace);
      const isSel = s.entity_id === selected;
      const active = s.active !== false;
      const pos = sensorPosition(s);

      // Marker box, local -z looks along the sensor direction.
      const basis = sensorMeshBasis(s);
      const m = new Matrix4().makeBasis(new Vector3(...basis.x), new Vector3(...basis.y), new Vector3(...basis.z));
      m.setPosition(...pos);
      const box = new Mesh(
        new BoxGeometry(0.1, 0.1, 0.05),
        new MeshLambertMaterial({ color: active ? col : colorOf(p.inactive), transparent: !active, opacity: active ? 1 : 0.6 }),
      );
      box.matrixAutoUpdate = false;
      box.matrix.copy(m);
      box.renderOrder = 4;
      this.sensorGroup.add(box);

      // Accent: edge outline in the sensor colour, in the highlight colour when selected.
      const outlineGeo = new EdgesGeometry(new BoxGeometry(0.16, 0.16, 0.09));
      const outline = new LineSegments(outlineGeo, new LineBasicMaterial({ color: isSel ? colorOf(p.selected) : col, depthTest: false }));
      outline.matrixAutoUpdate = false;
      outline.matrix.copy(m);
      outline.renderOrder = 5;
      this.sensorGroup.add(outline);

      // Invisible, larger click target.
      const hit = new Mesh(new SphereGeometry(0.22, 8, 6), new MeshBasicMaterial({ visible: false }));
      hit.position.set(...pos);
      hit.userData.entityId = s.entity_id;
      this.sensorGroup.add(hit);
      this._hitMeshes.push(hit);

      if (!active) return;
      const fr = frustumGeometry(s, { yMin: 0, yMax: H });
      const opacity = isSel ? 0.24 : anySelected ? 0.04 : 0.09;
      const fm = new Mesh(
        toGeometry({ positions: fr.positions, indices: fr.indices }),
        new MeshBasicMaterial({ color: col, transparent: true, opacity, depthWrite: false, side: DoubleSide }),
      );
      fm.renderOrder = 6;
      this.sensorGroup.add(fm);
      if (isSel) {
        const eg = new BufferGeometry();
        eg.setAttribute('position', new BufferAttribute(new Float32Array(fr.edges), 3));
        const lines = new LineSegments(eg, new LineBasicMaterial({ color: col, transparent: true, opacity: 0.85 }));
        lines.renderOrder = 7;
        this.sensorGroup.add(lines);
      }
    });
  }

  _buildOverlay() {
    clearGroup(this.overlayGroup);
    const { evaluation, model, height, sensors, colors, selected } = this.state;
    const cells = evaluation?.grid?.[height] ?? evaluation?.grid?.[String(height)];
    if (!model?.bounds || !cells || !cells.length) return;
    const colourMap = sensorColourMap(sensors, colors);
    const img = rasterizeCells(cells, {
      bounds: model.bounds,
      colorFor: (id) => colourMap.get(id) || colourRgb(colors, 0),
      spillColor: parseColor(this.palette.spill),
      selected: selected || null,
    });
    const tex = new DataTexture(img.data, img.width, img.height, RGBAFormat, UnsignedByteType);
    tex.colorSpace = SRGBColorSpace;
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
    tex.generateMipmaps = false;
    tex.needsUpdate = true;

    const y = height + OVERLAY_LIFT;
    const g = new BufferGeometry();
    g.setAttribute(
      'position',
      new BufferAttribute(new Float32Array([img.x0, y, img.z0, img.x1, y, img.z0, img.x1, y, img.z1, img.x0, y, img.z1]), 3),
    );
    g.setAttribute('uv', new BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2));
    g.setIndex([0, 2, 1, 0, 3, 2]);
    const mesh = new Mesh(g, new MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: DoubleSide }));
    mesh.renderOrder = 1;
    this.overlayGroup.add(mesh);
  }

  // ------------------------------------------------------------ picking

  _pick(e) {
    if (!this._hitMeshes?.length) return null;
    const r = this.canvas.getBoundingClientRect();
    const ndc = new Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const hit = this.raycaster.intersectObjects(this._hitMeshes, false)[0];
    return hit ? hit.object.userData.entityId : null;
  }

  _pointerDown(e) {
    this._down = { x: e.clientX, y: e.clientY, t: performance.now() };
  }

  _pointerUp(e) {
    const d = this._down;
    this._down = null;
    if (!d || e.button > 0) return;
    if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5 || performance.now() - d.t > 600) return;
    const id = this._pick(e);
    if (id) this.onSelect(id);
  }

  _pointerMove(e) {
    if (e.buttons) return;
    const id = this._pick(e);
    if (id !== this._hover) {
      this._hover = id;
      this.canvas.style.cursor = id ? 'pointer' : '';
    }
  }
}
