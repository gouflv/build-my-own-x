import { createElement as h } from '../vnode'

describe('Test vnode', () => {
  const attrs = {
    id: '#id',
    className: '.cls'
  }

  it('should create dom with attrs', () => {
    const el = h('div', attrs)
    expect(el.tagName).toBe('div')
    expect(el.attrs).toMatchObject(attrs)
    expect(el.children).toStrictEqual([])
  })

  it('should create dom with children', () => {
    const el = h('ul', attrs, [
      h('li', { id: '#c1', className: '.c1' }),
      h('li', { id: '#c2', className: '.c2' }),
      'isTextNode'
    ])
    expect(el.tagName).toBe('ul')
    expect(el.attrs).toMatchObject(attrs)
    expect(el.children.length).toBe(3)
    expect(el.children[0]).toMatchObject({
      tagName: 'li',
      attrs: { id: '#c1', className: '.c1' }
    })
    expect(el.children[1]).toMatchObject({
      tagName: 'li',
      attrs: { id: '#c2', className: '.c2' }
    })
    expect(el.children[2]).toBe('isTextNode')
  })

  it('should render dom node', () => {
    expect(h('div', attrs).render()).toMatchSnapshot()
  })

  it('should render dom node with children', () => {
    expect(
      h('ul', attrs, [
        h('li', { id: '#c1', className: '.c1' }),
        h('li', { id: '#c2', className: '.c2' }),
        h('li', null, ['isTextNode'])
      ]).render()
    ).toMatchSnapshot()
  })
})
