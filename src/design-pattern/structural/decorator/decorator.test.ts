import { ConcreteComponent, ConcreteDecorator } from './decorator'

describe('Test Decorator', () => {
  it('should it works', () => {
    const component = new ConcreteComponent()
    expect(component.operation()).toBe('ConcreteComponent')
    expect(new ConcreteDecorator(component).operation()).toBe(
      'Decorated(ConcreteComponent)'
    )
  })
})
