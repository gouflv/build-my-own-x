export const adapterXHR = (config: AxiosRequestConfig) => {
  return new Promise((resolve, reject) => {
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

      resolve(response)
    }
  })
}
