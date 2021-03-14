import React, { useRef, useEffect, useState } from 'react'
import loadable from '@loadable/component'
import { useDispatch } from 'react-redux'

import { initializeWorld } from 'src/actions/initialize'

const Globe = loadable(() => import('react-globe.gl'))

const World = () => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  const ref = useRef()
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    if (!ref.current) {
      setTimeout(() => setToggle(!toggle), 100)
      return
    }

    dispatch(initializeWorld(ref))
  }, [toggle])

  return (
    !isSSR ? (
      <React.Suspense fallback={<div />}>
        <Globe
          ref={ref}
          globeImageUrl="/earth-blue-marble-alt.jpg"
          bumpImageUrl="/earth-topology.png"
          showAtmosphere={false}
          animateIn={false}
          backgroundColor="rgba(0, 0, 0, 0)"
          rendererConfig={{
            antialias: true,
            alpha: true,
          }}
          waitForGlobeReady={true}
        />
      </React.Suspense>
    ) : <></>
  )
}


export default World
