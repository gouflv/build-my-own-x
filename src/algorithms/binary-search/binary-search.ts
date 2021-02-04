/**
 *
 * @param arr ordered array
 * @param el
 * @param compare (a, b) => number
 *  <p>
 *   if return less then 0, a is on left side of b,
 *   if return more then 0, a is on right side of b,
 *   return 0 if them equal
 *  </p>
 * @return array index of el, get -1 if no found
 */
export function binarySearch<T = any>(
  arr: T[],
  el: T,
  compare: (a: T, b: T) => number
): number {
  let left = 0,
    right = arr.length - 1,
    found = -1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    const compareRes = compare(arr[mid], el)
    if (compareRes < 0) {
      left = mid + 1
    } else if (compareRes > 0) {
      right = mid - 1
    } else {
      found = mid
      break
    }
  }
  return found
}
