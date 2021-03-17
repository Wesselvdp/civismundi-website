import { useMemo } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GLOBE_RADIUS } from '../utils/constants'

const INTERACTION_THRESHOLD = 150

function Controls({ timerRef, onTimerEnd }) {
  const { camera, gl } = useThree()

  const calculateMinDistance = () =>
    GLOBE_RADIUS * 1.01 * (window.innerWidth < 700 ? 1.45 : 1.2)

  const controls = useMemo(() => {
    const controls = new OrbitControls(camera, gl.domElement)

    const dist = calculateMinDistance()
    controls.minDistance = dist // just above the surface
    controls.maxDistance = dist // apply async  after renderObjs sets maxDistance
    controls.enablePan = false
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = window.innerWidth < 700 ? 0.4 : 0.3
    controls.rotateSpeed = window.innerWidth < 700 ? 0.5 : 0.3

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

    function onResize() {
      const dist = calculateMinDistance()
      controls.minDistance = dist
      controls.maxDistance = dist

      controls.rotateSpeed = window.innerWidth < 700 ? 0.5 : 0.3
      controls.autoRotateSpeed = window.innerWidth < 700 ? 0.4 : 0.3
    }
    window.addEventListener('resize', onResize)

    return controls
  }, [])

  useFrame(() => {
    controls.update()
  })

  return null
}

export default Controls
