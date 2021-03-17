import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import * as THREE from 'three'

function Clouds() {
  const meshRef = useRef()
  const rotation = useRef()
  const texture = useLoader(THREE.TextureLoader, '/clouds.png')


  useEffect(() => {
    function onResize() {
      const multiplier = window.innerWidth < 700 ? 1.8 : 1
      rotation.current = { x: 0.00003 * multiplier, y: 0.00012 * multiplier }
    }
    onResize()
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  useFrame(() => {
    meshRef.current.rotation.y -= rotation.current.y
    meshRef.current.rotation.x -= rotation.current.x
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereBufferGeometry args={[1.03, 32, 32]} attach="geometry" />
      <meshPhongMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        attach="material"
        alphaTest={0.1}
        opacity={0.6}
      />
    </mesh>
  )
}
export default Clouds
