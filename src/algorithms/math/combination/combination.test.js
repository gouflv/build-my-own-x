import { combination } from './combination'

describe('Test combination', () => {
  it('Should works', () => {
    expect(combination([1])).toEqual([[1]])
    expect(combination([1, 2])).toEqual([[1], [1, 2], [2]])
    expect(combination([1, 2, 3])).toEqual([
      [1],
      [1, 2],
      [1, 2, 3],
      [1, 3],
      [2],
      [2, 3],
      [3]
    ])
  })
})
