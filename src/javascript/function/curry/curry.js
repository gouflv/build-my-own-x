export const curry = func => {
  return function curried(...args) {
    const complete =
      !args.slice(0, func.length).includes(curry.placeholder) &&
      args.length >= func.length
    if (complete) {
      return func.apply(this, args)
    } else {
      return function (...rest) {
        return curried.apply(this, merge(args, rest))
      }
    }
  }
}

curry.placeholder = Symbol('curry_placeholder')

const merge = (args, newArgs) => {
  let index = 0
  args.slice().forEach((arg, i) => {
    if (arg === curry.placeholder && index < newArgs.length) {
      args[i] = newArgs[index]
      index++
    }
  })
  return index < newArgs.length ? [...args, ...newArgs.slice(index)] : args
}
