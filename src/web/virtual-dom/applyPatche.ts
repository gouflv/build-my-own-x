import { DiffTypes, NodeDiff, Patches } from './diff'
import { VNode } from './vnode'
import { virtualize } from '../dom/serialization/vartualize'

export const applyPatches = (node: HTMLElement, patches: Patches) => {
  walker(node, 0, patches)
}

const walker = (node: Node, index: number, patches: Patches) => {
  const nodePatches = patches[index]
  if (nodePatches) {
    applyPatch(node, nodePatches)
  }

  // const children = node.childNodes
  // children.forEach(child => {
  //   walker(child, index+1, patches)
  // })
}

const applyPatch = (node: Node, patches: NodeDiff[]) => {
  patches.forEach(patch => {
    if (patch.type === DiffTypes.REPLACE) {
      const newNode =
        patch.value instanceof VNode
          ? patch.value.render()
          : typeof patch.value === 'string'
          ? document.createTextNode(patch.value)
          : null
      console.debug('newNode', virtualize(newNode))
      if (newNode) {
        console.debug('before', virtualize(node))
        node.parentElement?.replaceChild(newNode, node)
        console.debug('after', virtualize(node))
      }
    }
  })
}
