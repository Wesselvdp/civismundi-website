// @ts-nocheck

import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'
import { isMobile } from 'react-device-detect'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import * as THREE from 'three'

import { initialize, moveToMarker, moveFromMarker, changeMarkerType, labelObject } from './utils'
import { State } from './WorldContainer'
// import console = require('console');

const Globe = loadable(() => import('react-globe.gl'))

const World = ({ state, prevState, setState, projects, project, setProject, location, className }) => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  const ref = useRef();

  // globe
  const [loaded, setLoaded] = useState<boolean | null>(null)
  const [initialized, setInitialized] = useState<boolean | null>(null)

  // scene
  const [scene, setScene] = useState(null)

  // camera
  const [camera, setCamera] = useState(null)
  const [cameraChanged, setCameraChanged] = useState(false)
  const [cameraRotating, setCameraRotating] = useState(true)

  // controls
  const [controls, setControls] = useState(null)
  
  // renderer
  const [renderer, setRenderer] = useState(null)

  // custom scene objects
  const [clouds, setClouds] = useState(null);
  const [lightning, setLightning] = useState(null);

  // labels
  const [labels, setLabels] = useState([])
  const [labelHovered, onLabelHovered] = useState(null)
  const [labelClicked, onLabelClicked] = useState(null)

  useEffect(() => {
    if (initialized || !ref.current) return;

    _init()
  }, [loaded]);

  useEffect(() => {
    if (state === State.INITIALIZING && ref.current) return _init({ full: false })

    // Handle controls
    if (controls) controls.enabled = state === State.EXPLORE || state === State.PROJECT_HOVERED

    // Handle auto-rotation
    setCameraRotating(state === State.EXPLORE || state === State.BACKGROUND)

    // Handle markers
    const MARKER_STATES = [State.EXPLORE, State.PROJECT_HOVERED]
    if (MARKER_STATES.includes(state) && !MARKER_STATES.includes(prevState)) {
      // Show markers
      changeMarkerType(labels, 'default', { duration: !prevState ? 0 : 300 })
    } else if (!MARKER_STATES.includes(state) && (!prevState || MARKER_STATES.includes(prevState))) {
      // Hide markers
      changeMarkerType(labels, 'hidden', { duration: 300 })
    }
  
    // Set correct camera/globe position when on project detailed page
    if (state === State.PROJECT_DETAILED) {
      if (prevState === State.LOADING) {
        // First find project by route
        const projectSlug = get(location.pathname.split('/projects/'), '[1]')
        const project = projects.find(project => get(project, 'node.slug.current', '').toLowerCase() === projectSlug)

        // Move to marker immidiately without animation
        if (project) {
          setProject(project)
          moveToMarker(ref.current, project, { duration: 0 })
        }
      } else {
        moveToMarker(ref.current, project)
        setTimeout(() => {
          navigate(`/projects/${project.node.slug.current}`)
        }, 1500)
      }
    }

    // Handle from detailed to home
    if (prevState !== state && prevState === State.PROJECT_DETAILED) {
      moveFromMarker(ref.current, { duration: 1500 })
    }
  }, [state])

  useEffect(() => {
    if (isMobile) return
    if (state !== State.EXPLORE && state !== State.PROJECT_HOVERED) return

    if (labelHovered) {
      setProject(labelHovered)
      changeMarkerType([labelHovered], 'hover', { duration: 200 })
      setState(State.PROJECT_HOVERED)
    } 
    else {
      setProject(null)
      changeMarkerType(labels, 'default', { duration: 200 })
      setState(State.EXPLORE)
    }
  }, [labelHovered])

  useEffect(() => {
    if (state !== State.EXPLORE && state !== State.PROJECT_HOVERED) return

    if (labelClicked) {
      if (!project || labelClicked.node.slug.current !== project.node.slug.current) {
        setProject(labelClicked)
      }
      setState(State.PROJECT_DETAILED)
      navigate(`/projects/${labelClicked.node.slug.current}`)
    }
  }, [labelClicked]);


  useEffect(() => {
    if (!camera || !cameraChanged) return

    // update labels rotation
    labels.forEach(label => {
      label.__threeObj.quaternion.copy(camera.quaternion)
    })

    // so that camera changed only triggers every 150ms
    const timer = setTimeout(() => setCameraChanged(false), 150);
    return () => clearTimeout(timer)
  }, [cameraChanged])

  useEffect(() => {
    if (controls) controls.autoRotate = cameraRotating
  }, [cameraRotating])

  const onLabelUpdate = (obj, d) => {
    // this way we determine when ref.current is populated
    if (!loaded) setLoaded(true)
    if (!initialized) return

    Object.assign(
      obj.position,
      ref.current.getCoords(
        get(d, 'node.location.lat', 0),
        get(d, 'node.location.lng', 0),
        0.05
      )
    )

    // if new, add to labels
    if (labels.length !== projects.length && !labels.some(label => label.__threeObj.uuid === d.__threeObj.uuid)) {
      setLabels([...labels, d])
    }
  }

  const _init = (options = {}) => {
    initialize(ref.current, {
      ...options,
      onLoaded: () => setState(State.LOADING)
    }).then(([
      _scene,
      _camera,
      _controls,
      _renderer,
      _clouds,
      _lightning, 
      _video
    ]) => {
      setScene(_scene)
      setCamera(_camera)
      setControls(_controls)
      setRenderer(_renderer)
      setClouds(_clouds)
      setLightning(_lightning)

      _controls.addEventListener('start', () => {
        setProject(null)
        onLabelHovered(null)
        onLabelClicked(null)
      })
  
      _controls.addEventListener('change', () => {
        if (_lightning && _camera) _lightning.position.copy(_camera.position)
        if (!cameraChanged) setCameraChanged(true)
      })

      setInitialized(true)
    })
  }

  return (
    !isSSR && (
      <React.Suspense fallback={<div />}>
        <Wrapper className={className}>
          <Globe
            // ref
            ref={ref}
            // appearance
            globeImageUrl="/earth-blue-marble-alt.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="#000"
            // labels
            customLayerData={projects}
            customThreeObject={() => labelObject()}
            customThreeObjectUpdate={(obj, d) => onLabelUpdate(obj, d)}
            onCustomLayerHover={obj => onLabelHovered(obj)}
            onCustomLayerClick={obj => onLabelClicked(obj)}
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

  &.project-active {
    opacity: 0.40;
  }
`

export default World