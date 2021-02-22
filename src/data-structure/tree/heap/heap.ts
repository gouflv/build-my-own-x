export class Heap<T = any> {
  protected heapArr: T[] = []

  constructor(private pairIsInOrder: (a, b) => boolean) {}

  add(item: T) {
    this.heapArr.push(item)
    this.heapifyUp()
  }

  peek() {
    if (!this.heapArr.length) return undefined
    return this.heapArr[0]
  }

  poll(): T | undefined {
    if (!this.heapArr.length) return undefined

    if (this.heapArr.length === 1) return this.heapArr.pop()

    const polled = this.heapArr[0]
    this.heapArr[0] = this.heapArr.pop() as T
    this.heapifyDown()
    return polled
  }

  toString() {
    return this.heapArr.toString()
  }

  private heapifyUp() {
    let currIndex = this.heapArr.length - 1
    while (
      Heap.hasParent(currIndex) &&
      !this.pairIsInOrder(this.getParent(currIndex), this.heapArr[currIndex])
    ) {
      const pIndex = Heap.getParentIndex(currIndex)
      this.swap(pIndex, currIndex)
      currIndex = Heap.getParentIndex(currIndex)
    }
  }

  private heapifyDown() {
    let currIndex = this.heapArr.length - 1
    let next
    while (this.hasLeftChild(currIndex)) {
      if (this.hasRightChildIndex(currIndex)) {
        // next =
      } else {
        next = Heap.getLeftChildIndex(currIndex)
      }

      if (this.pairIsInOrder(this.heapArr[currIndex], this.heapArr[next])) {
        break
      }

      this.swap(currIndex, next)
      currIndex = next
    }
  }

  private getParent(index: number): T | undefined {
    return this.heapArr[Heap.getParentIndex(index)]
  }

  private swap(a: number, b: number) {
    ;[this.heapArr[a], this.heapArr[b]] = [this.heapArr[b], this.heapArr[a]]
  }

  private static getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2)
  }

  private static hasParent(index: number): boolean {
    return Heap.getParentIndex(index) >= 0
  }

  private static getLeftChildIndex(index: number): number {
    return index * 2 + 1
  }

  private hasLeftChild(index: number) {
    return Heap.getLeftChildIndex(index) < this.heapArr.length
  }

  private static getRightChildIndex(index: number): number {
    return index * 2 + 2
  }

  private hasRightChildIndex(index: number) {
    return Heap.getRightChildIndex(index) < this.heapArr.length
  }
}
