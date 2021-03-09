import { createError } from './errors'
import { AxiosRequestConfig, AxiosResponse } from './typding'

export const adapterXHR = (config: AxiosRequestConfig) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.open(config.method.toUpperCase(), config.url)

    request.timeout = config.timeout

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      const response: AxiosResponse = {
        data:
          config.responseType === 'text'
            ? request.responseText
            : request.response,
        status: request.status,
        headers: {},
        config,
        request
      }

      if (request.status && request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        reject(createError(request.status, 'Request failed', response))
      }
    }

    request.send()
  })
}
