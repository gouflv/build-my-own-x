import { nativeRoot, toStringTag } from '../_/setup'

/**
 * isUndefined
 */
export const isUndefined = val => val === void 0

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
 * check Number object
 */
const isNumberObject = val =>
  isObjectLike(val) && toStringTag(val) === '[object Number]'

/**
 * isNumber
 */
export const isNumber = val => typeof val === 'number' || isNumberObject(val)

/**
 * isFinite
 */
export const isFinite = val => isNumber(val) && nativeRoot.isFinite(val)

/**
 * isNaNOnly
 */
export const isNaNOnly = val => isNumber(val) && val !== val

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
 * isObject
 */
export const isObject = val => isObjectLike(val) || isFunction(val)

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
  if (!val || isFunction(val)) return false
  return (
    isNumber(val.length) &&
    val.length > -1 &&
    val.length <= Number.MAX_SAFE_INTEGER
  )
}

/**
 * isArray
 */
export const isArray =
  Array.isArray || (val => toStringTag(val) === '[object Array]')

/**
 * isSymbol
 */
export const isSymbol = val => typeof val === 'symbol'
