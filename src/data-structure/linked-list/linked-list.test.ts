import { LinkedList } from './linked-list'

describe('Test LinkedList', () => {
  let list: LinkedList<number>

  beforeEach(() => {
    list = new LinkedList([1, 2, 3])
  })

  it('should append works', () => {
    // append
    list.append(4)
    expect(list.toArray()).toStrictEqual([1, 2, 3, 4])
    expect(list.size()).toBe(4)
  })

  it('should prepend works', () => {
    // prepend
    list.prepend(0)
    expect(list.toArray()).toStrictEqual([0, 1, 2, 3])
    expect(list.size()).toBe(4)
  })

  it('should inertAfter with index 0', () => {
    list.insertAfter(0, 0)
    expect(list.toArray()).toStrictEqual([0, 1, 2, 3])
    expect(list.head?.value).toBe(0)
    expect(list.tail?.value).toBe(3)
    expect(list.size()).toBe(4)
  })

  it('should inertAfter with index 1', () => {
    list.insertAfter(1, 22)
    expect(list.toArray()).toStrictEqual([1, 2, 22, 3])
    expect(list.size()).toBe(4)
  })

  it('should inertAfter with lastIndex', () => {
    list.insertAfter(list.size() - 1, 4)
    expect(list.toArray()).toStrictEqual([1, 2, 3, 4])
    expect(list.head?.value).toBe(1)
    expect(list.tail?.value).toBe(4)
    expect(list.size()).toBe(4)
  })

  it('should inertAfter with index -Infinity', () => {
    list.insertAfter(-Infinity, -999)
    expect(list.toArray()).toStrictEqual([-999, 1, 2, 3])
    expect(list.head?.value).toBe(-999)
    expect(list.tail?.value).toBe(3)
    expect(list.size()).toBe(4)
  })

  it('should inertAfter with index Infinity', () => {
    list.insertAfter(Infinity, 999)
    expect(list.toArray()).toStrictEqual([1, 2, 3, 999])
    expect(list.head?.value).toBe(1)
    expect(list.tail?.value).toBe(999)
    expect(list.size()).toBe(4)
  })

  it('should removeAt with index 0', () => {
    expect(list.removeAt(0)).toBe(1)
    expect(list.head?.value).toBe(2)
    expect(list.tail?.value).toBe(3)
    expect(list.size()).toBe(2)
  })

  it('should removeAt with index 1', () => {
    expect(list.removeAt(1)).toBe(2)
    expect(list.head?.value).toBe(1)
    expect(list.tail?.value).toBe(3)
    expect(list.size()).toBe(2)
  })

  it('should removeAt with lastIndex', () => {
    expect(list.removeAt(list.size() - 1)).toBe(3)
    expect(list.head?.value).toBe(1)
    expect(list.tail?.value).toBe(2)
    expect(list.size()).toBe(2)
  })

  it('should removeAt with -Infinity', () => {
    expect(list.removeAt(-Infinity)).toBe(1)
    expect(list.head?.value).toBe(2)
    expect(list.tail?.value).toBe(3)
    expect(list.size()).toBe(2)
  })

  it('should removeAt with Infinity', () => {
    expect(list.removeAt(Infinity)).toBe(3)
    expect(list.head?.value).toBe(1)
    expect(list.tail?.value).toBe(2)
    expect(list.size()).toBe(2)
  })

  it('should forEach works', () => {
    const called = jest.fn()
    list.forEach((value, index) => {
      called(value, index)
    })
    expect(called).toBeCalledTimes(3)
    expect(called).toHaveBeenNthCalledWith(1, 1, 0)
    expect(called).toHaveBeenNthCalledWith(2, 2, 1)
    expect(called).toHaveBeenNthCalledWith(3, 3, 2)
  })

  it('should forEach early dead when return false', () => {
    const called = jest.fn()
    list.forEach((value, index) => {
      called(value, index)
      if (index === 1) return false
    })
    expect(called).toBeCalledTimes(2)
  })

  it('should indexOf works', () => {
    expect(list.indexOf(1)).toBe(0)
    expect(list.indexOf(2)).toBe(1)
    expect(list.indexOf(3)).toBe(2)
    expect(list.indexOf(4)).toBe(-1)
  })

  it('should reverse works', () => {
    list.reverse()
    expect(list.toArray()).toStrictEqual([3, 2, 1])
    expect(list.head?.value).toBe(3)
    expect(list.tail?.value).toBe(1)

    list.reverse()
    expect(list.toArray()).toStrictEqual([1, 2, 3])
    expect(list.head?.value).toBe(1)
    expect(list.tail?.value).toBe(3)
  })
})
