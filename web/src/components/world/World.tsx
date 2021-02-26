// @ts-nocheck

import React, { useRef, useEffect, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import * as THREE from 'three'

import { breakpoints } from '@utils/breakpoints'
import { initializeWorld } from '../../actions/initialize'
import {
  addMarker,
  onMarkerHovered,
  onMarkerClicked,
  createPulsingMarkers,
} from '../../actions/marker'
import { WorldVersion, WorldMode, MarkerSize } from '../../actions'

const Globe = loadable(() => import('react-globe.gl'))

const World = ({ data }) => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  const ref = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(initializeWorld(ref, data, location))
    }, 100)
  }, [isSSR])

  return (
    !isSSR && (
      <React.Suspense fallback={<div />}>
        <Wrapper>
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
        </Wrapper>
      </React.Suspense>
    )
  )
}

const Wrapper = styled.div`
  opacity: 1;
  transition: opacity 1.5s ease;

  &.${WorldMode.PROJECT_PREVIEW} {
    transition: opacity 0.25s ease;
    opacity: 0.4;

    @media ${breakpoints.phoneOnly} {
      opacity: 0.25;
    }
  }

  &.${WorldMode.PROJECT_DETAILED} {
    opacity: 1;
  }
`

export default World
