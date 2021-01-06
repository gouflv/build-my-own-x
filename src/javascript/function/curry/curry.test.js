import { curry } from './curry'

describe('Test curry', () => {
  it('simple curry', () => {
    const func = (a, b, c) => [a, b, c]
    const expectReturn = [1, 2, 3]
    const curriedFun = curry(func)

    expect(curriedFun(1)(2)(3)).toStrictEqual(expectReturn)
    expect(curriedFun(1, 2, 3)).toStrictEqual(expectReturn)
    expect(curriedFun(1, 2)(3)).toStrictEqual(expectReturn)
    expect(curriedFun(1)(2, 3)).toStrictEqual(expectReturn)
  })
})
