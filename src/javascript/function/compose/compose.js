import { reduceRight } from '../../array/reduceRight/reduceRight'

const composeOld = (...f) => {
  return (...args) => {
    let index = f.length - 1
    let result = f[index].apply(this, args)
    while (index--) {
      result = f[index].call(this, result)
    }
    return result
  }
}

export const compose = (...fn) => {
  return (...args) => {
    return reduceRight(
      fn.slice(0, -1),
      (res, f) => f.call(this, res),
      fn[fn.length - 1].apply(this, args)
    )
  }
}
