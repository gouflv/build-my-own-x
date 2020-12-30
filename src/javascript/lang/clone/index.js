import {
  isArguments,
  isArray,
  isBoolean,
  isNumber,
  isObjectLike,
  isString
} from '../is'
import { toStringTag } from '../utils'

const baseClone = (val, deep) => {
  if (!isObjectLike(val)) return val

  if (isBoolean(val)) return new Boolean(val)

  if (isNumber(val)) return new Number(+val)

  if (isString(val)) return new String(val)

  // TODO: optimize performance
  if (isArray(val) || isArguments(val)) return [...val]

  // Date
  if (toStringTag(val) === '[object Date]') return new Date(val.getTime())

  // Set
  if (toStringTag(val) === '[object Set]') {
    const result = new Set()
    val.forEach(v => {
      result.add(v)
    })
    return result
  }

  // Map
  if (toStringTag(val) === '[object Map]') {
    const result = new Map()
    val.forEach((val, key) => {
      result.set(key, val)
    })
    return result
  }

  const target = Object.create(Object.getPrototypeOf(val))

  for (const key in val) {
    if (!Object.getPrototypeOf(val) || val.hasOwnProperty(key)) {
      target[key] = deep ? baseClone(val[key], true) : val[key]
    }
  }

  return target
}

export const clone = val => baseClone(val)

export const cloneDeep = val => baseClone(val, true)
