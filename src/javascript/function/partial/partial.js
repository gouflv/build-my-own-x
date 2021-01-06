export const partial = (fn, ...args) => {
  return (...rest) => fn(...args, ...rest)
}
