import { bubbleSort } from './bubble'
import { selectSort } from './select'
import { insertionSort } from './insertion'
import { mergeSort } from './merge'

describe('Test sort', () => {
  let data
  const sorted = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  beforeEach(() => {
    data = [6, 7, 8, 9, 5, 4, 3, 1, 2, 0]
  })

  it('bubble', () => {
    // O(n^2)
    expect(bubbleSort(data)).toStrictEqual(sorted)
  })

  it('select', () => {
    // O(n^2)
    expect(selectSort(data)).toStrictEqual(sorted)
  })

  it('insertion', () => {
    // O(n^2)
    expect(insertionSort(data)).toStrictEqual(sorted)
  })

  it('merge', () => {
    // O(log n)
    expect(mergeSort(data)).toStrictEqual(sorted)
  })
})
