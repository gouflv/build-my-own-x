import { PromiseA } from './promise'
import { expectFnCalledWith } from '../../_/utils'

const PromiseAdapter = PromiseA

describe('Test Promise', () => {
  let called
  beforeEach(() => {
    called = jest.fn()
  })

  it('promise simple', done => {
    called('start')
    new PromiseAdapter<string>(resolve => {
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
    new PromiseAdapter((resolve, reject) => {
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

  it('onFulfilled called as function', done => {
    new PromiseAdapter(resolve => resolve('')).then(() => {
      expect(this).toBeUndefined()
      done()
    })
  })

  it('onRejected called as function', done => {
    new PromiseAdapter((resolve, reject) => reject('')).then(
      () => {},
      () => {
        expect(this).toBeUndefined()
        done()
      }
    )
  })

  it('async resolved', done => {
    new PromiseAdapter(resolve => {
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
    new PromiseAdapter((resolve, reject) => {
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
    new PromiseAdapter(() => {
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
    new PromiseAdapter(resolve => {
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

  it('resolve with a promise', done => {
    new PromiseAdapter(resolve => {
      called('promise1 init')
      resolve(
        new PromiseAdapter(resolve => {
          called('promise2 init')
          resolve('promise2 resolved value')
        }).then(value => {
          called('promise2 then')
          return value
        })
      )
    })
      .then(value => {
        called(value)
      })
      .then(() => {
        expectFnCalledWith(called, [
          'promise1 init',
          'promise2 init',
          'promise2 then',
          'promise2 resolved value'
        ])
        done()
      })
  })
})
