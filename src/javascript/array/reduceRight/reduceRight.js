import { isArray, isUndefined } from '../../lang/is/is'

export const reduceRight = (arr, callback, initialValue) => {
  if (!isArray(arr)) {
    return arr
  }

  const hasInitialValue = !isUndefined(initialValue)

  const startIndex = hasInitialValue ? arr.length - 1 : arr.length - 2

  let result = hasInitialValue ? initialValue : arr[arr.length - 1]

  let i = startIndex
  while (i >= 0) {
    result = callback(result, arr[i], i)
    i--
  }

  return result
}
