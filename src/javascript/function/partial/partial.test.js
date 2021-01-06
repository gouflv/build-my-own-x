import { partial } from './partial'

describe('Test partial', () => {
  it('simple function', () => {
    const func = (a, b, c) => [a, b, c]
    const expectReturn = [1, 2, 3]

    expect(partial(func, 1)(2, 3)).toStrictEqual(expectReturn)
    expect(partial(func, 1, 2)(3)).toStrictEqual(expectReturn)
  })
})
