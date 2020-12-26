import { isUndefined, isNull } from '.'

describe('Test is()', () => {
  it('isUndefined', () => {
    expect(isUndefined(void 0)).toBeTruthy()
    expect(isUndefined(null)).not.toBeTruthy()
    expect(isUndefined(1)).not.toBeTruthy()
  })

  it('isNull', () => {
    expect(isNull(null)).toBeTruthy()
    expect(isNull(void 0)).not.toBeTruthy()
    expect(isNull(1)).not.toBeTruthy()
  })

  it('isBoolean', () => {})
})
