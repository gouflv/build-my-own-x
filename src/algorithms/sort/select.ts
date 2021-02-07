/**
 * find min num and swap
 */
export const selectSort = <T = number>(arr: T[]) => {
  arr.forEach((v, i) => {
    let minIndex = i

    // begin from i + 1, because it is already sorted before i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }

    if (minIndex !== i) {
      ;[arr[minIndex], arr[i]] = [arr[i], arr[minIndex]]
    }
  })

  return arr
}
