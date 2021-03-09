import { defaults, margeConfig } from './configs'
import { AxiosError, AxiosRequestConfig, AxiosResponse } from './typding'

class Axios {
  constructor(public config: AxiosRequestConfig) {}

  request<T = any>(config: Partial<AxiosRequestConfig>) {
    const _config = margeConfig(config, this.config)
    const adapter = _config.adapter

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

function transformResponse(
  response: AxiosResponse,
  transforms: AxiosRequestConfig['transformResponse']
) {
  response.data = transforms.reduce(
    (data, transform) => transform(data),
    response.data
  )
  return response
}
