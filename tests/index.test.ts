import { hello } from '@/index'

describe('index test', () => {
  test('should hello', () => {
    expect(hello('hoge')).toBe('hello hoge by twict')
  })
})
