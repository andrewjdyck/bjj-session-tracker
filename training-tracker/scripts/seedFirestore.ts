import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

async function seedDatabase() {
  await addDoc(collection(db, "users"), {
    name: "John Doe",
    email: "johndoe@example.com",
    createdAt: new Date(),
  });

  await addDoc(collection(db, "users"), {
    name: "Jane Smith",
    email: "janesmith@example.com",
    createdAt: new Date(),
  });

  console.log("Database seeded.");
}

seedDatabase();