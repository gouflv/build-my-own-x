import { isObject } from '../../lang/is/is'
import { keys } from '../keys/keys'

export const values = obj => {
  if (!isObject(obj)) return []
  const _keys = keys(obj)
  return _keys.map(k => obj[k])
}
