export const all = promises =>
  promises.reduce(
    (prev, next) =>
      prev.then(result => Promise.resolve(next).then(v => [...result, v])),
    Promise.resolve([])
  )
