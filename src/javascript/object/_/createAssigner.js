export const createAssigner = getKeys => {
  return (obj, ...sources) => {
    const target = Object(obj)

    if (!sources.length) {
      return target
    }

    for (let i = 0; i < sources.length; i++) {
      const src = sources[i]
      getKeys(src).forEach(k => {
        target[k] = src[k]
      })
    }

    return target
  }
}
