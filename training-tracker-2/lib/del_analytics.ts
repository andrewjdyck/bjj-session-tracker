import { Analytics } from "@vercel/analytics/react"

export const GAId = process.env.NEXT_PUBLIC_GA_ID

export function AnalyticsWrapper() {
  return <Analytics />
}

