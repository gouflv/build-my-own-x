import { render } from '../render'
import { createElement as h } from '../vnode'

describe('Test render', () => {
  const ct = document.createElement('div')

  it('simple', () => {
    const el = h('div', { className: 'root' }, [h('span', null, ['Hi'])])
    render(el, ct)
    expect(ct).toMatchSnapshot()
  })
})
