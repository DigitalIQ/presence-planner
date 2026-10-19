import test from 'node:test';
import assert from 'node:assert/strict';
import {
  boundsChanged,
  buildStaticData,
  clipDistance,
  colourRgb,
  frameBounds,
  frustumGeometry,
  inferCellSize,
  meshVolume,
  parseColor,
  planToScene,
  prismData,
  rasterizeCells,
  sensorBasis,
  sensorColourIndex,
  sensorMeshBasis,
  signedArea,
  splitBandByOpenings,
  triangulate,
  DEFAULT_SENSOR_COLORS,
  getPalette,
} from '../src/view3d/geometry.js';

const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} != ${b}`);
const vec = (p, i) => [p[i * 3], p[i * 3 + 1], p[i * 3 + 2]];

test('plan to scene keeps x and z and puts height on y', () => {
  assert.deepEqual(planToScene(2, 3, 1.5), [2, 1.5, 3]);
});

test('sensor basis: phi 0 / tilt 0 looks along +x with right = +z', () => {
  const b = sensorBasis({ phi: 0, tilt: 0 });
  near(b.f[0], 1);
  near(b.r[2], 1);
  near(b.u[1], 1);
});

test('sensor basis: phi 90 looks along +z, tilt 90 looks down and stays defined', () => {
  const b = sensorBasis({ phi: 90, tilt: 0 });
  near(b.f[2], 1);
  const d = sensorBasis({ phi: 30, tilt: 90 });
  near(d.f[1], -1);
  near(Math.hypot(...d.r), 1);
  near(Math.hypot(...d.u), 1);
});

test('mesh basis is right-handed with -z pointing forward', () => {
  const m = sensorMeshBasis({ phi: 0, tilt: 0, mount: 'wall' });
  near(m.z[0], -1);
  const x = m.x;
  const y = m.y;
  const cz = [x[1] * y[2] - x[2] * y[1], x[2] * y[0] - x[0] * y[2], x[0] * y[1] - x[1] * y[0]];
  near(cz[0], m.z[0]);
  near(cz[1], m.z[1]);
  near(cz[2], m.z[2]);
});

test('wall frustum, phi 0 tilt 0: corners lie on yaw/pitch limits at reach', () => {
  const s = { x: 1, z: 2, height: 1.9, phi: 0, tilt: 0, mount: 'wall', fov_h: 90, fov_v: 60, reach: 5 };
  const f = frustumGeometry(s, { yMin: -Infinity });
  assert.deepEqual(f.apex, [1, 1.9, 2]);
  assert.equal(f.positions.length, 5 * 3);
  for (const c of f.corners) near(Math.hypot(c[0] - 1, c[1] - 1.9, c[2] - 2), 5);
  // corner order: (-yaw,-pitch), (+yaw,-pitch), (+yaw,+pitch), (-yaw,+pitch); right = +z, up = +y
  const [c0, c1, c2] = f.corners;
  assert.ok(c0[2] < 2 && c0[1] < 1.9, 'low left');
  assert.ok(c1[2] > 2 && c1[1] < 1.9, 'low right');
  assert.ok(c2[2] > 2 && c2[1] > 1.9, 'high right');
  const v = [c1[0] - 1, c1[1] - 1.9, c1[2] - 2];
  const pitch = (Math.atan2(v[1], Math.hypot(v[0], v[2])) * 180) / Math.PI;
  // pitch measured in the core's way (against the right axis), not the plain elevation
  const cp = Math.cos((30 * Math.PI) / 180);
  near(v[0] / 5, cp * Math.cos(Math.PI / 4), 1e-6);
  near(v[2] / 5, cp * Math.sin(Math.PI / 4), 1e-6);
  assert.ok(pitch < 0);
  assert.equal(f.indices.length, 18);
  assert.equal(f.edges.length, 8 * 6);
});

test('wall frustum follows phi: phi 90 points towards +z', () => {
  const s = { x: 0, z: 0, height: 1, phi: 90, tilt: 0, mount: 'wall', fov_h: 60, fov_v: 40, reach: 4 };
  const f = frustumGeometry(s, { yMin: -Infinity });
  for (const c of f.corners) assert.ok(c[2] > 3, 'all corners ahead in +z');
});

test('tilt turns the frustum down', () => {
  const s = { x: 0, z: 0, height: 2, phi: 0, tilt: 30, mount: 'wall', fov_h: 60, fov_v: 40, reach: 3 };
  const f = frustumGeometry(s, { yMin: -Infinity });
  const meanY = f.corners.reduce((a, c) => a + c[1], 0) / 4;
  assert.ok(meanY < 2 - 1);
});

test('rays are clipped at the floor and the ceiling', () => {
  near(clipDistance([0, 2, 0], [0, -1, 0], 10, 0), 2);
  near(clipDistance([0, 2, 0], [0, 1, 0], 10, 0, 2.6), 0.6);
  near(clipDistance([0, 2, 0], [1, 0, 0], 10, 0, 2.6), 10);
  const s = { x: 0, z: 0, height: 1.9, phi: 0, tilt: 45, mount: 'wall', fov_h: 60, fov_v: 20, reach: 20 };
  const f = frustumGeometry(s, { yMin: 0, yMax: 2.6 });
  for (const c of f.corners) assert.ok(c[1] >= -1e-9 && c[1] <= 2.6 + 1e-9);
});

test('ceiling cone: apex at the sensor, opens downwards, half angle from fov', () => {
  const s = { x: 3, z: 4, height: 2.6, phi: 0, tilt: 90, mount: 'ceiling', fov_h: 120, fov_v: 120, reach: 3, ceiling_fov: 90 };
  const f = frustumGeometry(s, { yMin: -Infinity, segments: 16 });
  assert.deepEqual(f.apex, [3, 2.6, 4]);
  assert.equal(f.corners.length, 16);
  for (const c of f.corners) {
    assert.ok(c[1] < 2.6);
    const v = [c[0] - 3, c[1] - 2.6, c[2] - 4];
    const ang = (Math.acos(-v[1] / Math.hypot(...v)) * 180) / Math.PI;
    near(ang, 45, 1e-6);
    near(Math.hypot(...v), 3);
  }
  // clipped by a floor 2.6 m below with a wide cone: ring on the floor
  const g = frustumGeometry({ ...s, reach: 20 }, { yMin: 0, segments: 16 });
  for (const c of g.corners) near(c[1], 0, 1e-9);
});

test('ceiling cone falls back to max(fov_h, fov_v) / 2', () => {
  const s = { x: 0, z: 0, height: 2.5, mount: 'ceiling', fov_h: 80, fov_v: 100, reach: 2 };
  const f = frustumGeometry(s, { yMin: -Infinity, segments: 8 });
  const c = f.corners[0];
  const v = [c[0], c[1] - 2.5, c[2]];
  near((Math.acos(-v[1] / Math.hypot(...v)) * 180) / Math.PI, 50, 1e-6);
});

test('triangulate: concave L shape covers its area', () => {
  const poly = [[0, 0], [4, 0], [4, 1], [1, 1], [1, 3], [0, 3]];
  const tris = triangulate(poly);
  assert.equal(tris.length, 4);
  let area = 0;
  for (const [a, b, c] of tris) area += signedArea([poly[a], poly[b], poly[c]]);
  near(area, 4 + 2);
});

test('prism volume is positive for either winding and equals area times height', () => {
  const sq = [[0, 0], [2, 0], [2, 3], [0, 3]];
  near(meshVolume(prismData(sq, 0, 2.5)), 15);
  near(meshVolume(prismData([...sq].reverse(), 0, 2.5)), 15);
  const L = [[0, 0], [4, 0], [4, 1], [1, 1], [1, 3], [0, 3]];
  near(meshVolume(prismData(L, 0.5, 1.5)), 6);
  const flat = prismData(sq, 0, 0);
  assert.equal(flat.indices.length, 6);
  for (let i = 1; i < flat.positions.length; i += 3) assert.equal(flat.positions[i], 0);
});

test('splitBandByOpenings: door leaves a lintel, window keeps parapet and head', () => {
  const band = [[0, -0.1], [6, -0.1], [6, 0.1], [0, 0.1]];
  const H = 2.6;
  const door = { a: [2, 0], b: [3, 0], y0: 0, y1: 2 };
  const pieces = splitBandByOpenings(band, [door], H);
  const vol = pieces.reduce((s, p) => s + Math.abs(signedArea(p.poly)) * (p.y1 - p.y0), 0);
  near(vol, 6 * 0.2 * H - 1 * 0.2 * 2);
  assert.ok(pieces.some((p) => p.y0 === 2 && p.y1 === H), 'lintel');
  const win = { a: [4, 0], b: [5, 0], y0: 0.9, y1: 2 };
  const both = splitBandByOpenings(band, [door, win], H);
  const vol2 = both.reduce((s, p) => s + Math.abs(signedArea(p.poly)) * (p.y1 - p.y0), 0);
  near(vol2, 6 * 0.2 * H - 0.2 * 2 - 0.2 * 1.1);
});

test('splitBandByOpenings: opening that is already cut out leaves the band alone', () => {
  const band = [[0, -0.1], [2, -0.1], [2, 0.1], [0, 0.1]];
  const pieces = splitBandByOpenings(band, [{ a: [5, 0], b: [6, 0], y0: 0, y1: 2 }], 2.6);
  assert.equal(pieces.length, 1);
  assert.equal(pieces[0].y1, 2.6);
});

test('buildStaticData on a minimal model', () => {
  const model = {
    floor: { height: 2.6 },
    rooms: [{ id: 'a', points: [[0, 0], [4, 0], [4, 3], [0, 3]] }],
    bands: [[[0, -0.1], [4, -0.1], [4, 0.1], [0, 0.1]]],
    doors: [{ id: 'd', a: [1, 0], b: [2, 0] }],
    windows: [{ id: 'w', a: [3, 0], b: [3.8, 0] }],
    freeWalls: [{ poly: [[1, 1], [1.4, 1], [1.4, 2], [1, 2]], height: null }],
    furniture: [
      { id: 'f', type: 'sofa', poly: [[2, 1], [3, 1], [3, 2], [2, 2]], h: 0.8, obstacle: false },
      { id: 'c', type: 'cabinet', poly: [[3, 2], [3.5, 2], [3.5, 2.5], [3, 2.5]], h: 2, obstacle: true },
    ],
  };
  const d = buildStaticData(model);
  assert.equal(d.wallHeight, 2.6);
  assert.ok(d.floors.indices.length > 0);
  assert.ok(d.walls.indices.length > 0);
  near(meshVolume(d.furniture), 0.8, 1e-6);
  near(meshVolume(d.obstacles), 0.25 * 2, 1e-6);
  near(meshVolume(d.freeWalls), 0.4 * 1 * 2.6, 1e-6);
  assert.equal(d.windows.indices.length, 6);
  for (const i of d.walls.indices) assert.ok(i < d.walls.positions.length / 3);
});

test('buildStaticData tolerates an empty model', () => {
  const d = buildStaticData({});
  assert.equal(d.walls.indices.length, 0);
});

test('frameBounds iso: target near the bounds centre, whole box inside the view', () => {
  const b = { x0: 0, x1: 10, z0: 0, z1: 6 };
  const f = frameBounds(b, { fov: 40, aspect: 1.5, height: 2.6 });
  // the target is shifted a little so that the projected box is centred in the image
  assert.ok(Math.hypot(f.target[0] - 5, f.target[2] - 3) < 1.5, `target ${f.target}`);
  assert.ok(f.position[2] > f.target[2], 'camera on the +z (south) side');
  assert.ok(f.position[1] > f.target[1], 'camera above');
  const radius = 0.5 * Math.hypot(10, 6, 2.6);
  assert.ok(f.distance > radius);
  assert.ok(f.near < f.distance && f.far > f.distance + radius);
  assert.ok(f.maxDistance > f.distance);
  const dist = Math.hypot(...f.position.map((v, i) => v - f.target[i]));
  near(dist, f.distance, 1e-6);
});

test('frameBounds iso: tight fit on a narrow canvas, all corners inside', () => {
  const b = { x0: -0.7, x1: 9.3, z0: -0.7, z1: 7.7 };
  for (const aspect of [0.56, 1.0, 1.8]) {
    const f = frameBounds(b, { fov: 40, aspect, height: 2.6 });
    const fwd = f.target.map((v, i) => v - f.position[i]);
    const fl = Math.hypot(...fwd);
    const F = fwd.map((v) => v / fl);
    const R = [F[1] * 0 - F[2] * 1, F[2] * 0 - F[0] * 0, F[0] * 1 - F[1] * 0];
    const rl = Math.hypot(...R);
    const Rn = R.map((v) => v / rl);
    const U = [Rn[1] * F[2] - Rn[2] * F[1], Rn[2] * F[0] - Rn[0] * F[2], Rn[0] * F[1] - Rn[1] * F[0]];
    const tanV = Math.tan((20 * Math.PI) / 180);
    const tanH = tanV * aspect;
    let worst = 0;
    for (const x of [b.x0, b.x1]) for (const z of [b.z0, b.z1]) for (const y of [0, 2.6]) {
      const v = [x - f.position[0], y - f.position[1], z - f.position[2]];
      const d = v[0] * F[0] + v[1] * F[1] + v[2] * F[2];
      const sx = Math.abs(v[0] * Rn[0] + v[1] * Rn[1] + v[2] * Rn[2]) / d / tanH;
      const sy = Math.abs(v[0] * U[0] + v[1] * U[1] + v[2] * U[2]) / d / tanV;
      worst = Math.max(worst, sx, sy);
    }
    assert.ok(worst <= 1, `corner outside the view at aspect ${aspect}: ${worst}`);
    assert.ok(worst > 0.9, `fit too loose at aspect ${aspect}: ${worst}`);
  }
});

test('frameBounds top: straight above the centre, wide plans fit the width', () => {
  const b = { x0: -2, x1: 18, z0: 0, z1: 4 };
  const f = frameBounds(b, { fov: 40, aspect: 1.0, view: 'top', height: 2.6 });
  near(f.position[0], 8, 1e-2);
  assert.ok(f.position[2] >= f.target[2], 'plan top stays at the screen top');
  const needed = 10 / Math.tan((20 * Math.PI) / 180);
  assert.ok(f.distance >= needed);
});

test('frameBounds survives missing bounds, boundsChanged detects shifts', () => {
  const f = frameBounds(null, {});
  assert.ok(Number.isFinite(f.distance));
  assert.equal(boundsChanged(null, { x0: 0, x1: 1, z0: 0, z1: 1 }), true);
  assert.equal(boundsChanged({ x0: 0, x1: 1, z0: 0, z1: 1 }, { x0: 0.01, x1: 1, z0: 0, z1: 1 }), false);
  assert.equal(boundsChanged({ x0: 0, x1: 1, z0: 0, z1: 1 }, { x0: 0, x1: 2, z0: 0, z1: 1 }), true);
});

test('colours: parse, index resolution and fallbacks', () => {
  assert.deepEqual(parseColor('#f00'), [255, 0, 0]);
  assert.deepEqual(parseColor('#2f7de1'), [47, 125, 225]);
  assert.deepEqual(parseColor('rgb(1, 2, 3)'), [1, 2, 3]);
  assert.deepEqual(parseColor('rgba(10 20 30 / 0.5)'), [10, 20, 30]);
  assert.equal(parseColor('var(--x)'), null);
  assert.equal(sensorColourIndex({ colour_index: 3 }, 0), 3);
  assert.equal(sensorColourIndex({}, 2), 2);
  assert.deepEqual(colourRgb(['#000000', 'not-a-colour'], 1), parseColor(DEFAULT_SENSOR_COLORS[1]));
  assert.deepEqual(colourRgb(undefined, DEFAULT_SENSOR_COLORS.length), parseColor(DEFAULT_SENSOR_COLORS[0]));
});

test('palettes define the same keys for light and dark', () => {
  assert.deepEqual(Object.keys(getPalette(true)).sort(), Object.keys(getPalette(false)).sort());
  for (const v of Object.values(getPalette(true))) assert.ok(parseColor(v));
});

test('inferCellSize reads the grid spacing', () => {
  const cells = [];
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) cells.push({ x: 0.1 + i * 0.2, z: 0.1 + j * 0.2 });
  near(inferCellSize(cells), 0.2);
  near(inferCellSize([]), 0.1);
});

test('rasterizeCells: own cells use the sensor colour, spill cells red, selection filters', () => {
  const cells = [
    { x: 0.1, z: 0.1, room: 'a', own: 1, own_sensor: 's1', spill: [] },
    { x: 0.3, z: 0.1, room: 'a', own: 0.5, own_sensor: 's2', spill: [] },
    { x: 0.1, z: 0.3, room: 'a', own: 0, own_sensor: null, spill: ['s9'] },
    { x: 0.3, z: 0.3, room: 'a', own: 0, own_sensor: null, spill: [] },
  ];
  const opts = {
    bounds: { x0: 0, x1: 0.4, z0: 0, z1: 0.4 },
    cellSize: 0.2,
    maxPpm: 10,
    colorFor: (id) => (id === 's1' ? [10, 20, 30] : [200, 100, 50]),
    spillColor: [255, 0, 0],
  };
  const img = rasterizeCells(cells, opts);
  assert.equal(img.ppm, 10);
  assert.equal(img.width, 6); // 0.4 + one cell of padding, at 10 px/m
  const px = (x, z) => {
    const o = (Math.round((z - img.z0) * img.ppm) * img.width + Math.round((x - img.x0) * img.ppm)) * 4;
    return [...img.data.slice(o, o + 4)];
  };
  const a1 = px(0.1, 0.1);
  assert.deepEqual(a1.slice(0, 3), [10, 20, 30]);
  assert.equal(a1[3], Math.round((0.2 + 0.55) * 255));
  assert.deepEqual(px(0.1, 0.3).slice(0, 3), [255, 0, 0]);
  assert.equal(px(0.3, 0.3)[3], 0, 'empty cell stays transparent');
  assert.ok(px(0.3, 0.1)[3] < a1[3]);

  const sel = rasterizeCells(cells, { ...opts, selected: 's1' });
  const o = (x, z) => {
    const i = (Math.round((z - sel.z0) * sel.ppm) * sel.width + Math.round((x - sel.x0) * sel.ppm)) * 4;
    return [...sel.data.slice(i, i + 4)];
  };
  assert.equal(o(0.1, 0.3)[3], 0, 'spill from another sensor is hidden while s1 is selected');
  assert.ok(o(0.3, 0.1)[3] < Math.round((0.2 + 0.55 * 0.5) * 255), 'cells of other sensors are dimmed');
});

test('rasterizeCells caps the texture size on large plans', () => {
  const img = rasterizeCells([], { bounds: { x0: 0, x1: 200, z0: 0, z1: 100 }, cellSize: 0.1 });
  assert.ok(img.width <= 2100 && img.height <= 2100);
  assert.equal(img.data.length, img.width * img.height * 4);
});
