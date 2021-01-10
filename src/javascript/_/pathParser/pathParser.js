import { isString } from '../../lang/is/is'

const PATH_Token = {
  Identifier: 1,
  ACC: 2,
  ARR_START: 3,
  ARR_END: 4
}

function toToken(char) {
  if (char === '.') return PATH_Token.ACC
  if (char === '[') return PATH_Token.ARR_START
  if (char === ']') return PATH_Token.ARR_END
  return PATH_Token.Identifier
}

export const pathParser = str => {
  if (!isString(str) || !str.length) {
    return []
  }

  const res = []
  const length = str.length

  let index = 0
  let token
  let curr
  let identifier = ''

  while (index < length) {
    curr = str[index]
    token = toToken(curr)

    if (token === PATH_Token.ACC) {
      // keep identifier
      if (identifier.length) {
        res.push(identifier)
        identifier = ''
      }
    } else if (token === PATH_Token.ARR_START) {
      // ignore '[' and save identifier
      if (identifier.length) {
        res.push(identifier)
        identifier = ''
      }
    } else if (token === PATH_Token.ARR_END) {
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
