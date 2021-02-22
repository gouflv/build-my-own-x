import { Heap } from './heap'

describe('Test MinHeap', () => {
  let minHeap: Heap<number>
  beforeEach(() => {
    minHeap = new Heap((a, b) => a <= b)
  })

  it('should add item and heapify it up', () => {
    minHeap.add(5)
    expect(minHeap.peek()).toBe(5)

    minHeap.add(3)
    expect(minHeap.peek()).toBe(3)
    expect(minHeap.toString()).toBe('3,5')

    minHeap.add(10)
    expect(minHeap.peek()).toBe(3)
    expect(minHeap.toString()).toBe('3,5,10')

    minHeap.add(1)
    expect(minHeap.peek()).toBe(1)
    expect(minHeap.toString()).toBe('1,3,10,5')

    minHeap.add(1)
    expect(minHeap.peek()).toBe(1)
    expect(minHeap.toString()).toBe('1,1,10,5,3')
  })
})
