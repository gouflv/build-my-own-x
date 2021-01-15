import { isObjectLike } from '../../lang/is/is'
import { baseHandler } from './baseHandler'

export const proxyToRawMap = new WeakMap()
export const rawToProxyMap = new WeakMap()

export const reactive = target => {
  if (!isObjectLike(target) || !Object.isExtensible(target)) {
    return target
  }

  const existProxy = rawToProxyMap.get(target)
  if (existProxy) {
    return existProxy
  }

  const proxy = new Proxy(target, baseHandler)

  proxyToRawMap.set(proxy, target)
  rawToProxyMap.set(target, proxy)

  return proxy
}

export const isReactive = obj => !!proxyToRawMap.get(obj)

export const toRaw = obj => proxyToRawMap.get(obj) || obj
