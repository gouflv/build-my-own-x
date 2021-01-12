export const createAssigner = (getKeys, defaults) => {
  return (obj, ...sources) => {
    const target = defaults ? Object(obj) : obj

    if (!sources.length) {
      return target
    }

    sources.forEach(src => {
      getKeys(src).forEach(k => {
        if (defaults && target[k] !== void 0) {
          return
        }
        target[k] = src[k]
      })
    })

    return target
  }
}
