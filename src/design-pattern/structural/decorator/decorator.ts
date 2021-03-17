interface Component {
  operation(): string
}

export class ConcreteComponent implements Component {
  operation(): string {
    return 'ConcreteComponent'
  }
}

abstract class Decorator implements Component {
  constructor(private component: Component) {}
  operation(): string {
    return this.component.operation()
  }
}

export class ConcreteDecorator extends Decorator {
  operation(): string {
    return `Decorated(${super.operation()})`
  }
}
