// https://zh.wikipedia.org/wiki/AVL%E6%A0%91
import { BinarySearchTree } from '../binary-search-tree/binary-search-tree'
import { Node, NullableNode } from '../typing'

export class AvlTree<T> extends BinarySearchTree<T> {
  insert(value: T) {
    super.insert(value)

    let node = this.findNode(value)
    while (node) {
      this.balance(node)
      node = node.parent as Node<T>
    }
  }

  remove(value: T, root = this.root): boolean {
    const res = super.remove(value, root)
    this.balance(root)
    return res
  }

  balance(node: NullableNode<T>) {}

  rotateLeftLeft(root: Node<T>) {}
  rotateLeftRight(root: Node<T>) {}
  rotateRightLeft(root: Node<T>) {}
  rotateRightRight(root: Node<T>) {}
}
