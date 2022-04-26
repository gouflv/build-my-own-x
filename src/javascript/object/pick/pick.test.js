import { pick } from './pick'

describe('Test pick', () => {
  let data
  beforeEach(() => {
    data = {
      a: 1,
      b: 2,
      c: 3
    }
  })
  it('should works', () => {
    expect(pick(data, [])).toEqual({})
    expect(pick(data, ['a'])).toEqual({
      a: 1
    })
    expect(pick(data, ['a', 'b'])).toEqual({
      a: 1,
      b: 2
    })
    expect(pick(data, ['a', 'b', 'c'])).toEqual(data)
  })
})
