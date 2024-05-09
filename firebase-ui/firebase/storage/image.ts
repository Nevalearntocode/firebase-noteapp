import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../client-app";

export async function UploadImage(noteId: string, image: File) {
  const filePath = `images/${noteId}/${image.name}`;
  const newImageRef = ref(storage, filePath);

  await uploadBytesResumable(newImageRef, image);

  return await getDownloadURL(newImageRef);
}
