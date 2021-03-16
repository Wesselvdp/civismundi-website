// @ts-nocheck
import React, { useMemo, useEffect } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

import { textures } from './data'

const loader = new THREE.TextureLoader()

function World() {
  const gltf = useLoader(GLTFLoader, '/Globe.glb')

  const worldMaterial = useMemo(() => {
    const texture = loader.load('/earth-blue-marble-alt.jpg')
    texture.flipY = false

    const material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: texture,
    })

    return material
  }, [])

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
    console.log('globe', globe)

    globe.material = worldMaterial
  }

  const setContinentMaterial = (child: any) => {
    child.material = materials[child.name]
  }

  useEffect(() => {
    gltf.scene.children.forEach((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.name === 'Globe_Mesh001'
          ? setWorldTexture(child)
          : setContinentMaterial(child)
      }
    })

    // gltf.scene.scale.set(100, 100, 100)
    gltf.scene.rotation.y = 1.11 * Math.PI
  }, [])

  return (
    <>
      {/* This is the world object */}
      <primitive object={gltf.scene} position={[0, 0, 0]} />
    </>
  )
}

export default World
