import { isArray, isObjectLike } from '../../lang/is/is'
import { hasOwn } from '../../lang/_/setup'

const REACTIVE_KEY_GET_RAW = '__getRaw__'

const reactiveMap = new WeakMap()

const baseHandler = {
  get(target, key, receiver) {
    if (key === REACTIVE_KEY_GET_RAW) {
      return target
    }
    const res = Reflect.get(target, key, receiver)
    // TODO track
    // lazy reactive
    return isObjectLike(res) ? reactive(res) : res
  },
  set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver)
    const has = hasOwn(target, key)
    console.debug(`target ${has ? 'set' : 'add'} ${key} = ${value}`)
    return res
  },
  deleteProperty(target, key) {
    const res = Reflect.deleteProperty(target, key)
    // TODO trigger delete
    return res
  }
}

export const reactive = target => {
  if (!isObjectLike(target) || !Object.isExtensible(target)) {
    return target
  }

  const existProxy = reactiveMap.get(target)
  if (existProxy) {
    return existProxy
  }

  const proxy = new Proxy(target, baseHandler)
  reactiveMap.set(target, proxy)
  return proxy
}

export const toRaw = observed => observed[REACTIVE_KEY_GET_RAW]
