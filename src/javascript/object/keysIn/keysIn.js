import { isObject } from '../../lang/is/is'

export const keysIn = obj => {
  if (!isObject(obj)) return []
  const keys = []
  for (const k in obj) keys.push(k)
  return keys
}
