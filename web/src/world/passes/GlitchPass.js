import * as THREE from 'three';
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js';
import { DigitalGlitch } from 'three/examples/jsm/shaders/DigitalGlitch.js';

var GlitchPass = function ( dt_size ) {

	Pass.call( this );

	if ( DigitalGlitch === undefined ) console.error( 'THREE.GlitchPass relies on DigitalGlitch' );

	var shader = DigitalGlitch;
	this.uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	if ( dt_size == undefined ) dt_size = 64;


	this.uniforms[ 'tDisp' ].value = this.generateHeightmap( dt_size );
  this.range = [0, 0]

	this.material = new THREE.ShaderMaterial( {
		uniforms: this.uniforms,
		vertexShader: shader.vertexShader,
		fragmentShader: shader.fragmentShader
	} );

	this.fsQuad = new Pass.FullScreenQuad( this.material );

  this.goWild = false
	this.curF = 0
	this.generateTrigger()
	this.enabled = true
};

GlitchPass.prototype = Object.assign( Object.create( Pass.prototype ), {

	constructor: GlitchPass,

	render: function ( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {
		if (!this.enabled) return

		this.uniforms[ 'tDiffuse' ].value = readBuffer.texture;
		this.uniforms[ 'seed' ].value = Math.random();//default seeding
		this.uniforms[ 'byp' ].value = 0.0

		if ( this.curF % this.randX == 0 || this.goWild == true ) {

			this.uniforms[ 'amount' ].value = 0.00000001
			this.uniforms[ 'angle' ].value = THREE.MathUtils.randFloat( - Math.PI, Math.PI );
			this.uniforms[ 'distortion_x' ].value = THREE.MathUtils.randFloat( 0, 1 );
			this.uniforms[ 'distortion_y' ].value = THREE.MathUtils.randFloat( 0, 1 );
			this.uniforms[ 'seed_x' ].value = THREE.MathUtils.randFloat( - 0.3, 0.3 );
			this.uniforms[ 'seed_y' ].value = THREE.MathUtils.randFloat( - 0.3, 0.3 );
			this.curF = 0;
			this.generateTrigger();

		} else if ( this.curF % this.randX < this.randX / 50 ) {

			this.uniforms[ 'amount' ].value = 0.00000001
			this.uniforms[ 'angle' ].value = THREE.MathUtils.randFloat( - Math.PI, Math.PI );
			this.uniforms[ 'distortion_x' ].value = THREE.MathUtils.randFloat( 0, 1 );
			this.uniforms[ 'distortion_y' ].value = THREE.MathUtils.randFloat( 0, 1 );
			this.uniforms[ 'seed_x' ].value = THREE.MathUtils.randFloat( - 0.3, 0.3 );
			this.uniforms[ 'seed_y' ].value = THREE.MathUtils.randFloat( - 0.3, 0.3 );
      // this.uniforms[ 'byp' ].value = 1.0

		} else if ( this.goWild == false ) {

			this.uniforms[ 'byp' ].value = 1;

		}

		this.curF ++;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			if ( this.clear ) renderer.clear();
			this.fsQuad.render( renderer );

		}

	},

	generateTrigger: function () {

		this.randX = THREE.MathUtils.randInt( this.range[0], this.range[1] );

	},

	generateHeightmap: function ( dt_size ) {

		var data_arr = new Float32Array( dt_size * dt_size * 3 );
		var length = dt_size * dt_size;

		for ( var i = 0; i < length; i ++ ) {

			var val = THREE.MathUtils.randFloat( 0, 1 );
			data_arr[ i * 3 + 0 ] = val;
			data_arr[ i * 3 + 1 ] = val;
			data_arr[ i * 3 + 2 ] = val;

		}

		return new THREE.DataTexture( data_arr, dt_size, dt_size, THREE.RGBFormat, THREE.FloatType );

	}

} );

export { GlitchPass };
