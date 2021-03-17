type NullableComponent = Component | null

abstract class Component {
  protected parent: NullableComponent = null

  setParent(parent: NullableComponent) {
    this.parent = parent
  }
  getParent(): NullableComponent {
    return this.parent
  }

  add(c: Component) {}

  remove(c: Component) {}

  abstract operation(): string

  isComposite() {
    return false
  }
}

export class Leaf extends Component {
  operation(): string {
    return 'Leaf'
  }
}

export class Composite extends Component {
  protected children: Component[] = []

  add(c: Component) {
    this.children.push(c)
    c.setParent(this)
  }

  remove(c: Component) {
    this.children.splice(this.children.indexOf(c), 1)
    c.setParent(null)
  }

  isComposite(): boolean {
    return true
  }

  operation(): string {
    return `Branch(${this.children.map(c => c.operation()).join(' + ')})`
  }
}
