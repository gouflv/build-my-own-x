export const EqualMode = {
  MODE_ABSTRACT: 0,
  MODE_STRICT: 1,
  MODE_SAME_VALUE_ZERO: 2,
  MODE_SAME_VALUE: 3
}

export const isEqual = (x, y, mode = 3) => {
  if (mode === EqualMode.MODE_ABSTRACT) {
    return x == y
  }
  if (mode === EqualMode.MODE_STRICT) {
    return x === y
  }
  if (mode === EqualMode.MODE_SAME_VALUE) {
    return Object.is(x, y)
  }
  if (mode === EqualMode.MODE_SAME_VALUE_ZERO) {
    return x === y || (x !== x && y !== y)
  }
  return false
}
