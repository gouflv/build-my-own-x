interface Node<T> {
  value: T
  next: Node<T> | null
}

export class LinkedList<T = any> {
  head: Node<T> | null = null
  tail: Node<T> | null = null
  private length = 0

  constructor(initialValue?: T[]) {
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

  removeAt(index: number): T | undefined {
    if (!this.head) return

    if (index <= 0) {
      this.length--
      const ret = this.head.value
      this.head = this.head.next
      if (!this.length) this.tail = null
      return ret
    }

    if (index > this.length - 1) index = this.length - 1

    // curr is left side node of index
    let curr = this.head
    while (--index > 0 && curr.next) curr = curr.next

    let toRemove = curr.next
    if (toRemove) {
      this.length--
      if (toRemove.next) {
        curr.next = toRemove.next
      } else {
        curr.next = null
        this.tail = curr
      }
      return toRemove.value
    }
  }

  forEach(iterator: (value: T, index: number) => boolean | void) {
    if (!this.head) return

    let curr: Node<T> | null = this.head,
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

  indexOf(value: T) {
    let index = -1,
      found = false
    this.forEach((val, i) => {
      index = i
      if (Object.is(val, value)) {
        found = true
        return false
      }
    })
    return found ? index : -1
  }

  size() {
    return this.length
  }

  toArray() {
    if (!this.head) return []
    const res = [this.head.value]
    let curr = this.head
    while (curr.next) {
      curr = curr.next
      res.push(curr.value)
    }
    return res
  }

  protected _create(value: T): Node<T> {
    return { value, next: null }
  }
}
