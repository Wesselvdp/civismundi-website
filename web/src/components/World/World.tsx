// @ts-nocheck

import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'
import { isMobile } from 'react-device-detect'
import { navigate } from 'gatsby'

import * as THREE from 'three'
import { initialize, labelObject } from './utils'
import { State } from './WorldContainer'
// import console = require('console');

const Globe = loadable(() => import('react-globe.gl'))

const scale = {
  default: new THREE.Vector3(1, 1, 1),
  large: new THREE.Vector3(1.3, 1.3, 1.3)
}

const moveToProject = (curr, project, alt = 0.05, ms = 2000) => {
  const coords = { 
    lat: get(project, 'node.location.lat'),
    lng: get(project, 'node.location.lng'),
    alt
  }

  curr.pointOfView(coords, ms)
}

const World = ({ state, setState, projects, project, setProject, movingToProject, setThumbnailPosition }) => {
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
    if (initialized || !ref.current) return
  
    initialize(ref.current).then(([_scene, _camera, _controls, _renderer, _clouds, _lightning]) => {
      setScene(_scene)
      setCamera(_camera)
      setControls(_controls)
      setRenderer(_renderer)
      setClouds(_clouds)
      setLightning(_lightning)

      _controls.addEventListener('change', () => { if (!cameraChanged) setCameraChanged(true) })
    })

    setInitialized(true)

    // animates globe in
    const timer = setTimeout(() => setState(State.LOADING), 1000)
    return () => clearTimeout(timer)
  }, [loaded]);

  useEffect(() => {
    if (movingToProject) {
      moveToProject(ref.current, project)
    }
  }, [movingToProject])

  useEffect(() => {
    if (state > State.INTRODUCTION) controls.enabled = true
  }, [state])

  useEffect(() => {
    if (!initialized) return
    if (state <= State.INTRODUCTION) return

    if (!project) {
      setCameraRotating(true)
      setThumbnailPosition(null)
      return
    }

    setCameraRotating(false)
    setThumbnailPosition(
      ref.current.getScreenCoords(
        get(project, 'node.location.lat'),
        get(project, 'node.location.lng'),
        0.05
      )
    )
  }, [project])


  useEffect(() => {
    if (isMobile) return
    if (state <= State.INTRODUCTION) return
    setProject(labelHovered)

    // update label size
    labels.forEach(label => Object.assign(label.__threeObj.scale, scale.default))
    if (labelHovered) Object.assign(labelHovered.__threeObj.scale, scale.large)
  }, [labelHovered])

  useEffect(() => {
    if (state <= State.INTRODUCTION) return

    // always go to page if not on mobile
    if (!isMobile) {
      moveToProject(ref.current, labelClicked)
      navigate(`/projects/${labelClicked.node.slug.current}`)
      return
    }

    // if clicked on marker that's already active, go to page
    if (project && project.node.slug.current === labelClicked.node.slug.current) {
      moveToProject(ref.current, labelClicked)
      navigate(`/projects/${project.node.slug.current}`)
      return
    }
    
    // mobile, new marker clicked
    setProject(null)
    moveToProject(ref.current, labelClicked)
    const timer = setTimeout(() => { setProject(labelClicked) }, 2000);
    return () => clearTimeout(timer)
  }, [labelClicked]);


  useEffect(() => {
    if (!initialized) return
    if (!cameraChanged) return

    // update labels rotation
    labels.forEach(label => {
      label.__threeObj.quaternion.copy(camera.quaternion)
    })

    // so that camera changed only triggers every 150ms
    const timer = setTimeout(() => setCameraChanged(false), 150);
    return () => clearTimeout(timer)
  }, [cameraChanged])

  useEffect(() => {
    if (!initialized) return

    controls.autoRotate = cameraRotating
  }, [cameraRotating])

  useLayoutEffect(() => {
    function updateSize() {
      if (!initialized) return

      camera.aspect = window.innerWidth / window.innerHeight
      renderer.setSize(window.innerWidth, window.innerHeight)
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', () => updateSize())
    return () => window.removeEventListener('resize', updateSize)
  }, []);

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

  return (
    !isSSR && (
      <React.Suspense fallback={<div />}>
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
          onCustomLayerRightClick={obj => console.log(obj)}
          // settings
          animateIn={false}
          renderConfig={{
            sortObjects: false,
            antialias: true,
            alpha: true 
          }}
          waitForGlobeReady={true}
        />
     </React.Suspense>
    )
  )
}

export default World