/**
 * Return a Promise that
 *  fulfilled if every promises resolved
 *  rejected if one promise rejected
 */
export const all = promises =>
  promises.reduce(
    (prev, next) =>
      prev.then(result => Promise.resolve(next).then(v => [...result, v])),
    Promise.resolve([])
  )
