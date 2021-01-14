// use `self` instead of `window` for `WebWorker` support
export const nativeRoot =
  (typeof self === 'object' && self.self === self && self) ||
  (typeof global === 'object' && global.global === global && global) ||
  this ||
  {}

/**
 * get object toString type tag: [object `Class`]
 */
export const toStringTag = val => Object.prototype.toString.call(val)

/**
 * hasOwn
 */
export const hasOwn = (val, key) =>
  Object.prototype.hasOwnProperty.call(val, key)
