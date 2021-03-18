import { AbstractHandler } from './chain'

class GreetHandler extends AbstractHandler {
  handle(request: string): string {
    return 'Hi, ' + super.handle(request)
  }
}
class GoodbyeHandler extends AbstractHandler {
  handle(request: string): string {
    return super.handle(request) + '! ~ Bye!'
  }
}

describe('Test ChainOfResponsibility', () => {
  it('should it works', () => {
    const greet = new GreetHandler()
    const goodbye = new GoodbyeHandler()
    greet.setNext(goodbye)

    expect(greet.handle('foo')).toBe('Hi, foo! ~ Bye!')
  })
})
