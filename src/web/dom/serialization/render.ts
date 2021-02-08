export const render = vdom => {
  if (typeof vdom === 'string') return document.createTextNode(vdom)

  const el = document.createElement(vdom.type)

  const { children, ...restProps } = vdom.props || {}

  if (restProps)
    for (let k in restProps) {
      el.setAttribute(k === 'className' ? 'class' : k, restProps[k])
    }

  if (children) {
    if (typeof children === 'string') {
      el.appendChild(document.createTextNode(children))
    } else {
      children.forEach(child => {
        el.appendChild(render(child))
      })
    }
  }

  return el
}
