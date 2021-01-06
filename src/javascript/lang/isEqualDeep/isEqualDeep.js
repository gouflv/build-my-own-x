import { isArray, isObjectLike } from '../is/is'
import { isEqual } from '../isEqual/isEqual'
import { keys } from '../../object/keys/keys'
import { toStringTag } from '../utils'

export const isEqualDeep = (x, y) => {
  if (x === y) {
    return true
  }

  if (isEqual(x, y)) {
    return true
  }

  return baseIsEqualDeep(x, y)
}

const baseIsEqualDeep = (x, y) => {
  const xTag = toStringTag(x)
  const yTag = toStringTag(y)

  if (xTag !== yTag) {
    return false
  }

  if (isObjectLike(x)) {
    return isObjectDeepEqual(x, y)
  }

  if (isArray(x)) {
    return isArrayDeepEqual(x, y)
  }

  return isEqual(x, y)
}

export const isObjectDeepEqual = (x, y) => {
  const xKeys = keys(x)
  const yKeys = keys(x)

  if (xKeys.length !== yKeys.length) {
    return false
  }

  return xKeys.every(xk => baseIsEqualDeep(x[xk], y[xk]))
}

export const isArrayDeepEqual = (x, y) =>
  isArray(x) &&
  isArray(y) &&
  x.length === y.length &&
  x.every((v, i) => baseIsEqualDeep(v, y[i]))
