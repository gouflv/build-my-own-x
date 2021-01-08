import { values } from './values'

describe('Test Values', () => {
  it('simple object values', () => {
    const obj = { a: 1, b: 2 }
    expect(values(obj)).toStrictEqual([1, 2])
    expect(values({})).toStrictEqual([])
    expect(values(undefined)).toStrictEqual([])
    expect(values(1)).toStrictEqual([])
    expect(values([])).toStrictEqual([])
    expect(values([1, 2, 3])).toStrictEqual([1, 2, 3])
  })

  it('class object values', () => {
    class Foo {
      a = 1
      b = 2
      constructor() {
        this.c = 3
      }
    }
    expect(values(new Foo())).toStrictEqual([1, 2, 3])
  })
})
