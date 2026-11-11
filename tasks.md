# Tasks

Next steps after the November 2026 codebase review, in rough priority order.

## 1. Update dependencies

- [ ] Move `firebase-admin` and `firebase-functions` out of runtime `dependencies`. They're only used by the seed/wipe scripts and cause most of the `npm audit` findings.
- [ ] Apply safe minor bumps: `firebase` 11.1 → 11.10, `firebase-admin` 13.0 → 13.10, Radix, Testing Library, postcss, autoprefixer.
- [ ] Upgrade Next 14.2.16 → 16.x, together with React 18 → 19 and `@types/react*`.
  - [ ] Migrate ESLint 8 → 9 with a flat config, and replace `next lint`.
  - [ ] Check that `next/font`, `next/script` and client components still work.
- [ ] Remove duplicate configs: keep one of `tailwind.config.js` / `.ts` and one of `postcss.config.js` / `.mjs`.
- [ ] Hold for later: Tailwind 4, TypeScript 7, lucide-react 1.x.
- [ ] Done when `npm audit` shows no critical or high issues in runtime dependencies, and `tsc`, lint and build all pass.

## 2. Firestore backend

- [ ] Confirm the Firebase project, Auth and Firestore still exist and the app can connect to them (sign up, log in, log a session, view the dashboard).
- [ ] Pull the deployed security rules into the repo (`firebase.json`, `.firebaserc`, `firestore.rules`) and deploy them from there.
- [ ] Rules: users can read and write only `users/{uid}/**`; `stats/global` is publicly readable but not writable by clients.
- [ ] Move the `stats/global` total update out of the browser and into a Cloud Function triggered when a session is created or deleted.
- [ ] Set up a separate dev Firebase project or the emulator, so local work doesn't touch prod data.
- [ ] Check that the seed/wipe scripts still run against dev.

## 3. Bugs and rough edges

- [ ] `track-session/page.tsx`: move the `router.push('/login')` redirect out of render and into an effect.
- [ ] Duration input: stop `parseInt('')` from producing `NaN`; validate that it's a positive whole number before saving.
- [ ] Dashboard: calculate month boundaries in local time, not UTC from `toISOString()`.
- [ ] Dashboard: remove or implement the empty table placeholder (see section 5, sessions list).
- [ ] Replace `alert()` with inline success and error messages.
- [ ] Remove the debugging `console.log` calls from the landing page.
- [ ] Add the first Jest tests for the duration parsing and month boundary logic, so `npm test` passes.

## 4. ThemeToggle (uncommitted work)

- [ ] Decide: finish it, or drop it and port the theme provider and mode toggle from `archive/ui-v2-v0-export`. Porting is probably better.
- [ ] Use the existing `.dark` theme tokens in `globals.css` instead of the `.dark body { bg-gray-900 }` override.
- [ ] Avoid the flash of the wrong theme on page load, and replace the "Toggle Dark Mode" text with an icon.
- [ ] Commit the result or discard the work in progress.

## 5. MVP plan (TBD)

- [ ] Decide the MVP's purpose: a personal tracker first, or collecting community data from day one?
- [ ] Define the session data model (e.g. gi/no-gi, class type, rounds, techniques, intensity) and what can be aggregated across users.
- [ ] Decide on privacy and aggregation: what the FAQ promises versus what gets built.
- [ ] Likely MVP features to scope:
  - [ ] Sessions list with edit and delete
  - [ ] Progress charts
  - [ ] Password reset and better auth errors
  - [ ] Export
- [ ] Write up the MVP scope and update the README release plan to match.
