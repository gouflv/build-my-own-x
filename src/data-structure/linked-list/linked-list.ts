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
    this.length++

    if (!this.head || index <= 0) {
      this.prepend(value)
      return
    }

    if (index >= this.length) {
      this.append(value)
      return
    }

    const node = this._create(value)
    let prev = this.head
    while (index-- > 0 && prev.next) prev = prev.next
    node.next = prev.next
    prev.next = node

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

    let prev = this.head
    while (--index > 0 && prev.next) prev = prev.next
    let toRemove = prev.next
    if (toRemove) {
      prev.next = toRemove.next
      return toRemove.value
    } else {
      throw 'error'
    }
  }

  removeValue(value: T) {}

  has(value: T) {}

  indexOf(value: T) {}

  forEach() {}

  forEachRight() {}

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
