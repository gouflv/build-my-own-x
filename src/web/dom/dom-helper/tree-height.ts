const treeHeightRecursive = (tree: Node | null | undefined) => {
  if (!tree) return 0

  function walk(tree, depth = 1) {
    if (!tree || tree.nodeType !== Node.ELEMENT_NODE) return depth - 1

    const children = Array.from(tree.childNodes)
    if (!children.length) return depth

    return Math.max(...children.map(c => walk(c, depth + 1)))
  }
  return walk(tree)
}

const treeHeightIterative = tree => {
  if (!tree) return 0
  if (tree.nodeType !== Node.ELEMENT_NODE) return 0

  let height = 0
  let nodeOfLevel = [tree]

  while (nodeOfLevel.length) {
    height++
    nodeOfLevel = nodeOfLevel.reduce((res, node) => {
      node.children && res.push(...Array.from(node.children))
      return res
    }, [])
  }

  return height
}

export const treeHeight = treeHeightIterative
