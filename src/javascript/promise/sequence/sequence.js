/**
 * sequence 串联
 * @param promises
 * @returns Promise<values>
 */
export const sequence = promises =>
  promises.reduce(
    (prev, curr) =>
      prev.then(pv => Promise.resolve(curr).then(v => [...pv, v])),
    Promise.resolve([])
  )
