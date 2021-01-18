import { isObjectLike, isSymbol } from '../../lang/is/is'
import { proxyToRawMap, reactive } from './reactive'
import { track, trigger, TriggerType } from './effect'
import { hasOwn } from '../../lang/_/setup'

export const baseHandler: ProxyHandler<any> = {
  get(target, key, receiver) {
    if (proxyToRawMap.get(target)) {
      return target
    }

    const res = Reflect.get(target, key, receiver)

    if (isSymbol(key)) {
      return res
    }

    track(target, key)

    return isObjectLike(res) ? reactive(res) : res
  },
  set(target, key, value, receiver) {
    const hasKey = hasOwn(target, key)
    const res = Reflect.set(target, key, value, receiver)
    if (hasKey) {
      trigger(target, TriggerType.SET, key, value)
    } else {
      trigger(target, TriggerType.ADD, key, value)
    }
    return res
  }
}
