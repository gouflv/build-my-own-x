import { ConcreteComponent, ConcreteDecorator } from './decorator'

describe('Test Decorator', () => {
  it('should works', () => {
    const component = new ConcreteComponent()
    expect(component.operation()).toBe('ConcreteComponent')
    expect(new ConcreteDecorator(component).operation()).toBe(
      'Decorated(ConcreteComponent)'
    )
  })
})
