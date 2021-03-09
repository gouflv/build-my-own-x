import { AxiosError, AxiosResponse } from './typding'

export const createError = (
  code: number,
  message: string,
  response: AxiosResponse
): Error => {
  const error = new Error(message) as AxiosError
  error.code = code
  error.request = response.request
  error.response = response
  error.isAxiosError = true
  return error
}
