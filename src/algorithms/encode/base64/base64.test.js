import { base64Encode } from './base64'

describe('Test Base64', () => {
  it('should encode works', () => {
    expect(base64Encode('Man')).toBe('TWFu')
    expect(base64Encode('A')).toBe('QQ==')
    expect(base64Encode('BC')).toBe('QkM=')
  })
})
