interface Node<T> {
  value: T
  left: NullableNode<T>
  right: NullableNode<T>
}

type NullableNode<T> = Node<T> | null

export class BinarySearchTree<T = number> {
  root: NullableNode<T> = null

  insert(value: T) {
    if (!this.root) {
      this.root = this._create(value)
      return
    }
    this._insert(this.root, value)
  }

  contains(value: T, root = this.root): boolean {
    if (!root) return false
    if (root.value === value) return true
    return this.contains(value, value < root.value ? root.left : root.right)
  }

  findNode(value: T, root = this.root): Node<T> | undefined {
    if (!root) return
    if (root.value === value) return root
    return this.findNode(value, value < root.value ? root.left : root.right)
  }

  findParent(value: T, root = this.root): Node<T> | undefined {
    if (!root) return
    if (value === root.value) return
    if (value < root.value) {
      if (!root.left) return
      if (value === root.left.value) return root
      return this.findParent(value, root.left)
    } else {
      if (!root.right) return
      if (value === root.right.value) return root
      return this.findParent(value, root.right)
    }
  }

  findMin(root = this.root): T | undefined {
    if (!root) return
    if (!root.left) return root.value
    return this.findMin(root.left)
  }

  findMax(root = this.root): T | undefined {
    if (!root) return
    if (!root.right) return root.value
    return this.findMax(root.right)
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

  remove(value: T) {}

  protected _create(value: T): Node<T> {
    return { value, left: null, right: null }
  }

  protected _insert(node: Node<T>, value: T) {
    if (value < node.value) {
      if (node.left) {
        this._insert(node.left, value)
      } else {
        node.left = this._create(value)
      }
    } else {
      if (node.right) {
        this._insert(node.right, value)
      } else {
        node.right = this._create(value)
      }
    }
  }
}
