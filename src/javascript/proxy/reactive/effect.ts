import { activeEffect } from './effectRunner'

export type Target = object
export interface Effect {}

export const enum TrackOpType {
  GET = 'get'
}

const trackTargetMap = new WeakMap<Target>()

export const track = (target: Target, key, type: TrackOpType) => {
  if (!activeEffect) {
    return
  }

  let trackedTarget = trackTargetMap.get(target)
  if (!trackedTarget) {
    trackedTarget.set(target, (trackedTarget = new Map()))
  }

  let trackedTargetKeySet = trackedTarget.get(key)
  if (!trackedTargetKeySet) {
    trackedTarget.set(key, (trackedTargetKeySet = new Set()))
  }

  if (!trackedTargetKeySet.has(activeEffect)) {
    trackedTargetKeySet.add(activeEffect)
  }
}
