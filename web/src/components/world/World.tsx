// @ts-nocheck

import React, { useRef, useEffect, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import * as THREE from 'three'

import { initializeWorld } from '../../actions/initialize'
import { addMarker, onMarkerHovered, onMarkerClicked, createPulsingMarkers } from '../../actions/marker'
import { WorldMode, MarkerType } from '../../actions'

const Globe = loadable(() => import('react-globe.gl'))

const World = ({ data, markers, layout, className }) => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  const ref = useRef()
  const world = useSelector(state => state.world)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading) {
      dispatch(initializeWorld(ref, data, location))
    }
  }, [loading])

  useEffect(() => {
    if (!world.ready) return

    dispatch(createPulsingMarkers())
  }, [world.ready])

  const onLabelUpdate = (obj, d) => {
    // this way we determine when ref.current is populated
    if (!loading) {
      setLoading(true)
    }

    if (!world.ready) return

    Object.assign(
      obj.position,
      ref.current.getCoords(
        get(d, 'node.location.lat', 0),
        get(d, 'node.location.lng', 0),
        0.05
      )
    )
  }

  const labelObject = (obj, radius) => {
    dispatch(addMarker(obj))

    // load texture
    const texture = new THREE.TextureLoader().load(`/marker-${obj.node._type}.svg`)
    if (ref.current) {
      texture.anisotropy = ref.current.renderer().getMaxAnisotropy()
    }

    // determine marker size
    let baseRadius = obj.node._type === MarkerType.PROJECT ? 3.5 : 5
    if (window.innerWidth < 600) baseRadius *= 2

    // marker material
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      color: 0xffffff
    })
    material.map.minFilter = THREE.LinearFilter
    return new THREE.Mesh(new THREE.CircleGeometry(baseRadius, 25, 25), [material])
  }


  return (
    !isSSR && (
      <React.Suspense fallback={<div />}>
        <Wrapper className={world.mode}>
          <Globe
            ref={ref}
            // appearance
            globeImageUrl="/earth-blue-marble-alt.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            // labels
            customLayerData={markers}
            customThreeObject={(obj, globeRadius) => labelObject(obj, globeRadius)}
            customThreeObjectUpdate={(obj, d) => onLabelUpdate(obj, d)}
            onCustomLayerHover={obj => dispatch(onMarkerHovered(obj))}
            onCustomLayerClick={obj => dispatch(onMarkerClicked(obj))}
            // settings
            animateIn={false}
            renderConfig={{
              sortObjects: false,
              antialias: true,
              alpha: true
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

  &.${WorldMode.PROJECT_PREVIEW}{
    transition: opacity 0.25s ease;
    opacity: 0.40;
  }

  &.${WorldMode.PROJECT_DETAILED} {
    opacity: 1;
  }
`

export default World
