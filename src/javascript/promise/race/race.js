/**
 * Handle first promise resolve or reject
 */
export const race = promises => {
  return !promises.length
    ? Promise.resolve()
    : new Promise((resolve, reject) => {
        promises.forEach(promise => {
          Promise.resolve(promise).then(resolve, reject)
        })
      })
}
