import { apply } from './apply'

export const call = (fn, context, ...args) => {
  return apply(fn, context, args)
}
