import { AxiosRequestConfig, AxiosResponse } from './typding'
import qs from 'qs'
import { defaults } from './configs'
import { isUndefined } from '../../javascript/lang/is/is'

export const margeConfig = (
  config: Partial<AxiosRequestConfig>,
  base = defaults
): AxiosRequestConfig => {
  return {
    ...base,
    ...config,
    headers: Object.assign({}, base.headers, config.headers),
    transformResponse: config.transformResponse || base.transformResponse
  }
}

export function buildUrl(config: AxiosRequestConfig) {
  const { url, params, paramsSerializer } = config

  if (!params) return url

  const paramsStr =
    typeof paramsSerializer === 'function'
      ? paramsSerializer(params)
      : qs.stringify(params)

  return paramsStr ? `${config.url}?${paramsStr}` : config.url
}

export function transformRequestData(
  data: AxiosRequestConfig['data'],
  header: AxiosRequestConfig['headers'],
  fns: AxiosRequestConfig['transformRequestData']
) {
  if (fns && fns.length) {
    fns.forEach(fn => {
      data = fn(data, header)
    })
  }
  return data
}

export function transformResponse(
  response: AxiosResponse,
  transforms: AxiosRequestConfig['transformResponse']
) {
  response.data = transforms.reduce(
    (data, transform) => transform(data),
    response.data
  )
  return response
}

export function setContentTypeIfNeed(
  header: AxiosRequestConfig['headers'],
  value: string
) {
  if (header && isUndefined(header['Content-Type'])) {
    header['Content-Type'] = value
  }
}
