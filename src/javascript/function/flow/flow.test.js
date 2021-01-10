import { flow } from './flow'
import { curry } from '../curry/curry'

describe('Test flow', () => {
  it('simple flow', () => {
    const greet = name => `Hi, ${name}`
    const exclaim = val => `${val.toUpperCase()}!`
    expect(flow(greet, exclaim)('foo')).toBe('HI, FOO!')
  })

  it('reduced flow', () => {
    const add = (val, res) => res + val
    const flowed = flow(
      curry(add)('1'),
      curry(add)('2'),
      curry(add)('3'),
      curry(add)('4'),
      curry(add)('5')
    )
    expect(flowed('foo')).toBe('foo12345')
  })
})
