export const treeHeight = (tree: Node | null | undefined) => {
  if (!tree) return 0

  function walk(tree, depth = 1) {
    if (!tree || tree.nodeType !== Node.ELEMENT_NODE) return depth - 1

    const children = Array.from(tree.childNodes)
    if (!children.length) return depth

    return Math.max(...children.map(c => walk(c, depth + 1)))
  }
  return walk(tree)
}
