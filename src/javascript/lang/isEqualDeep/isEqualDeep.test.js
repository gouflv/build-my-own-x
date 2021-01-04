import { isEqualDeep } from './isEqualDeep'

describe('Test isEqualDeep', () => {
  it('check value equalDeep', () => {
    expect(isEqualDeep(undefined, undefined)).toBeTruthy()
    expect(isEqualDeep(null, null)).toBeTruthy()
    expect(isEqualDeep(0, -0)).toBeTruthy()
    expect(isEqualDeep('foo', 'foo')).toBeTruthy()
  })

  it('check object equalDeep', () => {
    const a = { foo: 1 }
    const b = { foo: 1 }
    const c = { foo: 2 }

    expect(isEqualDeep(a, b)).toBeTruthy()
    expect(isEqualDeep(a, c)).not.toBeTruthy()
    expect(isEqualDeep(a, true)).not.toBeTruthy()
  })

  it('check array equalDeep', () => {
    const a = [undefined, null, 1, 'foo', true, { foo: '1' }]
    const b = [undefined, null, 1, 'foo', true, { foo: '1' }]
    const c = [undefined, null, 1, 'bar', true, { foo: '1' }]
    const d = [undefined, null, 1, 'foo', true, { foo: '2' }]
    expect(isEqualDeep(a, b)).toBeTruthy()
    expect(isEqualDeep(a, c)).not.toBeTruthy()
    expect(isEqualDeep(a, d)).not.toBeTruthy()
    expect(isEqualDeep(a, true)).not.toBeTruthy()
  })
})
