import * as THREE from 'three'

import BaseObject from './BaseObject';
import World from '..';

const vertex = `
  varying vec2 vUv;

  void main(void) {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragment = `
  uniform float time;
  uniform vec2 resolution;
  uniform float acceleration;
  uniform sampler2D texture;

  const float blur = 16.0;

  varying vec2 vUv;

  #pragma glslify: random2 = require(../../../old/glsl/random2)
  #pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

  vec2 diffUv(float v, float diff) {
    return vUv + (vec2(v + snoise2(vec2(gl_FragCoord.y + time) / 100.0), 0.0) * diff + vec2(v * 3.0, 0.0)) / resolution;
  }

  float randomNoise(vec2 p) {
    return (random2(p - vec2(sin(time))) * 2.0 - 1.0) * max(length(acceleration), 0.08);
  }

  void main() {
    float diff = 300.0 * length(acceleration);
    vec2 uv_r = diffUv(0.0, diff);
    vec2 uv_g = diffUv(1.0, diff);
    vec2 uv_b = diffUv(-1.0, diff);
    float r = texture2D(texture, uv_r).r + randomNoise(uv_r);
    float g = texture2D(texture, uv_g).g + randomNoise(uv_g);
    float b = texture2D(texture, uv_b).b + randomNoise(uv_b);
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`

export default class Distortion extends BaseObject {
  constructor(world: World) {
    super(world);

    this.init();
  }

  init() {
    const render_target = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      magFilter: THREE.NearestFilter,
      minFilter: THREE.NearestFilter,
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping
    })

    const background = this.createBackground()
    const postBackground = this.createPostBackground()

    this.world.globe.scene().add(postBackground)
  }

  createBackground() {
    const geometry = new THREE.SphereGeometry(1800);
    const material = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
    });

    return new THREE.Mesh(geometry, material);
  }
  
  createPostBackground() {
    const geometry_base = new THREE.PlaneGeometry(2, 2);  
    const geometry = new THREE.BufferGeometry();
    geometry.fromGeometry(geometry_base);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0,
        },
        resolution: {
          type: 'v2',
          value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        acceleration: {
          type: 'f',
          value: 0
        },
        texture: {
          type: 't',
          value: this.world.globe.renderer(),
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    
    return new THREE.Mesh(geometry, material);
  }
}