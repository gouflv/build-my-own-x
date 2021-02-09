import { VNode } from './vnode'
import { diff } from './diff'
import { applyPatches } from './applyPatche'

export class DomRender {
  dom: HTMLElement | null = null
  nodeTree: VNode<any> | null = null

  constructor(private root: HTMLElement) {}

  render(el: VNode<any>) {
    if (!this.nodeTree) {
      this.dom = el.render()
      this.dom && this.root.appendChild(this.dom)
    } else {
      this.update(el)
    }
    this.nodeTree = el
    return this.dom
  }

  private update(newEl: VNode<any>) {
    if (!this.dom) return
    applyPatches(this.dom, diff(this.nodeTree, newEl))
  }
}
