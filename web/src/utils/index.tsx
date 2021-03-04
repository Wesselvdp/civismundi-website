import { get } from 'lodash'

export const stringifyArray = (
  array: any[],
  key: string,
  character = ', ',
  options: any = {}
) => {
  if (!array || !array.length) return

  let str = ''
  array.forEach((obj: any, i: number) => {
    let value = key ? get(obj, key) : obj
    if (value && options.uppercase) value = value.toUpperCase()

    if (value) str += `${value}${i !== array.length - 1 ? character : ''}`
  })

  return str
}

export const getVideoId = (url: string) => {
  if (url.includes('vimeo')) {
    return get(url.split('.com/'), '[1]', url)
  }

  if (url.includes('youtube')) {
    return get(url.split('?v='), '[1]', url)
  }
}

export const calculateCameraZ = () => {
  const base = 350
  if (window.innerWidth > 760) return base

  let aspect = window.innerWidth / window.innerHeight
  if (aspect < 1) aspect = window.innerHeight / window.innerWidth
  aspect = Math.min(aspect, 2)

  // magic
  const multiplier = 0.4
  const z = base + aspect * multiplier * base - multiplier * base

  return z
}

export const R = (max: number, min: number): number => {
  return Math.random() * (max - min) + min
}
