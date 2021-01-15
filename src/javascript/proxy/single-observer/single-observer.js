import { isObjectLike } from '../../lang/is/is'
import { hasOwn } from '../../lang/_/setup'

const KEY_OBSERVER = Symbol('observers')

export const singleObserver = target => {
  if (!isObjectLike(target) || !Object.isExtensible(target)) {
    return null
  }

  if (isObservable(target)) {
    return target
  }

  Object.defineProperty(target, KEY_OBSERVER, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: new Set()
  })

  const subscribe = handler => {
    target[KEY_OBSERVER].add(handler)
  }
  Object.defineProperty(target, 'subscribe', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: subscribe
  })

  return createReactive(target, target[KEY_OBSERVER])
}

function createReactive(target, observerSet) {
  const baseHandler = {
    get(target, key) {
      const res = Reflect.get(...arguments)
      return isObjectLike(res) ? createReactive(res, observerSet) : res
    },
    set(target, key, value) {
      const success = Reflect.set(...arguments)
      if (success) {
        observerSet.forEach(f => f(key, value))
      }
      return success
    }
  }

  return new Proxy(target, baseHandler)
}

export const isObservable = value => hasOwn(value, KEY_OBSERVER)
