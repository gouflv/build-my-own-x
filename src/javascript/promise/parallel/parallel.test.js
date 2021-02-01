import { parallel } from './parallel'

jest.useFakeTimers()

const createTask = id => {
  return new Promise(resolve => {
    setTimeout(() => resolve(id), 1000)
  })
}

const createErrorTask = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(id), 100)
  })
}

describe('Test parallel', () => {
  afterEach(() => jest.clearAllTimers())

  it('simple', done => {
    const called = jest.fn()
    const paralleled = parallel([createTask(1), createTask(2), createTask(3)])

    expect(called).not.toBeCalled()

    paralleled((error, data) => {
      expect(error).toBeUndefined()
      expect(data.length).toBe(3)
      expect(data.includes(1)).toBeTruthy()
      expect(data.includes(2)).toBeTruthy()
      expect(data.includes(3)).toBeTruthy()
      done()
    })
    jest.runAllTimers()
  })

  it('should catch error', done => {
    const parallelFn = parallel([
      createTask(1),
      createTask(2),
      createErrorTask(3),
      createTask(4)
    ])

    parallelFn((error, data) => {
      expect(error).toBe(3)
      expect(data).toBeUndefined()
      done()
    })
    jest.runAllTimers()
  })
})
