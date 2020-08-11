// @ts-nocheck

import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'
import { isMobile } from 'react-device-detect'
import { navigate } from 'gatsby'
import styled from 'styled-components'

import { initialize, moveToMarker, moveFromMarker, changeMarkerType, displayPulses, labelObject } from './utils'
import { State } from './WorldContainer'
import usePrevious from '@hooks/usePrevious'

const Globe = loadable(() => import('react-globe.gl'))

const World = ({ state, prevState, setState, projects, project, setProject, location, className, setProgress, setReady }) => {
  const isSSR = typeof window === 'undefined' // prevents builderror

  const ref = useRef();

  // window
  const [windowWidth, setWindowWidth] = useState<number>(undefined)
  const [windowWidthPrev, setWindowWidthPrev] = useState<number>(undefined)

  // globe
  const [loaded, setLoaded] = useState<boolean | null>(null)
  const [initialized, setInitialized] = useState<boolean | null>(null)
  
  // scene
  const [scene, setScene] = useState(null)
  const [renderer, setRenderer] = useState(null)

  // camera
  const [camera, setCamera] = useState(null)
  const [cameraChanged, setCameraChanged] = useState(false)
  const [cameraRotating, setCameraRotating] = useState(true)

  // controls
  const [controls, setControls] = useState(null)

  // labels
  const [labels, setLabels] = useState([])
  const [pulsingLabels, setPulsingLabels] = useState([])

  // actions
  const [labelHovered, onLabelHovered] = useState(null)
  const [labelClicked, onLabelClicked] = useState(null)

  useEffect(() => {
    if (initialized || !ref.current) return;

    _init()
  }, [loaded]);

  useEffect(() => {
    if (state === State.INITIALIZING && ref.current) return _init({ full: false })

    if (state === State.PROJECT_HOVERED && !project) return setState(State.EXPLORE)
  
    // Handle controls
    if (controls) controls.enabled = state === State.EXPLORE || state === State.PROJECT_HOVERED
  
    // Handle auto-rotation
    setCameraRotating(state === State.EXPLORE || state === State.BACKGROUND)

    // Handle markers
    const MARKER_STATES = [State.EXPLORE, State.PROJECT_HOVERED]
    if (MARKER_STATES.includes(state)) {
      changeMarkerType(labels, 'default', { duration: !prevState ? 0 : 300 })
      displayPulses(pulsingLabels, true)
    } else if (!MARKER_STATES.includes(state)) {
      changeMarkerType(labels, 'hidden', { duration: 300 })
      displayPulses(pulsingLabels, false)
    }
  
    // Set correct camera/globe position when on project detailed page
    if (state === State.PROJECT_DETAILED) {
      // First find project by route
      const projectSlug = get(location.pathname.split('/projects/'), '[1]')
      const p = projects.find(pj => get(pj, 'node.slug.current', '').toLowerCase() === projectSlug)

      console.log('project', p)

      if (p) {
        setProject(p)
        moveToMarker(ref.current, p, { duration: prevState === State.EXPLORE || prevState === State.PROJECT_HOVERED ? 1500 : 0 })
      }
    }

    // Handle from detailed to home
    if (prevState !== state && prevState === State.PROJECT_DETAILED) {
      moveFromMarker(ref.current, { duration: 1500 })
    }
  }, [state, location]) 

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

    if (isMobile && (!project || labelClicked.node.slug.current !== project.node.slug.current)) {
      if (project) changeMarkerType([project], 'default', { duration: 200 })

      if (labelClicked) {
        ref.current.pointOfView({
          lat: labelClicked.node.location.lat,
          lng: labelClicked.node.location.lng,
          alt: 0.05
        }, 1000)

        changeMarkerType([labelClicked], 'hover', { duration: 200 })

        setTimeout(() => {
          setProject(labelClicked)
          setState(State.PROJECT_HOVERED)
        }, 1000)
      }
      return
    }

    if (labelClicked) {
      setProject(labelClicked)
      navigate(`/projects/${labelClicked.node.slug.current}`)
      // setState(State.PROJECT_DETAILED)
    }
  }, [labelClicked]);

  useEffect(() => {
    if (!camera || !cameraChanged) return

    // update labels rotation
    [...labels, ...pulsingLabels].forEach(label => {
      label.__threeObj.quaternion.copy(camera.quaternion)
    })

    // so that camera changed only triggers every 150ms
    const timer = setTimeout(() => setCameraChanged(false), 150);
    return () => clearTimeout(timer)
  }, [cameraChanged])

  useEffect(() => {
    if (controls) controls.autoRotate = cameraRotating
  }, [cameraRotating])

  useLayoutEffect(() => {

    const updateCanvas = () => {
      setWindowWidthPrev(windowWidth)
      setWindowWidth(window.innerWidth)

      if (ref.current && windowWidth !== windowWidthPrev) {
        ref.current.camera().aspect = window.innerWidth / window.innerHeight;
        ref.current.camera().position.set(ref.current.camera().position.x, ref.current.camera().position.y, window.innerWidth > 600 ? 350 : 500)
        ref.current.camera().updateProjectionMatrix();
    
        ref.current.renderer().setSize( window.innerWidth, window.innerHeight );
      }
    }

    updateCanvas()
    window.addEventListener('resize', updateCanvas)
    return () => window.removeEventListener('resize', updateCanvas);
  }, [windowWidth, windowWidthPrev, setWindowWidth, setWindowWidthPrev])

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
    initialize(ref.current, projects, {
      ...options,
      onLoaded: () => { setReady(true); setState(State.LOADING) },
      onProgress: (progress) => { setProgress(progress) }
    }).then(([
      _scene,
      _camera,
      _controls,
      _renderer,
      _clouds,
      _lightning, 
      _pulsingLabels,
    ]) => {
      setScene(_scene)
      setCamera(_camera)
      setRenderer(_renderer)
      setControls(_controls)
      setPulsingLabels(_pulsingLabels)

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
            ref={ref}
            // appearance
            globeImageUrl="/earth-blue-marble-alt.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
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

  &.project-hovered {
    opacity: 0.40;
  }

  &.project-detailed {
    opacity: 1;
  }
`

export default World