import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

import BaseObject from './BaseObject'
import World from '..';

const VIDEO_MAP: any = {
  'Land_Mesh.002': { name: 'stargazing.mp4' },
  'Land.001_Mesh.001': { name: 'dna.mp4' },
  'Land.002_Mesh.001': { name: 'franca.mp4' },
  'Land.003_Mesh.001': { name: 'libre.mp4' },
  'Land.004_Mesh.001': { name: 'superbowl.mp4' },
  'Land.005_Mesh.001': { name: 'milehigh.mp4' },
  'Land.006_Mesh.001': { name: 'captureland.mp4' }
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

      const material = new THREE.MeshLambertMaterial({side: THREE.FrontSide, map: texture, opacity: 0.85, transparent: true });
      obj.material = material
    })

    const objLoader = new OBJLoader()
    objLoader.load('/Globe_v4.obj', (object: any) => {
      console.log('children', object.children)

      object.traverse((child: any) => {
        if (child instanceof THREE.Mesh) {
          if (child.name === 'Globe_Mesh.001') {
            const text = new THREE.TextureLoader().load( '/earth-blue-marble-alt.jpg');
            child.material = new THREE.MeshLambertMaterial({ side: THREE.FrontSide, map: text });
            // child.visible = false
          } else {
            const video = VIDEO_MAP[child.name]
            if (video) {
              child.material = video.material
            }
          }
        }
      });

      object.scale.set(101, 101, 101)
      // object.rotation.y = 1.1 * Math.PI
      that.object = object
      that.world.globe.scene().add(that.object)
      console.log('globe material', that.world.globe.globeMaterial())
    })
  }
}
