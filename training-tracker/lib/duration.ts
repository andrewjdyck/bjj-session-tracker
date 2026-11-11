// Session duration in minutes. Matches the Firestore rule that limits a single
// change to the community total to one day's worth of minutes.
export const MAX_SESSION_MINUTES = 1440

/**
 * Parse a duration typed into the session form. Returns a whole number of
 * minutes between 1 and MAX_SESSION_MINUTES, or null if the input isn't valid.
 */
export function parseDuration(input: string): number | null {
  const trimmed = input.trim()
  if (!/^\d+$/.test(trimmed)) return null
  const minutes = Number(trimmed)
  if (minutes < 1 || minutes > MAX_SESSION_MINUTES) return null
  return minutes
}
