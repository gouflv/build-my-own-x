import { typeOf } from './typeof'

describe('Test typeOf', () => {
  it('get typeOf primitive values', () => {
    expect(typeOf(undefined)).toBe('undefined')
    expect(typeOf(null)).toBe('object')
    expect(typeOf(NaN)).toBe('number')
    expect(typeOf(true)).toBe('boolean')
    expect(typeOf(1)).toBe('number')
    expect(typeOf('foo')).toBe('string')
  })

  it('get typeOf build-ins objects', () => {
    expect(typeOf([])).toBe('array')
    expect(typeOf({})).toBe('object')
    expect(typeOf(() => {})).toBe('function')
    expect(typeOf(new Set())).toBe('set')
  })

  it('get typeOf class instance', () => {
    function Foo() {}
    expect(typeOf(new Foo())).toBe('foo')

    class Bar {}
    expect(typeOf(new Bar())).toBe('bar')
  })
})
