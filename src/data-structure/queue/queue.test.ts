import { Queue } from './queue'

describe('Test Queue', () => {
  it('should all APIs work', () => {
    const queue = new Queue()

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.size()).toBe(3)

    const front = queue.front()
    expect(front).toBe(1)
    expect(queue.size()).toBe(3)

    const dequeued = queue.dequeue()
    expect(dequeued).toBe(1)
    expect(queue.front()).toBe(2)

    expect(queue.isEmpty()).toBeFalsy()
    queue.clear()
    expect(queue.isEmpty()).toBeTruthy()

    expect(queue.front()).toBeUndefined()
    expect(queue.dequeue()).toBeUndefined()
  })
})
