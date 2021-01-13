import { get } from './get'

describe('Test get', () => {
  const o = { a: { b: [{ c: 1 }] } }

  const arr = [{ a: { b: [1, 2] } }, { c: 3 }]

  it('get value from object', () => {
    expect(get(o)).toBeUndefined()
    expect(get(o, ['a'])).toBe(o.a)
    expect(get(o, ['a', 'b'])).toBe(o.a.b)
    expect(get(o, ['a', 'b', '0'])).toBe(o.a.b[0])
    expect(get(o, ['a', 'b', '0', 'c'])).toBe(o.a.b[0].c)
    expect(get(o, ['a', 'b', 0, 'c'])).toBe(o.a.b[0].c)
  })

  it('get value from object with default', () => {
    expect(get(o, '0')).toBeUndefined()
    expect(get(o, ['a', '0'], 0)).toBe(0)
    expect(get(o, ['a', '0'], '0')).toBe('0')
  })

  it('get value from array', () => {
    expect(get(arr, ['0', 'a', 'b', '1'])).toBe(2)
    expect(get(arr, ['0', 'a', 'b', '2'], 0)).toBe(0)
    expect(get(arr, ['1', 'c'])).toBe(3)
    expect(get(arr, ['1', 'd'])).toBeUndefined()
  })

  it('get value from object by path', () => {
    expect(get(o)).toBeUndefined()
    expect(get(o, 'a')).toBe(o.a)
    expect(get(o, 'a.b')).toBe(o.a.b)
    expect(get(o, 'a.b.[0]')).toBe(o.a.b[0])
    expect(get(o, 'a.b.[0].c')).toBe(o.a.b[0].c)
    expect(get(o, 'a.b[0].c')).toBe(o.a.b[0].c)
  })
})
