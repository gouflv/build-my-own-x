import { Node, NullableNode } from '../typing'

export class BinarySearchTree<T = number> {
  root: NullableNode<T> = null

  insert(value: T) {
    if (!this.root) {
      this.root = this._create(value)
      return
    }
    this._insert(this.root, value)
  }

  contains(value: T, node = this.root): boolean {
    if (!node) return false
    if (node.value === value) return true
    return this.contains(value, value < node.value ? node.left : node.right)
  }

  findNode(value: T, node = this.root): Node<T> | undefined {
    if (!node) return
    if (node.value === value) return node
    return this.findNode(value, value < node.value ? node.left : node.right)
  }

  /**
   * @deprecated
   */
  findParentRecursion(value: T, node = this.root): Node<T> | undefined {
    if (!node) return
    if (value === node.value) return
    if (value < node.value) {
      if (!node.left) return
      if (value === node.left.value) return node
      return this.findParent(value, node.left)
    } else {
      if (!node.right) return
      if (value === node.right.value) return node
      return this.findParent(value, node.right)
    }
  }

  findParent(value: T, node = this.root): Node<T> | undefined {
    const child = this.findNode(value, node)
    if (child && child.parent) {
      return child.parent
    }
    return undefined
  }

  findMin(node = this.root): T | undefined {
    if (!node) return
    if (!node.left) return node.value
    return this.findMin(node.left)
  }

  findMax(node = this.root): T | undefined {
    if (!node) return
    if (!node.right) return node.value
    return this.findMax(node.right)
  }

  walkPre(node: (value: T, node: Node<T>) => boolean | void) {
    const walker = (root = this.root) => {
      if (root) {
        node(root.value, root)
        walker(root.left)
        walker(root.right)
      }
    }
    walker()
  }

  walkIn(node: (value: T, node: Node<T>) => boolean | void) {
    const walker = (root = this.root) => {
      if (root) {
        walker(root.left)
        node(root.value, root)
        walker(root.right)
      }
    }
    walker()
  }

  walkPost(node: (value: T, node: Node<T>) => boolean | void) {
    const walker = (root = this.root) => {
      if (root) {
        walker(root.left)
        walker(root.right)
        node(root.value, root)
      }
    }
    walker()
  }

  remove(value: T, root = this.root): boolean {
    const curr = this.findNode(value)
    if (!curr) {
      console.warn('${value} on found in tree')
      return false
    }

    if (curr === this.root) {
      this.root = null
      return true
    }

    const parent = this.findParent(value)
    if (!parent) return false

    // left
    if (!curr.left && !curr.right) {
      curr.parent = null
      if (value < parent.value) {
        parent.left = null
      } else {
        parent.right = null
      }
    }
    // full children
    if (curr.left && curr.right) {
      let minNodeOnRight = curr.right
      while (minNodeOnRight.left) minNodeOnRight = minNodeOnRight.left

      // set min value to curr
      if (minNodeOnRight === curr.right) {
        curr.value = minNodeOnRight.value
        curr.right.parent = null
        curr.right = null
      } else {
        this.remove(minNodeOnRight.value)
        curr.value = minNodeOnRight.value
      }
    }
    // one child
    else if (curr.left || curr.right) {
      const next = (curr.left || curr.right) as Node<T>
      if (next.value < parent.value) {
        parent.left = next
      } else {
        parent.right = next
      }
      curr.parent = null
      next.parent = parent
    }

    return true
  }

  toArray(walker: 'walkPre' | 'walkIn' | 'walkPost') {
    const res: T[] = []
    this[walker].bind(this)(value => {
      res.push(value)
    })
    return res
  }

  __validate__(root = this.root) {
    if (!root) return true
    if (root.left) {
      if (root.left.value > root.value) {
        console.error(
          `${root.value} has invalidate left value: ${root.left.value}`
        )
        return false
      }
      return this.__validate__(root.left)
    }
    if (root.right) {
      if (root.right.value < root.value) {
        console.error(
          `${root.value} has invalidate right value: ${root.right.value}`
        )
        return false
      }
      return this.__validate__(root.right)
    }
    return true
  }

  protected _create(value: T): Node<T> {
    return { value, left: null, right: null, parent: null }
  }

  protected _insert(node: Node<T>, value: T) {
    if (value < node.value) {
      if (node.left) {
        this._insert(node.left, value)
      } else {
        node.left = this._create(value)
        node.left.parent = node
      }
    } else {
      if (node.right) {
        this._insert(node.right, value)
      } else {
        node.right = this._create(value)
        node.right.parent = node
      }
    }
  }
}
