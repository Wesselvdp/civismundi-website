import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import * as THREE from 'three'

import { GLOBE_RADIUS } from '../utils/constants'

function Clouds() {
  const mesh = useRef()
  const rotation = useRef()
  const texture = useLoader(THREE.TextureLoader, '/clouds.png')

  useEffect(() => {
    const multiplier = window.innerWidth < 700 ? 1.2 : 1
    rotation.current = { x: 0.00003 * multiplier, y: 0.00012 * multiplier }
  }, [])

  useFrame(() => {
    mesh.current.rotation.y -= rotation.current.y
    mesh.current.rotation.x -= rotation.current.x
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[GLOBE_RADIUS * 1.02, 32, 32]} />
      <meshPhongMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        alphaTest={0.1}
        opacity={0.6}
      />
    </mesh>
  )
}

export default Clouds
