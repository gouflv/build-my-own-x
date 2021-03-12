export interface AxiosRequestConfig {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  headers: Record<string, string>
  timeout: number
  responseType: 'json' | 'text'

  params?: Record<string, string | number>
  paramsSerializer?: (params: AxiosRequestConfig['params']) => string
  data?: Record<string, any>

  transformRequestData: Array<
    (
      data: AxiosRequestConfig['data'],
      headers: AxiosRequestConfig['headers']
    ) => any
  >
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
  code: number | null
  request: XMLHttpRequest
  response?: AxiosResponse
  isAxiosError: boolean
}
