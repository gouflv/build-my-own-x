/**
 * 5! = 5 * 4 * 3 * 2 * 1
 */
export const factorialRecursive = n =>
  n > 1 ? n * factorialRecursive(n - 1) : 1
