interface LSAdapter {
  set(key: string, value: any, llt: number): void
  get(key: string): any
  clear(): void
}

export class LocalStorageAdapter implements LSAdapter {
  get(key: string) {
    return 'LocalStorage'
  }
  set(key: string, value: any, llt: number): void {}
  clear(): void {}
}

export class IndexedDBStorageAdapter implements LSAdapter {
  get(key: string) {
    return 'IndexedDB'
  }
  set(key: string, value: any, llt: number): void {}
  clear(): void {}
}

export class LocalForage implements LSAdapter {
  adapter: LSAdapter
  constructor(adapter?: LSAdapter) {
    this.adapter = adapter || new IndexedDBStorageAdapter()
  }
  get<T>(key: string): T | undefined {
    return this.adapter.get(key)
  }
  set(key: string, value: any, llt: number): void {
    this.adapter.set(key, value, llt)
  }
  clear(): void {
    this.adapter.clear()
  }
}
