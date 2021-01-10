export const compose = (...f) => {
  return (...args) => {
    let index = f.length - 1
    let result = f[index].apply(this, args)
    while (index--) {
      result = f[index].call(this, result)
    }
    return result
  }
}
