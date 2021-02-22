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
    let fromIndex = this.heapArr.length - 1
    while (
      Heap.hasParent(fromIndex) &&
      !this.pairIsInOrder(this.getParent(fromIndex), this.heapArr[fromIndex])
    ) {
      const pIndex = Heap.getParentIndex(fromIndex)
      this.swap(pIndex, fromIndex)
      fromIndex = Heap.getParentIndex(fromIndex)
    }
  }

  private heapifyDown() {}

  private static getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2)
  }

  private getParent(index: number): T | undefined {
    return this.heapArr[Heap.getParentIndex(index)]
  }

  private static hasParent(index: number): boolean {
    return Heap.getParentIndex(index) >= 0
  }

  private swap(a: number, b: number) {
    ;[this.heapArr[a], this.heapArr[b]] = [this.heapArr[b], this.heapArr[a]]
  }
}
