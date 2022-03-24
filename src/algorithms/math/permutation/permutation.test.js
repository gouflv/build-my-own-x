import { permutation } from './permutation'

describe('Test permutation', () => {
  it('Should works', () => {
    expect(permutation([1])).toEqual([[1]])
    expect(permutation([1, 2])).toEqual([
      [1, 2],
      [2, 1]
    ])
    expect(permutation([1, 2, 3])).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ])
  })
})
