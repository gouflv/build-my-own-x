import {
  IndexedDBStorageAdapter,
  LocalForage,
  LocalStorageAdapter
} from './index'

describe('Test Adapter', () => {
  it('should adapter works', () => {
    let ls = new LocalForage(new LocalStorageAdapter())
    expect(ls.get('')).toBe('LocalStorage')

    ls = new LocalForage(new IndexedDBStorageAdapter())
    expect(ls.get('')).toBe('IndexedDB')

    ls = new LocalForage()
    expect(ls.get('')).toBe('IndexedDB')
  })
})
