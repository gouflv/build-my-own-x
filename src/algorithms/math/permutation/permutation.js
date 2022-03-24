/**
 * 排列
 * https://stackoverflow.com/a/30551462
 */
export const permutation = arr => {
  if (!arr.length) return [[]]
  return arr.flatMap(x =>
    permutation(arr.filter(v => v !== x)).map(r => [x, ...r])
  )
}
