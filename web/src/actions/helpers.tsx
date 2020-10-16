import { get } from 'lodash'
import TWEEN from '@tweenjs/tween.js'

import { MarkerType, WorldVersion } from '.'

export const getProjectFromSlug = (slug: string, projects: any[]) =>
  projects.find(
    (project: any) =>
      project.node._type === 'project' && project.node.slug.current === slug
  )

export const getProjectsFromArea = (projects: any[], area: any) => {
  return projects.filter(
    (p: any) =>
      p.node.locationGroup && p.node.locationGroup._id === area.node._id
  )
}

export const updateLightningPosition = (world: any) => {
  const lightning = world.lightning
  const camera = world.ref.current.camera()

  if (camera && lightning) {
    lightning.position.copy(camera.position)
  }
}

export const calculateCameraZ = () => {
  let aspect = window.innerWidth / window.innerHeight
  if (aspect < 1) aspect = window.innerHeight / window.innerWidth
  aspect = Math.min(aspect, 2)

  // magic
  const base = 350
  const multiplier = 0.4
  const z = base + aspect * multiplier * base - multiplier * base

  return z
}

export const moveMarkerToCenter = (world: any, duration = 1000) => {
  const coords = world.active.area
    ? world.active.area.node.location
    : world.active.project.node.location

  world.ref.current.pointOfView(
    {
      lat: coords.lat - 25,
      lng: coords.lng,
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
  const lengthTo = calculateCameraZ()

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

export const moveToMarker = (world: any, duration = 1500) => {
  if (!world.active) return

  const controls = world.ref.current.controls()
  const camera = world.ref.current.camera()

  const coords = world.active.area
    ? world.active.area.node.location
    : world.active.project.node.location
  const camPos = camera.position
  const camPosTo = world.ref.current.getCoords(coords.lat - 20, coords.lng, 0.4)

  const target = controls.target
  const targetTo = world.ref.current.getCoords(coords.lat, coords.lng, 0.25)

  // Move camera to marker
  new TWEEN.Tween({ target: { ...target }, position: { ...camPos } })
    .to({ target: { ...targetTo }, position: { ...camPosTo } }, duration)
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
