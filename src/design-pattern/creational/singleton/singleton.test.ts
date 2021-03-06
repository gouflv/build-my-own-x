import { Singleton } from './singleton'

describe('Test Singleton', () => {
  it('should create singleton', () => {
    let instance = Singleton.getInstance()
    expect(instance instanceof Singleton).toBeTruthy()
    expect(instance).toBe(Singleton.getInstance())
  })
})
