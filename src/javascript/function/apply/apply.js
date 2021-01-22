import { isArray } from '../../lang/is/is'

export const apply = (fn, context, args) => {
  const symbol = Symbol('applyFn')

  context[symbol] = fn

  const result = isArray(args) ? context[symbol](...args) : context[symbol]()

  delete context[symbol]

  return result
}
