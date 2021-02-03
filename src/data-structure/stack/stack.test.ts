import { Stack } from './stack'

describe('Test Stack', () => {
  it('should all APIs work', () => {
    const stack = new Stack()

    stack.push(1)
    stack.push(2)
    expect(stack.size()).toBe(2)

    const peeked = stack.peek()
    expect(peeked).toBe(2)
    expect(stack.size()).toBe(2)

    const popped = stack.pop()
    expect(popped).toBe(2)
    expect(stack.peek()).toBe(1)

    expect(stack.isEmpty()).toBeFalsy()
    stack.clear()
    expect(stack.isEmpty()).toBeTruthy()

    expect(stack.peek()).toBeUndefined()
    expect(stack.pop()).toBeUndefined()
  })
})
