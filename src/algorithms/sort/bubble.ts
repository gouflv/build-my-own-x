/**
 * bubble max num to end
 */
export const bubbleSort = <T = number>(arr: T[]) => {
  let swapped = false
  let len = arr.length

  do {
    swapped = false
    for (let i = 1; i < len; i++) {
      if (arr[i - 1] > arr[i]) {
        ;[arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
        swapped = true
      }
    }
    len--
  } while (swapped)

  return arr
}
