import { defaults, margeConfig } from './defaults'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from './typding'

class Axios {
  constructor(public config: AxiosRequestConfig) {}

  request<T = any>(config: Partial<AxiosRequestConfig>) {
    const _config = margeConfig(config, this.config)
    const adapter = _config.adapter

    const onAdapterResolved = (response: AxiosResponse<T>) => {
      // TODO Transform response
      return response
    }
    const onAdapterRejected = (reason: AxiosError) => {
      // TODO Transform response
      return Promise.reject(reason)
    }

    return adapter(_config).then(onAdapterResolved, onAdapterRejected)
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
