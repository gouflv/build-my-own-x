// https://github.com/taylorhakes/promise-polyfill/blob/master/test/promise.js

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

interface Deferred<T> {
  promise: PromiseMock
  onFulfilled: FulfilledHandler<T>
  onRejected: RejectedHandler
}

const runMicroFake = fn => (setImmediate ? setImmediate(fn) : setTimeout(fn))

let promiseId = 0

export class PromiseMock<T = any> implements Thenable<T> {
  _id: number = 0

  state: PromiseState = PromiseState.PENDING

  value: any = undefined

  reason: any = undefined

  deferred: Deferred<T>[] = []

  constructor(
    executor: (
      resolve: (value?: Value<T>) => void,
      reject: (reason?: Reason) => void
    ) => void
  ) {
    this._id = promiseId++

    try {
      executor(
        value => resolve(this, value),
        reason => reject(this, reason)
      )
    } catch (e) {
      reject(this, e)
    }
  }

  then(
    onFulfilled = val => val,
    onRejected = (e => {
      throw e
    }) as RejectedHandler
  ) {
    const promise2 = new PromiseMock(() => {})
    deferredHandler(this, {
      promise: promise2,
      onFulfilled,
      onRejected
    })
    return promise2
  }
}

const resolve = (self: PromiseMock, value) => {
  self.state = PromiseState.FULFILLED
  self.value = value
  finale(self)
}

const reject = (self: PromiseMock, reason) => {
  self.state = PromiseState.REJECTED
  self.reason = reason
  finale(self)
}

const finale = (self: PromiseMock) => {
  self.deferred.forEach(def => {
    deferredHandler(self, def)
  })
}

const deferredHandler = (self: PromiseMock, def: Deferred<any>) => {
  if (self.state === PromiseState.PENDING) {
    // 记录异步依赖
    self.deferred.push(def)
    return
  }
  runMicroFake(() => {
    // 根据当前 state 和 value 执行依赖
    const fn =
      self.state === PromiseState.FULFILLED ? def.onFulfilled : def.onRejected

    let res
    try {
      res = fn(self.state === PromiseState.FULFILLED ? self.value : self.reason)
    } catch (e) {
      console.error(e)
      return
    }
    resolve(def.promise, res)
  })
}
