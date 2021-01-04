import { curry } from './curry'

describe('Test curry', () => {
  it('simple curry', () => {
    const func = (a, b, c) => [a, b, c]
    const expectRes = [1, 2, 3]

    const curriedFun = curry(func)
    expect(curriedFun(1)(2)(3)).toStrictEqual(expectRes)
    expect(curriedFun(1, 2, 3)).toStrictEqual(expectRes)
    expect(curriedFun(1, 2)(3)).toStrictEqual(expectRes)
    expect(curriedFun(1)(2, 3)).toStrictEqual(expectRes)
  })
})
