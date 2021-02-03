import { curry } from './curry'
const _ = curry.placeholder

describe('Test curry', () => {
  const func = (a, b, c) => [a, b, c]
  const expectReturn = [1, 2, 3]

  it('simple curry', () => {
    const curriedFun = curry(func)

    expect(curriedFun(1)(2)(3)).toStrictEqual(expectReturn)
    expect(curriedFun(1, 2, 3)).toStrictEqual(expectReturn)
    expect(curriedFun(1, 2)(3)).toStrictEqual(expectReturn)
    expect(curriedFun(1)(2, 3)).toStrictEqual(expectReturn)
  })

  it('placeholder', () => {
    const curriedFun = curry(func)
    expect(curriedFun(_, 2)(1, 3)).toStrictEqual(expectReturn)
    expect(curriedFun(_, _, _)(1)(_, 3)(2)).toStrictEqual(expectReturn)
    expect(curriedFun(_, _, _, _)(_, 2, _)(_, 3)(1)).toStrictEqual(expectReturn)
  })
})
