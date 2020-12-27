import {
  isUndefined,
  isNull,
  isBoolean,
  isFinite as _isFinite,
  isObjectLike,
  isNumber,
  isString,
  isPlainObject,
  isArguments,
  isError,
  isFunction
} from '.'

describe('Test `is`', () => {
  it('isUndefined', () => {
    expect(isUndefined()).toBeTruthy()
    expect(isUndefined(void 0)).toBeTruthy()
    expect(isUndefined(null)).not.toBeTruthy()
    expect(isUndefined(1)).not.toBeTruthy()
    expect(isUndefined('foo')).not.toBeTruthy()
    expect(isUndefined(true)).not.toBeTruthy()
    expect(isUndefined([1])).not.toBeTruthy()
    expect(isUndefined({})).not.toBeTruthy()
  })

  it('isNull', () => {
    expect(isNull()).not.toBeTruthy()
    expect(isNull(null)).toBeTruthy()
    expect(isNull(1)).not.toBeTruthy()
    expect(isNull('foo')).not.toBeTruthy()
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
    expect(isObjectLike([1, 2, 3])).toBeTruthy()
    expect(isObjectLike(function () {})).not.toBeTruthy()

    function foo() {
      expect(isObjectLike(arguments)).toBeTruthy()
    }
    foo()
  })

  it('isBoolean', () => {
    expect(isBoolean()).not.toBeTruthy()
    expect(isBoolean(null)).not.toBeTruthy()
    expect(isBoolean(1)).not.toBeTruthy()
    expect(isBoolean('foo')).not.toBeTruthy()
    expect(isBoolean({})).not.toBeTruthy()
    expect(isBoolean([1, 2, 3])).not.toBeTruthy()
    expect(isBoolean(true)).toBeTruthy()
    expect(isBoolean(false)).toBeTruthy()
    expect(isBoolean(Boolean(true))).toBeTruthy()
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
    expect(isNumber([1, 2, 3])).not.toBeTruthy()
  })

  it('isFinite', () => {
    expect(_isFinite()).not.toBeTruthy()
    expect(_isFinite(null)).not.toBeTruthy()
    expect(_isFinite(1)).toBeTruthy()
    expect(_isFinite(Number.MAX_VALUE)).toBeTruthy()
    expect(_isFinite(Infinity)).not.toBeTruthy()
    expect(_isFinite(-Infinity)).not.toBeTruthy()
    expect(_isFinite(NaN)).not.toBeTruthy()
    expect(_isFinite('3')).not.toBeTruthy()
    expect(_isFinite({})).not.toBeTruthy()
    expect(_isFinite([1, 2, 3])).not.toBeTruthy()
  })

  it('isString', () => {
    expect(isString()).not.toBeTruthy()
    expect(isString(null)).not.toBeTruthy()
    expect(isString(true)).not.toBeTruthy()
    expect(isString(1)).not.toBeTruthy()
    expect(isString('foo')).toBeTruthy()
    expect(isString({})).not.toBeTruthy()
    expect(isString([1, 2, 3])).not.toBeTruthy()
    expect(isString(String('foo'))).toBeTruthy()
    expect(isString(new String('foo'))).toBeTruthy()
  })

  // see isObjectLike
  it('isObject', () => {})

  it('isPlainObject', () => {
    expect(isPlainObject()).not.toBeTruthy()
    expect(isPlainObject(null)).not.toBeTruthy()
    expect(isPlainObject(true)).not.toBeTruthy()
    expect(isPlainObject(1)).not.toBeTruthy()
    expect(isPlainObject('foo')).not.toBeTruthy()
    expect(isPlainObject([1, 2, 3])).not.toBeTruthy()

    function Foo() {
      this.a = 1
    }
    expect(isPlainObject({})).toBeTruthy()
    expect(isPlainObject(new Object())).toBeTruthy()
    expect(isPlainObject(Object.create(null))).toBeTruthy()
    expect(isPlainObject(Object.create({}))).not.toBeTruthy()
    expect(isPlainObject(Object.create({ a: 1 }))).not.toBeTruthy()
    expect(isPlainObject(Object.create(Object.prototype))).toBeTruthy()
    expect(isPlainObject(new Foo())).not.toBeTruthy()
  })

  it('isArguments', () => {
    expect(isArguments()).not.toBeTruthy()
    expect(isArguments(null)).not.toBeTruthy()
    expect(isArguments(true)).not.toBeTruthy()
    expect(isArguments(1)).not.toBeTruthy()
    expect(isArguments('foo')).not.toBeTruthy()
    expect(isArguments([1, 2, 3])).not.toBeTruthy()
    expect(isArguments({})).not.toBeTruthy()

    function foo() {
      expect(isArguments(arguments)).toBeTruthy()
    }
    foo()
  })

  it('isError', () => {
    expect(isError()).not.toBeTruthy()
    expect(isError(null)).not.toBeTruthy()
    expect(isError(true)).not.toBeTruthy()
    expect(isError(1)).not.toBeTruthy()
    expect(isError('foo')).not.toBeTruthy()
    expect(isError([1, 2, 3])).not.toBeTruthy()
    expect(isError({})).not.toBeTruthy()
    expect(isError(new Error())).toBeTruthy()
    expect(isError(Error)).not.toBeTruthy()
  })

  it('isFunction', () => {
    expect(isFunction()).not.toBeTruthy()
    expect(isFunction(null)).not.toBeTruthy()
    expect(isFunction(true)).not.toBeTruthy()
    expect(isFunction(1)).not.toBeTruthy()
    expect(isFunction('foo')).not.toBeTruthy()
    expect(isFunction([1, 2, 3])).not.toBeTruthy()
    expect(isFunction({})).not.toBeTruthy()

    expect(isFunction(() => {})).toBeTruthy()
    expect(isFunction(async () => {})).toBeTruthy()
  })
})
