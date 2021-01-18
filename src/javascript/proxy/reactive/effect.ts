/**
 * targetMap = Map(
 *  target : Map<TargetKeysMap>(
 *    key : EffectSet
 *  )
 * )
 */
import { isUndefined } from '../../lang/is/is'

export interface Effect {
  (): any
  deps: Array<EffectSet>
}

type EffectSet = Set<Effect>
type TargetKeysMap = Map<any, EffectSet>

export enum TriggerType {
  ADD = 'add',
  SET = 'set'
}

const targetMap = new Map<any, TargetKeysMap>()
let activeEffect: Effect | undefined

export const track = (target, key) => {
  if (!activeEffect) {
    return
  }

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

  if (!isUndefined(key)) {
    add(targetKeysMap.get(key))
  }

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
