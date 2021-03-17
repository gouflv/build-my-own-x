interface Subject {
  request(): string
}

export class ConcreteSubject implements Subject {
  request(): string {
    return 'Send request'
  }
}

export class SubjectProxy implements Subject {
  constructor(protected subject: Subject) {}
  request(): string {
    let res = ''
    res = 'Before request. -> '
    res += this.subject.request()
    res += '. -> After request.'
    return res
  }
}
