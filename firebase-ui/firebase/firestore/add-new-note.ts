import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../client-app";

export default async function addNote(
  uid: string,
  data: { title: string; content: string },
) {
  try {
    const noteRef = doc(collection(db, `notes`));

    await setDoc(noteRef, {
      uid,
      ...data,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}
