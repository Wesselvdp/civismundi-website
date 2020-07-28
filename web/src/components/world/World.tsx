// @ts-nocheck

import React, { useEffect, useRef, useLayoutEffect, useState } from 'react'
import loadable from '@loadable/component'
import { get } from 'lodash'
import { isMobile } from 'react-device-detect'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import { useTriggerTransition } from 'gatsby-plugin-transition-link'

import * as THREE from 'three'
import { initialize, labelObject } from './utils'
import { State } from './WorldContainer'
import TWEEN from '@tweenjs/tween.js'
// import console = require('console');


const Globe = loadable(() => import('react-globe.gl'))

const scale = {
  default: new THREE.Vector3(1, 1, 1),
  large: new THREE.Vector3(1.3, 1.3, 1.3)
}

const projectCameraPositions = {
  fuckthat: {x: -21.09517134023139, y: -13.842005393559838, z: 158.13052241620738, worldY: -25 },
  columbus: {x: 27.14184364454964, y: -7.805917689107176, z: 157.41942896107605, worldY: -25 },
  DelaMove: {x: 0.21709849267533315, y: -129.60871165915535, z: 124.37075872820836, worldY: -75 },
  stargazing: {x: -157.3196871510831, y: -45.99100074437717, z: -83.3751610249093, worldY: -50 }
}
const moveToProject = (curr, project, labels) => {
  if (!project) return

  const scene = curr.scene()
  const controls = curr.controls()
  const camera = curr.camera()

  const world = scene.children.find(obj => obj.type === 'Group')
  const clouds = scene.children.find(obj => obj.name === 'Clouds')
  const c1 = curr.getCoords(project.node.location.lat, project.node.location.lng, 0)

  controls.minDistance = 60
  controls.maxDistance = Infinity
 
  const projectSlug = project.node.slug.current;
  console.log(projectSlug)
  const cameraToPosition = projectCameraPositions[projectSlug]

  new TWEEN.Tween({ x: controls.target.x, y: controls.target.y, z: controls.target.z })
    .to({ x: c1.x, y: c1.y, z: c1.z}, 1500)
    .onUpdate(d => {
      controls.target.set(d.x, d.y, d.z)
    })
    .start()

  if (cameraToPosition) {
    new TWEEN.Tween({ x: camera.position.x, y: camera.position.y, z: camera.position.z })
      .to(cameraToPosition, 1500)
      .onUpdate(d => {
        camera.position.set(d.x, d.y, d.z)
      })
      .start()
  }
  
  new TWEEN.Tween({ x: world.position.x, y: world.position.y, z: world.position.z })
    .to({ x: world.position.x, y: cameraToPosition ? cameraToPosition.worldY : -25, z: world.position.z }, 1500)
    .onUpdate(d => {
      world.position.set(d.x, d.y, d.z)
      clouds.position.set(d.x, d.y, d.z)
    })
    .start()
}

const World = ({ state, setState, projects, project, setProject, movingToProject, className }) => {
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
    if (movingToProject) {
      moveToProject(ref.current, project)
    }
  }, [movingToProject])

  useEffect(() => {
    if (state === State.INITIALIZING && ref.current) _init({ full: false })
    if (state > State.LOADING) controls.enabled = true
  }, [state])

  useEffect(() => {
    if (!initialized) return
    if (state < State.EXPLORE) return

    if (!project) {
      labels.forEach(label => Object.assign(label.__threeObj.scale, scale.default))
      setCameraRotating(true)
      return
    }

    setCameraRotating(false)
  }, [project])


  useEffect(() => {
    if (isMobile) return
    if (state < State.EXPLORE) return
  
    setProject(labelHovered)

    // update label size
    labels.forEach(label => Object.assign(label.__threeObj.scale, scale.default))
    if (labelHovered) Object.assign(labelHovered.__threeObj.scale, scale.large)
  }, [labelHovered])

  useEffect(() => {
    if (state < State.EXPLORE) return

    // update label size
    labels.forEach(label => Object.assign(label.__threeObj.scale, scale.default))
    if (labelClicked) Object.assign(labelClicked.__threeObj.scale, scale.large)

    // always go to page if not on mobile
    if (!isMobile) {
      setProject(labelClicked)
      moveToProject(ref.current, labelClicked, labels)
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
  
    const timer = setTimeout(() => { 
      setProject(labelClicked)
    }, 1000);
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
        console.log('start', _camera.position)
        setProject(null)
        onLabelHovered(null)
        onLabelClicked(null)
      })

      _controls.addEventListener('end', () => {
        console.log('end', _camera.position)
      })
  
      _controls.addEventListener('change', () => {
        if (_lightning && _camera) _lightning.position.copy(_camera.position)
        if (!cameraChanged) setCameraChanged(true)
      })
    })

    setInitialized(true)
  }

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
        </Wrapper>
     </React.Suspense>
    )
  )
}

const Wrapper = styled.div`
  & > div > div > div > div {
    height: 100vh;
    height: fill-available;
  }

  video {
    visibility: hidden;
  }
`
export default World