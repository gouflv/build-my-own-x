import { factorialRecursive } from './factorial'

describe('Test factorial', () => {
  it('factorialRecursive', () => {
    expect(factorialRecursive(0)).toBe(1)
    expect(factorialRecursive(1)).toBe(1)
    expect(factorialRecursive(2)).toBe(2)
    expect(factorialRecursive(3)).toBe(6)
    expect(factorialRecursive(4)).toBe(24)
    expect(factorialRecursive(5)).toBe(120)
  })
})
