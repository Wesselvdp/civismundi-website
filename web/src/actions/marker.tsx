import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

import { MarkerSize, WorldMode, WorldVersion } from '.'
import {
  ADD_MARKER,
  SET_MARKER_FOCUSED,
  SET_VISIBILITY_MARKERS,
  SET_ACTIVE_PROJECT,
  SET_FAKE_MARKER_COORDS,
  SET_HOVERED,
} from './types'
import { setWorldMode } from './mode'

export const addMarker = (marker: any) => ({ type: ADD_MARKER, marker })

export const changeMarkerSize = (
  markers: any,
  scale: number,
  duration = 500
) => {
  if (!markers) return

  if (!Array.isArray(markers)) {
    markers = [markers]
  }

  const scaleFrom = markers[0].__threeObj.scale
  // if (scaleFrom.x === scale) return

  markers.forEach((marker: any) => {
    if (marker.pulsingRing)
      setTimeout(() => updatePulsingScale(marker, scale), duration)
  })

  new TWEEN.Tween({ ...scaleFrom })
    .to({ x: scale, y: scale, z: scale }, duration)
    .onUpdate((d) => {
      markers.forEach((marker: any) =>
        marker.__threeObj.scale.set(d.x, d.y, d.z)
      )
    })
    .easing(TWEEN.Easing.Cubic.InOut)
    .start()
}

export function toggleFocusedMarker(focused: any) {
  return function action(dispatch: any, getState: any) {
    const w = getState().world
    if (w.markerFocused && w.markerFocused.__threeObj.scale.x !== 0)
      changeMarkerSize(
        w.markerFocused,
        MarkerSize.DEFAULT * (w.version === WorldVersion.MOBILE ? MarkerSize.MOBILE : 1)
      )

    if (focused) {
      const newScale = MarkerSize.FOCUSED_PROJECT
      const duration = 300

      changeMarkerSize(
        focused,
        newScale * (w.version === WorldVersion.MOBILE ? MarkerSize.MOBILE : 1),
        duration
      )
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

    dispatch(toggleFocusedMarker(hovered))
    dispatch({ type: SET_HOVERED, hovered: hovered ? hovered.node._id : null })
    if (w.version === WorldVersion.DESKTOP) {
      if (hovered) {
        return dispatch(
          setWorldMode(WorldMode.PROJECT_PREVIEW, { project: hovered })
        )
      }

      if (hovered === null) {
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
      return dispatch(
        setWorldMode(WorldMode.PROJECT_DETAILED, {
          project: clicked,
          state: { delay: 1500, doAnimation: true },
        })
      )
    }

    if (w.version === WorldVersion.MOBILE) {
      if (
        w.mode === WorldMode.PROJECT_PREVIEW &&
        clicked.node._id !== w.project.node._id
      ) {
        return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))
      }

      if (w.mode === WorldMode.PROJECTS_EXPLORE) {
        dispatch(toggleFocusedMarker(clicked))
        return dispatch(
          setWorldMode(WorldMode.PROJECT_PREVIEW, { project: clicked })
        )
      }
    }
  }
}

export function toggleMarkers(show: boolean, duration = 750, force = false) {
  return function action(dispatch: any, getState: any) {
    const w = getState().world

    // No action needed
    if (!force && w.markersVisible === show) return 0

    changeMarkerSize(
      w.markers,
      (show === true ? 1 : 0) * (w.version === WorldVersion.MOBILE ? MarkerSize.MOBILE : 1)
    )

    w.markers.forEach((marker: any) => {
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

    const geometry = new THREE.CircleGeometry(MarkerSize.BASE, 25, 25)
    geometry.vertices.splice(0, 1)
    const material = new THREE.LineBasicMaterial({
      color: 'white',
      transparent: true,
    })

    world.markers.forEach((marker: any) => {
      if (marker.node.featured) {
        // for every marker that represents a featured project, create a ring
        const pos = world.ref.current.getCoords(
          marker.node.location.lat,
          marker.node.location.lng,
          0.05
        )

        const ring = new THREE.LineLoop(geometry, material)
        ring.position.set(pos.x, pos.y, pos.z)
        world.ref.current.scene().add(ring)

        const tween = createPulsingMarkerTween(
          ring,
          world.version === WorldVersion.MOBILE ? MarkerSize.MOBILE : 1
        )
        tween.worldVersion = world.version

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
