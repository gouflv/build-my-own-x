import { parallel } from './parallel'
import { errorTask, task } from '../_/utils'

jest.useFakeTimers()

describe('Test parallel', () => {
  it('resolve the faster promise', done => {
    const called = jest.fn()
    const paralleled = parallel([task(3), task(1), task(2)])

    expect(called).not.toBeCalled()

    paralleled((error, data) => {
      expect(error).toBeUndefined()
      expect(data).toStrictEqual([1, 2, 3])
      done()
    })
    jest.runAllTimers()
  })

  it('should catch the first error', done => {
    const parallelFn = parallel([
      task(1),
      task(2),
      errorTask(3),
      task(4),
      errorTask(5)
    ])

    parallelFn((error, data) => {
      expect(error).toBe(3)
      expect(data).toBeUndefined()
      done()
    })
    jest.runAllTimers()
  })
})
