import { bubbleSort } from './bubble'

describe('Test bubble sort', () => {
  it('simple', () => {
    const data = [5, 4, 3, 1, 2]
    expect(bubbleSort(data)).toStrictEqual([1, 2, 3, 4, 5])
  })
})
