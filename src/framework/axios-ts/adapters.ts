import { createError } from './errors'
import { AxiosRequestConfig, AxiosResponse } from './typding'
import { buildUrl, transformRequestData } from './helpers'

export const adapterXHR = (config: AxiosRequestConfig) => {
  return new Promise<AxiosResponse>((resolve, reject) => {
    const request = new XMLHttpRequest()

    request.open(config.method.toUpperCase(), buildUrl(config))

    Object.keys(config.headers).forEach(k =>
      request.setRequestHeader(k, config.headers[k])
    )

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
        headers: config.headers,
        config,
        request
      }

      if (request.status && request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        reject(createError(request.status, 'Request failed', request, response))
      }
    }

    request.onerror = () => {
      console.error(request)
      reject(createError(null, 'Network Error', request))
    }

    request.onabort = () => {}

    request.ontimeout = () => {}

    request.send((config.data as any) || null)
  })
}
