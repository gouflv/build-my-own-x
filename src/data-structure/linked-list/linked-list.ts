interface Node<T> {
  value: T
  next: NullableNode<T>
}

type NullableNode<T> = Node<T> | null

export class LinkedList<T = any> {
  head: NullableNode<T> = null
  tail: NullableNode<T> = null
  private length = 0

  constructor(
    initialValue: T[] = [],
    private isEqual = (a: T, b: T) => Object.is(a, b)
  ) {
    if (initialValue) {
      initialValue.forEach(value => this.append(value))
    }
  }

  append(value: T) {
    this.length++
    const node = this._create(value)
    if (!this.head) {
      this.head = node
      this.tail = node
      return
    }
    if (this.tail) {
      this.tail.next = node
      this.tail = node
    }
  }

  prepend(value: T) {
    this.length++
    const node = this._create(value)
    if (!this.head) {
      this.head = node
      this.tail = node
      return
    }
    node.next = this.head
    this.head = node
  }

  insertAfter(index: number, value: T) {
    if (!this.head || index <= 0) {
      this.prepend(value)
      return
    }

    if (index >= this.length) {
      this.append(value)
      return
    }

    let curr = this.head
    while (index-- > 0 && curr.next) curr = curr.next

    const node = this._create(value)
    node.next = curr.next
    curr.next = node
    this.length++

    if (!node.next) this.tail = node
  }

  removeAt(index: number): T | null {
    if (!this.head) return null

    if (index <= 0) {
      this.length--
      const ret = this.head.value
      this.head = this.head.next
      if (!this.length) this.tail = null
      return ret
    }

    if (index > this.length - 1) index = this.length - 1

    // prev is left side node of index
    let prev = this.head
    while (--index > 0 && prev.next) prev = prev.next

    let toRemove = prev.next
    if (toRemove) {
      this.length--
      if (toRemove.next) {
        prev.next = toRemove.next
      } else {
        prev.next = null
        this.tail = prev
      }
      return toRemove.value
    }

    return null
  }

  remove(value: T) {
    const index = this.indexOf(value)
    if (~index) {
      return this.removeAt(index)
    }
  }

  forEach(iterator: (value: T, index: number) => boolean | void) {
    if (!this.head) return

    let curr: NullableNode<T> = this.head,
      index = -1

    while (curr) {
      index++
      const ret = iterator(curr.value, index)
      if (typeof ret === 'boolean' && !ret) {
        break
      }
      curr = curr.next
    }
  }

  forEachRight(iterator: (value: T, index: number) => boolean | void) {
    let index = this.length
    const recursive = (node: NullableNode<T>) => {
      if (node) {
        recursive(node.next)
        iterator(node.value, --index)
      }
    }
    recursive(this.head)
  }

  indexOf(value: T) {
    let index = -1,
      found = false
    this.forEach((val, i) => {
      index = i
      if (this.isEqual(val, value)) {
        found = true
        return false
      }
    })
    return found ? index : -1
  }

  find(iterator: (value: T) => boolean) {
    let curr = this.head
    while (curr) {
      if (iterator(curr.value)) {
        return curr
      }
      curr = curr.next
    }
    return null
  }

  /**
   * @see https://medium.com/javascript-in-plain-english/javascript-reverse-linked-list-a2d235d64548
   * @see https://dev.to/urfan/leetcode-reverse-linked-list-with-javascript-1nn8
   */
  reverse() {
    if (!this.head) return

    let prev: NullableNode<T> = null,
      curr: NullableNode<T> = this.head,
      next: NullableNode<T> = null

    while (curr) {
      next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }

    this.tail = this.head
    this.head = prev
  }

  size() {
    return this.length
  }

  toArray() {
    const res: T[] = []
    this.forEach(value => {
      res.push(value)
    })
    return res
  }

  protected _create(value: T): Node<T> {
    return { value, next: null }
  }
}
