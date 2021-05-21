// @ts-nocheck
import React, { useMemo, useEffect, useRef } from 'react'
import { useLoader, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

import { continentInfo } from './data'

const loader = new THREE.TextureLoader()

function VideoManager({ threeObjects }) {
  const { gl } = useThree()

  const { videoTextures, materials } = useMemo(() => {
    if (!threeObjects) return

    const videoTextures: any = []
    document.querySelectorAll('.video-container video').forEach((video: any) => {
      video.play()

      const videoTexture = new THREE.VideoTexture(video)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      videoTexture.format = THREE.RGBFormat
      videoTexture.flipY = false
      videoTexture.anisotropy = gl.capabilities.getMaxAnisotropy()
      videoTexture.name = video.id
      videoTextures.push(videoTexture)
    })

    const materials: any = []
    Object.keys(continentInfo).forEach((key) => {
      const obj = continentInfo[key]
      const payload: any = { opacity: 0.65, transparent: true }

      // Add alpha map
      const alphaMap = loader.load(`/alpha-map/alpha-${obj.name}.jpg`)
      if (alphaMap) {
        alphaMap.minFilter = THREE.LinearFilter
        alphaMap.magFilter = THREE.LinearFilter
        alphaMap.format = THREE.RGBFormat
        alphaMap.flipY = false
        payload.alphaMap = alphaMap
      }

      // Add default video
      payload.map = videoTextures.find((texture: any) => texture.name === obj.defaultVideo)

      const material = new THREE.MeshBasicMaterial(payload)
      material.name = key

      materials.push(material)
    })

    threeObjects.forEach((object: any) => {
      object.material = materials.find((contMat: any) => contMat.name === object.name)
    })

    return { videoTextures, materials }
  }, [threeObjects])

  useEffect(() => {
    function switchVideo (video: any) {
      const materialToUpdate = materials.find((mat: any) => mat.map.name === video.id)

      if (materialToUpdate) {
        const unusedVideo = videoTextures.find((texture: any) =>
          !materials.some((mat: any) => mat.map.name === texture.name)
        )

        if (unusedVideo) {
          const video: any = document.querySelector(`.video-container video[id="${unusedVideo.name}"]`)

          if (video) {
            video.currentTime = 0
            video.play()
            materialToUpdate.map = unusedVideo
            materialToUpdate.map.needsUpdate = true
          }
        }
      }
    }

    if (threeObjects) {
      document.querySelectorAll('.video-container video').forEach(video => video.addEventListener('ended', () => switchVideo(video)))
    }

    return () => {
      document.querySelectorAll('.video-container video').forEach(video => video.removeEventListener('ended', switchVideo))
    }
  }, [threeObjects])

  return null
}

function World() {
  const { gl } = useThree()
  const gltf = useLoader(GLTFLoader, '/cm-globe-11-05-21.glb')

  const objects: any = useRef({ globe: null, continents: [] })

  const worldMaterial = useMemo(() => {
    const texture = loader.load('/globe-texture.jpg')
    texture.flipY = false
    texture.anisotropy = gl.capabilities.getMaxAnisotropy()

    const material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: texture,
    })

    return material
  }, [])

  useEffect(() => {
    objects.current.continents = gltf.scene.children.filter((_, i: number) => i !== gltf.scene.children.length - 1)

    objects.current.globe = gltf.scene.children.find((_, i: number) => i === gltf.scene.children.length - 1)
    objects.current.globe.material = worldMaterial
    objects.current.globe.rotation.y = Math.PI * 0.968
  }, [])

  return (
    <>
      <VideoManager threeObjects={objects.current.continents} />
      <primitive
        object={gltf.scene}
        position={[0, 0, 0]}
        scale={[1 / 100, 1 / 100, 1 / 100]}
      />
    </>
  )
}

export default World
