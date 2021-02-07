/**
 * GCD(24, 60) = 12
 *
 * 24%60 -> 24
 * 60%24 -> 12
 * 12%24 -> 0
 */
export const gcd = (a, b) => {
  a = Math.abs(a)
  b = Math.abs(b)
  return !b ? a : gcd(b, a % b)
}
