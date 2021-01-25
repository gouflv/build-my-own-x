import { isFunction } from '../lang/is/is'

enum PromiseState {
  PENDING,
  FULFILLED,
  REJECTED
}

type Value<T> = T | null | undefined

type Reason<T = any> = T | null | undefined

interface Thenable<T> {
  then(
    onFulfilled: FulfilledHandler<T>,
    onRejected: RejectedHandler
  ): Thenable<T>
}

type FulfilledHandler<T> = (value?: T) => Value<T> | Thenable<T>

type RejectedHandler<R = any> = (reason?: R) => Reason<R> | Thenable<R>

const runMicroFake = fn => (setImmediate ? setImmediate(fn) : setTimeout(fn))

export class PromiseMock<T = any> implements Thenable<T> {
  state: PromiseState = PromiseState.PENDING

  value: any = undefined

  reason: any = undefined

  onFulfilledHandler: Array<FulfilledHandler<T>> = []

  onRejectedHandler: Array<RejectedHandler> = []

  constructor(
    executor: (
      resolve: (value?: Value<T>) => void,
      reject: (reason?: Reason) => void
    ) => void
  ) {
    const resolve = value => {
      runMicroFake(() => {
        if (this.state === PromiseState.PENDING) {
          this.value = value
          this.state = PromiseState.FULFILLED

          this.onFulfilledHandler.forEach(fn => fn(value))
        }
      })
    }

    const reject = reason => {
      runMicroFake(() => {
        if (this.state === PromiseState.PENDING) {
          this.reason = reason
          this.state = PromiseState.REJECTED

          this.onRejectedHandler.forEach(fn => fn(reason))
        }
      })
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(
    onFulfilled = value => value,
    onRejected = (reason => {
      throw reason
    }) as RejectedHandler
  ) {
    if (this.state === PromiseState.PENDING) {
      this.onFulfilledHandler.push(onFulfilled)
      this.onRejectedHandler.push(onRejected)
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
