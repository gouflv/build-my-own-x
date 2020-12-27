import { hasOwn, nativeRoot, toStringTag } from '../utils'

/**
 * isUndefined
 */
export const isUndefined = val => val === undefined

/**
 * isNull
 */
export const isNull = val => val === null

/**
 * check `typeof val` is 'object'
 */
export const isObjectLike = val => !isNull(val) && typeof val === 'object'

/**
 * check Boolean object created with `constructor`
 */
const isBooleanObject = val =>
  isObjectLike(val) && toStringTag(val) === '[object Boolean]'

/**
 * isBoolean
 */
export const isBoolean = val =>
  val === true || val === false || isBooleanObject(val)

/**
 * isNumber
 */
export const isNumber = val => typeof val === 'number'

/**
 * isFinite
 */
export const isFinite = val => isNumber(val) && nativeRoot.isFinite(val)

/**
 * check String object
 */
const isStringObject = val =>
  isObjectLike(val) && toStringTag(val) === '[object String]'

/**
 * isString
 */
export const isString = val => typeof val === 'string' || isStringObject(val)

/**
 * isObjectLike
 */
export const isObject = isObjectLike

/**
 * isPlainObject
 */
export const isPlainObject = val => {
  // check is object
  if (!isObjectLike(val) || toStringTag(val) !== '[object Object]') return false

  // check is create by Object.create(null)
  if (Object.getPrototypeOf(val) === null) return true

  // @see https://github.com/bevry/typechecker/blob/f57a045/source/index.ts#L36
  // Ugly, but test passing
  return val.__proto__ === Object.prototype
}

/**
 * isArguments
 */
export const isArguments = val =>
  isObjectLike(val) && toStringTag(val) === '[object Arguments]'

/**
 * isError
 */
export const isError = val =>
  isObjectLike(val) && toStringTag(val) === '[object Error]'

/**
 * isFunction
 */
export const isFunction = val => typeof val === 'function'

/**
 * isArrayLike
 */
export const isArrayLike = val => {
  if (isFunction(val)) return false
  return (
    isNumber(val.length) &&
    val.length > -1 &&
    val.length < Number.MAX_SAFE_INTEGER
  )
}
