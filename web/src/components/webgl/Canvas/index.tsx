import React, { Suspense } from 'react'
import { Canvas as CanvasT } from 'react-three-fiber'
import { Globe, Controls, Lightning, Clouds, Effects } from '..'

function Scene() {
  return (
    <>
      <Globe />
      {/* <Clouds /> */}
      <Lightning />
    </>
  )
}

const Canvas = ({ timerRef, onTimerEnd }) => {
  const isSSR = typeof window === 'undefined'

  return (
    <div style={{ position: 'fixed', height: '100vh', width: '100vw' }}>
      {!isSSR && (
        <CanvasT gl={{ antialias: true }} camera={{ position: [0, 0, 2] }}>
          <Suspense fallback={null}>
            <Scene />
            <Controls timerRef={timerRef} onTimerEnd={onTimerEnd} />
            <Effects />
          </Suspense>
        </CanvasT>
      )}
    </div>
  )
}

export default Canvas
