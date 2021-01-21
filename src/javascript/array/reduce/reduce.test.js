import { reduce } from './reduce'

describe('Test reduce', () => {
  it('reduce with values', () => {
    expect(reduce(undefined)).toBe(undefined)
    expect(reduce(null)).toBe(null)
    expect(reduce(1)).toBe(1)
    expect(reduce(true)).toBe(true)
    expect(reduce('foo')).toBe('foo')
    expect(reduce({ a: 1 })).toStrictEqual({ a: 1 })
  })

  it('get sum of array', () => {
    const sum = reduce([1, 2, 3], (acc, val) => acc + val)
    expect(sum).toBe(6)
  })

  it('get sum of array with initialValue', () => {
    const sum = reduce([1, 2, 3], (acc, val) => acc + val, 10)
    expect(sum).toBe(16)
  })

  it('join string of array', () => {
    const joined = reduce([1, 2, 3], (acc, val) => acc + String(val))
    expect(joined).toBe('123')
  })
})
