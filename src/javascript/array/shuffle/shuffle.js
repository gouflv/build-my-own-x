/**
 * Fisher–Yates shuffle
 */

export const shuffle = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
    let random = Math.floor(Math.random() * (i + 1))
    ;[arr[random], arr[i]] = [arr[i], arr[random]]
  }
  return arr
}
