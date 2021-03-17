import { createProduct, ProductA, ProductB } from './simple-factory'

describe('Test SimpleFactory', () => {
  it('should create instance of product', () => {
    expect(createProduct('A') instanceof ProductA).toBeTruthy()
    expect(createProduct('A').getName()).toBe('A')
    expect(createProduct('B') instanceof ProductB).toBeTruthy()
    expect(createProduct('B').getName()).toBe('B')
  })

  it('should throw error with unknown type', () => {
    expect(() => createProduct('C')).toThrowError(`Product C unknown.`)
  })
})
