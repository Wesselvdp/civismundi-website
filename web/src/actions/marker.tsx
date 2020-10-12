import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

import { MarkerSize, MarkerType, WorldMode, WorldVersion } from '.'
import {
  ADD_MARKER,
  SET_MARKER_FOCUSED,
  SET_VISIBILITY_MARKERS,
  SET_ACTIVE_PROJECT,
} from './types'
import { setWorldMode } from './mode'

export const addMarker = (marker: any) => ({ type: ADD_MARKER, marker })

export function setActiveProject(index: number) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (w.areaProjects && w.areaProjects.length > index) {
      dispatch({ type: SET_ACTIVE_PROJECT, project: w.areaProjects[index] })
    }
  }
}

export const changeMarkerSize = (
  marker: any,
  scale: number,
  duration = 500
) => {
  if (!marker) return

  const scaleFrom = marker.__threeObj.scale
  if (scaleFrom.x === scale) return

  if (marker.pulsingRing) updatePulsingScale(marker, scale)

  new TWEEN.Tween({ ...scaleFrom })
    .to({ x: scale, y: scale, z: scale }, duration)
    .onUpdate((d) => {
      marker.__threeObj.scale.set(d.x, d.y, d.z)
    })
    .easing(TWEEN.Easing.Cubic.InOut)
    .start()
}

export function toggleFocusedMarker(focused: any) {
  return function action(dispatch: any, getState: any) {
    const w = getState().world
    if (w.markerFocused) changeMarkerSize(w.markerFocused, MarkerSize.DEFAULT)

    if (focused) {
      const newScale =
        focused.node._type === MarkerType.PROJECT
          ? MarkerSize.FOCUSED_PROJECT
          : MarkerSize.FOCUSED_AREA
      const duration = focused.node._type === MarkerType.PROJECT ? 300 : 200

      changeMarkerSize(focused, newScale, duration)
    }

    return dispatch({ type: SET_MARKER_FOCUSED, marker: focused })
  }
}

export function updateMarkersQuaternion(world: any) {
  const quaternion = world.ref.current.camera().quaternion

  world.markers.forEach((marker: any) => {
    marker.__threeObj.quaternion.copy(quaternion)

    if (marker.pulsingRing) {
      marker.pulsingRing.quaternion.copy(quaternion)
    }
  })
}

export function onMarkerHovered(hovered: any) {
  return async function action(dispatch: any, getState: any) {
    const w = getState().world

    if (
      w.mode !== WorldMode.PROJECTS_EXPLORE &&
      w.mode !== WorldMode.PROJECT_PREVIEW
    )
      return

    if (typeof document !== 'undefined')
      document.body.style.cursor = hovered ? 'pointer' : 'default'

    dispatch(toggleFocusedMarker(hovered))

    if (w.version === WorldVersion.DESKTOP) {
      if (hovered && hovered.node._type === MarkerType.PROJECT) {
        return dispatch(
          setWorldMode(WorldMode.PROJECT_PREVIEW, { marker: hovered })
        )
      } else if (hovered === null) {
        return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))
      }
    }
  }
}

export function onMarkerClicked(clicked: any) {
  return function action(dispatch: any, getState: any) {
    const w = getState().world

    if (!w.markersVisible) return

    if (w.version === WorldVersion.DESKTOP) {
      if (clicked.node._type === MarkerType.PROJECT) {
        return dispatch(
          setWorldMode(WorldMode.PROJECT_DETAILED, {
            marker: clicked,
            navigate: true,
          })
        )
      }

      if (clicked.node._type === MarkerType.AREA) {
        return dispatch(
          setWorldMode(WorldMode.AREA_PREVIEW, { marker: clicked })
        )
      }
    }

    if (w.version === WorldVersion.MOBILE) {
      if (clicked.node._type === MarkerType.PROJECT) {
        if (
          w.mode === WorldMode.PROJECT_PREVIEW &&
          clicked.node._id !== w.project.node._id
        ) {
          return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))
        }

        if (w.mode === WorldMode.PROJECTS_EXPLORE) {
          dispatch(toggleFocusedMarker(clicked))
          return dispatch(
            setWorldMode(WorldMode.PROJECT_PREVIEW, { marker: clicked })
          )
        }
      }

      if (clicked.node._type === MarkerType.AREA) {
        dispatch(toggleFocusedMarker(clicked))
        return dispatch(
          setWorldMode(WorldMode.AREA_PREVIEW, { marker: clicked })
        )
      }
    }
  }
}

export function toggleMarkers(show: boolean, duration = 750) {
  return function action(dispatch: any, getState: any) {
    const w = getState().world

    // No action needed
    if (w.markersVisible === show) return 0

    w.markers.forEach((marker: any) => {
      const scale = marker.__threeObj.scale
      const size = show === true ? 1 : 0

      new TWEEN.Tween({ ...scale })
        .to({ x: size, y: size, z: size }, duration)
        .onUpdate((d) => {
          marker.__threeObj.scale.set(d.x, d.y, d.z)
        })
        .easing(TWEEN.Easing.Cubic.InOut)
        .start()

      if (marker.pulsingRing)
        show
          ? continuePulsingMarkerTween(marker)
          : pausePulsingMarkerTween(marker)
    })

    dispatch({ type: SET_VISIBILITY_MARKERS, payload: show })
    return duration
  }
}

export function createPulsingMarkers() {
  return function action(dispatch: any, getState: any) {
    const world = getState().world

    const geometry = new THREE.CircleGeometry(
      world.version === WorldVersion.MOBILE ? 7 : 3.5,
      25,
      25
    )
    geometry.vertices.splice(0, 1)
    const material = new THREE.LineBasicMaterial({
      color: 'white',
      transparent: true,
    })

    world.markers.forEach((marker: any) => {
      if (marker.node._type === MarkerType.PROJECT && marker.node.featured) {
        // for every marker that represents a featured project, create a ring
        const pos = world.ref.current.getCoords(
          marker.node.location.lat,
          marker.node.location.lng,
          0.05
        )

        const ring = new THREE.LineLoop(geometry, material)
        ring.position.set(pos.x, pos.y, pos.z)
        world.ref.current.scene().add(ring)

        const tween = createPulsingMarkerTween(ring)

        marker.pulsingTween = tween
        marker.pulsingRing = ring

        if (
          world.mode !== WorldMode.PROJECTS_EXPLORE &&
          world.mode !== WorldMode.PROJECT_PREVIEW
        ) {
          pausePulsingMarkerTween(marker)
        }
      }
    })
  }
}

// Pulsing TWEENS
const createPulsingMarkerTween = (ring: any, markerScale = 1) => {
  return new TWEEN.Tween({ scale: markerScale, opacity: 1 })
    .to({ scale: markerScale * 2, opacity: 0 }, 1000)
    .repeat(Infinity)
    .onUpdate((d) => {
      ring.scale.set(d.scale, d.scale, d.scale)
      ring.material.opacity = d.opacity
    })
    .start()
}

const updatePulsingScale = (marker: any, scale = 1) => {
  if (!marker.pulsingRing) return

  marker.pulsingTween.stop()
  const tween = createPulsingMarkerTween(marker.pulsingRing, scale)
  marker.pulsingTween = tween
}

const pausePulsingMarkerTween = (marker: any) => {
  marker.pulsingRing.scale.set(0, 0, 0)
  marker.pulsingTween.stop()
}

const continuePulsingMarkerTween = (marker: any) => {
  if (marker.pulsingRing.scale.length() > 0) return

  setTimeout(() => {
    const scale = marker.__threeObj.scale
    marker.pulsingRing.scale.set(scale.x, scale.y, scale.z)
    marker.pulsingTween.start()
  }, 1000)
}
