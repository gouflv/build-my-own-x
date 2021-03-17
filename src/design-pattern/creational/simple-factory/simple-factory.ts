export class ProductA {
  getName(): string {
    return 'A'
  }
}

export class ProductB {
  getName(): string {
    return 'B'
  }
}

// SimpleFactory
export function createProduct(type: string) {
  switch (type) {
    case 'A':
      return new ProductA()
    case 'B':
      return new ProductB()
    default:
      throw new Error(`Product ${type} unknown.`)
  }
}
