import { defaults } from './defaults'

describe('Test defaults', () => {
  it('simple defaults', () => {
    expect(defaults()).toStrictEqual({})
    expect(defaults(undefined)).toStrictEqual({})
    expect(defaults(null)).toStrictEqual({})
    expect(defaults(1)).toStrictEqual(new Number(1))
    expect(defaults(true)).toStrictEqual(new Boolean(true))
    expect(defaults('')).toStrictEqual(new String(''))
    expect(defaults([])).toStrictEqual([])
    expect(defaults({}, [])).toStrictEqual({})
    expect(defaults([1], [1, 2])).toStrictEqual([1, 2])
  })

  it('object defaults', () => {
    const a = { a: 1 }
    const b = { b: 2 }
    const c = { a: 3 }
    expect(defaults(a, b)).toStrictEqual({ a: 1, b: 2 })
    expect(defaults(a, b, c)).toStrictEqual({ a: 1, b: 2 })
    expect(defaults({}, a, b, c)).toStrictEqual({ a: 1, b: 2 })
  })
})
