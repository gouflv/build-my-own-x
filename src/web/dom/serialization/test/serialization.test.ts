import { render } from '../render'
import { html, vdom } from './texture'
import { virtualize } from '../vartualize'

describe('Test serialization', () => {
  it('should virtualize works', () => {
    const el = document.createElement('div')
    el.innerHTML = html
    expect(virtualize(el)).toMatchObject(vdom)
  })

  it('should render with vdom', () => {
    render(vdom)
  })
})
