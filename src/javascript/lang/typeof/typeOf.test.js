import { typeOf } from './typeof'

describe('Test typeOf', () => {
  it('get typeOf primitive values', () => {
    expect(typeOf(undefined)).toBe('undefined')
    expect(typeOf(null)).toBe('object')
    expect(typeOf(true)).toBe('boolean')
    expect(typeOf(1)).toBe('number')
    expect(typeOf('foo')).toBe('string')
  })

  it('get typeOf build-ins objects', () => {
    expect(typeOf([])).toBe('array')
    expect(typeOf({})).toBe('object')
    expect(typeOf(new Set())).toBe('set')
  })

  it('get typeOf class instance', () => {
    function Foo() {}
    const o = new Foo()
    expect(typeOf(o)).toBe('foo')
  })
})
