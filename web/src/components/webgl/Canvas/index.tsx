import React, { Suspense } from 'react'
import { Canvas as CanvasT } from 'react-three-fiber'
import { Camera, World } from '..'

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
            <Camera />
            <Scene />
          </Suspense>
        </CanvasT>
      )}
    </div>
  )
}

export default Canvas
