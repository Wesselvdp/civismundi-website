// @ts-nocheck
import { GLOBE_RADIUS } from './constants'

const toGeoCoords = ({ x, y, z }) => {
  const r = Math.sqrt(x * x + y * y + z * z)
  const phi = Math.acos(y / r)
  const theta = Math.atan2(z, x)

  return {
    lat: 90 - (phi * 180) / Math.PI,
    lng: 90 - (theta * 180) / Math.PI - (theta < -Math.PI / 2 ? 360 : 0), // keep within [-180, 180] boundaries
    altitude: r / GLOBE_RADIUS - 1,
  }
}

export const pointOfView = (camera: any) => {
  return toGeoCoords(camera.position)
}
