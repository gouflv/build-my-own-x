import { isArrayLike, isNumber } from '../../lang/is/is'

export const flatten = (arr, deep = Infinity) => {
  if (!isArrayLike(arr)) {
    return []
  }
  if (!isNumber(deep) || deep < 1) {
    return []
  }
  return flattenDeep(arr, deep, 0, [])
}

const flattenDeep = (value, deep, level, prevValue) => {
  const arr = Array.from(value)
  const result = prevValue

  if (level > deep) {
    result.push(arr)
    return
  }

  for (let i = 0; i < arr.length; i++) {
    if (isArrayLike(arr[i])) {
      flattenDeep(arr[i], deep, level + 1, prevValue)
    } else {
      result.push(arr[i])
    }
  }

  return result
}
