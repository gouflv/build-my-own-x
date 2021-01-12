import { isArrayLike, isNumber } from '../../lang/is/is'

export const flatten = (arr, deep = Infinity) => {
  if (!isArrayLike(arr)) {
    return []
  }
  if (!isNumber(deep) || deep < 1) {
    return []
  }
  return flattenDeep(arr, deep, [])
}

const flattenDeep = (value, deep, prevValue) => {
  const arr = Array.from(value)
  const result = prevValue

  if (deep < 0) {
    result.push(arr)
    return
  }

  for (let i = 0; i < arr.length; i++) {
    if (isArrayLike(arr[i])) {
      flattenDeep(arr[i], deep - 1, prevValue)
    } else {
      result.push(arr[i])
    }
  }

  return result
}
