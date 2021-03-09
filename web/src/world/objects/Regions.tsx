import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { get } from 'lodash'

import BaseObject from './BaseObject'
import World from '..'

// const videoUrls = [
//   'stargazing.mp4',
//   'dna.mp4',
//   'franca.mp4',
//   'libre.mp4',
//   'superbowl.mp4',
//   // 'milehigh.mp4',
//   'captureland.mp4',
//   'armani.mp4',
//   'columbus.mp4',
//   'dont-start-now.mp4',
//   'lebron.mp4',
//   'spa-night.mp4',
// ]

/* eslint-disable prettier/prettier */
const textures: any = {
   // africa
  'Land004_Mesh001' : {
    alpha: 'Africa.jpg',
    video: 'superbowl.mp4'
  },
  // south america
  'Land001_Mesh001': {
    alpha: 'South-America.jpg',
    video: 'dna.mp4'
  },
  // north america
  'Land006_Mesh001': {
    alpha: 'North-America.jpg',
    video: 'captureland.mp4'
  },
  // europe,
  'Land002_Mesh001': {
    alpha: 'Europe.jpg',
    video: 'franca.mp4'
  },
  // russia
  'Land_Mesh002': {
    alpha: 'Russia.jpg',
    video: 'stargazing.mp4'
  },
  // south pole
  'Land005_Mesh001' : {
    alpha: 'South-Pole.jpg',
    video: 'armani.mp4'
  },
  // australia
  'Land003_Mesh001' : {
    alpha: 'Australia.jpg',
    video: 'libre.mp4'
  }
}
/* eslint-enable prettier/prettier */

const loader = new THREE.TextureLoader()
export default class Regions extends BaseObject {
  videos: any[] = []

  constructor(world: World) {
    super(world)

    this.loadFile()
  }

  loadFile() {
    const loader = new GLTFLoader(THREE.DefaultLoadingManager)
    loader.load('/Globe.glb', (gltf) => {
      gltf.scene.children.forEach((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.name === 'Globe_Mesh001'
            ? this.setWorldTexture(child)
            : this.createContinentMaterial(child)
        }
      })

      gltf.scene.scale.set(100.5, 100.5, 100.5)
      gltf.scene.rotation.y = 1.11 * Math.PI // magic

      this.object = gltf.scene
      this.world.globe.scene().add(gltf.scene)
    })
  }

  createContinentMaterial(child: any) {
    child.material = new THREE.MeshBasicMaterial({
      side: THREE.FrontSide,
      opacity: 0.65,
      transparent: true,
    })

    this.setVideoTexture(child)
    this.setAlphaMap(child)
  }

  setVideoTexture(child: any) {
    const obj = textures[child.name]

    if (obj) {
      const video = document.createElement('video')
      video.setAttribute('playsinline', 'playsinline')
      video.src = `/videos-compressed/${obj.video}`
      video.muted = true
      video.crossOrigin = 'anonymous'
      video.id = obj.video
      video.loop = true
      video.load()
      video.play()

      const texture = new THREE.VideoTexture(video)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBFormat
      texture.flipY = false

      child.material.map = texture
      child.material.needsUpdate = true
    }
  }

  setAlphaMap(child: any) {
    // add alpha map
    const obj = textures[child.name]

    if (obj) {
      const alphaMap = loader.load(`/alpha-map/${obj.alpha}`)
      alphaMap.minFilter = THREE.LinearFilter
      alphaMap.magFilter = THREE.LinearFilter
      alphaMap.format = THREE.RGBFormat
      alphaMap.flipY = false

      child.material.alphaMap = alphaMap
      child.material.needsUpdate = true
    }
  }

  setWorldTexture(globe: THREE.Mesh) {
    const text = loader.load('/earth-blue-marble-alt.jpg')
    text.flipY = false

    globe.material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: text,
    })
  }
}
