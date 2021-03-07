import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { clone } from 'lodash'

import BaseObject from './BaseObject'
import World from '..'

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
  'spa-night.mp4',
]

/* eslint-disable prettier/prettier */
const alphaMapUrls = {
  'Land004_Mesh001' : 'Africa.jpg', // africa
  'Land001_Mesh001': 'South-America.jpg', // south america
  'Land006_Mesh001': 'North-America.jpg', // north america
  // 'Land002_Mesh001': 'Europe.jpg', // europe,
  'Land_Mesh002': 'Russia.jpg', // russia
  'Land005_Mesh001' : 'South-Pole.jpg', // south pole
  'Land003_Mesh001' : 'Australia.jpg', // australia
}
/* eslint-enable prettier/prettier */

export default class Regions extends BaseObject {
  videos: any[] = []
  alphaMaps: any[] = []

  constructor(world: World) {
    super(world)

    this.createAlphaMaps()
    this.createVideoTextures()
    this.loadFile()
  }

  loadFile() {
    const loader = new GLTFLoader(THREE.DefaultLoadingManager)
    loader.load('/Globe.glb', (gltf) => {
      gltf.scene.children.forEach((child: any) => {
        if (child instanceof THREE.Mesh) {
          child.name === 'Globe_Mesh001'
            ? this.setWorldTexture(child)
            : this.setVideoTexture(child)
        }
      })

      console.log('children', gltf.scene.children)

      gltf.scene.scale.set(100.5, 100.5, 100.5)
      gltf.scene.rotation.y = 1.11 * Math.PI // magic

      this.object = gltf.scene
      this.world.globe.scene().add(gltf.scene)
    })
  }

  createVideoTextures() {
    const that = this

    videoUrls.forEach((slug: string, i: number) => {
      const video = document.createElement('video')
      video.setAttribute('playsinline', 'playsinline')
      video.src = `/videos/${slug}`
      video.muted = true
      video.crossOrigin = 'anonymous'
      video.id = slug

      video.load()
      video.addEventListener('ended', () => {
        const continents = that.object.children.filter(
          (child: any) =>
            child instanceof THREE.Mesh &&
            that.videos[i].active.includes(child.uuid)
        )

        continents.forEach((continent: THREE.Mesh) => {
          that.setVideoTexture(continent)
        })

        that.videos[i].active = []
      })

      const texture = new THREE.VideoTexture(video)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBFormat
      texture.flipY = false

      const material = new THREE.MeshBasicMaterial({
        side: THREE.FrontSide,
        map: texture,
        opacity: 0.65,
        transparent: true,
      })
      that.videos.push({ material, video, active: [] })
    })
  }

  createAlphaMaps() {
    // create video textures
    this.alphaMaps = []

    Object.values(alphaMapUrls).forEach((url: string) => {
      const img = document.createElement('img')
      const alphaMap = new THREE.Texture(img)

      img.onload = function () {
        alphaMap.needsUpdate = true
      }

      img.src = `/alpha-map/${url}`
      alphaMap.minFilter = THREE.LinearFilter
      alphaMap.magFilter = THREE.LinearFilter
      alphaMap.format = THREE.RGBFormat
      alphaMap.flipY = false

      this.alphaMaps.push({ map: alphaMap, url })
    })
  }

  setVideoTexture(child: THREE.Mesh) {
    // Find free video
    const free = this.videos.filter((obj) => obj.active.length === 0)
    const i = Math.floor(Math.random() * free.length)

    if (free.length) {
      const obj = free[i]

      obj.video.play()
      obj.active.push(child.uuid)

      const mat = clone(obj.material)
      const alphaMap = this.alphaMaps.find(
        (obj: any) => obj.url === alphaMapUrls[child.name]
      )
      if (alphaMap) {
        mat.alphaMap = alphaMap.map
        mat.alphaMap.needsUpdate = true
      }

      child.material = mat
    }
  }

  setWorldTexture(globe: THREE.Mesh) {
    const text = new THREE.TextureLoader().load('/earth-blue-marble-alt.jpg')
    text.flipY = false

    globe.material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: text,
    })
  }
}
