import { std } from '../../_/math/std'

const { shuffle } = require('./shuffle')
describe('Test Shuffle', () => {
  it('std', () => {
    expect(std([1, 1, 1])).toBe(0)
    expect(std([1, 2, 3, 4, 5])).toBe(1.414)
  })

  it('shuffle', () => {
    const origin = [1, 2, 3]

    // 3! = 9
    const shuffled = {
      123: 0,
      132: 0,
      213: 0,
      231: 0,
      312: 0,
      321: 0
    }

    Array.from({ length: 100000 }).forEach((_, i) => {
      shuffled[shuffle([...origin]).join('')]++
    })

    expect(std(Object.values(shuffled))).toBeLessThan(500)
  })
})
