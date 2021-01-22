import { apply } from './apply'

describe('Test apply', () => {
  it('simple apply', () => {
    function greet() {
      return this.name
    }
    expect(apply(greet, { name: 'foo' })).toBe('foo')
  })

  it('apply with argument', () => {
    function greet(greeting) {
      return greeting + this.name
    }
    expect(apply(greet, { name: 'foo' }, ['Hi,'])).toBe('Hi,foo')
  })

  it('apply with arguments', () => {
    function count(a, b, c) {
      return this.initValue + a + b + c
    }
    expect(apply(count, { initValue: 10 }, [1, 2, 3])).toBe(16)
  })
})
