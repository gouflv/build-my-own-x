import { nativeRoot, toStringTag } from '../utils'

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

const isStringObject = val =>
  isObjectLike(val) && toStringTag(val) === '[object String]'

/**
 * isString
 */
export const isString = val => typeof val === 'string' || isStringObject(val)
