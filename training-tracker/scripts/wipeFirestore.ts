import admin from "firebase-admin";
import fs from "fs";

// Load service account credentials
const serviceAccount = JSON.parse(fs.readFileSync("./scripts/firebase-service-account.json", "utf8"));

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// Function to delete all documents in a collection
async function deleteCollection(collectionPath: string) {
  const collectionRef = db.collection(collectionPath);
  const snapshot = await collectionRef.get();
  
  // Create an array of promises for all deletions
  const deletePromises = snapshot.docs.map(async (doc) => {
    await doc.ref.delete();
    console.log(`Deleted: ${collectionPath}/${doc.id}`);
  });
  
  // Wait for all deletions to complete
  await Promise.all(deletePromises);
}

async function deleteAllUsers() {
  // Get all users (Firebase limits to 1000 at a time)
  const listUsersResult = await admin.auth().listUsers();
  
  // Create an array of promises for all user deletions
  const deleteUserPromises = listUsersResult.users.map(async (userRecord) => {
    await admin.auth().deleteUser(userRecord.uid);
    console.log(`Deleted user: ${userRecord.uid}`);
  });
  
  // Wait for all deletions to complete
  await Promise.all(deleteUserPromises);
  console.log("All users deleted from Authentication!");
}

async function wipeDatabase() {
  // First delete all users from Authentication
  await deleteAllUsers();
  
  // Then delete all collections from Firestore
  await deleteCollection("users");
  await deleteCollection("posts");
  await deleteCollection("profiles");
  console.log("Firestore wiped!");
}

wipeDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error wiping Firestore:", error);
    process.exit(1);
  });
