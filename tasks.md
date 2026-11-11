# Tasks

## MVP planning

- [ ] Decide the MVP's purpose: a personal tracker first, or collecting community data from day one?
- [ ] Define the session data model (e.g. gi/no-gi, class type, rounds, techniques, intensity) and what can be aggregated across users.
- [ ] Decide on privacy and aggregation: what the FAQ promises versus what gets built.
- [ ] Likely MVP features to scope:
  - [ ] Sessions list with edit and delete
  - [ ] Progress charts
  - [ ] Password reset and better auth errors
  - [ ] Export
- [ ] Write up the MVP scope and update the README release plan to match.

## Future dev considerations

- [ ] Check the live site while signed in: log in, log a session (the landing page total should go up), profile, dashboard.
- [ ] Delete the legacy `stats/global` docs (dev and prod) and their read-only rule in `firestore.rules`. Nothing in the app uses them now; they're kept only for browsers still running the old page.
- [ ] Check that the seed/wipe scripts (`npm run seed-db`, `npm run wipe-db`) still run against dev.
- [ ] Dependency upgrades held for later: Tailwind 4, TypeScript 7, lucide-react 1.x, firebase 12/13.
  - Known `npm audit` exception: `@grpc/grpc-js` (high) comes from `@firebase/firestore` and `firebase-admin`, which pin an affected version. It's server-side only. Check again with each Firebase update.
