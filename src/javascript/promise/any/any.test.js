import { task, taskReject } from '../_/utils'
import { any } from './any'

describe('Test any', () => {
  it('Promise fulfilled with first promise resolved-value', async () => {
    const p = any([taskReject(1), taskReject(2), task(3), task(4)])
    await expect(p).resolves.toBe(3)
  })

  it('Promise rejected if non-resolved promise', async () => {
    const p = any([taskReject(1), taskReject(2), taskReject(3)])
    await expect(p).rejects.toThrow('No Promise was resolved')
  })
})
