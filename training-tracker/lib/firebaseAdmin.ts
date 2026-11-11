import 'server-only'
import { readFileSync } from 'fs'
import { App, cert, getApps, initializeApp, ServiceAccount } from 'firebase-admin/app'

// Firebase Admin SDK for server code (API routes). Bypasses security rules,
// so never import this from client components.
//
// Credentials, in order:
//   FIREBASE_SERVICE_ACCOUNT       the service account JSON itself (Vercel, sensitive env var)
//   FIREBASE_SERVICE_ACCOUNT_FILE  path to the JSON file (local dev, e.g. scripts/firebase-service-account.json)

type ServiceAccountJson = ServiceAccount & { project_id?: string }

function loadServiceAccount(): ServiceAccountJson {
  const json = process.env.FIREBASE_SERVICE_ACCOUNT
  if (json) return JSON.parse(json)
  const file = process.env.FIREBASE_SERVICE_ACCOUNT_FILE
  if (file) return JSON.parse(readFileSync(file, 'utf8'))
  throw new Error(
    'Firebase Admin credentials missing: set FIREBASE_SERVICE_ACCOUNT (JSON) or FIREBASE_SERVICE_ACCOUNT_FILE (path).'
  )
}

export function adminApp(): App {
  const existing = getApps()[0]
  if (existing) return existing

  const serviceAccount = loadServiceAccount()
  // Guard against e.g. a dev key on a prod deploy: the server must talk to the
  // same project as the browser.
  const expected = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  if (expected && serviceAccount.project_id !== expected) {
    throw new Error(
      `Service account is for project "${serviceAccount.project_id}" but NEXT_PUBLIC_FIREBASE_PROJECT_ID is "${expected}".`
    )
  }
  return initializeApp({ credential: cert(serviceAccount) })
}
