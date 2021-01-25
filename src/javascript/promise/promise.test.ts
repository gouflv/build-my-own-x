import { PromiseMock } from './promise'

const expectFnCalledWith = (fn, params: any[]) =>
  params.forEach((param, i) => expect(fn).nthCalledWith(i + 1, param))

describe('Test PromiseMock', () => {
  let called
  beforeEach(() => {
    called = jest.fn()
  })

  it.only('promise simple', done => {
    called('start')
    new PromiseMock<string>(resolve => {
      called('init')
      resolve('resolved')
    })
      .then()
      .then(value => {
        called('thenA')
        return value
      })
      .then(value => {
        called('thenB')
        return value
      })
      .then(value => {
        expect(value).toBe('resolved')
        expectFnCalledWith(called, ['start', 'init', 'end', 'thenA', 'thenB'])
        done()
      })
    called('end')
  })

  it.only('fire onRejected on call reject', done => {
    new PromiseMock((resolve, reject) => {
      reject('rejected')
    }).then(
      () => {
        called('fulfilled')
      },
      e => {
        called('rejected')
        expectFnCalledWith(called, ['rejected'])
        done()
      }
    )
  })

  it('reject on throw error in executor', done => {
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

  it.skip('promise chain', done => {
    new PromiseMock(() => {
      return new PromiseMock(resolve => resolve('promise 1 init'))
    })
      .then(value1 => {
        called(value1)
        return new PromiseMock(resolve => {
          resolve('promise2 init')
        }).then(value2 => {
          called('promise2 then')
          return value2
        })
      })
      .then(value2 => {
        expectFnCalledWith(called, [
          'promise 1 init',
          'promise 2 init',
          'promise 2 then'
        ])
        done()
      })
  })
})
