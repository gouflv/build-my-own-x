/**
 * find place and swap
 */
export const insertionSort = (arr: number[]) => {
  let curr, j

  for (let i = 1; i < arr.length; i++) {
    curr = arr[i]

    // move j to j + 1
    for (j = i - 1; j >= 0 && arr[j] > curr; j--) {
      arr[j + 1] = arr[j]
    }
    // set curr to j + 1
    arr[j + 1] = curr
  }

  return arr
}
