import { isObject } from '../../lang/is/is'

export const keys =
  Object.keys ||
  (obj => {
    if (!isObject(obj)) return []
    const keys = []
    for (const k in obj) {
      if (Object.hasOwnProperty.call(obj, k)) {
        keys.push(k)
      }
    }
    return keys
  })
