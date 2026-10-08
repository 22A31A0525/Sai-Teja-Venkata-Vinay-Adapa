import { validateContact } from "./contact-validation.js";

let databasePromise;
async function getDatabase() {
  if (!databasePromise) {
    databasePromise = Promise.all([import("firebase/app"), import("firebase/firestore")]).then(([app, firestore]) => {
      const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD3GEnkQyjpLZBB1xU3R7DaxkH28E_bbic",
        authDomain: "my-portfolio-105c9.firebaseapp.com",
        projectId: "my-portfolio-105c9",
        appId: "1:1062053970531:web:ed61a92697c97467b6ae56",
      };
      const instance = app.getApps().find((item) => item.name === "portfolio-contact") || app.initializeApp(config, "portfolio-contact");
      return { db: firestore.getFirestore(instance), firestore };
    }).catch((error) => { databasePromise = undefined; throw error; });
  }
  return databasePromise;
}

export async function submitContact(input) {
  const validated = validateContact(input);
  if (!validated.valid) throw new Error("Invalid contact data");
  const { db, firestore } = await getDatabase();
  await firestore.addDoc(firestore.collection(db, "contacts"), {
    ...validated.data, submittedAt: firestore.serverTimestamp(),
  });
}
