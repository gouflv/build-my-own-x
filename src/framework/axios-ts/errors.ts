import { AxiosError, AxiosResponse } from './typding'

export const createError = (
  code: number | null,
  message: string,
  request: any,
  response?: AxiosResponse
): Error => {
  const error = new Error(message) as AxiosError
  error.code = code
  error.request = request
  error.response = response
  error.isAxiosError = true
  return error
}
