import { pathParser } from './pathParser'

describe('Test pathParser', () => {
  it('simple object access path', () => {
    expect(pathParser()).toStrictEqual([])
    expect(pathParser(null)).toStrictEqual([])
    expect(pathParser(true)).toStrictEqual([])
    expect(pathParser({})).toStrictEqual([])
    expect(pathParser('')).toStrictEqual([])
    expect(pathParser('a')).toStrictEqual(['a'])
    expect(pathParser('a.b.c')).toStrictEqual(['a', 'b', 'c'])
    expect(pathParser('a.[1].c')).toStrictEqual(['a', 1, 'c'])
    expect(pathParser('a[1].c')).toStrictEqual(['a', 1, 'c'])
    expect(pathParser('a.1.c')).toStrictEqual(['a', '1', 'c'])
  })
})
