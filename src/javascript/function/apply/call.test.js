import { call } from './call'

describe('Test call', () => {
  it('simple call', () => {
    function greet() {
      return this.name
    }
    expect(call(greet, { name: 'foo' })).toBe('foo')
  })

  it('call with argument', () => {
    function greet(greeting) {
      return greeting + this.name
    }
    expect(call(greet, { name: 'foo' }, 'Hi,')).toBe('Hi,foo')
  })

  it('call with arguments', () => {
    function count(a, b, c) {
      return this.initValue + a + b + c
    }
    expect(call(count, { initValue: 10 }, 1, 2, 3)).toBe(16)
  })
})
