import { get } from 'lodash'
import TWEEN from '@tweenjs/tween.js'

import { WorldVersion } from '.'

export const getMarkerFromPath = (pathname: string, markers: any[]) => {
  const projectSlug = get(pathname.split('/'), '[2]')

  return markers.find(
    (marker: any) =>
      marker.node._type === 'project' &&
      marker.node.slug.current === projectSlug
  )
}

export const getProjectsFromArea = (projects: any[], marker: any) => {
  return projects.filter(
    (p: any) =>
      p.node.locationGroup && p.node.locationGroup._id === marker.node._id
  )
}

export const updateLightningPosition = (world: any) => {
  const lightning = world.lightning
  const camera = world.ref.current.camera()

  if (camera && lightning) {
    lightning.position.copy(camera.position)
  }
}

export const moveMarkerToCenter = (
  world: any,
  marker: any,
  duration = 1000
) => {
  world.ref.current.pointOfView(
    {
      lat: marker.node.location.lat - 25,
      lng: marker.node.location.lng,
      alt: 0.05,
    },
    duration
  )

  return duration
}

export const setCameraInitialPosition = (world: any, duration = 1500) => {
  const controls = world.ref.current.controls()
  const camera = world.ref.current.camera()

  const target = controls.target
  const targetTo = { x: 0, y: 0, z: 0 }

  const length = camera.position.length()
  const lengthTo = world.version === WorldVersion.MOBILE ? 500 : 350

  // Change target and camera position
  new TWEEN.Tween({ target: { ...target }, length })
    .to({ target: { ...targetTo }, length: lengthTo }, duration)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate((d: any) => {
      controls.target.set(d.target.x, d.target.y, d.target.z)
      camera.position.setLength(d.length)
    })
    .start()

  return duration
}

export const moveToMarker = (world: any, marker: any, duration = 1500) => {
  const controls = world.ref.current.controls()
  const camera = world.ref.current.camera()

  const position = camera.position
  const positionTo = world.ref.current.getCoords(
    marker.node.location.lat > 0
      ? marker.node.location.lat - 20
      : marker.node.location.lat + 20,
    marker.node.location.lng,
    0.4
  )

  const target = controls.target
  const targetTo = world.ref.current.getCoords(
    marker.node.location.lat,
    marker.node.location.lng,
    0.2
  )

  // Move camera to marker
  new TWEEN.Tween({ target: { ...target }, position: { ...position } })
    .to({ target: { ...targetTo }, position: { ...positionTo } }, duration)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate((d) => {
      camera.position.set(d.position.x, d.position.y, d.position.z)
      controls.target.set(d.target.x, d.target.y, d.target.z)
    })
    .start()
}

export const getWorldVersion = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 600 ? WorldVersion.MOBILE : WorldVersion.DESKTOP
  }

  return WorldVersion.DESKTOP
}
