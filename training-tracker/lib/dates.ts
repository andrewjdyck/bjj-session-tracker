// Session dates are stored as 'YYYY-MM-DD' strings in the user's *local*
// calendar. Don't use Date.toISOString() for these: it converts to UTC, which
// shifts the date (e.g. 7pm in Chicago is already tomorrow in UTC).

/** Format a Date as 'YYYY-MM-DD' in the local time zone. */
export function toLocalDateString(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/** Today's date as 'YYYY-MM-DD' in the local time zone. */
export function todayLocal(now: Date = new Date()): string {
  return toLocalDateString(now)
}

/** First and last day of the month containing `now`, as 'YYYY-MM-DD' (inclusive). */
export function monthRange(now: Date = new Date()): { start: string; end: string } {
  return {
    start: toLocalDateString(new Date(now.getFullYear(), now.getMonth(), 1)),
    end: toLocalDateString(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
  }
}
