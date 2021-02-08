import { Element } from './vnode'
import { diff, Patches } from './diff'
import { applyPatches } from './applyPatche'

export class DomRender {
  dom: HTMLElement | null = null
  nodeTree: Element<any> | null = null

  constructor(private root: HTMLElement) {}

  render(el: Element<any>) {
    if (!this.nodeTree) {
      this.dom = el.render()
      this.nodeTree = el
      this.dom && this.root.appendChild(this.dom)
    } else {
      this.update(el)
    }
    return this.dom
  }

  private update(newEl: Element<any>) {
    newEl &&
      this.dom &&
      this.nodeTree &&
      applyPatches(this.dom, diff(this.nodeTree, newEl))
  }
}
