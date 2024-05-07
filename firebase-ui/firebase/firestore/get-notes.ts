import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../client-app";
import { Note } from "@/types";

export default function getNotes(
  uid: string,
  observer: (notes: Note[]) => void,
) {
  try {
    const notesRef = collection(db, `notes`);
    const q = query(notesRef, where("uid", "==", uid));

    // Use onSnapshot for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notes: Note[] = [];
      querySnapshot.forEach((doc) => {
        notes.push(doc.data() as Note); // Include document ID
      });
      observer(notes); // Call the observer function with updated notes
    });

    // Return the unsubscribe function to stop listening for updates
    return unsubscribe;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
}
