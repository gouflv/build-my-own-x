import { clone } from '.'

describe('Test clone', () => {
  it('clone should be defined', () => {
    expect(clone).toBeDefined()
  })

  it('clone undefined', () => {
    expect(clone(undefined)).toBeUndefined()
  })

  it('clone null', () => {
    expect(clone(null)).toBeNull()
  })

  it('clone boolean', () => {
    expect(clone(true)).toBeTruthy()
    expect(clone(new Boolean(true)).valueOf()).toBeTruthy()
  })

  it('clone number', () => {
    expect(clone(1)).toBe(1)
    expect(clone(new Number(1)).valueOf()).toBe(1)
    expect(clone(NaN)).toBeNaN()
    expect(clone(Infinity)).toBe(Infinity)
  })

  it('clone string', () => {
    expect(clone('foo')).toBe('foo')
    expect(clone(new String('foo')).valueOf()).toBe('foo')
  })

  it('clone array', () => {
    const o = [1, '2', { foo: 3 }]
    const cloned = clone(o)
    expect(cloned !== o).toBeTruthy()
    expect(cloned[0] === o[0]).toBeTruthy()
    expect(cloned[1] === o[1]).toBeTruthy()
    expect(cloned[2] === o[2]).toBeTruthy()
  })

  it('clone arguments', () => {
    function cloneArguments() {
      return clone(arguments)
    }
    expect(cloneArguments()).toStrictEqual([])
    expect(cloneArguments(1, 2, 3)).toStrictEqual([1, 2, 3])
  })

  it('clone object', () => {
    function staticExpect() {
      expect(cloned !== o).toBeTruthy()
      expect(cloned.a === o.a).toBeTruthy()
      expect(cloned.b === o.b).toBeTruthy()
    }

    let o, cloned

    o = { a: 1, b: {} }
    cloned = clone(o)
    staticExpect()

    o = Object.create(null)
    cloned = clone(o)
    staticExpect()
  })

  it('clone Class instance', () => {
    function Foo() {}
    const o = new Foo()
    const cloned = clone(o)
    expect(cloned !== o).toBeTruthy()
    expect(cloned instanceof Foo).toBeTruthy()
  })

  it('clone Date', () => {
    const o = new Date()
    expect(clone(o) !== o).toBeTruthy()
    expect(clone(o).getTime() === o.getTime()).toBeTruthy()
  })

  it('clone Set', () => {
    const obj = { a: 1 }
    const o = new Set([1, '2', obj])

    const cloned = clone(o)
    expect(cloned !== o).toBeTruthy()
    expect(cloned.has(1)).toBeTruthy()
    expect(cloned.has('2')).toBeTruthy()
    expect(cloned.has(obj)).toBeTruthy()
  })

  // it('clone Map', () => {
  //   const o = new Map()
  //   const cloned = clone(o)
  //   expect(cloned !== o).toBeTruthy()
  //   expect(cloned.has(1)).toBeTruthy()
  // })
})
