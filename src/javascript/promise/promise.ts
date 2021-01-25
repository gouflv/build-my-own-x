import { isFunction } from '../lang/is/is'

enum PromiseState {
  PENDING,
  FULFILLED,
  REJECTED
}

type PromiseValue = any

type PromiseReason = any

type FulfilledFunction = (value?: PromiseValue) => void
type RejectedFunction = (reason?: PromiseReason) => void

const runMicroFake = fn => (setImmediate ? setImmediate(fn) : setTimeout(fn))

export class PromiseMock {
  state: PromiseState = PromiseState.PENDING
  value: PromiseValue = null
  reason: PromiseReason = null
  onFulfilledCallback: FulfilledFunction[] = []
  onRejectedCallback: RejectedFunction[] = []

  constructor(
    executor: (
      onFulfilled: FulfilledFunction,
      onRejected: RejectedFunction
    ) => void
  ) {
    const resolve: FulfilledFunction = value => {
      runMicroFake(() => {
        if (this.state === PromiseState.PENDING) {
          this.value = value
          this.state = PromiseState.FULFILLED

          this.onFulfilledCallback.forEach(fn => {
            fn(value)
          })
        }
      })
    }

    const reject: RejectedFunction = reason => {
      runMicroFake(() => {
        if (this.state === PromiseState.PENDING) {
          this.reason = reason
          this.state = PromiseState.REJECTED

          this.onRejectedCallback.forEach(fn => {
            fn(reason)
          })
        }
      })
    }

    executor(resolve, reject)
  }

  then(
    onFulfilled: FulfilledFunction = value => value,
    onRejected: RejectedFunction = reason => {
      throw reason
    }
  ) {
    if (this.state === PromiseState.PENDING) {
      this.onFulfilledCallback.push(onFulfilled)
      this.onRejectedCallback.push(onRejected)
    }

    if (this.state === PromiseState.FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.state === PromiseState.REJECTED) {
      onRejected(this.reason)
    }

    return this
  }
}
