import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../client-app";
import { Note } from "@/types";
import { FormType as NoteType } from "@/components/modals/add-note-modal";
import { UploadImage } from "../storage/image";

async function addNote(uid: string, data: NoteType) {
  try {
    const noteRef = doc(collection(db, `notes`));
    const imageUrl = await UploadImage(noteRef.id, data.image);

    await setDoc(noteRef, {
      uid,
      ...data,
      image: imageUrl,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
}

async function updateNote(
  id: string,
  data: NoteType,
) {
  try {
    const noteRef = doc(db, `notes/${id}`);
    const image = await UploadImage(id, data.image);

    await setDoc(noteRef, {...data, image}, { merge: true });
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
}

async function DeleteNote (id: string){
  try {
    const noteRef = doc(db, `notes/${id}`)
    await deleteDoc(noteRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
}

function getNotes(uid: string, cb: (notes: Note[]) => void) {
  try {
    const notesRef = collection(db, `notes`);
    const q = query(
      notesRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
    );

    // Use onSnapshot for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notes = querySnapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        } as Note;
      })
      cb(notes);
    });

    // Return the unsubscribe function to stop listening for updates
    return unsubscribe;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
}

export { addNote, getNotes, updateNote, DeleteNote };
