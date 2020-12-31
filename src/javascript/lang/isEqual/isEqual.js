export const EqualMode = {
  MODE_ABSTRACT: 0,
  MODE_STRICT: 1,
  MODE_SAME_VALUE_ZERO: 2,
  MODE_SAME_VALUE: 3,
  MODE_DEEP: 4
}

export const isEqual = (valA, valB, mode = 1) => {
  if (mode === EqualMode.MODE_ABSTRACT) {
    return valA == valB
  }
  if (mode === EqualMode.MODE_STRICT) {
    return valA === valB
  }
}
