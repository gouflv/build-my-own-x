import { VNode } from './vnode'

type MayBeVNode = VNode<any> | string | null | undefined

export enum DiffTypes {
  REPLACE,
  REMOVE,
  UPDATE_ATTR,
  UPDATE_TEXT
}

export type NodeDiff = {
  type: DiffTypes
  value: ReplaceValue | RemoveValue | UpdateAttrValue | UpdateTextValue
}

type ReplaceValue = VNode<any>
type RemoveValue = number
type UpdateAttrValue = Record<string, any>
type UpdateTextValue = string

export type Patches = Record<number, NodeDiff[]>

export const diff = (oldVNode: MayBeVNode, newVNode: MayBeVNode) => {
  const res = {} as Patches
  diffWalker(oldVNode, newVNode, 0, res)
  return res
}

const diffWalker = (
  oldVNode: MayBeVNode,
  newVNode: MayBeVNode,
  index: number,
  patches: Patches
) => {
  const nodeDiff: NodeDiff[] = []
  patches[index] = nodeDiff

  if (!oldVNode && newVNode) {
    nodeDiff.push({ type: DiffTypes.REPLACE, value: newVNode })
    return patches
  }

  if (oldVNode && !newVNode) {
    nodeDiff.push({ type: DiffTypes.REMOVE, value: oldVNode })
    return patches
  }

  // Element diff
  if (oldVNode instanceof VNode && newVNode instanceof VNode) {
    // type
    if (oldVNode.tagName !== newVNode.tagName) {
      nodeDiff.push({ type: DiffTypes.REPLACE, value: newVNode })
      return patches
    }
    // attrs
    const oldAttrKeys = Object.keys(oldVNode.attrs || {})
    const newAttrKeys = Object.keys(newVNode.attrs || {})
    if (oldAttrKeys.length !== newAttrKeys.length) {
      nodeDiff.push({
        type: DiffTypes.UPDATE_ATTR,
        value: newVNode.attrs as UpdateAttrValue
      })
      return patches
    }
    const isNewAttrUpdate = newAttrKeys.some(k => {
      return (
        oldVNode.attrs &&
        newVNode.attrs &&
        !Object.is(oldVNode.attrs[k], newVNode.attrs[k])
      )
    })
    if (isNewAttrUpdate) {
      nodeDiff.push({
        type: DiffTypes.UPDATE_ATTR,
        value: newVNode.attrs as UpdateAttrValue
      })
    }
  }
  // TextNode diff
  else if (
    typeof oldVNode === 'string' &&
    typeof newVNode === 'string' &&
    oldVNode !== newVNode
  ) {
    nodeDiff.push({ type: DiffTypes.UPDATE_TEXT, value: newVNode })
  } else {
    nodeDiff.push({ type: DiffTypes.REPLACE, value: newVNode as ReplaceValue })
  }

  return patches
}
