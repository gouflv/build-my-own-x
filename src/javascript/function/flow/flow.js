export const flow = (...f) => {
  return (...args) => {
    let result = f[0].apply(this, args)
    let index = 1
    while (index <= f.length - 1) {
      result = f[index].call(this, result)
      index++
    }
    return result
  }
}
