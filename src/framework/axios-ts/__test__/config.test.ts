import { axios, createAxios } from '../axios'
import { DEFAULT_HEADER_ACCEPT, defaults } from '../defaults'
import { AxiosRequestConfig, AxiosResponse } from '../typding'

const mockConfig: Partial<AxiosRequestConfig> = {
  url: 'url',
  headers: { ...DEFAULT_HEADER_ACCEPT, foo: 'bar' },
  responseType: 'text',
  timeout: 10,
  method: 'post',
  adapter: config => Promise.resolve({ config } as AxiosResponse)
}

describe('Test axios configuration', () => {
  it('should axios defined', () => {
    expect(axios).toBeDefined()
    expect(typeof axios.request === 'function').toBeTruthy()
    expect(typeof createAxios === 'function').toBeTruthy()
  })

  it('should createAxios with config', () => {
    let instance = createAxios({})
    expect(instance.config).toStrictEqual(defaults)
    instance = createAxios(mockConfig)
    expect(instance.config).toStrictEqual(mockConfig)
  })

  it('should request with config', async done => {
    const res = await axios.request(mockConfig)
    expect(res.config).toStrictEqual(mockConfig)
    done()
  })
})
