export class VNode<T extends keyof HTMLElementTagNameMap> {
  constructor(
    public tagName: T,
    public attrs: Partial<HTMLElementTagNameMap[T]> | null | undefined,
    public children: (VNode<any> | string)[]
  ) {}

  render() {
    const node = document.createElement(this.tagName)
    this.setNodeAttr(node)

    if (this.children.length) {
      this.children.forEach(child => {
        if (child instanceof VNode) {
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
    for (let key in this.attrs) {
      if (!this.attrs.hasOwnProperty(key)) {
        return
      }
      if (key === 'style') {
        node.style.cssText = this.attrs[key] as any
      } else {
        node.setAttribute(key, this.attrs[key] as any)
      }
    }
  }
}

export const createElement = <T extends keyof HTMLElementTagNameMap>(
  tagName: VNode<T>['tagName'],
  attrs?: VNode<T>['attrs'],
  children?: VNode<T>['children']
) => {
  return new VNode(tagName, attrs || {}, children || [])
}
