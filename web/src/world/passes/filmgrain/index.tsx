import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'

import vertex from './vertex'
import fragment from './fragment'
// import console = require('console');

export default class FilmgrainPass {
  pass: any;
  counter: number;

  constructor() {
    this.counter = 0.0

    const effect = {
      uniforms: {
        "tDiffuse": { value: null },
        "amount": { value: this.counter }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    }

    this.pass = new ShaderPass(effect)

    const that = this
    function frame() {
      that.counter += 0.01
      that.pass.uniforms['amount'].value = that.counter

      window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame)
  }
}
