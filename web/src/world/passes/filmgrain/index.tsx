import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import vertex from './vertex'
import fragment from './fragment'

class Force2 {
  velocity: any;
  acceleration: any;
  anchor: any;
  mass: any;
  k: any;
  d: any;

  constructor() {
    this.velocity = new THREE.Vector2();
    this.acceleration = new THREE.Vector2();
    this.anchor = new THREE.Vector2();
    this.mass = 1;
  };

  updateVelocity() {
    this.acceleration.divideScalar(this.mass);
    this.velocity.add(this.acceleration);
  };

  applyForce(vector: any) {
    this.acceleration.add(vector);
  };

  applyFriction(mu: any, normal: any) {
    var force = this.acceleration.clone();
    if (!normal) normal = 1;
    force.multiplyScalar(-1);
    force.normalize();
    force.multiplyScalar(mu);
    this.applyForce(force);
  };

  applyDrag(value: any) {
    var force = this.acceleration.clone();
    force.multiplyScalar(-1);
    force.normalize();
    force.multiplyScalar(this.acceleration.length() * value);
    this.applyForce(force);
  };

  applyHook(rest_length: any, k: any) {
    var force = this.velocity.clone().sub(this.anchor);
    var distance = force.length() - rest_length;
    force.normalize();
    force.multiplyScalar(-1 * k * distance);
    this.applyForce(force);
  };
}

export default class FilmgrainPass {
  pass: any;
  counter: number;
  force: Force2;

  constructor() {
    this.counter = 0.0
    this.force = new Force2()
    this.force.anchor.set(1, 0);
    this.force.anchor.set(1, 0);
    this.force.velocity.set(1, 0);
    this.force.k = 0.045;
    this.force.d = 0.16;

    const effect = {
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
          value: 0.0
        },
        tDiffuse: { value: null }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    }

    this.pass = new ShaderPass(effect)

    const that = this
    function frame() {
      that.counter += 0.01
      that.pass.uniforms['time'].value = that.counter

      that.force.applyHook(0, that.force.k);
      that.force.applyDrag(that.force.d);
      that.force.updateVelocity();
      that.pass.uniforms['acceleration'].value = that.force.acceleration.length()

      window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame)
  }
}
