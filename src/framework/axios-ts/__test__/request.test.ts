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
})
