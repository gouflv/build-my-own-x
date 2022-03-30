export function retry(creator: () => Promise<any>, maxRetry = 0) {
  return new Promise((resolve, reject) => {
    let tryCount = 0
    const run = () => {
      creator()
        .then(value => resolve(value))
        .catch(e => {
          if (tryCount >= maxRetry) {
            reject(e)
            return
          }
          tryCount++
          run()
        })
    }
    run()
  })
}
