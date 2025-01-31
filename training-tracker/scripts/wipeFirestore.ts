import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteCollection(collectionPath: string) {
  const querySnapshot = await getDocs(collection(db, collectionPath));
  querySnapshot.forEach(async (document) => {
    await deleteDoc(doc(db, collectionPath, document.id));
    console.log(`Deleted: ${collectionPath}/${document.id}`);
  });
}

async function wipeDatabase() {
  await deleteCollection("users");
  await deleteCollection("posts");
}

wipeDatabase().then(() => console.log("Database wiped."));