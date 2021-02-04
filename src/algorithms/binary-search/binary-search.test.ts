import { binarySearch } from './binary-search'

describe('Test binarySearch', () => {
  it('array asc search', () => {
    const arr = [1, 3, 5, 7]
    const compare = (a, b) => a - b
    expect(binarySearch(arr, 1, compare)).toBe(0)
    expect(binarySearch(arr, 3, compare)).toBe(1)
    expect(binarySearch(arr, 5, compare)).toBe(2)
    expect(binarySearch(arr, 7, compare)).toBe(3)

    expect(binarySearch(arr, 0, compare)).toBe(-1)
    expect(binarySearch(arr, 9, compare)).toBe(-1)
  })

  it('array desc search', () => {
    const arr = [11, 8, 3, 0]
    const compare = (a, b) => b - a
    expect(binarySearch(arr, 11, compare)).toBe(0)
    expect(binarySearch(arr, 8, compare)).toBe(1)
    expect(binarySearch(arr, 3, compare)).toBe(2)
    expect(binarySearch(arr, 0, compare)).toBe(3)

    expect(binarySearch(arr, -1, compare)).toBe(-1)
    expect(binarySearch(arr, 9, compare)).toBe(-1)
  })
})
