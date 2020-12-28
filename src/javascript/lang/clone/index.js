import {
  isArguments,
  isArray,
  isBoolean,
  isNumber,
  isObjectLike,
  isString
} from '../is'
import { toStringTag } from '../utils'

export const clone = val => {
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

  const target = Object.create(Object.getPrototypeOf(val))

  return Object.assign(target, val)
}
