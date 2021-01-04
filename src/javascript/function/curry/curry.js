export const curry = func => {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...argsIn) {
        return curried.apply(this, args.concat(argsIn))
      }
    }
  }
}
