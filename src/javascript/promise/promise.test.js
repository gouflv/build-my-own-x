import { PromiseMock } from './promise'
import { call } from '../function/apply/call'

const expectFnCalledWith = (fn, args) =>
  args.forEach((v, i) => expect(fn).nthCalledWith(i + 1, v))

describe('Test PromiseMock', () => {
  it('promise simple', done => {
    const called = jest.fn()

    called('start')

    new PromiseMock(resolve => {
      called('init')
      resolve()
    })
      .then(() => {
        called('thenA')
      })
      .then(() => {
        called('thenB')
      })
      .then()
      .then(() => {
        expectFnCalledWith(called, ['start', 'init', 'end', 'thenA', 'thenB'])
        done()
      })

    called('end')
  })

  it('should resolve with value', done => {
    const called = jest.fn()

    new PromiseMock(resolve => {
      resolve('resolved value')
    })
      .then(value => {
        called(value)
        return 'then value'
      })
      .then(() => {
        expectFnCalledWith(called, ['resolved value'])
        done()
      })
  })

  it('should reject with reason', done => {
    const called = jest.fn()

    new PromiseMock((resolve, reject) => {
      reject('reject reason')
    })
      .then(null, reason => {
        called(reason)
      })
      .then(null, () => {
        expectFnCalledWith(called, ['reject reason'])
        done()
      })
  })
})
