import { sequence } from './sequence'
import { errorTask, task } from '../_/utils'

jest.useFakeTimers()

describe('Test sequence', () => {
  it('resolve promise in orders', done => {
    const called = jest.fn()
    const sequenceFn = sequence([task(3), task(1), task(2)])

    expect(called).not.toBeCalled()

    sequenceFn((error, data) => {
      expect(error).toBeUndefined()
      expect(data).toStrictEqual([3, 1, 2])
      done()
    })

    jest.runAllTimers()
  })

  it('should catch first error', done => {
    const sequenceFn = sequence([
      task(1),
      task(2),
      errorTask(3),
      task(4),
      errorTask(5)
    ])

    sequenceFn((error, data) => {
      expect(error).toBe(3)
      expect(data).toBeUndefined()
      done()
    })
    jest.runAllTimers()
  })
})
