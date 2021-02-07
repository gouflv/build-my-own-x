/**
 * parallel 并联
 * @param promises
 * @returns {function(error, values): void}
 */
export const parallel = promises => {
  return callback => {
    const res = []
    let error = undefined
    let count = 0

    function onResolved(value) {
      if (error) return
      res.push(value)
      count++
      if (count >= promises.length) {
        callback(error, res)
      }
    }
    function onRejected(e) {
      if (error) return
      error = e
      callback(error, undefined)
    }

    promises.forEach(promise => {
      promise.then(onResolved).catch(onRejected)
    })
  }
}
