import { isReactive, reactive, toRaw } from './reactive'

describe('Test reactive', () => {
  it('types reactive', () => {
    expect(reactive(void 0)).toBeUndefined()
    expect(reactive(null)).toBeNull()
    expect(reactive(1)).toBe(1)
    expect(reactive(true)).toBe(true)
    expect(reactive('foo')).toBe('foo')
  })

  it('object reactive', () => {
    const obj = { a: 1, b: { c: 2 } }
    const observed = reactive(obj)
    expect(observed).not.toBe(obj)
    expect(observed.a).toBe(1)
    expect(toRaw(observed)).toBe(obj)
    expect(isReactive(observed)).toBeTruthy()
    expect(isReactive({})).not.toBeTruthy()
  })

  it('array reactive', () => {
    const array = [1, 2, 3]
    const observed = reactive(array)
    expect(observed).not.toBe(array)
    expect(toRaw(observed)).toBe(array)
    expect(isReactive(observed)).toBeTruthy()
  })
})
