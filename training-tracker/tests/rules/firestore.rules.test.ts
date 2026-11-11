/**
 * @jest-environment node
 *
 * Firestore security rules tests. Run with `npm run test:rules`, which starts
 * the Firestore emulator (needs Java 21+). Uses a demo- project ID, so it
 * never touches a real Firebase project.
 */
import { readFileSync } from 'fs'
import { resolve } from 'path'
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  setDoc,
  setLogLevel,
  updateDoc,
  where,
} from 'firebase/firestore'

// Expected permission-denied errors are logged as warnings; keep output readable.
setLogLevel('error')

let env: RulesTestEnvironment

const ALICE = 'alice'
const BOB = 'bob'

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: 'demo-bjj-tracker',
    firestore: { rules: readFileSync(process.env.RULES_FILE ?? resolve(__dirname, '../../firestore.rules'), 'utf8') },
  })
})

afterAll(async () => {
  await env.cleanup()
})

beforeEach(async () => {
  await env.clearFirestore()
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    await setDoc(doc(db, 'stats/global'), { totalTrainingMinutes: 900, lastUpdated: new Date() })
    await setDoc(doc(db, `users/${ALICE}`), { email: 'alice@example.com', beltRank: 'blue' })
    await setDoc(doc(db, `users/${ALICE}/sessions/s1`), { date: '2026-11-01', duration: 60, notes: '' })
    await setDoc(doc(db, `users/${BOB}`), { email: 'bob@example.com', beltRank: 'white' })
    await setDoc(doc(db, `users/${BOB}/sessions/s1`), { date: '2026-11-02', duration: 90, notes: 'private' })
  })
})

const as = (uid: string) => env.authenticatedContext(uid).firestore()
const anon = () => env.unauthenticatedContext().firestore()

describe('signed-out visitors', () => {
  test('can read the community total', async () => {
    await assertSucceeds(getDoc(doc(anon(), 'stats/global')))
  })
  test('cannot write the community total', async () => {
    await assertFails(setDoc(doc(anon(), 'stats/global'), { totalTrainingMinutes: 960 }, { merge: true }))
  })
  test('cannot read profiles or sessions', async () => {
    await assertFails(getDoc(doc(anon(), `users/${ALICE}`)))
    await assertFails(getDocs(collection(anon(), `users/${ALICE}/sessions`)))
  })
})

describe('a user with their own data', () => {
  test('can read and update their profile (merge, as the profile page does)', async () => {
    const db = as(ALICE)
    await assertSucceeds(getDoc(doc(db, `users/${ALICE}`)))
    await assertSucceeds(setDoc(doc(db, `users/${ALICE}`), { school: 'ATOS' }, { merge: true }))
  })
  test('can create their profile on first save', async () => {
    const db = as('carol')
    await assertSucceeds(setDoc(doc(db, 'users/carol'), { beltRank: 'white' }, { merge: true }))
  })
  test('cannot delete their profile', async () => {
    await assertFails(deleteDoc(doc(as(ALICE), `users/${ALICE}`)))
  })
  test('can log, list, query, edit and delete their sessions', async () => {
    const db = as(ALICE)
    const sessions = collection(db, `users/${ALICE}/sessions`)
    await assertSucceeds(addDoc(sessions, { date: '2026-11-10', duration: 60, notes: '', timestamp: new Date() }))
    await assertSucceeds(getDocs(sessions))
    await assertSucceeds(getDocs(query(sessions, where('date', '>=', '2026-11-01'), where('date', '<=', '2026-11-30'))))
    await assertSucceeds(updateDoc(doc(db, `users/${ALICE}/sessions/s1`), { duration: 75 }))
    await assertSucceeds(deleteDoc(doc(db, `users/${ALICE}/sessions/s1`)))
  })
  test('can record analytics events', async () => {
    await assertSucceeds(addDoc(collection(as(ALICE), `users/${ALICE}/events`), { type: 'login' }))
  })
})

describe("another user's data", () => {
  test('cannot be read', async () => {
    const db = as(ALICE)
    await assertFails(getDoc(doc(db, `users/${BOB}`)))
    await assertFails(getDoc(doc(db, `users/${BOB}/sessions/s1`)))
    await assertFails(getDocs(collection(db, `users/${BOB}/sessions`)))
  })
  test('cannot be written or deleted', async () => {
    const db = as(ALICE)
    await assertFails(setDoc(doc(db, `users/${BOB}`), { beltRank: 'black' }, { merge: true }))
    await assertFails(addDoc(collection(db, `users/${BOB}/sessions`), { duration: 60 }))
    await assertFails(updateDoc(doc(db, `users/${BOB}/sessions/s1`), { duration: 1 }))
    await assertFails(deleteDoc(doc(db, `users/${BOB}/sessions/s1`)))
  })
  test('cannot be read through a collection group query across all users', async () => {
    await assertFails(getDocs(collectionGroup(as(ALICE), 'sessions')))
  })
})

describe('the legacy stats/global total (read-only)', () => {
  // Mirrors the old browser code (lib/stats.ts updateGlobalStats, now removed),
  // which may still run in browsers that loaded the previous version.
  const addMinutes = (db: ReturnType<typeof as>, minutes: number) =>
    runTransaction(db, async (tx) => {
      const ref = doc(db, 'stats/global')
      const snap = await tx.get(ref)
      const current = snap.exists() ? snap.data().totalTrainingMinutes || 0 : 0
      tx.set(ref, { totalTrainingMinutes: Number(current) + minutes, lastUpdated: new Date() }, { merge: true })
    })

  test('can still be read by anyone (old browsers)', async () => {
    await assertSucceeds(getDoc(doc(anon(), 'stats/global')))
    await assertSucceeds(getDoc(doc(as(ALICE), 'stats/global')))
  })
  test('cannot be updated by a signed-in user, even by a normal session', async () => {
    await assertFails(addMinutes(as(ALICE), 60))
  })
  test('cannot be created if missing', async () => {
    await env.withSecurityRulesDisabled((ctx) => deleteDoc(doc(ctx.firestore(), 'stats/global')))
    await assertFails(addMinutes(as(ALICE), 60))
  })
  test('cannot be overwritten', async () => {
    await assertFails(setDoc(doc(as(ALICE), 'stats/global'), { totalTrainingMinutes: 1 }))
  })
  test('cannot be deleted', async () => {
    await assertFails(deleteDoc(doc(as(ALICE), 'stats/global')))
  })
})

describe('everything else', () => {
  test('is denied, even when signed in', async () => {
    const db = as(ALICE)
    await assertFails(getDoc(doc(db, 'posts/p1')))
    await assertFails(setDoc(doc(db, 'admin/settings'), { x: 1 }))
    await assertFails(setDoc(doc(db, 'stats/other'), { totalTrainingMinutes: 1 }))
  })
})
