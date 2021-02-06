import { HashTable } from './hash-table'
import { std } from '../../javascript/_/math/std'

describe('Test HashTable', () => {
  let ht: HashTable<string>
  beforeEach(() => {
    ht = new HashTable()
    ht.set('a', 'a1')
    ht.set('b', 'b1')
    ht.set('c', 'c1')
    ht.set('d', 'd1')
    ht.set('e', 'e1')
  })

  it('should hash works', () => {
    const hashed = {}
    for (let i = 'A'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
      const h = ht.hash(String.fromCharCode(i))
      if (Object.prototype.hasOwnProperty.call(hashed, h)) {
        hashed[h]++
      } else {
        hashed[h] = 0
      }
    }
    expect(std(Object.values(hashed))).toBeLessThan(1)
  })

  it('should set works', () => {
    expect(ht.keys()).toStrictEqual('a|b|c|d|e'.split('|'))
    expect(
      ht.values().every(v => 'a1|b1|c1|d1|e1'.split('|').includes(v))
    ).toBeTruthy()
  })
})
