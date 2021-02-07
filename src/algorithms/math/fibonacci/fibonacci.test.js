import { fibonacci } from './fibonacci'

describe('Test fibonacci', () => {
  it('simple', () => {
    const s = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
    s.forEach((v, i) => {
      expect(fibonacci(i)).toBe(v)
    })
  })
})
