/**
 * FIFO
 */
export class Queue<T = any> {
  protected items: T[] = []

  enqueue(el: T) {
    this.items.push(el)
  }
  dequeue() {
    return this.items.shift()
  }
  front() {
    return this.items[0]
  }
  size() {
    return this.items.length
  }
  isEmpty() {
    return !this.size()
  }
  clear() {
    this.items = []
  }
}
