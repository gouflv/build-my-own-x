import { fibonacciN, fibonacciSequence } from './fibonacci'

const s = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]

describe('Test fibonacci', () => {
  it('Get the value in fibonacci sequence at index', () => {
    s.forEach((v, i) => {
      expect(fibonacciN(i)).toBe(v)
    })
  })

  it('Get fibonacci sequence by length', () => {
    expect(fibonacciSequence(0)).toEqual([])
    expect(fibonacciSequence(1)).toEqual([0])
    expect(fibonacciSequence(2)).toEqual([0, 1])
    expect(fibonacciSequence(3)).toEqual([0, 1, 1])
    expect(fibonacciSequence(4)).toEqual([0, 1, 1, 2])
    s.forEach((v, i) => {
      expect(fibonacciSequence(i + 1)).toEqual(s.slice(0, i + 1))
    })
  })
})
