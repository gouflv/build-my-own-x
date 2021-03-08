import { powRecursive } from './pow'

describe('Test number power', () => {
  it('should powRecursive works', () => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        expect(powRecursive(i, j)).toBe(Math.pow(i, j))
      }
    }
  })
})
