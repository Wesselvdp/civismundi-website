// @ts-nocheck
import React, { useRef } from 'react'
import { useThree, useFrame } from 'react-three-fiber'

function Lightning() {
  const ref = useRef()
  const { camera } = useThree()

  useFrame(({ camera }) => {
    ref.current.position.copy(camera.position)
  })

  return (
    <directionalLight ref={ref} position={camera.position} intensity={0.9} />
  )
}

export default Lightning
