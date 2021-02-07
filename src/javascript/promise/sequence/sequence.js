/**
 * sequence 串联
 * @param promises
 * @returns {function(error, values): void}
 */
export const sequence = promises => {
  return callback => {
    const res = []
    let error = undefined
    let index = -1

    function run() {
      index++
      const promise = promises[index]
      promise.then(onResolved).catch(onRejected)
    }

    function onResolved(value) {
      res.push(value)
      if (index >= promises.length - 1) {
        callback(error, res)
      } else {
        run()
      }
    }

    function onRejected(e) {
      error = e
      callback(error, undefined)
    }

    run()
  }
}
