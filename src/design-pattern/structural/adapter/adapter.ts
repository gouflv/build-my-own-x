interface LSAPI {
  set(key: string, value: any, llt: number): void
  get(key: string): any
  clear(): void
}

export class LocalStorageAdapter implements LSAPI {
  get(key: string) {
    return 'LocalStorage'
  }
  set(key: string, value: any, llt: number): void {
    localStorage.setItem('', '')
  }
  clear(): void {
    localStorage.clear()
  }
}

export class IndexedDBStorageAdapter implements LSAPI {
  get(key: string) {
    return 'IndexedDB'
  }
  set(key: string, value: any, llt: number): void {}
  clear(): void {}

  private open() {
    const req = indexedDB.open('testDB')
    // TODO
  }
}

export class LocalForage implements LSAPI {
  adapter: LSAPI
  constructor(adapter?: LSAPI) {
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
