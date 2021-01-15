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

  target.subscribe = handler => {
    target[KEY_OBSERVER].add(handler)
  }

  const baseHandler = {
    get(target, key) {
      return Reflect.get(...arguments)
    },
    set(target, key, value) {
      const success = Reflect.set(...arguments)
      if (success) {
        target[KEY_OBSERVER].forEach(f => f(key, value))
      }
      return success
    }
  }

  return new Proxy(target, baseHandler)
}

export const isObservable = value => hasOwn(value, KEY_OBSERVER)
