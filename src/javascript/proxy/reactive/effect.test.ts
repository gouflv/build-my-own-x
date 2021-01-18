import { reactive } from './reactive'
import { effect } from './effect'

describe('Test Effect', () => {
  it('effect to basic object', () => {
    const counter = jest.fn()
    const obj = reactive({ a: 1, b: { c: 2 } })

    let c
    effect(() => {
      c = obj.b.c
      counter()
    })
    expect(c).toBe(2)
    obj.b.c = 3
    expect(c).toBe(3)
    expect(counter).toBeCalledTimes(2)
  })

  it('effect to object multi props', () => {
    const counter = jest.fn()
    const obj = reactive({ a: 1, b: { c: 2 } })

    let c
    effect(() => {
      c = obj.a + obj.b.c
      counter()
    })
    expect(c).toBe(3)
    obj.b.c = 3
    expect(c).toBe(4)
    obj.a = 2
    expect(c).toBe(5)
    expect(counter).toBeCalledTimes(3)
  })

  it('effect to array length changed', () => {
    const counter = jest.fn()
    const arr = reactive(['foo', 'bar'])
    let length
    effect(() => {
      counter()
      expect(arr[2] === 'baz')
      length = arr.length
    })
    expect(length).toBe(2)
    arr[2] = 'baz'
    expect(length).toBe(3)
    expect(counter).toBeCalledTimes(2)
  })

  it('effect to array changed by methods', () => {
    const counter = jest.fn()
    const arr = reactive(['foo', 'bar'])

    let length
    effect(() => {
      counter()
      length = arr.length
    })

    arr.push('baz')
    expect(length).toBe(3)
    expect(counter).toBeCalledTimes(2)

    arr.shift()
    expect(length).toBe(2)
    expect(counter).toBeCalledTimes(3)

    arr.unshift('first')
    expect(length).toBe(3)
    expect(counter).toBeCalledTimes(4)
  })

  it.only('effect to array iteration', () => {
    const arr = reactive([1, 2, 3])

    let result
    effect(() => {
      result = arr.join('')
    })

    expect(result).toBe('123')
    arr.unshift(0)
    expect(result).toBe('0123')
  })
})
