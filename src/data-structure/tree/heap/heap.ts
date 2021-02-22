export class Heap<T = any> {
  protected heapArr: T[] = []

  constructor(private pairIsInOrder: (a, b) => boolean) {}

  add(item: T) {
    this.heapArr.push(item)
    this.heapifyUp()
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
      ;[this.heapArr[pIndex], this.heapArr[fromIndex]] = [
        this.heapArr[fromIndex],
        this.heapArr[pIndex]
      ]
      fromIndex = Heap.getParentIndex(fromIndex)
    }
  }

  private static getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2)
  }

  private getParent(index: number): T | undefined {
    return this.heapArr[Heap.getParentIndex(index)]
  }

  private static hasParent(index: number): boolean {
    return Heap.getParentIndex(index) >= 0
  }
}
