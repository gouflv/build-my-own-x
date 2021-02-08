export const virtualize = element => {
  const res = {
    type: element.tagName.toLowerCase(),
    props: {}
  }

  for (let attr of element.attributes) {
    const key = attr.name === 'class' ? 'className' : attr.name
    res.props[key] = attr.value
  }

  const children = Array.from(element.childNodes).map(node => {
    return node.nodeType === 3 ? node.textContent : virtualize(node)
  })

  res.props.children = children.length === 1 ? children[0] : children
  return res
}
