import { adapterXHR } from './adapters'
import { AxiosRequestConfig } from './typding'

export const DEFAULT_HEADER_ACCEPT = {
  Accept: 'application/json, text/plain, */*'
}

export const defaults: AxiosRequestConfig = {
  url: '',
  method: 'get',
  headers: DEFAULT_HEADER_ACCEPT,
  timeout: 0,
  responseType: 'json',
  transformResponse: [
    function transformResponse(data) {
      if (typeof data === 'string') {
        try {
          return JSON.parse(data)
        } catch (e) {}
      }
      return data
    }
  ],
  adapter: adapterXHR
}

export const margeConfig = (
  config: Partial<AxiosRequestConfig>,
  base = defaults
): AxiosRequestConfig => {
  return {
    ...base,
    ...config,
    headers: Object.assign({}, base.headers, config.headers),
    transformResponse: [
      ...base.transformResponse,
      ...(config.transformResponse || [])
    ]
  }
}
