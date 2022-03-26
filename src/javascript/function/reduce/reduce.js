export const reduce = (arr, callback, initialValue) => {
  const hasInitialValue = typeof initialValue !== 'undefined'
  const arrOffset = hasInitialValue ? 0 : 1
  let base = hasInitialValue ? initialValue : arr[0]

  arr.slice(arrOffset).forEach((it, index) => {
    base = callback(base, it, index + arrOffset, arr)
  })
  return base
}
