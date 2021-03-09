import { defaults } from './defaults'

class Axios {
  constructor(private config: AxiosRequestConfig) {}
  request<T>() {
    const adapter = this.config.adapter

    const onAdapterResolved = (response: AxiosResponse<T>) => {}
    const onAdapterRejected = reason => {}

    return adapter(this.config).then(onAdapterResolved, onAdapterRejected)
  }
}

function createAxios(config: AxiosRequestConfig) {
  return new Axios(config)
}

export const axios = createAxios(defaults)
