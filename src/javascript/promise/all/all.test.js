import { all } from './all'
import { taskReject, task } from '../_/utils'

describe('Test all', () => {
  it('resolve each promise result', async () => {
    const res = await all([task(3), task(2), task(1)])
    expect(res).toStrictEqual([3, 2, 1])
  })

  it.skip('reject first error', done => {
    all([task(1), task(2), taskReject(3), task(4), taskReject(5)])
      .then(() => {
        expect(1).toBe(2)
      })
      .catch(e => {
        expect(e).toBe(3)
        done()
      })
    jest.runAllTimers()
  })

  it('resolve with empty array', async () => {
    const res = await all([])
    expect(res).toStrictEqual([])
  })

  it('resolve with non-promise values', async () => {
    const res = await all([1, 2, 3])
    expect(res).toStrictEqual([1, 2, 3])
  })
})
