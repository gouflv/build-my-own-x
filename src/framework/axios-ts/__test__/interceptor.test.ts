import xhrMock from 'xhr-mock'
import { axios } from '../axios'

describe('Test interceptors', () => {
  beforeEach(() => xhrMock.setup())
  afterEach(() => xhrMock.teardown())

  it('interceptor request', async () => {
    const responseData = { foo: 1 }
    xhrMock.get('url', (req, res) => {
      // expect(res.header('x-header-a')).toBe('a')
      // expect(res.header('x-header-b')).toBe('b')
      return res.status(200).body(JSON.stringify(responseData))
    })

    axios.interceptors.request.use(
      config => {
        config.headers['x-header-a'] = 'a'
        return config
      },
      error => Promise.reject(error)
    )
    axios.interceptors.request.use(
      config => {
        config.headers['x-header-b'] = 'b'
        return config
      },
      error => Promise.reject(error)
    )

    const res = await axios.request({ url: 'url' })
    expect(res.data).toStrictEqual(responseData)
    expect(res.config.headers['x-header-a']).toBe('a')
    expect(res.config.headers['x-header-b']).toBe('b')
  })
})
