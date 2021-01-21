import { isArray, isUndefined } from '../../lang/is/is'

export const reduce = (arr, callback, initialValue) => {
  if (!isArray(arr)) {
    return arr
  }

  const hasInitialValue = !isUndefined(initialValue)

  const startIndex = hasInitialValue ? 0 : 1

  let result = hasInitialValue ? initialValue : arr[0]

  for (let i = startIndex; i < arr.length; i++) {
    result = callback(result, arr[i], i)
  }

  return result
}
