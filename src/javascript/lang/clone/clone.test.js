import { clone, cloneDeep } from './clone'

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

  it('clone NaN', () => {
    expect(clone(NaN)).toBeNaN()
  })

  it('clone Infinity', () => {
    expect(clone(Infinity)).toBe(Infinity)
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

  describe('clone object', () => {
    function staticExpect() {
      expect(cloned).not.toBe(o)
      expect(cloned.a === o.a).toBeTruthy()
      expect(cloned.b === o.b).toBeTruthy()
      expect(cloned.c === o.c).toBeTruthy()
    }

    let o, cloned
    beforeEach(() => {
      o = { a: 1, b: { foo: 'bar' }, c: [1, 2, 3] }
      cloned = null
    })

    it('clone object with [[proto]]', () => {
      cloned = clone(o)
      staticExpect()
    })

    it('clone object without [[proto]]', () => {
      const npo = Object.create(null)
      npo.a = o.a
      npo.b = o.b
      npo.c = o.c

      cloned = clone(npo)
      staticExpect()
    })
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

  it('clone Map', () => {
    const obj = { a: 1 }
    const o = new Map()
    o.set('foo', 'bar')
    o.set('obj', obj)

    const cloned = clone(o)
    expect(cloned !== o).toBeTruthy()
    expect(cloned.get('foo')).toBe('bar')
    expect(cloned.get('obj')).toBe(obj)
  })

  it('clone function', () => {
    function foo() {}
    expect(clone(foo)).toBe(foo)
  })

  it('cloneDeep string', () => {
    expect(cloneDeep('foo')).toBe('foo')
    expect(cloneDeep(new String('foo')).valueOf()).toBe('foo')
  })

  it('cloneDeep array', () => {
    const o = [1, '2', { foo: 3 }]
    const cloned = cloneDeep(o)
    expect(cloned !== o).toBeTruthy()
    expect(cloned[0] === o[0]).toBeTruthy()
    expect(cloned[1] === o[1]).toBeTruthy()
    expect(cloned[2] === o[2]).toBeTruthy()
  })

  describe('cloneDeep object', () => {
    function staticExpect() {
      expect(cloned).not.toBe(o)
      expect(cloned.a === o.a).toBeTruthy()
      expect(cloned.b !== o.b).toBeTruthy()
      expect(cloned.b.obj !== o.b.obj).toBeTruthy()
      expect(cloned.b.obj).toStrictEqual(o.b.obj)
      expect(cloned.c !== o.c).toBeTruthy()
      expect(cloned.c).toStrictEqual(o.c)
    }

    let o, cloned
    beforeEach(() => {
      o = { a: 1, b: { obj: { bar: 'baz' } }, c: [1, 2, 3] }
      cloned = null
    })

    it('cloneDeep object with [[proto]]', () => {
      cloned = cloneDeep(o)
      staticExpect()
    })

    it('cloneDepp object without [[proto]]', () => {
      const npo = Object.create(null)
      npo.a = o.a
      npo.b = o.b
      npo.c = o.c

      cloned = cloneDeep(npo)
      staticExpect()
    })

    it('cloneDeep object with circular ref', () => {
      o.b.arr = o.c
      o.d = o.b.obj

      cloned = cloneDeep(o)
      staticExpect()
      expect(cloned.b.arr === cloned.c).toBeTruthy()
      expect(cloned.d === cloned.b.obj).toBeTruthy()
    })
  })
})
