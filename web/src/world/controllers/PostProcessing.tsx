import * as THREE from 'three'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import * as dat from 'dat.gui';

import World from '..'
import { GlitchPass } from '../passes/GlitchPass'

const GlitchEasyVertex = `
  varying vec3 vPosition;
  varying vec2 vUv;

  void main(void) {
    // coordinate transformation
    vec4 mPosition = modelMatrix * vec4(position, 1.0);

    vPosition = position;
    vUv = uv;

    gl_Position = projectionMatrix * viewMatrix * mPosition;
  }
`

const GlitchEasyFragment = `
  precision highp float;

  uniform float time;
  uniform sampler2D tDiffuse;
  uniform sampler2D textureNoise;

  varying vec3 vPosition;
  varying vec2 vUv;

  float random(vec2 c){
    return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  vec4 getGlitchColor(vec2 uv, float force) {
    vec2 r = vec2(
      random(vec2(ceil(time * 20.0), 0.0)) * 2.0 - 1.0,
      random(vec2(0.0, ceil(time * 20.0))) * 2.0 - 1.0
    );
    vec2 noiseUv = uv + r * 0.001;
    float mask = smoothstep(
      length(vec3(1.0)) - force * 0.004,
      length(vec3(1.0)),
      length(texture2D(textureNoise, uv * vec2(0.2, 0.4) * r).rgb)
      );
    vec4 texColor = texture2D(tDiffuse, noiseUv + r * 0.01 * force) * (1.0 - mask);
    vec4 texColorDiff = texture2D(tDiffuse, noiseUv + r * force) * mask;
    return texColor + texColorDiff;
  }

  void main() {
    float shake = random(vec2(time));
    float force = smoothstep(0.5, 1.0, sin(time * 4.0) * 0.8 + sin(time * 5.0) + 0.2);

    vec2 uvR = vUv + vec2(-0.008 - shake * 0.002, 0.0);
    vec2 uvG = vUv + vec2( 0.0, 0.0);
    vec2 uvB = vUv + vec2( 0.008 + shake * 0.002, 0.0);

    vec4 r = getGlitchColor(uvR, force) * vec4(1.0, 0.0, 0.0, 1.0);
    vec4 g = getGlitchColor(uvG, force) * vec4(0.0, 1.0, 0.0, 1.0);
    vec4 b = getGlitchColor(uvB, force) * vec4(0.0, 0.0, 1.0, 1.0);
    vec4 color = r + g + b;

    if (color.a < 0.1) discard;

    gl_FragColor = color;
  }
`

const GlitchEasyShader = {
  uniforms: {
    time: {
      type: 'f',
      value: 0
    },
    tDiffuse: {
      type: 't',
      value: null
    },
    textureNoise: {
      type: 't',
      value: null
    },
  },
  vertexShader: GlitchEasyVertex,
  fragmentShader: GlitchEasyFragment,
}

const StaticShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"time":     { type: "f", value: 0.0 },
		"amount":   { type: "f", value: 0.15 },
		"size":     { type: "f", value: 3.0 }
	},

	vertexShader: [

	"varying vec2 vUv;",

	"void main() {",

		"vUv = uv;",
		"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

	"}"

	].join("\n"),

	fragmentShader: [

	"uniform sampler2D tDiffuse;",
	"uniform float time;",
	"uniform float amount;",
	"uniform float size;",

	"varying vec2 vUv;",

	"float rand(vec2 co){",
		"return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
	"}",

	"void main() {",
		"vec2 p = vUv;",
		"vec4 color = texture2D(tDiffuse, p);",
		"float xs = floor(gl_FragCoord.x / size);",
		"float ys = floor(gl_FragCoord.y / size);",
		"vec4 snow = vec4(rand(vec2(xs * time,ys * time))*amount);",

		//"gl_FragColor = color + amount * ( snow - color );", //interpolate

		"gl_FragColor = color+ snow;", //additive

	"}"

	].join("\n")

};
export default class PostProcessingController {
  world: any;
  composer: any
  glitchPass: any;
  staticPass: any;
  glitchEasyPass: any;
  noiseTexture: any;

  constructor(world: World) {
    this.world = world;

    this.init();
  }

  private init() {
    // Create composer
    const composer = this.world.globe.postProcessingComposer()

    // - Glitch pass
    this.glitchPass = new GlitchPass(32);
    this.glitchPass.goWild = true
    composer.addPass(this.glitchPass)

    // - Static pass
    this.staticPass = new ShaderPass( StaticShader );
    composer.addPass(this.staticPass)

    // - Copy pass
    const copyPass = new ShaderPass( CopyShader );
    copyPass.renderToScreen = true
    composer.addPass(copyPass)

    // Noise texture
    this.noiseTexture = new THREE.TextureLoader().load( '/noise.png');

    // - GUI
    this.addGUI()

    // this.staticPass.uniforms['amount'].value = 0.15

    const that = this
    function frame() {
      if (that.staticPass.uniforms['time'].value > 12) {
        that.staticPass.uniforms['time'].value = 0
      }

      that.staticPass.uniforms['time'].value += 0.1


      window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame)
  }

  addGlitchEasy() {
    const composer = this.world.globe.postProcessingComposer()

    this.glitchPass.enabled = false
    this.glitchEasyPass = new ShaderPass( GlitchEasyShader )
    this.glitchEasyPass.uniforms.textureNoise.value = this.noiseTexture
    composer.addPass(this.glitchEasyPass)
  }

  private addGUI() {
    const gui = new dat.GUI();
    const f1 = gui.addFolder('Static');
    const staticParams = {
      amount: 0.0,
      size: 5.0
    };
    f1.add(staticParams, 'amount', 0.0, 1.0).step(0.01).listen().onChange(onParamsChange)
    f1.add(staticParams, 'size', 1.0, 100.0).step(1.0).onChange(onParamsChange)
    f1.open()

    // const f2 = gui.addFolder('Glitch');
    // const glitchParams = {
    //   byp: 0.0
    // }
    // f2.add(glitchParams, 'byp', 0.0, 1.0).step(0.1).onChange(onParamsChange)
    // f2.open()

    const that = this
    function onParamsChange() {
      that.staticPass.uniforms['amount'].value = staticParams.amount;
      that.staticPass.uniforms['size'].value = staticParams.size;
      // that.glitchPass.uniforms['byp'].value = glitchParams.byp;
    }
  }
}
