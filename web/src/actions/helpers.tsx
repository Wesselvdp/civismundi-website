import TWEEN from '@tweenjs/tween.js'

import { WorldVersion } from '.'

export const getProjectFromSlug = (slug: string, projects: any[]) =>
  projects.find(
    (project: any) =>
      project.node._type === 'project' && project.node.slug.current === slug
  )

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
  if (!world.active || !world.active.project) return

  const coords = world.active.project.node.location

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
  const lengthTo =
    world.version === WorldVersion.MOBILE ? calculateCameraZ() : 350

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
  if (!world.active || !world.active.project) return

  const controls = world.ref.current.controls()
  const camera = world.ref.current.camera()

  const coords = world.active.project.node.location

  const target = controls.target
  const targetTo = world.ref.current.getCoords(coords.lat, coords.lng, 0.25)

  const geoCoords = world.ref.current.toGeoCoords(camera.position)
  const geoCoordsTo = Object.assign({}, geoCoords, {
    lat: coords.lat - 20,
    lng: coords.lng,
    altitude: 0.4,
  })

  while (geoCoords.lng - geoCoordsTo.lng > 180) geoCoords.lng -= 360
  while (geoCoords.lng - geoCoordsTo.lng < -180) geoCoords.lng += 360

  // Move camera to marker
  new TWEEN.Tween({
    target: { ...target },
    position: { ...geoCoords },
  })
    .to(
      {
        target: { ...targetTo },
        position: { ...geoCoordsTo },
      },
      duration
    )
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate((d) => {
      const coords = world.ref.current.getCoords(
        d.position.lat,
        d.position.lng,
        d.position.altitude
      )

      camera.position.set(coords.x, coords.y, coords.z)
      controls.target.set(d.target.x, d.target.y, d.target.z)
    })
    .start()
}

export const getWorldVersion = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 600 ||
      (window.matchMedia('(orientation: landscape)').matches &&
        window.innerWidth < 850)
      ? WorldVersion.MOBILE
      : WorldVersion.DESKTOP
  }

  return WorldVersion.DESKTOP
}
