export const pick = (obj, keys) =>
  keys.reduce((o, k) => {
    if (obj.hasOwnProperty(k)) {
      o[k] = obj[k]
    }
    return o
  }, {})
