import { BinarySearchTree } from './binary-search-tree'
import { expectFnCalledWith } from '../../../javascript/_/utils'

describe('Test BST', () => {
  const data = [8, 3, 1, 6, 4, 7, 10, 14, 13]
  let tree: BinarySearchTree

  beforeEach(() => {
    tree = new BinarySearchTree()
    data.forEach(d => tree.insert(d))
  })

  it('should insert works', () => {})

  it('should contain works', () => {
    expect(data.every(d => tree.contains(d))).toBeTruthy()
  })

  it('should findNode works', () => {
    expect(
      data.every(d => {
        const found = tree.findNode(d)
        return !!found && found.value === d
      })
    ).toBeTruthy()
    expect(tree.findNode(0)).toBeUndefined()
    expect(tree.findNode(99)).toBeUndefined()
  })

  it('should findParent works', () => {
    expect(tree.findParent(8)).toBeUndefined()
    expect(tree.findParent(0)).toBeUndefined()
    expect(tree.findParent(99)).toBeUndefined()
    expect(tree.findParent(3).value).toBe(8)
    expect(tree.findParent(10).value).toBe(8)
    expect(tree.findParent(1).value).toBe(3)
    expect(tree.findParent(6).value).toBe(3)
    expect(tree.findParent(4).value).toBe(6)
    expect(tree.findParent(7).value).toBe(6)
  })

  it('should findMin works', () => {
    expect(tree.findMin()).toBe(1)
  })

  it('should findMax works', () => {
    expect(tree.findMax()).toBe(14)
  })

  it('should walkPre works', () => {
    const called = jest.fn()
    expect(tree.walkPre(value => called(value)))
    expectFnCalledWith(called, [8, 3, 1, 6, 4, 7, 10, 14, 13])
  })

  it('should walkIn works', () => {
    const called = jest.fn()
    expect(tree.walkIn(value => called(value)))
    expectFnCalledWith(called, [1, 3, 4, 6, 7, 8, 10, 13, 14])
  })

  it('should walkPost works', () => {
    const called = jest.fn()
    expect(tree.walkPost(value => called(value)))
    expectFnCalledWith(called, [1, 4, 7, 6, 3, 13, 14, 10, 8])
  })
})
