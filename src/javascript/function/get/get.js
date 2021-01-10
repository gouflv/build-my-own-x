import {
  isArrayLike,
  isObjectLike,
  isString,
  isUndefined
} from '../../lang/is/is'
import { pathParser } from '../../_/pathParser/pathParser'

export const get = (obj, path, defaultValue = undefined) => {
  if (!path) {
    return defaultValue
  }

  const pathArr = isString(path) ? pathParser(path) : Array.from(path)

  if (!pathArr.length) {
    return defaultValue
  }

  let index = -1
  let res = obj

  while (++index < pathArr.length) {
    res =
      isObjectLike(res) || isArrayLike(res) ? res[pathArr[index]] : undefined
  }

  return isUndefined(res) ? defaultValue : res
}
