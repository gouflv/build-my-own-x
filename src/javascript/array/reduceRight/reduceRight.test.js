import { reduceRight } from './reduceRight'

describe('Test reduceRight', () => {
  it('reduceRight with values', () => {
    expect(reduceRight(undefined)).toBe(undefined)
    expect(reduceRight(null)).toBe(null)
    expect(reduceRight(1)).toBe(1)
    expect(reduceRight(true)).toBe(true)
    expect(reduceRight('foo')).toBe('foo')
    expect(reduceRight({ a: 1 })).toStrictEqual({ a: 1 })
  })

  it('get sum of array', () => {
    const sum = reduceRight([1, 2, 3], (acc, val) => acc + val)
    expect(sum).toBe(6)
  })

  it('get sum of array with initialValue', () => {
    const sum = reduceRight([1, 2, 3], (acc, val) => acc + val, 10)
    expect(sum).toBe(16)
  })

  it('get sub of array with initialValue', () => {
    const sum = reduceRight([1, 2, 3], (acc, val) => acc - val, 10)
    expect(sum).toBe(10 - 6)
  })

  it('join string of array', () => {
    const joined = reduceRight([1, 2, 3], (acc, val) => acc + String(val))
    expect(joined).toBe('321')
  })
})
