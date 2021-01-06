import { isArrayDeepEqual, isEqualDeep, isObjectDeepEqual } from './isEqualDeep'
import { cloneDeep } from '../clone/clone'

describe('Test isEqualDeep', () => {
  describe('inner functions', () => {
    it('simple object deep equal', () => {
      const a = { foo: 1, bar: 2 }
      const b = { foo: 1, bar: 2 }
      const c = { foo: 2, bar: 2 }
      const d = { foo: 2 }
      expect(isObjectDeepEqual(a, b)).toBeTruthy()
      expect(isObjectDeepEqual(a, c)).not.toBeTruthy()
      expect(isObjectDeepEqual(c, d)).not.toBeTruthy()
      expect(isObjectDeepEqual(a, {})).not.toBeTruthy()
    })

    it('simple array deep equal', () => {
      const a = [undefined, null, 1, 'foo', true]
      const b = [undefined, null, 1, 'foo', true]
      const c = [undefined, null, 1, 'foo']
      expect(isArrayDeepEqual(a, b)).toBeTruthy()
      expect(isArrayDeepEqual(a, c)).not.toBeTruthy()
    })
  })

  it('check primitive value equalDeep', () => {
    expect(isEqualDeep(undefined, undefined)).toBeTruthy()
    expect(isEqualDeep(null, null)).toBeTruthy()
    expect(isEqualDeep(0, -0)).toBeTruthy()
    expect(isEqualDeep('foo', 'foo')).toBeTruthy()
  })

  it('check rich object equalDeep', () => {
    const a = { foo: 1, bar: [1, 2], baz: { a: [1, 2] } }
    const b = { foo: 1, bar: [1, 2], baz: { a: [1, 2] } }
    const c = { foo: 2, bar: [1, 2, 3], baz: { a: [1, 2] } }
    const d = cloneDeep(c)
    const e = { foo: 2, bar: [1, 2, 3], baz: { a: [1, 2, 3] } }
    expect(isEqualDeep(a, b)).toBeTruthy()
    expect(isEqualDeep(a, c)).not.toBeTruthy()
    expect(isEqualDeep(c, d)).toBeTruthy()
    expect(isEqualDeep(c, e)).not.toBeTruthy()
  })

  it('check rich array equalDeep', () => {
    const a = ['foo', { bar: '1', baz: [1, 2] }]
    const b = ['foo', { bar: '1', baz: [1, 2] }]
    const c = ['foo', { bar: '1', baz: [1, 2, 3] }]
    expect(isEqualDeep(a, b)).toBeTruthy()
    expect(isEqualDeep(a, c)).not.toBeTruthy()
  })
})
