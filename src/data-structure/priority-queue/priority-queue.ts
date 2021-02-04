/**
 * FIFO
 * high priority output first
 */
export class PriorityQueue<T = any> {
  protected items: T[] = []

  constructor(private compare: (a, b) => number) {}

  enqueue(el: T) {
    // 1. sort algorithm
    // V8引擎中的排序 https://zhuanlan.zhihu.com/p/55338902
    // this.items.push(el)
    // this.items.sort((a, b) => b - a)

    //2. binary search and insert
    if (this.isEmpty()) {
      this.items.push(el)
      return
    }

    let left = 0,
      right = this.items.length
    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (this.compare(this.items[mid], el) < 0) {
        // mid 在 el 之前，所以搜索区间从 mid 向右
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
