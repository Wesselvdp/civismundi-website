import { get } from 'lodash'

export const stringifyArray = (array: any[], key: string, character = ', ') => {
  if (!array || !array.length) return

  let str = ''
  array.forEach((obj: any, i: number) => {
    const value = key ? get(obj, key) : obj
    if (value) str += `${value} ${i !== array.length - 1 ? character : ''}`
  })

  return str
}
