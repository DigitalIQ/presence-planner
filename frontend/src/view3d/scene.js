// three.js scene controller for <pp-view3d>. Owns the renderer, camera, controls and
// all GPU resources; the Lit element only forwards properties via setState().
// Rendering is on demand: a frame is requested on property changes and while the
// camera is moving (user input or damping), never continuously.

import {
  AdditiveBlending,
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
  InstancedMesh,
  LineBasicMaterial,
  LineSegments,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  NearestFilter,
  NormalBlending,
  PerspectiveCamera,
  Points,
  PointsMaterial,
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
  sensorColourMap,
  sensorRgb,
  volumeVoxels,
  sensorMeshBasis,
  sensorPosition,
  volumeTexture,
} from './geometry.js';
import { LightHaze, createLightUniforms, patchSurfaceMaterial, setLightVolume } from './light.js';

const FOV = 40;
// Far enough above furniture tops at exactly 0.5 / 0.9 / 1.3 m (kitchen counters) to never share a depth value.
const OVERLAY_LIFT = 0.02;
const VOLUME_MODES = new Set(['light', 'voxels', 'points']);

// The light view darkens the room so the sensor light reads as light, in both themes.
const NIGHT = {
  background: '#0f1318',
  floor: '#272d35',
  wall: '#363e49',
  freeWall: '#3e4753',
  furniture: '#4b5564',
  obstacle: '#566173',
  window: '#5a8fbf',
  door: '#8a6a3c',
};

/** A round white dot that fades towards its edge (soft, see-through points). */
function dotTexture() {
  const n = 32;
  const data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const d = Math.hypot(x + 0.5 - n / 2, y + 0.5 - n / 2) / (n / 2);
      const i = (y * n + x) * 4;
      data[i] = data[i + 1] = data[i + 2] = 255;
      // smooth falloff: solid core, soft rim
      const a = d >= 1 ? 0 : Math.pow(1 - d * d, 1.6);
      data[i + 3] = Math.round(a * 255);
    }
  }
  const tex = new DataTexture(data, n, n, RGBAFormat, UnsignedByteType);
  tex.needsUpdate = true;
  return tex;
}

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
    this.ambient = new AmbientLight(0xffffff, 1.7);
    this.scene.add(this.ambient);
    this.sun = new DirectionalLight(0xffffff, 1.6);
    this.sun.position.set(-4, 10, 6);
    this.scene.add(this.sun);

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
    // floors, walls and furniture receive the sensor light in the light view (uniform switch, no recompile)
    this.lightUniforms = createLightUniforms();
    for (const k of ['floor', 'wall', 'freeWall', 'furniture', 'obstacle']) patchSurfaceMaterial(this.mats[k], this.lightUniforms);
    this.haze = new LightHaze(this.lightUniforms);
    this.scene.add(this.haze.mesh);

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
    const s = { dark: false, height: 0.9, mode: 'flat', walls: 'solid', ...next };
    this.state = s;
    const modelChanged = s.model !== prev.model;
    const darkChanged = s.dark !== prev.dark || !prev.palette;
    const modeChanged = s.mode !== prev.mode;
    if (darkChanged || (modeChanged && (s.mode === 'light' || prev.mode === 'light'))) {
      this.palette = getPalette(s.dark);
      this._applyPalette();
    }
    // the voxel view cuts the walls at the selected height, so a height change rebuilds the walls there
    if (modelChanged || modeChanged || (s.mode === 'voxels' && s.height !== prev.height)) this._buildStatic();
    const sensorsChanged =
      modelChanged || darkChanged || modeChanged || s.sensors !== prev.sensors || s.colors !== prev.colors || s.selected !== prev.selected;
    if (sensorsChanged) this._buildSensors();
    if (sensorsChanged || s.evaluation !== prev.evaluation || s.volume !== prev.volume || s.height !== prev.height) {
      this._buildOverlay();
    }
    this.state.palette = this.palette;
    if (s.walls !== prev.walls) this._applyWalls();
    this._request();
  }

  /** Walls solid, very transparent ("ghost") or invisible ("hidden"). Material switch only, no rebuild. */
  _applyWalls() {
    const w = this.state.walls;
    for (const m of [this.mats.wall, this.mats.freeWall]) {
      const ghost = w === 'ghost';
      m.visible = w !== 'hidden';
      m.transparent = ghost;
      m.opacity = ghost ? 0.12 : 1;
      m.depthWrite = !ghost;
      m.needsUpdate = true;
    }
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
    this.scene.remove(this.haze.mesh);
    this.haze.dispose();
    setLightVolume(this.lightUniforms, null);
    this.lightUniforms.uPPVolume.value.dispose();
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
      if (this.state.mode === 'light' && this._lightReady) this.haze.render(this.renderer, this.scene, this.camera);
      else this.renderer.render(this.scene, this.camera);
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
    const night = this.state.mode === 'light';
    const p = night ? { ...this.palette, ...NIGHT } : this.palette;
    this.ambient.intensity = night ? 0.6 : 1.7;
    this.sun.intensity = night ? 0.45 : 1.6;
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
    const cutY = this.state.mode === 'voxels' ? (this.state.height ?? 0.9) + 0.12 : undefined;
    const d = buildStaticData(model, { cutY });
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
    const volumeMode = VOLUME_MODES.has(this.state.mode);
    (sensors || []).forEach((s, i) => {
      if (!Number.isFinite(s.x) || !Number.isFinite(s.z)) return;
      const rgb = sensorRgb(colors, s, i);
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

      // Light view: a small glowing emitter so the light visibly starts at the sensor.
      if (this.state.mode === 'light' && active) {
        const glow = new Mesh(new SphereGeometry(0.07, 16, 12), new MeshBasicMaterial({ color: col }));
        glow.position.set(...pos);
        glow.renderOrder = 4;
        this.sensorGroup.add(glow);
      }

      // Invisible, larger click target.
      const hit = new Mesh(new SphereGeometry(0.22, 8, 6), new MeshBasicMaterial({ visible: false }));
      hit.position.set(...pos);
      hit.userData.entityId = s.entity_id;
      this.sensorGroup.add(hit);
      this._hitMeshes.push(hit);

      if (!active) return;
      // in the volume views only a short fan shows the direction; the full cone would leave the building
      const fr = frustumGeometry(volumeMode ? { ...s, reach: Math.min(s.reach || 5, 0.9) } : s, { yMin: 0, yMax: H });
      // The volume views show what the model really detects (walls included); a geometric cone there would
      // only poke through walls. Without a volume, the cones stay, each with its own fixed draw order so
      // overlapping cones do not swap places (and flicker) while the camera moves.
      if (!volumeMode) {
        const opacity = isSel ? 0.24 : anySelected ? 0.04 : 0.09;
        const fm = new Mesh(
          toGeometry({ positions: fr.positions, indices: fr.indices }),
          new MeshBasicMaterial({ color: col, transparent: true, opacity, depthWrite: false, side: DoubleSide }),
        );
        fm.renderOrder = 6 + i * 0.01;
        this.sensorGroup.add(fm);
      }
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
    if (this.state.mode === 'light') {
      this._buildLight();
      return;
    }
    this._clearLight();
    if (VOLUME_MODES.has(this.state.mode)) {
      this._buildVolume();
      return;
    }
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

  /** Light view: the coverage volume as a 3D texture for the haze and the lit surfaces. */
  _buildLight() {
    const { volume, model, sensors, colors, selected } = this.state;
    if (!volume?.grid || !model?.bounds) {
      this._clearLight();
      return;
    }
    const colourMap = sensorColourMap(sensors, colors);
    const lights = {};
    for (const s of sensors || []) {
      if (s.active === false || !Number.isFinite(s.x) || !Number.isFinite(s.z)) continue;
      lights[s.entity_id] = [...sensorPosition(s), s.reach > 0 ? s.reach : 6];
    }
    const info = volumeTexture(volume, model.bounds, {
      colorFor: (id) => colourMap.get(id) || [31, 95, 153],
      spillColor: parseColor(this.palette.spill),
      spillStrength: 0.45,
      selected: selected || null,
      lights,
      blur: 2,
      dilate: true,
    });
    setLightVolume(this.lightUniforms, info);
    this.lightUniforms.uPPOn.value = info ? 1 : 0;
    this.haze.fit();
    this._lightReady = !!info;
  }

  _clearLight() {
    if (!this._lightReady && !this.lightUniforms.uPPOn.value) return;
    setLightVolume(this.lightUniforms, null);
    this.haze.mesh.visible = false;
    this._lightReady = false;
  }

  /**
   * Coverage volume as voxels (opaque boxes up to the selected height, walls cut there) or as a point cloud
   * (round opaque dots up to the ceiling). Both are opaque, so nothing depends on draw order: no flicker.
   */
  _buildVolume() {
    const { volume, height, sensors, colors, selected, mode, dark } = this.state;
    if (!volume?.grid) return;
    const colourMap = sensorColourMap(sensors, colors);
    const voxels = volumeVoxels(volume, {
      maxY: mode === 'voxels' ? height + 1e-6 : Infinity,
      colorFor: (id) => colourMap.get(id) || [31, 95, 153],
      spillColor: parseColor(this.palette.spill),
      fadeColor: dark ? [70, 74, 80] : [255, 255, 255],
      selected: selected || null,
    });
    if (!voxels.count) return;
    const colour = new Color();
    if (mode === 'voxels') {
      const box = new BoxGeometry(voxels.cell * 0.82, voxels.step * 0.82, voxels.cell * 0.82);
      const mesh = new InstancedMesh(box, new MeshLambertMaterial(), voxels.count);
      const m = new Matrix4();
      for (let i = 0; i < voxels.count; i++) {
        m.makeTranslation(voxels.positions[i * 3], voxels.positions[i * 3 + 1], voxels.positions[i * 3 + 2]);
        mesh.setMatrixAt(i, m);
        colour.setRGB(voxels.colors[i * 3] / 255, voxels.colors[i * 3 + 1] / 255, voxels.colors[i * 3 + 2] / 255, SRGBColorSpace);
        mesh.setColorAt(i, colour);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      this.overlayGroup.add(mesh);
      return;
    }
    const g = new BufferGeometry();
    // A small fixed jitter inside each cell breaks the grid: aligned dots read as vertical streaks.
    const jittered = new Float32Array(voxels.positions);
    const hash = (n) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x) - 0.5;
    };
    for (let i = 0; i < voxels.count; i++) {
      jittered[i * 3] += hash(i * 3 + 1) * voxels.cell * 0.7;
      jittered[i * 3 + 1] += hash(i * 3 + 2) * voxels.step * 0.7;
      jittered[i * 3 + 2] += hash(i * 3 + 3) * voxels.cell * 0.7;
    }
    g.setAttribute('position', new BufferAttribute(jittered, 3));
    const rgb = new Float32Array(voxels.count * 3);
    for (let i = 0; i < voxels.count; i++) {
      colour.setRGB(voxels.colors[i * 3] / 255, voxels.colors[i * 3 + 1] / 255, voxels.colors[i * 3 + 2] / 255, SRGBColorSpace);
      rgb[i * 3] = colour.r;
      rgb[i * 3 + 1] = colour.g;
      rgb[i * 3 + 2] = colour.b;
    }
    g.setAttribute('color', new BufferAttribute(rgb, 3));
    // a fresh texture each time: clearGroup disposes the material together with its map
    // See-through soft dots. One Points object with a fixed vertex order and its own render order (after
    // furniture and windows), so the blending order never changes while the camera moves: no flicker.
    // On the dark theme the dots add up like light; on the light theme additive blending would wash out.
    const mat = new PointsMaterial({
      size: voxels.cell * 1.7,
      sizeAttenuation: true,
      vertexColors: true,
      map: dotTexture(),
      transparent: true,
      opacity: dark ? 0.32 : 0.38,
      depthWrite: false,
      alphaTest: 0.01,
      blending: dark ? AdditiveBlending : NormalBlending,
    });
    const cloud = new Points(g, mat);
    cloud.renderOrder = 8;
    this.overlayGroup.add(cloud);
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
