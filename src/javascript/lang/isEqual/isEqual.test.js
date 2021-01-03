import { isEqual, EqualMode } from './isEqual'

describe('Test isEqual', () => {
  let mode

  it('test MODE_ABSTRACT', () => {
    mode = EqualMode.MODE_ABSTRACT

    expect(isEqual(undefined, undefined, mode)).toBeTruthy()
    expect(isEqual(undefined, null, mode)).toBeTruthy()
    expect(isEqual(null, null, mode)).toBeTruthy()
    expect(isEqual(NaN, NaN, mode)).not.toBeTruthy()
    expect(isEqual(0, -0, mode)).toBeTruthy()
    expect(isEqual(0, false, mode)).toBeTruthy()
    expect(isEqual('', false, mode)).toBeTruthy()
    expect(isEqual('1', 1, mode)).toBeTruthy()
    expect(isEqual(1, new Number(1), mode)).toBeTruthy()
    expect(isEqual({ foo: 'bar' }, { foo: 'bar' }, mode)).not.toBeTruthy()
  })

  it('test MODE_STRICT', () => {
    mode = EqualMode.MODE_STRICT

    expect(isEqual(undefined, undefined, mode)).toBeTruthy()
    expect(isEqual(undefined, null, mode)).not.toBeTruthy()
    expect(isEqual(null, null, mode)).toBeTruthy()
    expect(isEqual(NaN, NaN, mode)).not.toBeTruthy()
    expect(isEqual(0, -0, mode)).toBeTruthy()
    // diff form MODE_ABSTRACT
    expect(isEqual(0, false, mode)).not.toBeTruthy()
    // diff form MODE_ABSTRACT
    expect(isEqual('', false, mode)).not.toBeTruthy()
    // diff form MODE_ABSTRACT
    expect(isEqual('1', 1, mode)).not.toBeTruthy()
    // diff form MODE_ABSTRACT
    expect(isEqual(1, new Number(1), mode)).not.toBeTruthy()
    expect(isEqual({ foo: 'bar' }, { foo: 'bar' }, mode)).not.toBeTruthy()
  })

  it('test MODE_STRICT', () => {
    mode = EqualMode.MODE_SAME_VALUE

    expect(isEqual(undefined, undefined, mode)).toBeTruthy()
    expect(isEqual(null, null, mode)).toBeTruthy()
    expect(isEqual(undefined, null, mode)).not.toBeTruthy()
    // diff from MODE_STRICT
    expect(isEqual(NaN, NaN, mode)).toBeTruthy()
    // diff from MODE_STRICT
    expect(isEqual(0, -0, mode)).not.toBeTruthy()
    expect(isEqual(0, false, mode)).not.toBeTruthy()
    expect(isEqual('', false, mode)).not.toBeTruthy()
    expect(isEqual('1', 1, mode)).not.toBeTruthy()
    expect(isEqual(1, new Number(1), mode)).not.toBeTruthy()
    expect(isEqual({ foo: 'bar' }, { foo: 'bar' }, mode)).not.toBeTruthy()
  })

  it('test MODE_SAME_VALUE_ZERO', () => {
    mode = EqualMode.MODE_SAME_VALUE_ZERO

    expect(isEqual(undefined, undefined, mode)).toBeTruthy()
    expect(isEqual(null, null, mode)).toBeTruthy()
    expect(isEqual(undefined, null, mode)).not.toBeTruthy()
    expect(isEqual(NaN, NaN, mode)).toBeTruthy()
    // diff from MODE_STRICT
    expect(isEqual(0, -0, mode)).toBeTruthy()
    expect(isEqual(0, false, mode)).not.toBeTruthy()
    expect(isEqual('', false, mode)).not.toBeTruthy()
    expect(isEqual('1', 1, mode)).not.toBeTruthy()
    expect(isEqual(1, new Number(1), mode)).not.toBeTruthy()
    expect(isEqual({ foo: 'bar' }, { foo: 'bar' }, mode)).not.toBeTruthy()
  })
})
