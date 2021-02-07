import { isArray } from '../../lang/is/is'

/**
 * Return a Promise
 *   fulfilled if any promise resolve,
 *   rejected if not think resolve
 */
export const any = promises => {
  if (!isArray(promises) || !promises.length) return Promise.reject()

  return new Promise((resolve, reject) => {
    const errors = []
    promises.forEach((promise, index) => {
      promise.then(
        value => resolve(value),
        reason => {
          errors[index] = reason
          if (errors.length === promises.length && errors.every(r => !!r)) {
            reject(new Error('No Promise was resolved', errors))
          }
        }
      )
    })
  })
}
