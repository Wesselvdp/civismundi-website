import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GLOBE_RADIUS } from '../utils/constants'

const INTERACTION_THRESHOLD = 150

function Controls({ timerRef, onTimerEnd }) {
  const { camera, gl } = useThree()
  const controls = useMemo(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    controls.minDistance = GLOBE_RADIUS * 1.2 // just above the surface
    controls.maxDistance = GLOBE_RADIUS * 100 // apply async  after renderObjs sets maxDistance
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.rotateSpeed = 0.3
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.3

    controls.addEventListener('start', () => {
      timerRef.current = Date.now()
    })

    controls.addEventListener('end', () => {
      if (timerRef.current) {
        const elapsed = Date.now() - timerRef.current

        if (elapsed > INTERACTION_THRESHOLD) {
          onTimerEnd(false)
        }

        timerRef.current = null
      }
    })

    return controls
  }, [])

  useFrame(() => {
    controls.update()
  })

  return null
}

export default Controls
