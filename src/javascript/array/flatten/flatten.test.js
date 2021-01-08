import { flatten } from './flatten'

describe('Test Flatten', () => {
  it('simple flat array', () => {
    expect(flatten(undefined)).toStrictEqual([])
    expect(flatten(null)).toStrictEqual([])
    expect(flatten(1)).toStrictEqual([])
    expect(flatten({})).toStrictEqual([])
    expect(flatten([1])).toStrictEqual([1])
    expect(flatten([1, [2], [[3]]])).toStrictEqual([1, 2, 3])
  })

  it('flat array with depp', () => {
    const arr = [1, [2], [[3]], [[[4]]]]
    expect(flatten(arr, 0)).toStrictEqual([])
    expect(flatten(arr, -1)).toStrictEqual([])
    expect(flatten(arr, 1)).toStrictEqual([1, 2, [3], [[4]]])
  })
})
