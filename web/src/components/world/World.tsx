// @ts-nocheck

import React, { useRef, useEffect, useState } from 'react'
import loadable from '@loadable/component'
import { useDispatch } from 'react-redux'

import { initializeWorld } from '../../actions/initialize'
// import console = require('console');

const Globe = loadable(() => import('react-globe.gl'))

const World = ({ data }) => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  const ref = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(initializeWorld(ref, data, location))
    }, 100)

    window.addEventListener('scroll', () => console.log('scrolling!'))
  }, [isSSR])

  return (
    !isSSR && (
      <React.Suspense fallback={<div />}>
        <Globe
          ref={ref}
          globeImageUrl="/earth-blue-marble-alt.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere={false}
          backgroundColor="#000000"
          animateIn={false}
          renderConfig={{
            sortObjects: false,
            antialias: true,
            alpha: true,
          }}
          waitForGlobeReady={true}
        />
      </React.Suspense>
    )
  )
}


export default World
