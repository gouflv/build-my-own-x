import {
  isArguments,
  isArray,
  isBoolean,
  isNumber,
  isObjectLike,
  isString
} from '../is/is'
import { toStringTag } from '../_/setup'

const copyArray = source => {
  let index = -1,
    len = source.length
  const array = Array(len)
  while (++index < len) {
    array[index] = source[index]
  }
  return array
}

const baseClone = (val, deep, objCache) => {
  if (!isObjectLike(val)) return val

  if (isBoolean(val)) return new Boolean(val)

  if (isNumber(val)) return new Number(+val)

  if (isString(val)) return new String(val)

  // TODO: optimize performance
  if (isArray(val) || isArguments(val)) return copyArray(val)

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

  objCache = objCache || new WeakMap()

  const target = Object.create(Object.getPrototypeOf(val))

  for (const key in val) {
    if (!Object.getPrototypeOf(val) || val.hasOwnProperty(key)) {
      if (deep) {
        const cached = objCache.get(val[key])
        if (cached) {
          target[key] = cached
        } else {
          const cloned = baseClone(val[key], true, objCache)
          target[key] = cloned

          if (isObjectLike(val[key])) {
            objCache.set(val[key], cloned)
          }
        }
      } else {
        target[key] = val[key]
      }
    }
  }

  return target
}

export const clone = val => baseClone(val)

export const cloneDeep = val => baseClone(val, true)
