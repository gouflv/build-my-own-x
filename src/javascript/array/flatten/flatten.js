import { isArrayLike, isNumber } from '../../lang/is/is'

export const flatten = (arr, deep = Infinity) => {
  if (!isArrayLike(arr)) {
    return []
  }
  if (!isNumber(deep) || deep < 1) {
    return []
  }
  return flattenDeep(arr, deep)
}

const flattenDeep = (value, deep) => {
  return Array.from(value).reduce((res, val) => {
    if (deep && isArrayLike(val)) {
      res.push(...flattenDeep(val, deep - 1))
    } else {
      res.push(val)
    }
    return res
  }, [])
}
