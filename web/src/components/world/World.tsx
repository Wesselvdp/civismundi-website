// @ts-nocheck

import React, { useRef, useEffect, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import * as THREE from 'three'

import { initializeWorld } from '../../actions/initialize'
import {
  addMarker,
  onMarkerHovered,
  onMarkerClicked,
  createPulsingMarkers,
} from '../../actions/marker'
import { WorldVersion, WorldMode, MarkerType } from '../../actions'

const Globe = loadable(() => import('react-globe.gl'))

const World = ({ data, markers, layout, className }) => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  const ref = useRef()
  const world = useSelector((state) => state.world)
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch()

  const [disableEvents, setDisableEvents] = useState(false)

  useEffect(() => {
    if (loading) {
      dispatch(initializeWorld(ref, data, location))
    }
  }, [loading])

  useEffect(() => {
    if (!world.ready) return

    dispatch(createPulsingMarkers())
  }, [world.ready])

  useEffect(() => {
    if (!world.ready) return

    if (
      [
        WorldMode.IN_BACKGROUND,
        WorldMode.PROJECT_DETAILED,
        WorldMode.PROJECTS_EXPLORE,
      ].includes(world.mode)
    )
      setDisableEvents(false)
  }, [world.ready, world.mode])

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
        get(d, 'node._type') === MarkerType.PROJECT ? 0.05 : 0.08
      )
    )
  }

  const onHover = (obj) => {
    if (disableEvents) return

    if (world.version === WorldVersion.DESKTOP) {
      dispatch(onMarkerHovered(obj))
    }
  }

  const onClick = (obj) => {
    if (disableEvents) return

    setDisableEvents(true)
    dispatch(onMarkerClicked(obj))
  }

  const labelObject = (obj, radius) => {
    dispatch(addMarker(obj))

    // load texture
    let path = '/marker-project.svg'
    if (obj.node._type === 'location') {
      const projectCount = data.allSanityProject.edges.filter(
        (p: any) =>
          p.node.locationGroup && p.node.locationGroup._id === obj.node._id
      ).length
      // path = `/area-marker/area-${projectCount}.svg`
      path = '/marker-big.svg'

      obj.node.projectCount = projectCount
    }

    const texture = new THREE.TextureLoader().load(path)
    if (ref.current) {
      texture.anisotropy = ref.current
        .renderer()
        .capabilities.getMaxAnisotropy()
    }

    // determine marker size
    const baseRadius = 3.5
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      color: 0xffffff,
    })
    material.map.minFilter = THREE.LinearFilter
    return new THREE.Mesh(new THREE.CircleGeometry(baseRadius, 25, 25), [
      material,
    ])
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
            customThreeObject={(obj, globeRadius) =>
              labelObject(obj, globeRadius)
            }
            customThreeObjectUpdate={(obj, d) => onLabelUpdate(obj, d)}
            onCustomLayerHover={(obj) => onHover(obj)}
            // onCustomLayerClick={(obj) => onClick(obj)}
            // settings
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

  &.${WorldMode.PROJECT_PREVIEW}, &.${WorldMode.AREA_PREVIEW} {
    transition: opacity 0.25s ease;
    opacity: 0.4;
  }

  &.${WorldMode.PROJECT_DETAILED} {
    opacity: 1;
  }
`

export default World
