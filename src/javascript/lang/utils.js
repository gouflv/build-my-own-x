export const nativeRoot = window || global

/**
 * get object toString type tag: [object `Class`]
 */
export const toStringTag = val => Object.prototype.toString.call(val)
