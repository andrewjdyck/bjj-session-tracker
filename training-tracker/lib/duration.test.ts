import { MAX_SESSION_MINUTES, parseDuration } from './duration'

describe('parseDuration', () => {
  test.each([
    ['60', 60],
    [' 90 ', 90],
    ['1', 1],
    [String(MAX_SESSION_MINUTES), MAX_SESSION_MINUTES],
  ])('accepts %p', (input, expected) => {
    expect(parseDuration(input)).toBe(expected)
  })

  test.each([
    [''],
    ['   '],
    ['0'],
    ['-5'],
    ['1.5'],
    ['abc'],
    ['60min'],
    ['1e3'],
    [String(MAX_SESSION_MINUTES + 1)],
  ])('rejects %p', (input) => {
    expect(parseDuration(input)).toBeNull()
  })
})
