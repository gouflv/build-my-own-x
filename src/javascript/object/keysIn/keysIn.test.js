import { keysIn } from './keysIn'

describe('Test keysIn', () => {
  it('simple object values', () => {
    const obj = { a: 1, b: 2 }
    expect(keysIn(obj)).toStrictEqual(['a', 'b'])
    expect(keysIn({})).toStrictEqual([])
    expect(keysIn(undefined)).toStrictEqual([])
    expect(keysIn(1)).toStrictEqual([])
    expect(keysIn([])).toStrictEqual([])
    expect(keysIn([1, 2, 3])).toStrictEqual(['0', '1', '2'])
  })

  it('function keysIn', () => {
    function Foo() {
      this.a = 1
    }
    Foo.b = 2
    expect(keysIn(new Foo())).toStrictEqual(['a'])

    Foo.prototype.c = 3
    expect(keysIn(new Foo())).toStrictEqual(['a', 'c'])
  })
})
