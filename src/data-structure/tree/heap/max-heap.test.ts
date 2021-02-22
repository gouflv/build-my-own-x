import { Heap } from './heap'

describe('Test MaxHeap', () => {
  let maxHeap: Heap<number>
  beforeEach(() => {
    maxHeap = new Heap((a, b) => a >= b)
  })

  it('should add item and heapify it up', () => {
    maxHeap.add(5)
    expect(maxHeap.peek()).toBe(5)

    maxHeap.add(3)
    expect(maxHeap.peek()).toBe(5)
    expect(maxHeap.toString()).toBe('5,3')

    maxHeap.add(10)
    expect(maxHeap.peek()).toBe(10)
    expect(maxHeap.toString()).toBe('10,3,5')

    maxHeap.add(1)
    expect(maxHeap.peek()).toBe(10)
    expect(maxHeap.toString()).toBe('10,3,5,1')

    maxHeap.add(1)
    expect(maxHeap.peek()).toBe(10)
    expect(maxHeap.toString()).toBe('10,3,5,1,1')
  })
})
