import { isFunction } from '../lang/is/is'

const nextTick = fn => (setImmediate ? setImmediate(fn) : setTimeout(fn))

export class PromiseMock {
  state = 'pending'
  value = null
  reason = null
  onFulfilled = []
  onRejected = []

  constructor(executor) {
    const resolve = value => {
      nextTick(() => {
        if (this.state === 'pending') {
          this.value = value
          this.state = 'fulfilled'

          this.onFulfilled.forEach(fn => {
            fn(value)
          })
        }
      })
    }

    const reject = reason => {
      nextTick(() => {
        if (this.state === 'pending') {
          this.reason = reason
          this.state = 'rejected'

          this.onRejected.forEach(fn => {
            fn(reason)
          })
        }
      })
    }

    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value
    onRejected = isFunction(onRejected)
      ? onRejected
      : reason => {
          throw reason
        }

    if (this.state === 'pending') {
      this.onFulfilled.push(onFulfilled)
      this.onRejected.push(onRejected)
    } else if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    } else if (this.state === 'rejected') {
      onRejected(this.reason)
    }

    return this
  }
}
