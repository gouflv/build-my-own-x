import { DiffTypes, NodeDiff, Patches } from './diff'
import { Element } from './vnode'

export const applyPatches = (node: HTMLElement, patches: Patches) => {
  walker(node, 0, patches)
}

const walker = (node: Node, index: number, patches: Patches) => {
  console.debug(node, patches)

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
        patch.value instanceof Element
          ? patch.value.render()
          : typeof patch.value === 'string'
          ? document.createTextNode(patch.value)
          : null
      if (newNode) {
        console.log(node.parentElement?.removeChild(node))
        node.parentElement?.removeChild(node)
      }
    }
  })
}
