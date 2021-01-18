import { isArray, isObjectLike } from '../../lang/is/is'
import { proxyToRawMap, reactive } from './reactive'
import {
  pauseTrack,
  resumeTrack,
  track,
  TrackType,
  trigger,
  TriggerType
} from './effect'
import { hasOwn } from '../../lang/_/setup'

const arrayTrackMethods = {}
;['push', 'pop', 'unshift', 'shift'].forEach(key => {
  const method = Array.prototype[key]
  arrayTrackMethods[key] = function (...args) {
    pauseTrack()
    const res = method.apply(this, args)
    resumeTrack()
    return res
  }
})

export const baseHandler: ProxyHandler<any> = {
  get(target, key, receiver) {
    if (proxyToRawMap.get(target)) {
      return target
    }

    if (isArray(target) && hasOwn(arrayTrackMethods, key)) {
      return Reflect.get(arrayTrackMethods, key, receiver)
    }

    const res = Reflect.get(target, key, receiver)

    track(target, TrackType.GET, key)

    return isObjectLike(res) ? reactive(res) : res
  },

  set(target, key, value, receiver) {
    const hasKey = isArray(target)
      ? Number(key) < target.length
      : hasOwn(target, key)

    const res = Reflect.set(target, key, value, receiver)

    if (hasKey) {
      trigger(target, TriggerType.SET, key, value)
    } else {
      trigger(target, TriggerType.ADD, key, value)
    }

    return res
  }
}
