import xhrMock from 'xhr-mock'
import { axios } from '../axios'

describe('Test request', () => {
  beforeEach(() => xhrMock.setup())
  afterEach(() => xhrMock.teardown())

  it('should send GET request', async () => {
    const responseData = { foo: 1 }
    xhrMock.get('url', (req, res) => {
      return res.status(200).body(JSON.stringify(responseData))
    })

    const res = await axios.request({ url: 'url' })
    expect(res.data).toStrictEqual(responseData)
  })

  it('should send GET request whit url params', async () => {
    const responseData = { foo: 1 }
    xhrMock.get('url?a=1&b=2', (req, res) => {
      return res.status(200).body(JSON.stringify(responseData))
    })

    const res = await axios.request({ url: 'url', params: { a: 1, b: 2 } })
    expect(res.data).toStrictEqual(responseData)
  })

  it('should send POST request', async () => {
    const responseData = { foo: 1 }
    xhrMock.post('url', (req, res) => {
      return res.status(200).body(JSON.stringify(responseData))
    })

    const res = await axios.request({ url: 'url', method: 'post' })
    expect(res.data).toStrictEqual(responseData)
  })

  it('should send POST request', async () => {
    const requestData = { a: 1, b: 2 }
    const responseData = { foo: 1 }
    xhrMock.post('url', (req, res) => {
      expect(req.header('Content-Type')).toBe('application/json;charset=utf-8')
      return res.status(200).body(JSON.stringify(responseData))
    })

    const res = await axios.request({
      url: 'url',
      method: 'post',
      data: requestData
    })
    expect(res.data).toStrictEqual(responseData)
  })
})
