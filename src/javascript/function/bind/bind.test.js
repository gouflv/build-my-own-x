import { bind } from './bind'

describe('Test bind', () => {
  it('bind object', () => {
    const obj = {
      name: 1,
      getName() {
        return this.name
      }
    }
    expect(obj.getName()).toBe(1)

    const obj2 = {
      name: 2
    }
    expect(bind(obj.getName, obj2)()).toBe(2)
  })

  it('bind with args', () => {
    const obj = {
      name: 'foo',
      greet(greeting) {
        return greeting + this.name
      }
    }
    expect(obj.greet('hi,')).toBe('hi,foo')

    const obj2 = {
      name: 'bar'
    }
    expect(bind(obj.greet, obj2)('hi,')).toBe('hi,bar')
    expect(bind(obj.greet, obj2, 'Hi,')()).toBe('Hi,bar')
  })

  it('bind with constructor', () => {
    function Foo() {
      this.name = 'inner name'
    }
    Foo.prototype.greet = function () {
      return this.name
    }

    const BoundFoo = bind(Foo, { name: 'bound name' })
    expect(new BoundFoo().greet()).toBe('inner name')
  })
})
