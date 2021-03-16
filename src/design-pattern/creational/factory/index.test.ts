import { LoggerFactory } from '.'

describe('Test SimpleFactory', () => {
  it('should create Logger', () => {
    expect(LoggerFactory.create('file').log()).toBe('FileLogger')
    expect(LoggerFactory.create('database').log()).toBe('DatabaseLogger')
  })

  it('should throw error with unknown type', () => {
    expect(() => LoggerFactory.create('console')).toThrowError(
      /Logger type unknown/
    )
  })
})
