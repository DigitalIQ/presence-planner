// "Light" display of <pp-view3d>: the coverage volume rendered like light from the sensors.
// One RGBA 3D texture (see geometry.volumeTexture) drives two effects:
//  - a raymarched haze in a box around the floor (emission + a little absorption, dithered steps),
//    stopped at walls and floors through a depth pre-pass of the scene;
//  - light on floors, walls and furniture: their materials sample the same texture just in front of
//    the surface and add it as emitted light.
// Both come from the model itself, so they show the real field of view, wall damping and spill.
// WebGL2 only (sampler3D); no dependency beyond three.

import {
  BackSide,
  BoxGeometry,
  ClampToEdgeWrapping,
  CustomBlending,
  Data3DTexture,
  DepthTexture,
  LinearFilter,
  Mesh,
  OneFactor,
  OneMinusSrcAlphaFactor,
  RGBAFormat,
  ShaderMaterial,
  UnsignedByteType,
  UnsignedIntType,
  Vector2,
  Vector3,
  WebGLRenderTarget,
} from 'three';

/** Uniforms shared by the surface materials and the haze. */
export function createLightUniforms() {
  return {
    uPPVolume: { value: emptyTexture() },
    uPPMin: { value: new Vector3() },
    uPPSize: { value: new Vector3(1, 1, 1) },
    uPPOn: { value: 0 },
    uPPGain: { value: 2.2 },
  };
}

function emptyTexture() {
  const t = new Data3DTexture(new Uint8Array(4), 1, 1, 1);
  t.format = RGBAFormat;
  t.type = UnsignedByteType;
  t.needsUpdate = true;
  return t;
}

/** Replace the volume texture (info from geometry.volumeTexture), or clear it with null. */
export function setLightVolume(uniforms, info) {
  const old = uniforms.uPPVolume.value;
  if (!info) {
    uniforms.uPPVolume.value = emptyTexture();
    uniforms.uPPOn.value = 0;
  } else {
    const t = new Data3DTexture(info.data, info.nx, info.ny, info.nz);
    t.format = RGBAFormat;
    t.type = UnsignedByteType;
    t.minFilter = LinearFilter;
    t.magFilter = LinearFilter;
    t.wrapS = t.wrapT = t.wrapR = ClampToEdgeWrapping;
    t.unpackAlignment = 1;
    t.needsUpdate = true;
    uniforms.uPPVolume.value = t;
    uniforms.uPPMin.value.set(...info.origin);
    uniforms.uPPSize.value.set(...info.size);
  }
  old?.dispose();
}

const SAMPLE_GLSL = /* glsl */ `
  uniform highp sampler3D uPPVolume;
  uniform vec3 uPPMin;
  uniform vec3 uPPSize;
  uniform float uPPOn;
  uniform float uPPGain;
  vec4 ppSample(vec3 p) {
    vec3 uvw = (p - uPPMin) / uPPSize;
    if (any(lessThan(uvw, vec3(0.0))) || any(greaterThan(uvw, vec3(1.0)))) return vec4(0.0);
    vec4 s = texture(uPPVolume, uvw);
    return vec4(pow(s.rgb, vec3(2.2)), s.a);
  }
`;

/**
 * Let a Lambert material receive the coverage light: emitted light = colour × strength, sampled 10 cm in
 * front of the surface (inside the room, not inside the wall). Works with DoubleSide.
 */
export function patchSurfaceMaterial(material, uniforms) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vPPWorld;\nvarying vec3 vPPNormal;')
      .replace(
        '#include <project_vertex>',
        '#include <project_vertex>\nvPPWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvPPNormal = normalize(mat3(modelMatrix) * objectNormal);',
      );
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vPPWorld;\nvarying vec3 vPPNormal;\n${SAMPLE_GLSL}`)
      .replace(
        '#include <opaque_fragment>',
        `if (uPPOn > 0.5) {
          vec3 ppN = normalize(vPPNormal) * (gl_FrontFacing ? 1.0 : -1.0);
          vec4 ppL = ppSample(vPPWorld + ppN * 0.15);
          outgoingLight += ppL.rgb * pow(ppL.a, 1.1) * uPPGain;
        }
        #include <opaque_fragment>`,
      );
  };
  material.customProgramCacheKey = () => 'pp-light-surface';
  material.needsUpdate = true;
}

const HAZE_VERTEX = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const HAZE_FRAGMENT = /* glsl */ `
  #include <packing>
  ${SAMPLE_GLSL}
  uniform sampler2D uDepth;
  uniform vec2 uResolution;
  uniform float uNear;
  uniform float uFar;
  uniform float uGlow;
  uniform float uAbsorb;
  uniform int uSteps;
  varying vec3 vWorld;

  vec2 hitBox(vec3 ro, vec3 rd) {
    vec3 inv = 1.0 / rd;
    vec3 t0 = (uPPMin - ro) * inv;
    vec3 t1 = (uPPMin + uPPSize - ro) * inv;
    vec3 lo = min(t0, t1);
    vec3 hi = max(t0, t1);
    return vec2(max(max(lo.x, lo.y), lo.z), min(min(hi.x, hi.y), hi.z));
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec3 ro = cameraPosition;
    vec3 rd = normalize(vWorld - ro);
    vec2 hit = hitBox(ro, rd);
    float tEnter = max(hit.x, 0.0);
    float tExit = hit.y;
    // stop at the first wall, floor or furniture surface (depth pre-pass)
    float depth = texture2D(uDepth, gl_FragCoord.xy / uResolution).x;
    if (depth < 1.0) {
      float viewZ = perspectiveDepthToViewZ(depth, uNear, uFar);
      vec3 rdView = (viewMatrix * vec4(rd, 0.0)).xyz;
      if (rdView.z < 0.0) tExit = min(tExit, viewZ / rdView.z);
    }
    if (tExit <= tEnter) discard;
    float dt = (tExit - tEnter) / float(uSteps);
    float t = tEnter + hash(gl_FragCoord.xy) * dt;
    vec3 col = vec3(0.0);
    float trans = 1.0;
    for (int i = 0; i < 96; i++) {
      if (i >= uSteps) break;
      vec4 s = ppSample(ro + rd * t);
      if (s.a > 0.002) {
        // the haze concentrates where the light is strong, so the beam near the sensor stands out
        float a = pow(s.a, 1.5);
        col += trans * s.rgb * a * uGlow * dt;
        trans *= exp(-a * uAbsorb * dt);
      }
      t += dt;
    }
    gl_FragColor = vec4(col, 1.0 - trans);
    #include <colorspace_fragment>
  }
`;

/**
 * The haze box and the depth pre-pass target. `render(renderer, scene, camera)` draws the scene with the
 * haze: first the scene without haze into a depth target, then the full scene.
 */
export class LightHaze {
  constructor(uniforms) {
    this.uniforms = uniforms;
    this.depthTarget = null;
    this.material = new ShaderMaterial({
      vertexShader: HAZE_VERTEX,
      fragmentShader: HAZE_FRAGMENT,
      uniforms: {
        ...uniforms,
        uDepth: { value: null },
        uResolution: { value: new Vector2(1, 1) },
        uNear: { value: 0.1 },
        uFar: { value: 100 },
        uGlow: { value: 0.9 },
        uAbsorb: { value: 0.35 },
        uSteps: { value: 64 },
      },
      side: BackSide,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: CustomBlending,
      blendSrc: OneFactor,
      blendDst: OneMinusSrcAlphaFactor,
    });
    this.mesh = new Mesh(new BoxGeometry(1, 1, 1), this.material);
    this.mesh.renderOrder = 20;
    this.mesh.visible = false;
    this.mesh.frustumCulled = false;
  }

  /** Fit the box to the volume (call after setLightVolume). */
  fit() {
    const min = this.uniforms.uPPMin.value;
    const size = this.uniforms.uPPSize.value;
    this.mesh.scale.copy(size);
    this.mesh.position.set(min.x + size.x / 2, min.y + size.y / 2, min.z + size.z / 2);
    this.mesh.updateMatrixWorld();
  }

  setStyle({ glow, absorb, steps } = {}) {
    if (glow !== undefined) this.material.uniforms.uGlow.value = glow;
    if (absorb !== undefined) this.material.uniforms.uAbsorb.value = absorb;
    if (steps !== undefined) this.material.uniforms.uSteps.value = steps;
  }

  render(renderer, scene, camera) {
    const size = renderer.getDrawingBufferSize(new Vector2());
    if (!this.depthTarget || this.depthTarget.width !== size.x || this.depthTarget.height !== size.y) {
      this.depthTarget?.dispose();
      this.depthTarget = new WebGLRenderTarget(size.x, size.y, {
        depthBuffer: true,
        depthTexture: new DepthTexture(size.x, size.y, UnsignedIntType),
      });
    }
    const u = this.material.uniforms;
    this.mesh.visible = false;
    renderer.setRenderTarget(this.depthTarget);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    u.uDepth.value = this.depthTarget.depthTexture;
    u.uResolution.value.copy(size);
    u.uNear.value = camera.near;
    u.uFar.value = camera.far;
    this.mesh.visible = true;
    renderer.render(scene, camera);
  }

  dispose() {
    this.depthTarget?.dispose();
    this.mesh.geometry.dispose();
    this.material.dispose();
  }
}
