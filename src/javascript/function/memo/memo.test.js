import { memo } from './memo'

describe('Test memo', () => {
  it('call function with simple arguments', () => {
    const called = jest.fn()
    const func = (a, b) => {
      called()
      return a + b
    }
    const memoed = memo(func, (...args) => args.join('-'))

    expect(memoed(1, 2)).toBe(3)
    expect(called).toBeCalledTimes(1)
    memoed(1, 2)
    expect(called).toBeCalledTimes(1)
    memoed(1, 3)
    expect(called).toBeCalledTimes(2)
  })

  it('call function with object', () => {
    const called = jest.fn()
    const func = a => {
      called()
      return Object.keys(a)
    }
    const memoed = memo(func)

    const arg = { a: 1 }
    expect(memoed(arg)).toStrictEqual(['a'])
    expect(called).toBeCalledTimes(1)
    memoed(arg)
    expect(called).toBeCalledTimes(1)
    memoed({ b: 2 })
    expect(called).toBeCalledTimes(2)
  })
})
