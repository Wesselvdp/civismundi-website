import TWEEN from '@tweenjs/tween.js'
import * as THREE from 'three'

import { MarkerType, WorldMode, WorldVersion } from '.'
import { ADD_MARKER, SET_VISIBILITY_MARKERS } from './types'
import { setWorldMode } from './mode'

export const addMarker = (marker: any) => ({ type: ADD_MARKER, marker })

export function onMarkerHovered(hovered: any) {
  return function action(dispatch: any, getState: any) {
    const w = getState().world

    if (!w.markersVisible)
      return

    if (w.mode !== WorldMode.PROJECTS_EXPLORE && w.mode !== WorldMode.PROJECT_PREVIEW)
      return

    if (w.version === WorldVersion.DESKTOP) {
      if (typeof document !== 'undefined') {
        document.getElementsByTagName('body')[0].style.cursor = hovered ? 'pointer' : 'auto'
      }

      if (hovered && hovered.node._type === MarkerType.PROJECT) {
        return dispatch(setWorldMode(WorldMode.PROJECT_PREVIEW, { marker: hovered }))
      } else if (hovered === null) {
        return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))
      }
    }
  }
}

export function onMarkerClicked(clicked: any) {
  return function action(dispatch: any, getState: any) {
    const w = getState().world

    if (!w.markersVisible)
      return

    if (w.version === WorldVersion.DESKTOP) {
      if (clicked.node._type === MarkerType.PROJECT) {
        return dispatch(setWorldMode(WorldMode.PROJECT_DETAILED, { marker: clicked, navigate: true }))
      }

      if (clicked.node._type === MarkerType.AREA) {
        // TODO: Set mode to area
        return
      }
    }

    if (w.version === WorldVersion.MOBILE) {
      if (clicked.node._type === MarkerType.PROJECT) {
        if (w.mode === WorldMode.PROJECT_PREVIEW && clicked.node._id !== w.activeMarker.node._id)
          return dispatch(setWorldMode(WorldMode.PROJECTS_EXPLORE))

        if (w.mode === WorldMode.PROJECTS_EXPLORE)
          return dispatch(setWorldMode(WorldMode.PROJECT_PREVIEW, { marker: clicked }))
      }

      if (clicked.node._type === MarkerType.AREA) {
        // TODO: Set mode to area
        return
      }
    }
  }
}

export function toggleMarkers(show: boolean, duration = 750) {
  return function action(dispatch: any, getState: any) {
    const w = getState().world

    console.log(`toggleMarkers(${show}). store = ${w.markerVisible})`)

    // No action needed
    if (w.markersVisible === show)
      return 0

    w.markers.forEach((marker: any) => {
      const scale = marker.__threeObj.scale
      const size = show === true ? 1 : 0

      new TWEEN.Tween({ ...scale })
        .to({ x: size, y: size, z: size }, duration)
        .onUpdate(d => {
          marker.__threeObj.scale.set(d.x, d.y, d.z)
        })
        .easing(TWEEN.Easing.Cubic.InOut)
        .start()

      if (marker.pulsingRing)
        show ? continuePulsingMarkerTween(marker) : pausePulsingMarkerTween(marker)

    })

    dispatch({ type: SET_VISIBILITY_MARKERS, payload: show })
    return duration
  }
}

export function createPulsingMarkers() {
  return function action(dispatch: any, getState: any) {
    const world = getState().world

    const geometry = new THREE.CircleGeometry(world.version === WorldVersion.MOBILE ? 7 : 3.5, 25, 25)
    geometry.vertices.splice(0, 1)
    const material = new THREE.LineBasicMaterial({ color: 'white', transparent: true })

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

        if (world.mode !== WorldMode.PROJECTS_EXPLORE && world.mode !== WorldMode.PROJECT_PREVIEW) {
          pausePulsingMarkerTween(marker)
        }
      }
    })
  }
}

// Pulsing TWEENS
const createPulsingMarkerTween = (ring: any) => {
  return new TWEEN.Tween({ scale: 1, opacity: 1 })
    .to({ scale: 2, opacity: 0 }, 1000)
    .repeat(Infinity)
    .onUpdate(d => {
      ring.scale.set(d.scale, d.scale, d.scale)
      ring.material.opacity = d.opacity
    })
    .start()
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
