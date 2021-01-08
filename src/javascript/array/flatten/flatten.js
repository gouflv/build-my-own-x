import { isArrayLike, isNumber } from '../../lang/is/is'

export const flatten = (arr, deep = Infinity) => {
  if (!isArrayLike(arr)) {
    return []
  }
  if (!isNumber(deep) || deep <= 1) {
    return []
  }
  return flattenDeep(arr, deep, 1, [])
}

const flattenDeep = (value, deep, level, prevValue) => {
  const arr = Array.from(value)
  const result = prevValue
  for (let i = 0; i < arr.length; i++) {
    if (isArrayLike(arr[i])) {
      flattenDeep(arr[i], deep, ++level, prevValue)
    } else {
      result.push(arr[i])
    }
  }
  return result
}
