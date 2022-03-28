import { sequence } from './sequence'
import { taskReject, task } from '../_/utils'

describe('Test sequence', () => {
  it('resolve promise in orders', async () => {
    expect.assertions(1)
    await sequence([task(3), task(1), task(2)]).then(data => {
      expect(data).toEqual([3, 1, 2])
    })
  })

  it('should catch first error', async () => {
    expect.assertions(1)
    await sequence([task(1), task(2), taskReject(3), task(4), taskReject(5)])
      .then(() => {
        expect(1).toBe(0)
      })
      .catch(error => {
        expect(error).toBe(3)
      })
  })
})
