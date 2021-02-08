export class Element<T extends keyof HTMLElementTagNameMap> {
  constructor(
    public tagName: T,
    public attr: Partial<HTMLElementTagNameMap[T]> | null | undefined,
    public children: (Element<any> | string)[]
  ) {}

  render() {
    const node = document.createElement(this.tagName)
    this.setNodeAttr(node)

    if (this.children.length) {
      this.children.forEach(child => {
        if (child instanceof Element) {
          node.appendChild(child.render())
        }
        if (typeof child === 'string') {
          node.appendChild(document.createTextNode(child))
        }
      })
    }

    return node
  }

  private setNodeAttr(node: HTMLElementTagNameMap[T]) {
    for (let key in this.attr) {
      if (!this.attr.hasOwnProperty(key)) {
        return
      }
      if (key === 'style') {
        node.style.cssText = this.attr[key] as any
      } else {
        node.setAttribute(key, this.attr[key] as any)
      }
    }
  }
}

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: Element<T>['tagName'],
  attr?: Element<T>['attr'],
  children?: Element<T>['children']
) => {
  return new Element(tagName, attr || {}, children || [])
}
