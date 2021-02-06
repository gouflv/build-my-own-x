/**
 * find place and swap
 */
export const insertionSort = (arr: number[]) => {
  let curr, j

  for (let i = 1; i < arr.length; i++) {
    curr = arr[i]

    j = i - 1
    while (j >= 0 && arr[j] > curr) {
      j--
    }

    console.log(`move ${j}:${arr[j]} to ${i}:${curr}`)

    // ;[arr[i], arr[j + 1]] = [arr[j + 1], arr[i]]
  }

  console.log(arr)
  return arr
}
