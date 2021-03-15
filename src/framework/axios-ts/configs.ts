import { adapterXHR } from './adapters'
import { AxiosRequestConfig } from './typding'
import { isObject } from '../../javascript/lang/is/is'
import { setContentTypeIfNeed } from './helpers'

export const DEFAULT_HEADER_ACCEPT = {
  Accept: 'application/json, text/plain, */*'
}

export const defaults: AxiosRequestConfig = {
  url: '',
  method: 'get',
  headers: DEFAULT_HEADER_ACCEPT,
  timeout: 0,
  responseType: 'json',
  transformRequestData: [
    function transformRequest(data, headers) {
      if (data instanceof FormData) {
        return data
      }
      if (isObject(data)) {
        setContentTypeIfNeed(headers, 'application/json;charset=utf-8')
        return JSON.stringify(data)
      }
      return data
    }
  ],
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
