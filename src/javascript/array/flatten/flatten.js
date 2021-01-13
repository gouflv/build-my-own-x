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

const flattenDeep = (value, deep, prevValue = []) => {
  const arr = Array.from(value)
  const result = prevValue
  for (const val of arr) {
    if (isArrayLike(val) && deep > 0) {
      flattenDeep(val, deep - 1, prevValue)
    } else {
      result.push(val)
    }
  }
  return result
}
