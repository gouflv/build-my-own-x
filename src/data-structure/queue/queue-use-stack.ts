import { Stack } from '../stack/stack'

/**
 * FIFO
 *
 * enqueue
 * [3]
 * [2]
 * [1] []
 *
 * dequeue
 *     [2]
 * [1] [3]
 */
export class QueueUseStack<T = any> {
  stackPush = new Stack()
  stackPop = new Stack()

  enqueue(el: T) {
    this.stackPush.push(el)
  }
  dequeue() {
    if (this.stackPop.size()) return this.stackPop.pop()
    while (this.stackPush.size()) this.stackPop.push(this.stackPush.pop())
    return this.stackPop.pop()
  }
  front() {
    if (this.stackPop.size()) return this.stackPop.peek()
    while (this.stackPush.size()) this.stackPop.push(this.stackPush.pop())
    return this.stackPop.peek()
  }
  size() {
    return this.stackPush.size() + this.stackPop.size()
  }
  isEmpty() {
    return !this.size()
  }
  clear() {
    this.stackPush.clear()
    this.stackPop.clear()
  }
}
