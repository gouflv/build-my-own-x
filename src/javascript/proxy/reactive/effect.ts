/**
 * targetMap = Map(
 *  target : Map<TargetKeysMap>(
 *    key : EffectSet
 *  )
 * )
 */

export interface Effect {
  (): any
  deps: Array<EffectSet>
}

type EffectSet = Set<Effect>
type TargetKeysMap = Map<any, EffectSet>

export enum TrackType {
  GET = 'get',
  ITERATE = 'iterate'
}

export enum TriggerType {
  ADD = 'add',
  SET = 'set'
}

const targetMap = new Map<any, TargetKeysMap>()

let activeEffect: Effect | undefined

let shouldTrack = true

export const pauseTrack = () => (shouldTrack = false)

export const resumeTrack = () => (shouldTrack = true)

export const track = (target, type: TrackType, key) => {
  if (!shouldTrack || !activeEffect) {
    return
  }

  console.debug(`track ${type} ${key} on ${JSON.stringify(target)}`)

  let targetKeysMap = targetMap.get(target)
  if (!targetKeysMap) {
    targetMap.set(target, (targetKeysMap = new Map()))
  }

  let effectSet = targetKeysMap.get(key)
  if (!effectSet) {
    targetKeysMap.set(key, (effectSet = new Set()))
  }

  if (!effectSet.has(activeEffect)) {
    effectSet.add(activeEffect)
    activeEffect.deps.push(effectSet)
  }
}

export const trigger = (target, type, key, value) => {
  const targetKeysMap = targetMap.get(target)
  if (!targetKeysMap) {
    return
  }

  const effects = new Set<Effect>()
  const add = (add: Set<Effect> | undefined) => {
    add &&
      add.forEach(effect => {
        effects.add(effect)
      })
  }

  add(targetKeysMap.get(key))

  effects.forEach(fn => {
    fn()
  })
}

export const effect = fn => {
  const effect = function effectFun() {
    return fn()
  }
  effect.deps = []
  activeEffect = effect
  effect()
}
