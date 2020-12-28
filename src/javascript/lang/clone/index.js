import { isArray, isBoolean, isNumber, isObjectLike, isString } from '../is'
import { toStringTag } from '../utils'

export const clone = val => {
  if (!isObjectLike(val)) return val

  if (isBoolean(val)) return new Boolean(val)

  if (isNumber(val)) return new Number(+val)

  if (isString(val)) return new String(val)

  if (isArray(val)) return [...val]

  if (isObjectLike(val) && toStringTag(val) === '[object Date]')
    return new Date(val.getTime())

  return Object.assign({}, val)
}
