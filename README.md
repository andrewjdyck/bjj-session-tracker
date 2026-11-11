# BJJ Training Session Tracker

This project is an experiment in building (and learning how to build) a React.js webapp to track my BJJ training sessions over time and my overall progress. Inspired by the now non-functional mattime.io.

# Background

1. Who is this app for?
    - People who want to track and develop their Jiu Jitsu training
2. What problem does this solve?
    - Easy way for Jiu Jitsu athletes to enter and visualize their training progress in the sport. Without this app, users would need to develop their own spreadsheets, know how to enter the information into it properly, and visualize it.



# Release plan

## Upcoming features

- Limit session return to last 20 sessions on home page
- User profile (rank, club, age, weight, etc.)
- Update firebase security rules
- Ensure user signin works properly
- BUGS
    - Menu button shows "loading..." when not logged in. No message when login fails
    - Menu button move to top-right
    - Align view/edit sessions appropriately
    - Ensure firebase connection is corrected.

- FIRST RELEASE!!
    - Use prod database
    - Ability to work on dev branch with dev db

- Better styling and layout - replace bootstrap with something better like tailwind
- Pagination for sessions.
- Session import/export



## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




## Analytics

// In login component
await trackUserEvent(user.uid, 'login')

// In track-session
await trackUserEvent(user.uid, 'session_created', { 
  duration: sessionData.duration,
  date: sessionData.date 
})

// In profile
await trackUserEvent(user.uid, 'profile_updated', {
  beltRank: profileData.beltRank
})
## Parked UI work

These branches are kept for future UI work but aren't part of the MVP.

- `archive/ui-v2-v0-export` holds an earlier experiment (Feb 2025): a fresh v0 export
  of the UI with Firebase login/signup re-added, built in a separate folder so the working app
  wasn't disturbed. It was never merged. It has no tests, seed scripts or analytics, but I
  preferred its look. If I refactor the UI, port pieces from that branch (landing page, theme
  provider, mode toggle) instead of maintaining two codebases. Note: its profile form stores
  belt ranks capitalised (`"White"`); the current app expects lowercase (`"white"`).
- `wip/theme-toggle` holds an unfinished dark mode toggle (Nov 2026). It's a plain text button,
  and its `.dark body` style overrides the theme tokens in `globals.css`. Dark mode isn't
  needed for the MVP. When it comes back, the theme provider and mode toggle from
  `archive/ui-v2-v0-export` are probably a better starting point.
