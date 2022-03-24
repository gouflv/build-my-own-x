/**
 * f(n) = f(n-1) + f(n-2)
 */
export const fibonacciN = n => {
  if (n === 0) return 0
  if (n === 1) return 1
  return fibonacciN(n - 2) + fibonacciN(n - 1)
}

export const fibonacciSequence = len => {
  const res = []
  let p1 = 0,
    p2 = 1,
    _n

  for (let i = 0; i < len; i++) {
    res.push(p1)
    _n = p1 + p2
    p1 = p2
    p2 = _n
  }
  return res
}
