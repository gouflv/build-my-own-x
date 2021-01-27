import { PromiseMock as PM } from './promise'

const PromiseMock = PM
// const PromiseMock = Promise

const expectFnCalledWith = (fn, params: any[]) => {
  expect(fn).toBeCalledTimes(params.length)
  params.forEach((param, i) => expect(fn).nthCalledWith(i + 1, param))
}

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

  // onFulfilled 和 onRejected 调用次数不可超过一次
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

  // onFulfilled 和 onRejected 必须被作为函数调用（即没有 this 值）
  it('onFulfilled called as function', done => {
    new PromiseMock(resolve => resolve('')).then(() => {
      expect(this).toBeUndefined()
      done()
    })
  })

  it('onRejected called as function', done => {
    new PromiseMock((resolve, reject) => reject('')).then(
      () => {},
      () => {
        expect(this).toBeUndefined()
        done()
      }
    )
  })

  it('async resolved', done => {
    new PromiseMock(resolve => {
      called('init')
      setTimeout(() => {
        called('called resolve')
        resolve('resolved')
      }, 500)
    })
      .then(value => {
        called(value)
      })
      .then(() => {
        expectFnCalledWith(called, ['init', 'called resolve', 'resolved'])
        done()
      })
  })

  it('async reject', done => {
    new PromiseMock((resolve, reject) => {
      called('init')
      setTimeout(() => {
        called('call rejected')
        reject('rejected')
      }, 500)
    })
      .then(
        () => {
          called('then1 fulfilled')
        },
        e => {
          called('then1 rejected')
          called(e)
          return e
        }
      )
      .then(value => {
        called('fulfilled always run in then2')
        called(value)
      })
      .then(() => {
        expectFnCalledWith(called, [
          'init',
          'call rejected',
          'then1 rejected',
          'rejected',
          'fulfilled always run in then2',
          'rejected'
        ])
        done()
      })
  })

  it('reject if executor throw error', done => {
    new PromiseMock(() => {
      called('init')
      throw 'error'
    })
      .then(
        () => {
          called('then fulfilled')
        },
        () => {
          called('then rejected')
        }
      )
      .then(() => {
        expectFnCalledWith(called, ['init', 'then rejected'])
        done()
      })
  })

  it('reject if onFulfilled throw error', done => {
    new PromiseMock(resolve => {
      resolve('resolved value')
    })
      .then(value => {
        called(value)
        throw 'throw in then'
      })
      .then(undefined, () => {
        called('then2 rejected')
        called('throw in then')
      })
      .then(() => {
        expectFnCalledWith(called, [
          'resolved value',
          'then2 rejected',
          'throw in then'
        ])
        done()
      })
  })

  it.skip('promise chain', done => {
    new PromiseMock(resolve => {
      called('promise 1 init')
      resolve(
        new PromiseMock(resolve => {
          called('promise 1 inner init')
          resolve('promise 1 inner resolved value')
        }).then(value => {
          called('promise 1 inner then')
          return value
        })
      )
    })
      .then(value => {
        called(value)
        return new PromiseMock(resolve => {
          called('promise 2 inner init')
          resolve('promise 2 inner resolved value')
        }).then(value => {
          called('promise 2 inner then')
          return value
        })
      })
      .then(value => {
        called(value)
        expectFnCalledWith(called, [
          'promise 1 init',
          'promise 1 inner init',
          'promise 1 inner then',
          'promise 1 inner resolved value',
          'promise 2 inner init',
          'promise 2 inner then',
          'promise 2 inner resolved value'
        ])
        done()
      })
  })
})
