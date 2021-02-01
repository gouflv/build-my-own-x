import { parallel } from './parallel'

jest.useFakeTimers()

const task = id => {
  return new Promise(resolve => {
    setTimeout(() => resolve(id), id * 100)
  })
}

const createErrorTask = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(id), 100)
  })
}

describe('Test parallel', () => {
  it('simple', done => {
    const called = jest.fn()
    const paralleled = parallel([task(1), task(2), task(3)])

    expect(called).not.toBeCalled()

    paralleled((error, data) => {
      expect(error).toBeUndefined()
      expect(data).toStrictEqual([1, 2, 3])
      done()
    })
    jest.runAllTimers()
  })

  it('should catch error', done => {
    const parallelFn = parallel([task(1), task(2), createErrorTask(3), task(4)])

    parallelFn((error, data) => {
      expect(error).toBe(3)
      expect(data).toBeUndefined()
      done()
    })
    jest.runAllTimers()
  })
})
