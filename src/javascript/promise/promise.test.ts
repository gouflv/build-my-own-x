import { PromiseMock } from './promise'

const expectFnCalledWith = (fn, params: any[]) =>
  params.forEach((param, i) => expect(fn).nthCalledWith(i + 1, param))

describe('Test PromiseMock', () => {
  it('promise simple', done => {
    const called = jest.fn()
    called('start')
    new PromiseMock<string>(resolve => {
      called('init')
      resolve('resolved')
    })
      .then(() => {
        called('thenA')
      })
      .then(() => {
        called('thenB')
      })
      .then(value => {
        expect(value).toBe('resolved')
        expectFnCalledWith(called, ['start', 'init', 'end', 'thenA', 'thenB'])
        done()
      })
    called('end')
  })

  it('promise reject on throw error in executor', done => {
    new PromiseMock(() => {
      throw 'error'
    }).then(
      () => {},
      reason => {
        expect(reason).toBe('error')
        done()
      }
    )
  })
})
