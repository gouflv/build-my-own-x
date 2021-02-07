/**
 * recursive split array and merge
 */
export const mergeSort = <T = number>(arr: T[]) => {
  if (arr.length <= 1) {
    return arr
  }

  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid, arr.length))

  function mergeSortFn(left: T[], right: T[]) {
    const result: T[] = []

    let l = 0,
      r = 0,
      min: T | undefined = undefined

    // find min and push to result
    while (l < left.length && r < right.length) {
      min = undefined
      if (left[l] <= right[r]) {
        min = left[l]
        l++
      } else {
        min = right[r]
        r++
      }
      result.push(min)
    }

    // concat reminds
    return [...result, ...left.slice(l), ...right.slice(r)]
  }

  return mergeSortFn(left, right)
}
