import { isReactive, reactive, toRaw } from './reactive'
import { effect } from './effect'

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

  it('track', () => {
    const obj = { a: 1, b: { c: 2 } }
    const observed = reactive(obj)

    let c
    effect(() => (c = observed.b.c))
    expect(c).toBe(2)
    observed.b.c = 3
    expect(c).toBe(3)
  })
})
