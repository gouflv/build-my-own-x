export class HashTable<T = any> {
  protected buckets: Array<T[]> = []
  protected _keys: { [key: string]: number } = {}

  constructor(protected size = 10) {
    this.buckets = Array.from({ length: this.size }).map(() => [])
  }

  set(key: string, value: T) {
    const hash = this.hash(key)
    this._keys[key] = hash
    this.buckets[hash].push(value)
  }

  get(key: string) {
    return this.buckets[this.hash(key)]
  }

  has(key: string) {
    return this.get(key).length
  }

  remove(key: string) {
    this.buckets[this.hash(key)] = []
  }

  keys() {
    return Object.keys(this._keys)
  }

  values() {
    return this.buckets.reduce((res, arr) => {
      return [...res, ...arr]
    }, [])
  }

  hash(key: string) {
    return key.charCodeAt(0) % this.size
  }
}
