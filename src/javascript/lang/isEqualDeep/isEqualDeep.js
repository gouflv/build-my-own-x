import { isObjectLike, isArrayLike } from '../is/is'
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
  return false
}
