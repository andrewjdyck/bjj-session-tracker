import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load service account credentials
const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, 'firebase-service-account.json'), 'utf8')
);

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();
const db = admin.firestore();

async function createOrGetUser(email: string, password: string, name: string) {
  try {
    // Check if user already exists
    const existingUser = await auth.getUserByEmail(email);
    console.log(`User ${email} already exists:`, existingUser.uid);
    return existingUser.uid;
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      // User doesn't exist, so create them
      const newUser = await auth.createUser({
        email,
        password,
        displayName: name,
      });
      console.log(`Created user: ${email}`);
      return newUser.uid;
    } else {
      throw error;
    }
  }
}

async function seedDatabase() {
  try {
    const user1UID = await createOrGetUser("johndoe@example.com", "testpass", "John Doe");
    const user2UID = await createOrGetUser("janedoe@example.com", "testpass", "Jane Doe");

    // Store user profile in Firestore
    await db.collection("users").doc(user1UID).set({
      name: "John Doe",
      email: "johndoe@example.com",
      role: "admin",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await db.collection("users").doc(user2UID).set({
      name: "Jane Smith",
      email: "janedoe@example.com",
      role: "user",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Firestore seeded with test users.");
  } catch (error) {
    console.error("Error seeding Firestore:", error);
  }
}

seedDatabase().then(() => process.exit(0));
