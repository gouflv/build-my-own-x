import { compose } from './compose'
import { partial } from '../partial/partial'
import { curry } from '../curry/curry'

describe('Test compose', () => {
  it('simple compose', () => {
    const greet = name => `Hi, ${name}`
    const exclaim = val => `${val.toUpperCase()}!`
    expect(compose(greet, exclaim)('foo')).toBe('Hi, FOO!')
  })

  it('reduced compose', () => {
    const add = (val, res) => res + val
    const composed = compose(
      curry(add)('1'),
      curry(add)('2'),
      curry(add)('3'),
      curry(add)('4'),
      curry(add)('5')
    )
    expect(composed('foo')).toBe('foo54321')
  })
})
