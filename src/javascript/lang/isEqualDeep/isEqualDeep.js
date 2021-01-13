import { isArray, isObjectLike } from '../is/is'
import { isEqual } from '../isEqual/isEqual'
import { keys } from '../../object/keys/keys'
import { toStringTag } from '../_/setup'

export const isEqualDeep = (x, y) => {
  if (isEqual(x, y)) {
    return true
  }
  return baseIsEqualDeep(x, y)
}

const baseIsEqualDeep = (x, y) => {
  if (toStringTag(x) !== toStringTag(y)) {
    return false
  }

  if (isArray(x)) {
    return isArrayDeepEqual(x, y)
  }

  if (isObjectLike(x)) {
    return isObjectDeepEqual(x, y)
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
