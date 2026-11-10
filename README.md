# BJJ Session Tracker: archived v2 UI experiment

This folder is an archived experiment, not the active project. The real project
is `bjj-session-tracker` (https://github.com/andrewjdyck/bjj-session-tracker).

In early Feb 2025 I took a fresh v0 export of the UI and copied the app into this
folder (`training-tracker-2`) to redo the look and feel and re-add Firebase login/signup
without breaking the working app. It was never merged back.

Differences from the main repo: no tests, no Firestore seed/wipe scripts, no analytics or
global stats, and a larger dependency set (recharts, react-hook-form, zod, more Radix).

It is preserved as the branch `archive/ui-v2-v0-export` in the main repo. If you want the
nicer UI, port pieces from that branch (landing page, theme provider, mode toggle) into
`bjj-session-tracker` rather than maintaining two codebases.
