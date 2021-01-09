import { isString } from '../../lang/is/is'

const PATH_MODE = {
  ID: 1,
  ACC: 2,
  ARR_START: 3,
  ARR_END: 4
}

function getCharMode(char) {
  if (char === '.') return PATH_MODE.ACC
  if (char === '[') return PATH_MODE.ARR_START
  if (char === ']') return PATH_MODE.ARR_END
  return PATH_MODE.ID
}

export const pathParser = str => {
  if (!isString(str) || !str.length) {
    return []
  }

  const res = []
  const length = str.length

  let index = 0
  let mode
  let curr
  let identifier = ''

  while (index < length) {
    curr = str[index]
    mode = getCharMode(curr)

    if (mode === PATH_MODE.ACC) {
      // keep identifier
      if (identifier.length) {
        res.push(identifier)
        identifier = ''
      }
    } else if (mode === PATH_MODE.ARR_START) {
      // ignore '[' and save identifier
      if (identifier.length) {
        res.push(identifier)
        identifier = ''
      }
    } else if (mode === PATH_MODE.ARR_END) {
      // ignore ']' and save array index number

      const arrIndex = parseInt(identifier, 10)
      identifier = ''

      if (isFinite(arrIndex)) {
        res.push(arrIndex)
      }
    } else {
      identifier += curr
    }

    index += 1

    // ending
    if (index >= length && identifier.length) {
      res.push(identifier)
    }
  }

  return res
}
