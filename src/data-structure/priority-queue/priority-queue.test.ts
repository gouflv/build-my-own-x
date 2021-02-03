import { PriorityQueue } from './priority-queue'

describe('Test PriorityQueue', () => {
  it('should all APIs work', () => {
    // @ts-ignore
    const queue = new PriorityQueue((a, b) => b - a)

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.enqueue(4)
    queue.enqueue(5)
    expect(queue.size()).toBe(5)

    const front = queue.front()
    expect(front).toBe(5)
    expect(queue.size()).toBe(5)

    const dequeued = queue.dequeue()
    expect(dequeued).toBe(5)
    expect(queue.front()).toBe(4)
    expect(queue.dequeue()).toBe(4)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBe(2)

    expect(queue.size()).toBe(1)
    expect(queue.isEmpty()).toBeFalsy()
    queue.clear()
    expect(queue.isEmpty()).toBeTruthy()

    expect(queue.front()).toBeUndefined()
    expect(queue.dequeue()).toBeUndefined()
  })
})
