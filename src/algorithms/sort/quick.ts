export const quickSort = <T = number>(
  arr: T[],
  start = 0,
  end = arr.length - 1
) => {
  if (start < end) {
    const index = partition(arr, start, end)
    quickSort(arr, start, index - 1)
    quickSort(arr, index + 1, end)
  }
  return arr
}

function partition<T>(arr: T[], start: number, end: number) {
  const pivot = arr[end]

  let partitionIndex = start

  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      // move arr[i] to left side of pivot
      ;[arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]]
      partitionIndex++
    }
  }

  // put pivot to sorted arr tail
  ;[arr[end], arr[partitionIndex]] = [arr[partitionIndex], arr[end]]

  return partitionIndex
}
