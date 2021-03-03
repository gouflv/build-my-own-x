import { Trie, TrieNode } from './trie'

describe('Test Trie', () => {
  let trie: Trie

  beforeEach(() => {
    trie = new Trie()
  })

  it('should insert word', () => {
    trie.insert('cat')
    trie.insert('car')

    const c = trie.root.getChild('c') as TrieNode
    const a = c.getChild('a') as TrieNode
    const t = a.getChild('t') as TrieNode
    const r = a.getChild('r') as TrieNode
    expect(c.char).toBe('c')
    expect(a.char).toBe('a')
    expect(t.char).toBe('t')
    expect(r.char).toBe('r')

    expect(t.leaf).toBe(true)
    expect(r.leaf).toBe(true)
  })

  it('should suggests next char', () => {
    trie.insert('cat')
    trie.insert('cats')
    trie.insert('car')
    trie.insert('caption')
    expect(trie.suggestNextChar('ca')).toEqual(['t', 'r', 'p'])
    expect(trie.suggestNextChar('cat')).toEqual(['s'])
    expect(trie.suggestNextChar('a')).toBeNull()
  })

  it('should check if word exists', () => {
    trie.insert('cats')
    trie.insert('caption')
    expect(trie.exists('cats')).toBeTruthy()
    expect(trie.exists('caption')).toBeTruthy()
    expect(trie.exists('ca')).not.toBeTruthy()
  })
})
