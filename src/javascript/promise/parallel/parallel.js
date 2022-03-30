import { isArray } from '../../lang/is/is'

/**
 * parallel 并联
 * @alias allSettled
 * @param promises
 * @returns {function(error, values): void}
 */
export const parallel = promises =>
  !isArray(promises) || !promises.length
    ? Promise.resolve([])
    : new Promise(resolve => {
        const result = []

        function handler(value) {
          result.push(value)
          if (result.length === promises.length) {
            resolve(result)
          }
        }

        promises.forEach(promise => {
          promise.then(handler, handler)
        })
      })
