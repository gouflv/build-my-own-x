import { assign } from './assign'

describe('Test assign', () => {
  it('simple assign', () => {
    expect(assign()).toBeUndefined()
    expect(assign(undefined)).toBeUndefined()
    expect(assign(null)).toBeNull()
    expect(assign(1)).toBe(1)
    expect(assign(true)).toBeTruthy()
    expect(assign('')).toBe('')
    expect(assign([])).toStrictEqual([])
    expect(assign({}, [])).toStrictEqual({})
    expect(assign([1], [1, 2])).toStrictEqual([1, 2])
  })

  it('object assign', () => {
    const a = { a: 1 }
    const b = { b: 2 }
    const c = { a: 3 }
    expect(assign(a, b)).toStrictEqual({ a: 1, b: 2 })
    expect(assign(a, b, c)).toStrictEqual({ a: 3, b: 2 })
    expect(assign({}, a, b, c)).toStrictEqual({ a: 3, b: 2 })
  })

  it('class instance assign', () => {
    function Foo() {
      this.a = 1
    }
    Foo.prototype.c = 3

    function Bar() {
      this.b = 2
    }

    expect(assign({}, new Foo())).toStrictEqual({ a: 1 })
    expect(assign({}, new Foo(), new Bar())).toStrictEqual({ a: 1, b: 2 })
  })
})
