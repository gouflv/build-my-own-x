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

  it('should poll item and heapify it down (left child)', () => {
    ;[5, 3, 10, 11, 1].forEach(v => maxHeap.add(v))
    expect(maxHeap.toString()).toBe('11,10,5,3,1')

    expect(maxHeap.poll()).toBe(11)
    expect(maxHeap.toString()).toBe('10,3,5,1')

    expect(maxHeap.poll()).toBe(10)
    expect(maxHeap.toString()).toBe('5,3,1')

    expect(maxHeap.poll()).toBe(5)
    expect(maxHeap.toString()).toBe('3,1')

    expect(maxHeap.poll()).toBe(3)
    expect(maxHeap.toString()).toBe('1')

    expect(maxHeap.poll()).toBe(1)
    expect(maxHeap.toString()).toBe('')
  })

  it('should poll item and heapify it down (right child)', () => {
    ;[3, 12, 10].forEach(v => maxHeap.add(v))
    expect(maxHeap.toString()).toBe('12,3,10')

    maxHeap.add(11)
    expect(maxHeap.toString()).toBe('12,11,10,3')

    expect(maxHeap.poll()).toBe(12)
    expect(maxHeap.toString()).toBe('11,3,10')
  })
})
