import { reduce } from '../../array/reduce/reduce'

const flowOld = (...f) => {
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

export const flow = (...fn) => {
  return (...args) => {
    return reduce(
      fn.slice(1),
      (res, f) => f.call(this, res),
      fn[0].apply(this, args)
    )
  }
}
