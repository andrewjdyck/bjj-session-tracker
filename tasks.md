# Tasks

Next steps after the November 2026 codebase review, in rough priority order.

## 1. Update dependencies

- [x] Move `firebase-admin` and `firebase-functions` out of runtime `dependencies`. `firebase-functions` was unused and has been removed; `firebase-admin` is now a dev dependency.
- [x] Apply safe minor bumps: `firebase` 11.1 → 11.10, `firebase-admin` 13.0 → 13.10, Radix, Testing Library, postcss, autoprefixer.
- [x] Upgrade Next 14.2.16 → 16.4, together with React 18 → 19 and `@types/react*`.
  - [x] Migrate ESLint 8 → 9 with a flat config (`eslint.config.mjs`); `npm run lint` now runs `eslint .`.
  - [x] Check that `next/font`, `next/script` and client components still work. The build passes and all pages return 200 in dev; still needs a click-through in the browser.
- [x] Remove duplicate configs: kept `tailwind.config.ts` (merged with `.js`, which fixes the missing Select dropdown colours) and `postcss.config.js`.
- [ ] Hold for later: Tailwind 4, TypeScript 7, lucide-react 1.x, firebase 12/13.
- [x] Done when `npm audit` shows no critical or high issues in runtime dependencies, and `tsc`, lint and build all pass.
  - One known exception: `@grpc/grpc-js` (high) comes from `@firebase/firestore`, which pins `~1.9.0` up to and including firebase 13. It's only used on the server, not in the browser. Accepted for now; check again with each Firebase update.
- [ ] Follow-up for task 3: `react-hooks/set-state-in-effect` is lowered to a warning in `eslint.config.mjs`. The profile page is fixed; only the dashboard is left. Set the rule back to an error once that's fixed.

## 2. Firestore backend

- [ ] Confirm the Firebase project, Auth and Firestore still exist and the app can connect to them (sign up, log in, log a session, view the dashboard).
  - [x] Dev (`train-tracker-dev`, project ID `train-tracker-e753c`): Auth and Firestore work, and the app was checked in the browser. The earlier login failure was a forgotten password.
  - [ ] Prod (`train-tracker-prod`): not checked yet.
- [x] Review the Vercel setup: which Firebase project and env vars each environment uses, and whether pushes to `main` deploy to production.
  - Project `training-tracker`, root `training-tracker`, Node 22.x. Production URL: https://training-tracker-au6esyxpatl.vercel.app
  - Pushes to `main` deploy to **Production**; other branches get Preview deploys. Day-to-day work now happens on `dev`, and `main` is only for releases.
  - Every deploy since Feb 2025 failed with `auth/invalid-api-key`, because the Vercel project had no env vars left. Production kept serving the 1 Feb 2025 build (`train-tracker-prod`).
  - Fixed: added all 8 `NEXT_PUBLIC_*` vars. Production uses `train-tracker-prod`; Preview and Development use dev (`train-tracker-e753c`). Values checked against the local `.env` files.
- [ ] Release today's work to production: check the Preview deploy from `dev`, merge `dev` into `main`, then check prod (item above).
  - [x] Preview from `dev` checked in the browser; `dev` merged into `main` and pushed (`b9796ba`).
  - [x] Production deploy succeeded (first since Feb 2025) and is live at the production URL, using `train-tracker-prod`.
  - [ ] Do the prod check in the browser (item at the top of this section).
  - Note: pushing `dev` the first time didn't trigger a Vercel Preview deploy, so it was started by hand through the Vercel API. Check that later pushes deploy automatically.
- [x] Find out what the old `bjj-session-tracker` and `bjj-session-tracker-dev` Firebase projects are. Neither app config uses them; they're from the old React app. Reviewed and OK to delete from the Firebase console.
- [x] Pull the deployed security rules into the repo (`firebase.json`, `.firebaserc`, `firestore.rules`) and deploy them from there.
  - Files are in `training-tracker/`. `.firebaserc` defaults to **dev**; deploy with `firebase deploy --only firestore:rules` (dev) or `--project prod`. Neither project has custom indexes.
  - `firestore.rules` is the prod ruleset, unchanged. Dev had only a catch-all rule.
  - **Security finding:** both projects have a `/{document=**}` catch-all that lets *any* signed-in user read, write and delete *every* document (all users' profiles and sessions). Firestore allows access if any rule matches, so the stricter rules in prod have no effect. Sign-up is open, so the data is effectively public, which contradicts the FAQ's privacy promise. The `posts`, `admin` and `settings` rules are template leftovers.
  - From now on the repo is the source of truth: rules edited in the console will be overwritten by the next deploy.
- [ ] **Priority:** tighten the rules. Users can read and write only `users/{uid}/**`. Remove the catch-all and the template leftovers. Add emulator tests. Deploy to dev, check the app, then deploy to prod.
  - [x] New `firestore.rules`: each user can access only `users/{uid}` and its subcollections (sessions, events); profile delete is blocked; everything else is denied.
  - [x] `stats/global`: anyone can read. Signed-in users can still write (needed until the next item), but only the two known fields, a non-negative number, and a change of at most 1,440 minutes per write.
  - [x] 18 emulator tests in `tests/rules/` (`npm run test:rules`, needs Java 21: `brew install openjdk@21`). The old prod rules fail 9 of them; the new rules pass all 18.
  - [ ] Deploy to dev and check the app.
  - [ ] Deploy to prod (`firebase deploy --only firestore:rules --project prod`) and check the app.
- [ ] Replace the client-written `stats/global` community total. **Decision: option C, staying on free tiers, no Cloud Functions or Blaze plan.**
  - A Next.js route on Vercel uses the Admin SDK to run an aggregation query: `sum(duration)` over the `sessions` collection group. Sessions stay private, nothing can be tampered with, and the total stays accurate when sessions are edited or deleted.
  - Update when data changes, not by polling: after a session is saved, edited or deleted, the app triggers on-demand revalidation of the cached total. A long time-based expiry (e.g. daily) is a backstop.
  - Cost: about 1 read per 1,000 sessions per recalculation, well within the Spark free tier (50k reads a day).
  - Needs the service account key as a secret (non-`NEXT_PUBLIC_`) Vercel env var: dev key for Preview/Development, a prod key for Production.
  - Then remove client writes to `stats/global` from the rules and `lib/stats.ts` (or delete the doc).
  - Rejected: B (public per-user totals, which have to be kept in sync and can be tampered with by each user), and Cloud Functions (need the Blaze billing plan).
- [x] Set up a separate dev Firebase project or the emulator, so local work doesn't touch prod data. This already exists: `.env.local` points to dev and `.env.production.local` to prod. The service account key in `scripts/` is for dev.
- [ ] Check that the seed/wipe scripts still run against dev.

## 3. Bugs and rough edges

- [x] Profile: a user document missing a field (e.g. `rankDate`) caused the "controlled to uncontrolled input" warning, and saving overwrote the whole user document. Fixed: missing fields now default to `''`, and saving uses `merge: true`.
- [ ] Profile: the belt rank dropdown shows blank even though `beltRank` is set. Firestore has capitalised values (`"White"`, `"Brown"`), but the `SelectItem` values are lowercase (`white`, `brown`), so nothing matches. Decide on one canonical form (ties into the data model in task 5) and normalise when reading, or migrate the existing docs. `stripes` is also stored but not shown in the form.
- [ ] `track-session/page.tsx`: move the `router.push('/login')` redirect out of render and into an effect.
- [ ] Duration input: stop `parseInt('')` from producing `NaN`; validate that it's a positive whole number before saving.
- [ ] Dashboard: calculate month boundaries in local time, not UTC from `toISOString()`.
- [ ] Dashboard: remove or implement the empty table placeholder (see section 5, sessions list).
- [ ] Replace `alert()` with inline success and error messages.
- [ ] Remove the debugging `console.log` calls from the landing page.
- [ ] Add the first Jest tests for the duration parsing and month boundary logic, so `npm test` passes.

## 4. ThemeToggle (uncommitted work on branch wip/theme-toggle)

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
