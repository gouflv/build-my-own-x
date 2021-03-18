export interface Receiver {
  operation(): string
}

interface Command {
  execute(): string
}

export abstract class AbstractCommand implements Command {
  constructor(protected receiver?: Receiver) {}
  abstract execute(): string
}

export class Invoker {
  constructor(private before: Command, private after: Command) {}
  run() {
    return [
      this.before.execute(),
      'Invoker executed.',
      this.after.execute()
    ].join(' ')
  }
}
