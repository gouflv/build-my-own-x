import { all } from './all'
import { taskReject, task } from '../_/utils'

describe('Test all', () => {
  it('resolve each promise result in task order', async () => {
    const res = await all([task(3), task(2), task(1)])
    expect(res).toStrictEqual([1, 2, 3])
  })

  it('reject first error', async () => {
    expect.assertions(1)
    await all([task(1), task(2), taskReject(3), task(4), taskReject(5)])
      .then(() => {
        expect(1).toBe(2)
      })
      .catch(e => {
        expect(e).toBe(3)
      })
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
