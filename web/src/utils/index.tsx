import { get } from 'lodash'
// import console = require('console');

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
