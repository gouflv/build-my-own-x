import { Composite, Leaf } from './composite'

describe('Test Composite', () => {
  it('should Leaf work', () => {
    const leaf = new Leaf()
    expect(leaf.isComposite()).toBeFalsy()
    expect(leaf.operation()).toBe('Leaf')
  })

  it('should simple composite work', () => {
    const root = new Composite()
    root.add(new Leaf())
    root.add(new Leaf())
    expect(root.operation()).toBe('Branch(Leaf + Leaf)')
  })

  it('should complex composite work', () => {
    const root = new Composite()

    const c1 = new Composite()
    c1.add(new Leaf())
    c1.add(new Leaf())

    const c2 = new Composite()
    c2.add(new Leaf())

    root.add(c1)
    root.add(c2)

    expect(root.operation()).toBe('Branch(Branch(Leaf + Leaf) + Branch(Leaf))')
  })
})
