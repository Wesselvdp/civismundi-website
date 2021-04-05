// @ts-nocheck
import React, { useMemo, useEffect } from 'react'
import { useLoader, useThree } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'

import { textures, positions } from './data'

const loader = new THREE.TextureLoader()

// const World = () => {
//   const { gl } = useThree()

//   const texs = useMemo(() => {
//     const materials: any = []

//     Object.keys(textures).forEach((key) => {
//       const obj = textures[key]

//       const vid = document.getElementById(key)
//       vid.play()

//       const texture = new THREE.VideoTexture(vid)
//       texture.minFilter = THREE.LinearFilter
//       texture.magFilter = THREE.LinearFilter
//       texture.format = THREE.RGBFormat
//       // texture.flipY = false
//       texture.anisotropy = gl.capabilities.getMaxAnisotropy()

//       // const alphaMap = loader.load(`/alpha-map/${obj.alpha}`)
//       // alphaMap.minFilter = THREE.LinearFilter
//       // alphaMap.magFilter = THREE.LinearFilter
//       // alphaMap.format = THREE.RGBFormat
//       // alphaMap.flipY = false

//       // const material = new THREE.MeshBasicMaterial({
//       //   map: texture,
//       //   opacity: 0.65,
//       //   transparent: true,
//       //   alphaMap,
//       // })

//       materials.push(texture)
//     })

//     return materials
//   }, [])

//     return (
//       <>
//         {texs.map((texture, i) => (
//           <mesh position={positions[i]}>
//               <planeBufferGeometry args={[1, 1]} attach="geometry" />
//               <meshPhongMaterial
//                 map={texture}
//                 transparent
//                 side={THREE.DoubleSide}
//                 attach="material"
//                 alphaTest={0.1}
//                 opacity={0.6}
//               />
//           </mesh>
//         ))}
//        </>
//     )
// }

// export default World

function World() {
  const gltf = useLoader(GLTFLoader, '/cm-globe-new.glb')
  const { gl } = useThree()

  const worldMaterial = useMemo(() => {
    const texture = loader.load('/earth-blue-marble-alt.jpg')
    texture.flipY = false
    texture.anisotropy = gl.capabilities.getMaxAnisotropy()

    const material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      map: texture,
    })

    return material
  }, [])

  const materials = useMemo(() => {
    const materials: any = []

    Object.keys(textures).forEach((key) => {
      const obj = textures[key]

      const vid = document.getElementById(key)
      vid.play()

      const texture = new THREE.VideoTexture(vid)
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.format = THREE.RGBFormat
      // texture.flipY = false
      texture.anisotropy = gl.capabilities.getMaxAnisotropy()

      // const alphaMap = loader.load(`/alpha-map/${obj.alpha}`)
      // alphaMap.minFilter = THREE.LinearFilter
      // alphaMap.magFilter = THREE.LinearFilter
      // alphaMap.format = THREE.RGBFormat
      // // alphaMap.flipY = false

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        opacity: 0.65,
        transparent: true,
        // alphaMap,
      })

      materials.push(material)
    })

    return materials
  }, [])

  const setWorldMaterial = (globe: any) => {
    console.log('globe', globe)

    globe.material = worldMaterial
    globe.rotation.y = Math.PI * 0.968
  }

  const setContinentMaterial = (child: any, i: number) => {
    child.material = materials[i]
  }

  useEffect(() => {
    gltf.scene.children.forEach((child: any, i) => {
      if (child instanceof THREE.Mesh) {
        console.log('child', child)
        i === gltf.scene.children.length - 1
          ? setWorldMaterial(child)
          : setContinentMaterial(child, i)
      }
    })

    // gltf.scene.rotation.y = 1.11 * Math.PI
  }, [])

  return (
    <>
      {/* This is the world object */}
      {/* <mesh position={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
          attach="material"
          color="white"
          transparent
          map={worldTexture}
          // roughness={0.1}
          // metalness={0.1}
        />
      </mesh> */}
      <primitive
        object={gltf.scene}
        position={[0, 0, 0]}
        scale={[1 / 100, 1 / 100, 1 / 100]}
      />
    </>
  )
}

export default World
