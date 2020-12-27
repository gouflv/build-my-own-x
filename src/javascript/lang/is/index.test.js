import {
  isUndefined,
  isNull,
  isBoolean,
  isObjectLike,
  isNumber,
  isString
} from '.'

describe('Test `is`', () => {
  it('isUndefined', () => {
    expect(isUndefined()).toBeTruthy()
    expect(isUndefined(void 0)).toBeTruthy()
    expect(isUndefined(null)).not.toBeTruthy()
    expect(isUndefined(1)).not.toBeTruthy()
    expect(isUndefined('1')).not.toBeTruthy()
    expect(isUndefined(true)).not.toBeTruthy()
    expect(isUndefined([1])).not.toBeTruthy()
    expect(isUndefined({})).not.toBeTruthy()
  })

  it('isNull', () => {
    expect(isNull()).not.toBeTruthy()
    expect(isNull(null)).toBeTruthy()
    expect(isNull(1)).not.toBeTruthy()
    expect(isNull('1')).not.toBeTruthy()
    expect(isNull(true)).not.toBeTruthy()
    expect(isNull([1])).not.toBeTruthy()
    expect(isNull({})).not.toBeTruthy()
  })

  it('isObjectLike', () => {
    expect(isObjectLike()).not.toBeTruthy()
    expect(isObjectLike(null)).not.toBeTruthy()
    expect(isObjectLike(true)).not.toBeTruthy()
    expect(isObjectLike(1)).not.toBeTruthy()
    expect(isObjectLike('foo')).not.toBeTruthy()
    expect(isObjectLike({})).toBeTruthy()
    expect(isObjectLike([])).toBeTruthy()
    expect(isObjectLike(function () {})).not.toBeTruthy()
  })

  it('isBoolean', () => {
    expect(isBoolean()).not.toBeTruthy()
    expect(isBoolean(null)).not.toBeTruthy()
    expect(isBoolean(1)).not.toBeTruthy()
    expect(isBoolean('foo')).not.toBeTruthy()
    expect(isBoolean({})).not.toBeTruthy()
    expect(isBoolean([])).not.toBeTruthy()
    expect(isBoolean(true)).toBeTruthy()
    expect(isBoolean(false)).toBeTruthy()
    expect(isBoolean(new Boolean(true))).toBeTruthy()
    expect(isBoolean(new Boolean(false))).toBeTruthy()
  })

  it('isNumber', () => {
    expect(isNumber()).not.toBeTruthy()
    expect(isNumber(null)).not.toBeTruthy()
    expect(isNumber(1)).toBeTruthy()
    expect(isNumber(Number.MAX_VALUE)).toBeTruthy()
    expect(isNumber(Infinity)).toBeTruthy()
    expect(isNumber(-Infinity)).toBeTruthy()
    expect(isNumber(NaN)).toBeTruthy()
    expect(isNumber('3')).not.toBeTruthy()
    expect(isNumber({})).not.toBeTruthy()
    expect(isNumber([])).not.toBeTruthy()
  })

  it('isString', () => {
    expect(isString()).not.toBeTruthy()
    expect(isString(null)).not.toBeTruthy()
    expect(isString(true)).not.toBeTruthy()
    expect(isString(1)).not.toBeTruthy()
    expect(isString('foo')).toBeTruthy()
    expect(isString({})).not.toBeTruthy()
    expect(isString([])).not.toBeTruthy()
    expect(isString(String('foo'))).toBeTruthy()
  })
})
