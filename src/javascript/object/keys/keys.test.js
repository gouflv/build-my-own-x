import { keys } from './keys'

describe('Test keys', () => {
  it('simple object values', () => {
    const obj = { a: 1, b: 2 }
    expect(keys(obj)).toStrictEqual(['a', 'b'])
    expect(keys({})).toStrictEqual([])
    expect(keys(undefined)).toStrictEqual([])
    expect(keys(1)).toStrictEqual([])
    expect(keys([])).toStrictEqual([])
    expect(keys([1, 2, 3])).toStrictEqual(['0', '1', '2'])
  })

  it('class object keys', () => {
    class Foo {
      a = 1
      b = 2
      constructor() {
        this.c = 3
      }
    }
    expect(keys(new Foo())).toStrictEqual(['a', 'b', 'c'])
  })

  it('function keys', () => {
    function foo() {}
    foo.a = 1

    expect(keys(foo)).toStrictEqual(['a'])
  })
})
