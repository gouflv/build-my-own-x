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
  adapter: adapterXHR
}

export const margeConfig = (
  config: Partial<AxiosRequestConfig>,
  base = defaults
): AxiosRequestConfig => {
  return {
    ...base,
    ...config,
    headers: Object.assign({}, base.headers, config.headers)
  }
}
