const BaseChars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

export const base64Encode = str => {
  let bin8_str = Array.from(str)
    .map(char => '0' + char.charCodeAt(0).toString(2))
    .join('')

  // fill zero for bin6
  const bin8_remainder = bin8_str.length % 6
  if (bin8_remainder) {
    bin8_str += Array.from({ length: 6 - bin8_remainder })
      .fill('0')
      .join('')
  }

  const bin6_arr = []
  let i = 0
  for (; i < bin8_str.length; i += 6) {
    bin6_arr.push(parseInt(bin8_str.slice(i, i + 6), 2))
  }

  let res = bin6_arr.map(i => BaseChars[i]).join('')

  // add padding
  if (bin8_remainder) {
    res += Array.from({ length: (24 - (bin8_str.length % 24)) / 6 })
      .fill('=')
      .join('')
  }

  return res
}

export const base64Decode = str => {}
