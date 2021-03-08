import { moveStarToEnd } from '.'

describe('Test moveStarToEnd', () => {
  it('should works', () => {
    expect(moveStarToEnd('a*b*c***123*')).toBe('abc123******')
  })
})
