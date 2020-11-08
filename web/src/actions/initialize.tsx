import * as THREE from 'three'
import { get } from 'lodash'

import { MarkerType, MarkerSize, WorldVersion, WorldMode } from '.'
import {
  SET_DATA,
  WORLD_INITIALIZE_START,
  WORLD_INITIALIZE_COMPLETE,
  SET_LIGHTNING,
  WORLD_LOADING_COMPLETE,
  WORLD_SET_VERSION,
  WORLD_SET_LOADING,
  WORLD_SET_RESIZE,
} from './types'
import { setWorldMode, setWorldModeFromLocation } from './mode'
import {
  getWorldVersion,
  updateLightningPosition,
  calculateCameraZ,
} from './helpers'
import {
  toggleMarkers,
  updateMarkersQuaternion,
  changeMarkerSize,
  onMarkerClicked,
  onMarkerHovered,
} from './marker'

let newFrame: any
const FRAME_PER_SEC = 60
const SEC_PER_FRAME = 1000 / FRAME_PER_SEC

function configureScene(world: any) {
  const controls = world.ref.current.controls()

  // disable zoom
  controls.enableZoom = false

  // orbit min/maxDistance
  controls.minDistance = 40
  controls.maxDistance = Infinity

  controls.autoRotateSpeed = 0.3

  // set camera height according to version
  world.ref.current.camera().position.z =
    world.version === WorldVersion.MOBILE ? calculateCameraZ() : 350
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
        directionalLight.intensity = 0.4
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
  return async function action(dispatch: any, getState: any) {
    const version = getWorldVersion()
    await dispatch({ type: WORLD_SET_VERSION, version })

    const w = getState().world

    if (w.ref.current) {
      // w.ref.current.camera().aspect = window.innerWidth / window.innerHeight
      // w.ref.current.camera().updateProjectionMatrix()
      // w.ref.current.renderer().setSize(window.innerWidth, window.innerHeight)

      if (w.mode !== WorldMode.PROJECT_DETAILED) {
        w.ref.current
          .camera()
          .position.setLength(
            w.version === WorldVersion.MOBILE ? calculateCameraZ() : 350
          )
      }

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

      dispatch(
        toggleMarkers(
          [
            WorldMode.AREA_PREVIEW,
            WorldMode.PROJECT_PREVIEW,
            WorldMode.PROJECTS_EXPLORE,
          ].includes(w.mode),
          0,
          true
        )
      )
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
    if (!ref.current) return Promise.resolve()

    THREE.DefaultLoadingManager.onLoad = function () {
      dispatch({ type: WORLD_SET_LOADING, loading: false })
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
    dispatch(
      setWorldModeFromLocation(location, { data: { state: { delay: 0 } } })
    )

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
            changeMarkerSize(
              w.markerFocused,
              MarkerSize.DEFAULT * (w.version === WorldVersion.MOBILE ? 1.5 : 1)
            )
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

    // Custom click
    const raycaster = new THREE.Raycaster() // create once
    const mouse = new THREE.Vector2() // create once
    function onDocumentMouseDown(event: any) {
      const w = getState().world

      if (
        w.mode !== WorldMode.AREA_PREVIEW &&
        w.mode !== WorldMode.PROJECTS_EXPLORE &&
        w.mode !== WorldMode.PROJECT_PREVIEW
      )
        return

      // support mobile touches
      if (event.clientX === undefined)
        event.clientX = event.targetTouches[0].clientX
      if (event.clientY === undefined)
        event.clientY = event.targetTouches[0].clientY

      mouse.x =
        (event.clientX / w.ref.current.renderer().domElement.clientWidth) * 2 -
        1
      mouse.y =
        -(event.clientY / w.ref.current.renderer().domElement.clientHeight) *
          2 +
        1

      raycaster.setFromCamera(mouse, w.ref.current.camera())

      const intersects = raycaster.intersectObjects(
        w.ref.current.scene().children,
        true
      )
      if (
        intersects.length &&
        intersects[0].object.__globeObjType === 'custom'
      ) {
        dispatch(onMarkerClicked(intersects[0].object.__data))
      }
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false)
    document.addEventListener('touchstart', onDocumentMouseDown, false)

    // create additional THREE.js objects
    await Promise.all([dispatch(createLightning()), dispatch(createClouds())])

    await dispatch({ type: WORLD_INITIALIZE_COMPLETE })

    setTimeout(dispatch(toggleMarkers(location.pathname === '/')), 2000)

    console.log('initialized')
  }
}
