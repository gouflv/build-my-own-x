import { isObjectLike } from '../../lang/is/is'
import { proxyToRawMap, reactive } from './reactive'
import { hasOwn } from '../../lang/_/setup'
import { track } from './effect'

// const ArrayReactiveMethods = {}
//
// ;['push', 'pop', 'shift', 'unshift', 'slice'].forEach(k => {
//   const method = Array.prototype[k]
//   ArrayReactiveMethods[k] = function (arr, ...args) {
//     // TODO stop track
//     const res = method.apply(arr, args)
//     // TODO resume track
//     return res
//   }
// })

export const baseHandler = {
  get(target, key, receiver) {
    if (proxyToRawMap.get(target)) {
      return target
    }

    // if (isArray(target) && hasOwn(ArrayReactiveMethods, key)) {
    //   return Reflect.get(ArrayReactiveMethods, key, receiver)
    // }

    const res = Reflect.get(target, key, receiver)

    track({ target, key, receiver, type: 'get' })

    // dynamic reactive
    return isObjectLike(res) ? reactive(res) : res
  },
  set(target, key, value, receiver) {
    const hasKey = hasOwn(target, key)
    const oldVal = target[key]
    const res = Reflect.set(target, key, value, receiver)
    if (!hasKey) {
      // TODO trigger add
    } else if (value !== oldVal) {
      // TODO trigger set
    }
    return res
  },
  deleteProperty(target, key) {
    const res = Reflect.deleteProperty(target, key)
    // TODO trigger delete
    return res
  }
}
