import { sequence } from './sequence'

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

describe('Test sequence', () => {
  it('simple', done => {
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

  it('should catch error', done => {
    const sequenceFn = sequence([task(1), task(2), createErrorTask(3), task(4)])

    sequenceFn((error, data) => {
      expect(error).toBe(3)
      expect(data).toBeUndefined()
      done()
    })
    jest.runAllTimers()
  })
})
