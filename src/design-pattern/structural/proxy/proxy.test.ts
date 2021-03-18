import { ConcreteSubject, SubjectProxy } from './proxy'

describe('Test Proxy', () => {
  it('should it works', () => {
    const subject = new ConcreteSubject()
    expect(subject.request()).toBe('Send request')

    expect(new SubjectProxy(subject).request()).toBe(
      'Before request. -> Send request. -> After request.'
    )
  })
})
