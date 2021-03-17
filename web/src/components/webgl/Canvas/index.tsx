import React, { Suspense, useMemo } from 'react'
import { Canvas as CanvasT } from 'react-three-fiber'
import * as THREE from 'three'

import { Globe, Controls, Lightning, Clouds, Effects } from '..'

const OBJECTS_TO_LOAD = 10

function Scene() {
  return (
    <>
      <Globe />
      {/* <Clouds /> */}
      <Lightning />
    </>
  )
}

function LoadingManager({ onProgress }) {
  useMemo(() => {
    THREE.DefaultLoadingManager.onProgress = function (
      url,
      itemsLoaded,
      itemsTotal
    ) {
      onProgress(itemsLoaded / OBJECTS_TO_LOAD)
    }

    THREE.DefaultLoadingManager.onError = function (url) {
      console.log('There was an error loading ' + url)
    }
  }, [])

  return null
}

const Canvas = ({ timerRef, onTimerEnd, onProgress }) => {
  const isSSR = typeof window === 'undefined'

  return (
    <div style={{ position: 'fixed', height: '100vh', width: '100vw' }}>
      {!isSSR && (
        <CanvasT gl={{ antialias: true }} camera={{ position: [0, 0, 2] }}>
          <Suspense fallback={null}>
            <Scene />
            <Controls timerRef={timerRef} onTimerEnd={onTimerEnd} />
            <LoadingManager onProgress={onProgress} />
            <Effects />
          </Suspense>
        </CanvasT>
      )}
    </div>
  )
}

export default Canvas
