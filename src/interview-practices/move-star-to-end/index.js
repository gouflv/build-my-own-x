const STAR = '*'

export const moveStarToEnd = str => {
  const arr = Array.from(str)
  let len = arr.length
  let swapped = false
  do {
    swapped = false
    for (let i = 0; i < len; i++) {
      if (arr[i] === STAR) {
        swapped = true
        ;[arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]
      }
    }
    len--
  } while (swapped)

  return arr.join('')
}
