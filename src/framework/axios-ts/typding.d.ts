interface AxiosRequestConfig {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  headers: Record<string, string>

  // params: Record<string, string>
  // paramsSerializer: (params: AxiosRequestConfig['params']) => string

  // data: Record<string, any>

  timeout: number

  responseType: 'json' | 'text'

  // onUploadProgress: (e: ProgressEvent) => void
  // onDownloadProgress: (e: ProgressEvent) => void

  adapter: any
  // cancelToken: any
}

interface AxiosResponse<T = any> {
  data: T
  status: number
  headers: any
  config: AxiosRequestConfig
  request: XMLHttpRequest
}
