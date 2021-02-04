import { LinkedList } from './linked-list'

describe('Test LinkedList', () => {
  it('should mutation APIs work', () => {
    const list = new LinkedList()

    // append
    list.append(1)
    list.append(2)
    list.append(3)
    expect(list.toArray()).toStrictEqual([1, 2, 3])
    expect(list.size()).toBe(3)

    // prepend
    list.prepend(0)
    expect(list.toArray()).toStrictEqual([0, 1, 2, 3])
    expect(list.size()).toBe(4)

    // insertAfter
    list.insertAfter(1, 4)
    list.insertAfter(2, 5)
    list.insertAfter(99, 7)
    list.insertAfter(list.size(), 8)
    list.insertAfter(0, -1)
    list.insertAfter(-2, -2)

    expect(list.toArray()).toStrictEqual([-2, -1, 0, 1, 4, 5, 2, 3, 7, 8])
    expect(list.head?.value).toBe(-2)
    expect(list.tail?.value).toBe(8)

    // removeAt
    expect(list.removeAt(0)).toBe(-2)
    expect(list.head?.value).toBe(-1)
    expect(list.removeAt(3)).toBe(4)
    expect(list.removeAt(3)).toBe(5)
    expect(list.toArray()).toStrictEqual([-1, 0, 1, 2, 3, 7, 8])

    // expect(list.removeAt(10)).toBe(8)
  })
})
