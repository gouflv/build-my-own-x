type Nullable<T> = T | null

interface IIterator<T> {
  current(): Nullable<T>
  next(): Nullable<T>
  valid(): boolean
  reset()
  count(): number
}

class WordIterator implements IIterator<string> {
  index = 0

  current(): Nullable<string> {
    return null
  }
  next(): Nullable<string> {
    return null
  }
  valid(): boolean {
    return false
  }
  reset() {
    this.index = 0
  }
  count(): number {
    return 0
  }
}

interface Collection {}
