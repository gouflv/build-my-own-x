import { isObservable, singleObserver } from './single-observer'

describe('Test Single Observer', () => {
  it('with values', () => {
    expect(singleObserver(undefined)).toBeNull()
    expect(singleObserver(null)).toBeNull()
    expect(singleObserver(1)).toBeNull()
    expect(singleObserver(true)).toBeNull()
    expect(singleObserver('foo')).toBeNull()
    expect(singleObserver(Object.freeze({}))).toBeNull()
  })

  it('single object observer', () => {
    const target = { a: 1 }
    const observable = singleObserver(target)
    const changed = jest.fn()

    expect(observable).toStrictEqual(target)
    expect(observable).not.toBe(target)

    observable.subscribe((key, value) => {
      changed()
      key === 'a' && expect(value).toBe(2)
      key === 'b' && expect(value).toBe('foo')
    })

    observable.a = 2
    observable.b = 'foo'

    expect(changed).toBeCalledTimes(2)
  })

  it('nesting object observer', () => {
    const changed = jest.fn()
    const observable = singleObserver({ a: { b: { c: 1 } } })

    observable.subscribe((key, value) => {
      changed()
      key === 'c' && expect(value).toBe(2)
      key === 'd' && expect(value).toStrictEqual({ d: 'foo' })
    })

    observable.a.b.c = 2
    expect(observable).toStrictEqual({ a: { b: { c: 2 } } })

    observable.a.b = { d: 'foo' }
    expect(observable).toStrictEqual({ a: { b: { d: 'foo' } } })

    expect(changed).toBeCalledTimes(2)
  })

  it('object had been observed', () => {
    const observable = singleObserver({})
    expect(isObservable(observable)).toBeTruthy()
    expect(singleObserver(observable)).toBe(observable)
  })
})
