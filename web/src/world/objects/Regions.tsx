import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import BaseObject from './BaseObject'
import World from '..';

const videoUrls = [
  'stargazing.mp4',
  'dna.mp4',
  'franca.mp4',
  'libre.mp4',
  'superbowl.mp4',
  'milehigh.mp4',
  'captureland.mp4',
  'armani.mp4',
  'columbus.mp4',
  'dont-start-now.mp4',
  'lebron.mp4',
  'spa-night.mp4'
]

export default class Regions extends BaseObject {
  videos: any[] = []

  constructor(world: World) {
    super(world);

    this.createVideoTextures();
    this.loadFile();
  }

  loadFile() {
    const that = this

    const loader = new GLTFLoader(THREE.DefaultLoadingManager)
    loader.load('/Globe.glb', ( gltf ) => {
      gltf.scene.children.forEach((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.name === 'Globe_Mesh001'
            ? that.setWorldTexture(child)
            : that.setVideoTexture(child)
        }
      })

      gltf.scene.scale.set(100.5, 100.5, 100.5)
      gltf.scene.rotation.y = 1.110 * Math.PI // magic

      that.object = gltf.scene
      that.world.globe.scene().add( gltf.scene )
    })
  }

  createVideoTextures() {
    const that = this

    // create video textures
    videoUrls.forEach((slug: string, i: number)=> {
      const video = document.createElement( 'video' );
      video.setAttribute('playsinline', 'playsinline');
      video.src = `/videos/${slug}`
      video.muted = true
      video.crossOrigin = 'anonymous'
      video.id = slug

      video.load()
      video.addEventListener('ended', () => {
        const continents = that.object.children
          .filter((child: any) => child instanceof THREE.Mesh && that.videos[i].active.includes(child.uuid))

        continents.forEach((continent: THREE.Mesh) => {
          that.setVideoTexture(continent)
        })

        that.videos[i].active = []
      })

      const texture = new THREE.VideoTexture( video );
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;
      texture.flipY = false;

      const material = new THREE.MeshLambertMaterial({ side: THREE.FrontSide, map: texture, opacity: 0.65, transparent: true });
      that.videos.push({ material, video, active: [] })
    })
  }

  setVideoTexture(child: THREE.Mesh) {
    // Find free video
    const free = this.videos.filter(obj => obj.active.length === 0)
    const i = Math.floor(Math.random() * free.length)

    if (free.length) {
      const obj = free[i]

      obj.video.play()
      obj.active.push(child.uuid)

      child.material = obj.material
    }
  }

  setWorldTexture(globe: THREE.Mesh) {
    const text = new THREE.TextureLoader().load( '/earth-blue-marble-alt.jpg');
    text.flipY = false;

    globe.material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, map: text });
  }
}
