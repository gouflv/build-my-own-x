import { parallel } from './parallel'
import { taskReject, task } from '../_/utils'

describe('Test parallel', () => {
  it('resolve the faster promise', async () => {
    const paralleled = await parallel([task(3), task(1), task(2)])
    expect(paralleled).toEqual([1, 2, 3])
  })

  it('should catch the first error', async () => {
    const paralleled = await parallel([
      task(1),
      task(2),
      taskReject(3),
      task(4),
      taskReject(5)
    ])
    expect(paralleled).toEqual([1, 2, 3, 4, 5])
  })
})
