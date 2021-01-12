import { defaults } from './defaults'

describe('Test defaults', () => {
  it('simple defaults', () => {
    const a = { a: 1 }
    const b = { b: 2 }
    const c = { a: 3 }
    expect(defaults(a, b)).toStrictEqual({ a: 1, b: 2 })
    expect(defaults(a, b, c)).toStrictEqual({ a: 1, b: 2 })
    expect(defaults({}, a, b, c)).toStrictEqual({ a: 1, b: 2 })
  })
})
