import { AxiosError } from './typding'
import { isBoolean, isUndefined } from '../../javascript/lang/is/is'

type InterceptorFulfilled<T> = (data: T) => T

type InterceptorRejected = (error: AxiosError) => Promise<AxiosError>

type InterceptorHeader<T> = {
  onFulfilled: InterceptorFulfilled<T>
  onRejected: InterceptorRejected
}

export class InterceptorManager<T> {
  handlers: InterceptorHeader<T>[] = []

  use(fulfilled: InterceptorFulfilled<T>, rejected: InterceptorRejected) {
    this.handlers.push({
      onFulfilled: fulfilled,
      onRejected: rejected
    })
  }

  forEach(fn: (h: InterceptorHeader<T>) => boolean | void) {
    for (const h of this.handlers) {
      const res = fn(h)
      if (isBoolean(res) && !res) {
        break
      }
    }
  }
}
