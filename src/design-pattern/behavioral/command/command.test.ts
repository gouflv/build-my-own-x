import { AbstractCommand, Invoker, Receiver } from './command'

class BeforeCommand extends AbstractCommand {
  execute(): string {
    return 'BeforeCommand executed.'
  }
}

class AfterCommand extends AbstractCommand {
  execute(): string {
    if (this.receiver) {
      return `AfterCommand executed with ${this.receiver.operation()}.`
    }
    return 'AfterCommand executed.'
  }
}

class ReceiverA implements Receiver {
  operation(): string {
    return 'receiverA'
  }
}

describe('Test Command', () => {
  it('should it works', () => {
    const invoker = new Invoker(new BeforeCommand(), new AfterCommand())
    expect(invoker.run()).toBe(
      'BeforeCommand executed. Invoker executed. AfterCommand executed.'
    )
  })

  it('should it works with receiver', () => {
    const invoker = new Invoker(
      new BeforeCommand(),
      new AfterCommand(new ReceiverA())
    )
    expect(invoker.run()).toBe(
      'BeforeCommand executed. Invoker executed. AfterCommand executed with receiverA.'
    )
  })
})
