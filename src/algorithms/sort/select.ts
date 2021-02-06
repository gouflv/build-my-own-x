export const selectSort = (arr: number[]) => {
  arr.forEach((v, i) => {
    let minIndex = i

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
