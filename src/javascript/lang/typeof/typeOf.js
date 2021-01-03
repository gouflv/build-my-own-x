import { isObjectLike } from '../is/is'
import { toStringTag } from '../utils'

export const typeOf = val => {
  let result = typeof val

  if (isObjectLike(val)) {
    result = val.constructor.name || toStringTag(val).slice(8, -1)
  }

  return result.toLowerCase()
}
