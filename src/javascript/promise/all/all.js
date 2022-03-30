import { isArray } from '../../lang/is/is'

/**
 * Return a Promise that
 *  fulfilled if every promises resolved
 *  rejected if one promise rejected
 */
export const all = promises =>
  !isArray(promises) || !promises.length
    ? Promise.resolve([]) // immediately resolved
    : new Promise((resolve, reject) => {
        const result = []

        promises.forEach((value, index) => {
          Promise.resolve(value).then(val => {
            result.push(val)

            if (result.length === promises.length) {
              resolve(result)
            }
          }, reject)
        })
      })
