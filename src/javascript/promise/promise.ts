// https://github.com/taylorhakes/promise-polyfill/blob/master/test/promise.js

import { isFunction, isObject } from '../lang/is/is'

enum PromiseState {
  PENDING,
  FULFILLED,
  REJECTED,
  VALUE_IS_A_PROMISE
}

type Value<T> = T | null | undefined

type Reason<T = any> = T | null | undefined

interface Thenable<T> {
  then(
    onFulfilled?: FulfilledHandler<T>,
    onRejected?: RejectedHandler
  ): Thenable<T>
}

type FulfilledHandler<T> = (
  value: T
) => Value<T> | Thenable<T> | null | undefined

type RejectedHandler<R = any> = (
  reason: R
) => Reason<R> | Thenable<R> | null | undefined

interface Deferred<T> {
  promise: PromiseMock
  onFulfilled?: FulfilledHandler<T>
  onRejected?: RejectedHandler
}

const runMicroFake = fn => (setImmediate ? setImmediate(fn) : setTimeout(fn))

let promiseId = 0

export class PromiseMock<T = any> implements Thenable<T> {
  _id: number = 0

  state: PromiseState = PromiseState.PENDING

  value: any = undefined

  deferred: Deferred<T>[] = []

  constructor(
    executor: (
      resolve: (value: Value<T>) => void,
      reject: (reason: Reason) => void
    ) => void
  ) {
    this._id = promiseId++
    runResolver(this, executor)
  }

  then(onFulfilled?: FulfilledHandler<T>, onRejected?: RejectedHandler) {
    const promise2 = new PromiseMock(() => {})
    deferredHandler(this, {
      promise: promise2,
      onFulfilled,
      onRejected
    })
    return promise2
  }
}

const runResolver = (self: PromiseMock, executor) => {
  // onFulfilled 和 onRejected 必须被作为函数调用（即没有 this 值）
  // onFulfilled 和 onRejected 调用次数不可超过一次

  let done = false
  try {
    executor(
      value => {
        if (done) return
        done = true
        resolve(self, value)
      },
      reason => {
        if (done) return
        done = true
        reject(self, reason)
      }
    )
  } catch (e) {
    if (done) return
    done = true
    reject(self, e)
  }
}

const resolve = (self: PromiseMock, value) => {
  if (self === value) {
    throw TypeError('promise cannot resolve with self')
  }

  try {
    /**
     如果 x 为 Promise ，则使 promise 接受 x 的状态:

     如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
     如果 x 处于执行态，用相同的值执行 promise
     如果 x 处于拒绝态，用相同的据因拒绝 promise
     */
    if (value instanceof PromiseMock) {
      self.state = PromiseState.VALUE_IS_A_PROMISE
      self.value = value
      finale(self)
      return
    }

    /**
     * 把 x.then 赋值给 then
     * 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
     * 如果 then 是函数，将 x 作为函数的作用域 this 调用之
     * 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
     */
    if (isObject(value)) {
      const _then = value.then
      if (isFunction(_then)) {
        runResolver(self, _then.bind(value))
      }
      return
    }

    self.state = PromiseState.FULFILLED
    self.value = value
    finale(self)
  } catch (e) {
    reject(self, e)
  }
}

const reject = (self: PromiseMock, reason) => {
  self.state = PromiseState.REJECTED
  self.value = reason
  finale(self)
}

const finale = (self: PromiseMock) => {
  self.deferred.forEach(def => {
    deferredHandler(self, def)
  })
}

const deferredHandler = (self: PromiseMock, def: Deferred<any>) => {
  if (self.state === PromiseState.VALUE_IS_A_PROMISE) {
    self = self.value
  }

  if (self.state === PromiseState.PENDING) {
    // 记录异步依赖
    self.deferred.push(def)
    return
  }
  runMicroFake(() => {
    let fn =
      self.state === PromiseState.FULFILLED ? def.onFulfilled : def.onRejected

    // 如果 onFulfilled 不是函数且 promise1 成功执行， promise2 必须成功执行并返回相同的值
    // 如果 onRejected 不是函数且 promise1 拒绝执行， promise2 必须拒绝执行并返回相同的据因
    if (!fn) {
      ;(self.state === PromiseState.FULFILLED ? resolve : reject)(
        def.promise,
        self.value
      )
      return
    }

    let res
    try {
      // 根据当前 state 和 value 执行依赖
      res = fn(self.value)
    } catch (e) {
      // 如果 onFulfilled 或者 onRejected 抛出一个异常 e ，则 promise2 必须拒绝执行，并返回拒因 e
      reject(def.promise, e)
      return
    }

    // 触发依赖的状态改变
    resolve(def.promise, res)
  })
}
