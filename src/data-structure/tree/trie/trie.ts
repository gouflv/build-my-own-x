export class TrieNode {
  children = new Map<string, TrieNode>()

  constructor(public char?: string, public leaf = false) {}

  getChild(char: string) {
    return this.children.get(char)
  }

  hasChild(char: string) {
    return this.children.has(char)
  }

  getSuggestChild() {
    return Array.from(this.children.keys())
  }
}

export class Trie {
  root = new TrieNode()

  insert(word: string) {
    let children = this.root.children
    Array.from(word).forEach((c, i) => {
      let node = children.get(c)
      if (!node) {
        node = new TrieNode(c)
        children.set(c, node)
      }
      children = node.children
      if (i >= word.length - 1) {
        node.leaf = true
      }
    })
  }

  exists(word: string) {
    const last = this.getLastNode(word)
    return !!last && last.leaf
  }

  suggestNextChar(word: string): string[] | null {
    const last = this.getLastNode(word)
    return last ? last.getSuggestChild() : null
  }

  getLastNode(word: string): TrieNode | null {
    let curr: TrieNode | null = this.root
    Array.from(word).every(c => {
      if (!curr?.hasChild(c)) {
        curr = null
        return false
      }
      curr = curr.getChild(c) as TrieNode
      return true
    })
    return curr
  }
}
