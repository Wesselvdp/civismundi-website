import * as THREE from 'three'
import { get } from 'lodash'

import { MarkerType, MarkerSize, WorldVersion, WorldMode } from '.'
import {
  SET_DATA,
  WORLD_INITIALIZE_START,
  WORLD_INITIALIZE_COMPLETE,
  SET_LIGHTNING,
} from './types'
import { setWorldMode, setWorldModeFromLocation } from './mode'
import { getWorldVersion, updateLightningPosition } from './helpers'
import {
  toggleMarkers,
  updateMarkersQuaternion,
  changeMarkerSize,
} from './marker'

let newFrame: any
const FRAME_PER_SEC = 60
const SEC_PER_FRAME = 1000 / FRAME_PER_SEC

function configureScene(world: any) {
  const controls = world.ref.current.controls()

  // disable zoom
  controls.enableZoom = false

  // orbit min/maxDistance
  controls.minDistance = 10
  controls.maxDistance = Infinity

  controls.autoRotateSpeed = 0.3

  // set camera height according to version
  if (world.version === WorldVersion.MOBILE) {
    world.ref.current.camera().position.z = 500
  }
}

function createLightning() {
  return async function action(dispatch: any, getState: any) {
    const world = getState().world

    const material = world.ref.current.globeMaterial()
    material.bumpScale = 10

    new THREE.TextureLoader().load(
      '//unpkg.com/three-globe/example/img/earth-water.png',
      (texture) => {
        material.specularMap = texture
        material.specular = new THREE.Color('grey')
        material.shininess = 15
      }
    )

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const directionalLight = world.ref.current
          .scene()
          .children.find((obj3d: any) => obj3d.type === 'DirectionalLight')

        directionalLight.position.copy(world.ref.current.camera().position)

        dispatch({ type: SET_LIGHTNING, lightning: directionalLight })
        resolve(directionalLight)
      })
    })
  }
}

function createClouds() {
  return function action(dispatch: any, getState: any) {
    const world = getState().world

    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(102, 32, 32),
      new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load(
          '/clouds.png',
          (texture) => texture
        ),
        transparent: true,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
        opacity: 0.5,
      })
    )
    clouds.renderOrder = 1
    clouds.name = 'Clouds'

    // Let clouds move
    const multiplier = world.version === WorldVersion.MOBILE ? 1.2 : 1
    const rotation = { x: 0.00003 * multiplier, y: 0.00012 * multiplier }
    setInterval(
      () => (
        (clouds.rotation.y -= rotation.y), (clouds.rotation.x -= rotation.x)
      ),
      10
    )

    world.ref.current.scene().add(clouds)
  }
}

export function worldHandleResize() {
  return function action(dispatch: any, getState: any) {
    const w = getState().world

    if (w.ready) {
      w.ref.current.camera().aspect = window.innerWidth / window.innerHeight
      w.ref.current.camera().updateProjectionMatrix()
      w.ref.current.renderer().setSize(window.innerWidth, window.innerHeight)

      w.markers.forEach((marker: any) => {
        Object.assign(
          marker.__threeObj.position,
          w.ref.current.getCoords(
            get(marker, 'node.location.lat', 0),
            get(marker, 'node.location.lng', 0),
            get(marker, 'node._type') === MarkerType.PROJECT ? 0.05 : 0.08
          )
        )
      })
    }
  }
}

export function initializeWorld(
  ref: any,
  data: any,
  location: any,
  options: any = {}
) {
  return async function action(dispatch: any, getState: any) {
    const startTime = new Date()
    const world = getState().world

    if (!ref.current) return Promise.resolve()

    if (world.ready) {
      if (options.force) {
        // TODO: destroy world; use case: on resize
      }

      return Promise.resolve()
    }

    // store sanity data
    dispatch({
      type: SET_DATA,
      projects: data.allSanityProject.edges,
      areas: data.allSanityLocation.edges,
    })

    // initialize world
    const version = getWorldVersion()
    await dispatch({ type: WORLD_INITIALIZE_START, ref, version })

    // configure THREE.js scene
    configureScene(getState().world)

    // set world mode from location
    dispatch(setWorldModeFromLocation(location))

    // show/hide markers depending on location
    dispatch(toggleMarkers(false, 0))

    // event listeners
    getState()
      .world.ref.current.controls()
      .addEventListener('start', () => {
        const w = getState().world

        if (
          w.mode === WorldMode.PROJECT_PREVIEW ||
          w.mode === WorldMode.AREA_PREVIEW
        ) {
          dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))
          if (w.markerFocused)
            changeMarkerSize(w.markerFocused, MarkerSize.DEFAULT)
        }
      })

    getState()
      .world.ref.current.controls()
      .addEventListener('change', () => {
        const w = getState().world

        updateLightningPosition(w)

        // Update marker quaternions every MARKER_SPF ms
        if (!newFrame) {
          updateMarkersQuaternion(w)

          newFrame = setTimeout(() => {
            newFrame = false
          }, SEC_PER_FRAME)
        }
      })

    // create additional THREE.js objects
    await Promise.all([dispatch(createLightning()), dispatch(createClouds())])

    await dispatch({ type: WORLD_INITIALIZE_COMPLETE })

    setTimeout(dispatch(toggleMarkers(location.pathname === '/')), 2000)

    const endTime = new Date()
    const elapsed = endTime - startTime
  }
}
