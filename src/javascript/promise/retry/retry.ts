export function retry(fetcher: () => Promise<any>, maximumRetryCount: number) {
  return new Promise((resolve, reject) => {
    let tryCount = 0
    const run = () => {
      fetcher()
        .then(value => resolve(value))
        .catch(e => {
          if (tryCount < maximumRetryCount) {
            tryCount++
            run()
          } else {
            reject(e)
          }
        })
    }
    run()
  })
}
