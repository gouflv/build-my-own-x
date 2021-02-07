import { race } from './race'
import { task, taskReject } from '../_/utils'

describe('Test race', () => {
  it('resolved with faster promise', async () => {
    const p = race([task(3), task(2), task(1)])
    await expect(p).resolves.toBe(1)
  })

  it('rejected with faster promise', async () => {
    const p = race([taskReject(3), taskReject(2), taskReject(1)])
    await expect(p).rejects.toBe(1)
  })
})
