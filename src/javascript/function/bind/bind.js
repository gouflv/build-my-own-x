import { isObject } from '../../lang/is/is'

export const bind = (fn, context, ...initialArgs) => {
  const boundFn = function (...args) {
    if (this instanceof boundFn) {
      const self = Object.create(fn.prototype)
      const result = fn.apply(self, args)
      return isObject(result) ? result : self
    }
    return fn.apply(context, [...initialArgs, ...args])
  }
  return boundFn
}
