import { Heap } from '../../data-structure/tree/heap/heap'

export const heapSort = <T>(arr: T[]) => {
  const minHeap = new Heap<T>((a, b) => a <= b)
  const sorted: T[] = []

  arr.forEach(it => minHeap.add(it))

  while (!minHeap.isEmpty()) {
    const n = minHeap.poll()
    sorted.push(n as T)
  }

  return sorted
}
