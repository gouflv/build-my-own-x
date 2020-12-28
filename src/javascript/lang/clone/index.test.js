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
    expect(clone('foo') === 'foo').toBeTruthy()
    expect(clone(new String('foo')).valueOf()).toBe('foo')
  })

  it('clone array', () => {
    const d = [1, '2', { foo: 3 }]
    const cloned = clone(d)
    expect(cloned !== d).toBeTruthy()
    expect(cloned[0] === d[0]).toBeTruthy()
    expect(cloned[1] === d[1]).toBeTruthy()
    expect(cloned[2] === d[2]).toBeTruthy()
  })

  it('clone date', () => {
    const d = new Date()
    expect(clone(d) !== d).toBeTruthy()
    expect(clone(d).getTime() === d.getTime()).toBeTruthy()
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
    expect(clone(o) !== o).toBeTruthy()
    expect(clone(o) instanceof Foo).toBeTruthy()
  })
})
