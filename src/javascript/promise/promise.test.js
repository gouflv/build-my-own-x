import { PromiseMock } from './promise'

describe('Test PromiseMock', () => {
  it('promise simple', done => {
    const called = jest.fn()

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
      .then(() => {
        expect(called).nthCalledWith(1, 'init')
        expect(called).nthCalledWith(2, 'thenA')
        expect(called).nthCalledWith(3, 'thenB')
        done()
      })
  })
})
