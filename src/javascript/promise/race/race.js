import { isArray } from '../../lang/is/is'

/**
 * Handle first promise resolve or reject
 */
export const race = arr =>
  !isArray(arr)
    ? Promise.reject()
    : new Promise((resolve, reject) => {
        arr.forEach(promise => Promise.resolve(promise).then(resolve, reject))
      })
