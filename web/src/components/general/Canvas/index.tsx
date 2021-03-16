/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, Suspense, useMemo, useEffect } from 'react'
import { Canvas as CanvasT, useLoader, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import * as THREE from 'three'

/* eslint-disable prettier/prettier */
const textures: any = {
  // africa
 'Land004_Mesh001' : {
   alpha: 'Africa.jpg',
   video: 'superbowl.mp4',
   videoSanity: 'https://cdn.sanity.io/files/aail6zsu/dev/f6039f241605e534f903fb598e20ec7e6973e00a.mp4'
 },
 // // south america
 'Land001_Mesh001': {
   alpha: 'South-America.jpg',
   video: 'dna.mp4',
   videoSanity: 'https://cdn.sanity.io/files/aail6zsu/dev/8219a0772b8fdb2df3cf418881c4b6a5b545d380.mp4'
 },
 // north america
 'Land006_Mesh001': {
   alpha: 'North-America.jpg',
   video: 'captureland.mp4',
   videoSanity: 'https://cdn.sanity.io/files/aail6zsu/dev/5e8f124a1bf59792a60b59b07333bef3c01c77b4.mp4'
 },
 // europe,
 'Land002_Mesh001': {
   alpha: 'Europe.jpg',
   video: 'franca.mp4',
   videoSanity: 'https://cdn.sanity.io/files/aail6zsu/dev/569f22b69aa7aba92434eead87e5e9202e2db638.mp4'
 },
 // russia
 'Land_Mesh002': {
   alpha: 'Russia.jpg',
   video: 'stargazing.mp4',
   videoSanity: 'https://cdn.sanity.io/files/aail6zsu/dev/84d796007f53af33720f0cec277dfcc9b917ff78.mp4'
 },
 // south pole
 'Land005_Mesh001' : {
   alpha: 'South-Pole.jpg',
   video: 'armani.mp4',
   videoSanity: 'https://cdn.sanity.io/files/aail6zsu/dev/aee96a9b4d23630963dafb0aa594c5aa6ffe1fd3.mp4',
 },
 // australia
 'Land003_Mesh001' : {
   alpha: 'Australia.jpg',
   video: 'libre.mp4',
   videoSanity: 'https://cdn.sanity.io/files/aail6zsu/dev/d87a2ff51ccd755e3c3e17b93d796a14d1c2eab2.mp4'
 }
}
/* eslint-enable prettier/prettier */

const loader = new THREE.TextureLoader()

const CameraController = () => {
  const { camera, gl } = useThree()

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.minDistance = 250
    controls.maxDistance = 300
    return () => {
      controls.dispose()
    }
  }, [camera, gl])
  return null
}

const World = () => {
  const gltf = useLoader(GLTFLoader, '/Globe.glb')
  const worldTexture = useLoader(
    THREE.TextureLoader,
    '/earth-blue-marble-alt.jpg'
  )
  // const alphaMaps = useLoader(THREE.TextureLoader, '/alpha-map/Africa.jpg')

  const materials = useMemo(() => {
    const materials: any = {}

    Object.keys(textures).forEach((key) => {
      const obj = textures[key]

      const vid = document.createElement('video')
      vid.setAttribute('playsinline', 'playsinline')
      vid.muted = true
      vid.crossOrigin = 'anonymous'
      vid.loop = true
      vid.style.display = 'none'
      vid.src = obj.videoSanity
      vid.load()
      vid.play()

      const texture = new THREE.VideoTexture(vid)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBFormat
      texture.flipY = false

      const alphaMap = loader.load(`/alpha-map/${obj.alpha}`)
      alphaMap.minFilter = THREE.LinearFilter
      alphaMap.magFilter = THREE.LinearFilter
      alphaMap.format = THREE.RGBFormat
      alphaMap.flipY = false

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        opacity: 0.65,
        transparent: true,
        alphaMap,
      })
      materials[key] = material
    })

    return materials
  }, [])

  const setWorldTexture = (globe: any) => {
    worldTexture.flipY = false

    globe.material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: worldTexture,
    })
  }

  const createContinentMaterial = (child: any) => {
    child.material = materials[child.name]
  }

  useEffect(() => {
    gltf.scene.children.forEach((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.name === 'Globe_Mesh001'
          ? setWorldTexture(child)
          : createContinentMaterial(child)
      }
    })

    gltf.scene.scale.set(100, 100, 100)
    gltf.scene.rotation.y = 1.11 * Math.PI // magic
  }, [])

  return (
    <>
      <primitive object={gltf.scene} position={[0, 0, 0]} />
    </>
  )
}

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.8} position={[300, 300, 400]} />

      <World />
    </>
  )
}
const Canvas = () => {
  const isSSR = typeof window === 'undefined'

  return (
    <div style={{ position: 'fixed', height: '100vh', width: '100vw' }}>
      {!isSSR && (
        <CanvasT gl={{ antialias: true }} camera={{ position: [0, 0, 250] }}>
          <Suspense fallback={null}>
            <CameraController />
            <Scene />
          </Suspense>
        </CanvasT>
      )}
    </div>
  )
}

export default Canvas
