import { Stack } from './stack'

describe('Test Stack', () => {
  it('should all APIs work', () => {
    const stack = new Stack()

    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect(stack.size()).toBe(3)

    const peeked = stack.peek()
    expect(peeked).toBe(3)
    expect(stack.size()).toBe(3)

    const popped = stack.pop()
    expect(popped).toBe(3)
    expect(stack.peek()).toBe(2)

    expect(stack.isEmpty()).toBeFalsy()
    stack.clear()
    expect(stack.isEmpty()).toBeTruthy()

    expect(stack.peek()).toBeUndefined()
    expect(stack.pop()).toBeUndefined()
  })
})
