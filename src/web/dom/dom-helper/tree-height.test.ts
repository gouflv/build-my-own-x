import { treeHeight } from './tree-height'

describe('Test tree-height', () => {
  const node = document.createElement('div')
  node.innerHTML = `
<div>
  <p>
    <button>Hello</button>
  </p>
</div>
<p>
  <span>World!</span>
</p>
    `

  it('simple', () => {
    expect(treeHeight(node)).toBe(4)
  })

  it('one node', () => {
    expect(treeHeight(document.createElement('p'))).toBe(1)
  })

  it('text node', () => {
    expect(treeHeight(document.createTextNode('1'))).toBe(0)
  })

  it('null', () => {
    expect(treeHeight(null)).toBe(0)
  })
})
