import { createElement as h } from '../vnode'
import { diff, DiffTypes, Patches } from '../diff'

const genPatch = (nodeDiff): Patches => {
  return { 0: [nodeDiff] }
}

describe('Test diff', () => {
  let n1
  let n2

  it('should get patch REPLACE', () => {
    n1 = h('div')
    n2 = h('span')
    expect(diff(null, n1)).toStrictEqual(
      genPatch({ type: DiffTypes.REPLACE, value: n1 })
    )
    expect(diff(n1, n2)).toStrictEqual(
      genPatch({ type: DiffTypes.REPLACE, value: n2 })
    )
    expect(diff(n1, 'newText')).toStrictEqual(
      genPatch({ type: DiffTypes.REPLACE, value: 'newText' })
    )
    expect(diff('newText', n2)).toStrictEqual(
      genPatch({ type: DiffTypes.REPLACE, value: n2 })
    )
  })

  it('should get patch REMOVE', () => {
    n1 = h('div')
    n2 = null
    expect(diff(n1, n2)).toStrictEqual(
      genPatch({ type: DiffTypes.REMOVE, value: n1 })
    )
  })

  it('should get patch UPDATE_ATTR', () => {
    n1 = h('div', { id: '#id1', className: '.class1' })
    n2 = h('div', { id: '#id2', className: '.class2' })

    // both update
    expect(diff(n1, n2)).toStrictEqual(
      genPatch({
        type: DiffTypes.UPDATE_ATTR,
        value: { id: '#id2', className: '.class2' }
      })
    )

    // one update
    n2 = h('div', { id: '#id1', className: '.class2' })
    expect(diff(n1, n2)).toStrictEqual(
      genPatch({
        type: DiffTypes.UPDATE_ATTR,
        value: { id: '#id1', className: '.class2' }
      })
    )

    // remove one
    n2 = h('div', { id: '#id1' })
    expect(diff(n1, n2)).toStrictEqual(
      genPatch({
        type: DiffTypes.UPDATE_ATTR,
        value: { id: '#id1' }
      })
    )

    // remove all
    n2 = h('div', null)
    expect(diff(n1, n2)).toStrictEqual(
      genPatch({
        type: DiffTypes.UPDATE_ATTR,
        value: {}
      })
    )

    n2 = n1
    expect(diff(n1, n2)).toStrictEqual({ 0: [] })
  })
})
