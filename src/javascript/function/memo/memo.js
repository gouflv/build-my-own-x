export const memo = (func, resolver) => {
  const cache = new Map()

  return function (...args) {
    const key = resolver ? resolver.apply(this, args) : args[0]

    if (cache.has(key)) {
      return cache.get(key)
    }

    const ret = func.apply(this, args)
    cache.set(key, ret)
    return ret
  }
}
