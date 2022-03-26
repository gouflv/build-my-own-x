import { reduce } from './reduce'

describe('Test reduce', () => {
  it('should works', () => {
    expect(reduce([1, 2, 3], (acc, it) => acc + it, 0)).toBe(6)
    expect(reduce([1, 2, 3], (acc, it) => acc + it)).toBe(6)
  })
})
