import { Element } from './vnode'

export const render = (el: Element<any>, container: HTMLElement) => {
  container.appendChild(el.render())
}
