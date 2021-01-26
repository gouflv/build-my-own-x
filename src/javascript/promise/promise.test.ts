import { PromiseMock as PM } from './promise'

const PromiseMock = PM
// const PromiseMock = Promise

const expectFnCalledWith = (fn, params: any[]) =>
  params.forEach((param, i) => expect(fn).nthCalledWith(i + 1, param))

describe('Test PromiseMock', () => {
  let called
  beforeEach(() => {
    called = jest.fn()
  })

  it('promise simple', done => {
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
        called(value)
        expectFnCalledWith(called, [
          'start',
          'init',
          'end',
          'thenA',
          'thenB',
          'resolved'
        ])
        done()
      })
    called('end')
  })

  it('resolve state must not change', done => {
    new PromiseMock((resolve, reject) => {
      resolve('resolved')
      reject('rejected')
    })
      .then(
        value => {
          called(value)
        },
        reason => {
          called(reason)
        }
      )
      .then(() => {
        expectFnCalledWith(called, ['resolved'])
        done()
      })
  })

  it('async resolved', done => {
    new PromiseMock(resolve => {
      called('init')
      setTimeout(() => {
        called('called resolve')
        resolve('resolved')
      }, 1000)
    })
      .then(value => {
        called(value)
      })
      .then(() => {
        expectFnCalledWith(called, ['init', 'called resolve', 'resolved'])
        done()
      })
  })

  it.skip('async reject', done => {
    new PromiseMock((resolve, reject) => {
      called('init')
      setTimeout(() => {
        called('call rejected')
        reject('rejected')
      }, 1000)
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

  it.skip('reject on throw error in executor', done => {
    new PromiseMock(() => {
      called('init')
      throw 'error'
    }).then(
      () => {
        called('fulfilled')
      },
      reason => {
        called('rejected')
        expectFnCalledWith(called, ['init', 'rejected'])
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
