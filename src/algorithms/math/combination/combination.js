/**
 * 组合
 */
export const combination = arr => {
  const res = []

  const fn = (head, rest) => {
    rest.forEach((x, i) => {
      let _t = [...head, x]
      res.push(_t)
      fn(_t, rest.slice(i + 1))
    })
  }

  fn([], arr)
  return res
}
