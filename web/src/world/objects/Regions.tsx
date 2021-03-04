import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

import BaseObject from './BaseObject'
import World from '..';

const VIDEO_MAP: any = {
  'Land_Mesh002': { name: 'stargazing.mp4' },
  'Land001_Mesh001': { name: 'dna.mp4' },
  'Land002_Mesh001': { name: 'franca.mp4' },
  'Land003_Mesh001': { name: 'libre.mp4' },
  'Land004_Mesh001': { name: 'superbowl.mp4' },
  'Land005_Mesh001': { name: 'milehigh.mp4' },
  'Land006_Mesh001': { name: 'captureland.mp4' }
}

export default class Regions extends BaseObject {
  constructor(world: World) {
    super(world);

    this.init();
  }

  init() {
    const that = this

    // create video textures
    Object.values(VIDEO_MAP).forEach((obj: any) => {
      const video = document.createElement( 'video' );
      video.setAttribute('playsinline', 'playsinline');
      video.src = `/videos/${obj.name}`
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.load();
      video.play();

      const texture = new THREE.VideoTexture( video );
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;
      texture.flipY = false;

      const material = new THREE.MeshLambertMaterial({ side: THREE.FrontSide, map: texture, opacity: 0.65, transparent: true });
      obj.material = material
    })

    // const loader = new OBJLoader(THREE.DefaultLoadingManager)
    // loader.load('/Globe_v5.obj', (object: any) => {
    //   object.traverse((child: any) => {
    //     if (child instanceof THREE.Mesh) {
    //       if (child.name === 'Globe_Mesh.001') {
    //         const text = new THREE.TextureLoader().load( '/earth-blue-marble-alt.jpg');
    //         child.material = new THREE.MeshLambertMaterial({ side: THREE.FrontSide, map: text });
    //         // child.visible = false
    //       } else {
    //         const video = VIDEO_MAP[child.name]
    //         if (video) {
    //           child.material = video.material
    //         }
    //       }
    //     }
    //   });

    //   object.scale.set(101, 101, 101)
    //   object.rotation.y = 1.1 * Math.PI
    //   that.object = object
    //   that.world.globe.scene().add(that.object)
    // })
    const loader = new GLTFLoader(THREE.DefaultLoadingManager)

    loader.load('/Globe.glb', ( gltf ) => {
      gltf.scene.children.forEach((child: any) => {
        if (child instanceof THREE.Mesh) {
          if (child.name === 'Globe_Mesh001') {
            const text = new THREE.TextureLoader().load( '/earth-blue-marble-alt.jpg');
            text.flipY = false;

            child.material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, map: text });
            // child.visible = false
          } else {
            const video = VIDEO_MAP[child.name]
            if (video) {
              child.material = video.material
            }
          }
        }
      })

      gltf.scene.scale.set(100.5, 100.5, 100.5)
      gltf.scene.rotation.y = 1.110 * Math.PI // magic

      that.object = gltf.scene
      that.world.globe.scene().add( gltf.scene )
    })
  }
}
