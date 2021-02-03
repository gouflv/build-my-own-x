/**
 * FIFO
 * high priority output first
 */
export class PriorityQueue<T = any> {
  protected items: T[] = []

  constructor(private compare: (a, b) => -1 | 0 | 1) {}

  enqueue(el: T) {
    // 1.
    // this.items.push(el)
    // this.items.sort((a, b) => b - a)

    //2. binary search index
    if (this.isEmpty()) {
      this.items.push(el)
      return
    }

    let left = 0,
      right = this.items.length
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (this.compare(this.items[mid], el) <= -1) {
        left = mid + 1
      } else {
        right = mid
      }
    }
    this.items.splice(left, 0, el)
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
