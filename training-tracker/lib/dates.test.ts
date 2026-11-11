import { monthRange, todayLocal, toLocalDateString } from './dates'

// These expectations hold in every time zone. `npm test` runs this file in
// both America/Chicago (behind UTC) and Asia/Tokyo (ahead of UTC); the old
// toISOString() approach fails in one or the other:
//   - Chicago: an 8:30pm session defaulted to tomorrow's date.
//   - Tokyo: the month started on the last day of the previous month.
// (Setting process.env.TZ inside a test has no effect in Jest, so the time
// zone is set on the command line instead.)

describe('todayLocal', () => {
  test('an evening session is still today, not tomorrow', () => {
    expect(todayLocal(new Date(2026, 10, 10, 20, 30))).toBe('2026-11-10')
  })
  test('just before midnight', () => {
    expect(todayLocal(new Date(2026, 10, 10, 23, 59))).toBe('2026-11-10')
  })
  test('an early-morning session is today, not yesterday', () => {
    expect(todayLocal(new Date(2026, 10, 10, 0, 30))).toBe('2026-11-10')
  })
})

describe('monthRange', () => {
  test('mid-month', () => {
    expect(monthRange(new Date(2026, 10, 15, 12, 0))).toEqual({ start: '2026-11-01', end: '2026-11-30' })
  })
  test('first morning of the month', () => {
    expect(monthRange(new Date(2026, 10, 1, 0, 30))).toEqual({ start: '2026-11-01', end: '2026-11-30' })
  })
  test('last evening of the month', () => {
    expect(monthRange(new Date(2026, 10, 30, 23, 0))).toEqual({ start: '2026-11-01', end: '2026-11-30' })
  })
  test.each([
    ['February', new Date(2026, 1, 10), '2026-02-01', '2026-02-28'],
    ['February, leap year', new Date(2028, 1, 10), '2028-02-01', '2028-02-29'],
    ['December', new Date(2026, 11, 31, 22, 0), '2026-12-01', '2026-12-31'],
    ['January', new Date(2027, 0, 1, 1, 0), '2027-01-01', '2027-01-31'],
  ])('%s', (_label, now, start, end) => {
    expect(monthRange(now)).toEqual({ start, end })
  })
})

test('toLocalDateString pads single-digit months and days', () => {
  expect(toLocalDateString(new Date(2026, 0, 5))).toBe('2026-01-05')
})
