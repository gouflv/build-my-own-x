import { defaults } from './configs'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from './typding'
import { margeConfig, transformRequestData, transformResponse } from './helpers'
import { InterceptorManager } from './interceptor'

class Axios {
  interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosError>()
  }

  constructor(public config: AxiosRequestConfig) {}

  request<T = any>(config: Partial<AxiosRequestConfig>) {
    let _config = margeConfig(config, this.config)
    const adapter = _config.adapter

    if (_config.data) {
      _config.data = transformRequestData(
        _config.data,
        _config.headers,
        _config.transformRequestData
      )
    }

    this.interceptors.request.forEach(({ onFulfilled, onRejected }) => {
      try {
        _config = onFulfilled(_config)
      } catch (e) {
        onRejected(e)
        return false
      }
    })

    const onAdapterResolved = (response: AxiosResponse<T>) => {
      return transformResponse(response, _config.transformResponse)
    }
    const onAdapterRejected = (reason: AxiosError) => {
      // TODO Transform response
      return Promise.reject(reason)
    }

    let promise: Promise<AxiosResponse<T>>

    promise = adapter(_config).then(onAdapterResolved, onAdapterRejected)

    return promise
  }
}

/**
 * create custom instance
 */
export function createAxios(config?: Partial<AxiosRequestConfig>) {
  return new Axios(margeConfig(config || {}))
}

/**
 * axios build-in instance
 */
export const axios = createAxios(defaults)
