/**
 * Recursive version of pwd
 */
export const powRecursive = (base, exponent = 1) => {
  if (exponent === 0) return 1
  if (exponent === 1) return base
  return base * powRecursive(base, exponent - 1)
}
