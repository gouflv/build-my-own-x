import { reactive, toRaw } from './reactive'

describe('Test reactive', () => {
  it('reactive types', () => {
    expect(reactive(void 0)).toBeUndefined()
    expect(reactive(null)).toBeNull()
    expect(reactive(1)).toBe(1)
    expect(reactive(true)).toBe(true)
    expect(reactive('foo')).toBe('foo')
  })

  it('object proxy', () => {
    const obj = { a: 1, b: { c: 2 } }
    const observed = reactive(obj)
    expect(observed).not.toBe(obj)
    expect(observed.a).toBe(1)
    observed.b.c = 3
    expect(observed).toStrictEqual({ a: 1, b: { c: 3 } })
    expect(toRaw(observed) === obj)
  })
})
