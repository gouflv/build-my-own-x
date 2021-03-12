import { defaults } from './configs'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from './typding'
import { margeConfig, transformRequestData, transformResponse } from './helpers'

class Axios {
  constructor(public config: AxiosRequestConfig) {}

  request<T = any>(config: Partial<AxiosRequestConfig>) {
    const _config = margeConfig(config, this.config)
    const adapter = _config.adapter

    if (_config.data) {
      _config.data = transformRequestData(
        _config.data,
        _config.headers,
        _config.transformRequestData
      )
    }

    const onAdapterResolved = (response: AxiosResponse<T>) => {
      return transformResponse(response, _config.transformResponse)
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
