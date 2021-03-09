import { adapterXHR } from './adapters'

export const defaults: AxiosRequestConfig = {
  url: '',
  method: 'get',
  headers: {
    Accept: 'application/json, text/plain, */*'
  },
  timeout: 0,
  responseType: 'json',
  adapter: adapterXHR
}
