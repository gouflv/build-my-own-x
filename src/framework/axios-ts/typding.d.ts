export interface AxiosRequestConfig {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  headers: Record<string, string>

  // params: Record<string, string>
  // paramsSerializer: (params: AxiosRequestConfig['params']) => string

  // data: Record<string, any>

  timeout: number

  responseType: 'json' | 'text'
  transformResponse: Array<(data: any) => any>

  // onUploadProgress: (e: ProgressEvent) => void
  // onDownloadProgress: (e: ProgressEvent) => void

  adapter: (config: AxiosRequestConfig) => Promise<AxiosResponse>
  // cancelToken: any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  headers: any
  config: AxiosRequestConfig
  request: XMLHttpRequest
}

export interface AxiosError extends Error {
  code: number
  request: any
  response: AxiosResponse
  isAxiosError: boolean
}
