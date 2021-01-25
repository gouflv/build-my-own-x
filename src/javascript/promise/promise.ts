enum PromiseState {
  PENDING,
  FULFILLED,
  REJECTED
}

type PromiseValue<T> = T

type PromiseReason<T = any> = T

type FulfilledHandler<T> = (value?: PromiseValue<T>) => void

type RejectedHandler<R = any> = (reason?: PromiseReason<R>) => void

interface Thenable<T> {
  then(fulfilled: FulfilledHandler<T>, rejected: RejectedHandler): Thenable<T>
}

const runMicroFake = fn => (setImmediate ? setImmediate(fn) : setTimeout(fn))

export class PromiseMock<T = any> implements Thenable<T> {
  state: PromiseState = PromiseState.PENDING

  value: PromiseValue<T> | PromiseReason | undefined = undefined

  onFulfilledHandler: Array<FulfilledHandler<T>> = []

  onRejectedHandler: RejectedHandler[] = []

  constructor(
    executor: (
      resolve: (value?: PromiseValue<T>) => void,
      reject: (reason?: PromiseReason) => void
    ) => void
  ) {
    const resolve: FulfilledHandler<T> = value => {
      runMicroFake(() => {
        if (this.state === PromiseState.PENDING) {
          this.value = value
          this.state = PromiseState.FULFILLED

          this.onFulfilledHandler.forEach(fn => fn(value))
        }
      })
    }

    const reject: RejectedHandler = reason => {
      runMicroFake(() => {
        if (this.state === PromiseState.PENDING) {
          this.value = reason
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
    onFulfilled: FulfilledHandler<T> = value => value,
    onRejected: RejectedHandler = reason => {
      throw reason
    }
  ) {
    if (this.state === PromiseState.PENDING) {
      this.onFulfilledHandler.push(onFulfilled)
      this.onRejectedHandler.push(onRejected)
    }

    if (this.state === PromiseState.FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.state === PromiseState.REJECTED) {
      onRejected(this.value)
    }

    return this
  }
}
