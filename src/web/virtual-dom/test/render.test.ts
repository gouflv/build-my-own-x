import { DomRender } from '../render'
import { createElement as h } from '../vnode'

describe('Test render', () => {
  it('simple render', () => {
    const el = h('div', { className: 'root' }, [
      h('span', { className: 'text' }, ['Hi,']),
      h('span', { className: 'text' }, ['foo'])
    ])
    const render = el => new DomRender(document.body).render(el)
    expect(render(el)).toMatchSnapshot()
  })

  it('should update with patch REPLACE', () => {
    const r = new DomRender(document.body)
    r.render(h('div', { id: '#div_MUST_replece' }))
    r.render(h('span', { id: '#div_repleced' }))
    expect(r.dom).toMatchSnapshot()
  })
})
