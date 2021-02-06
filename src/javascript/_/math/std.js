export const std = arr => {
  const sum = arr => arr.reduce((acc, n) => acc + n)
  const avg = sum(arr) / arr.length
  const ret = Math.sqrt(sum(arr.map(n => Math.pow(n - avg, 2))) / arr.length)
  return parseFloat(ret.toFixed(3))
}
