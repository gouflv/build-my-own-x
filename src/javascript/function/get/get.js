import { isArrayLike, isUndefined } from '../../lang/is/is'

export const get = (obj, path, defaultValue = undefined) => {
  if (!path || !isArrayLike(path)) {
    return defaultValue
  }

  let index = -1,
    res = obj

  while (++index < path.length) {
    res = res[path[index]]
  }

  return isUndefined(res) ? defaultValue : res
}
