import { signOut } from "firebase/auth";
import { auth } from "../client-app";
export default function SignOut() {
  try {
    signOut(auth);
  } catch (error) {
    console.log(error);
  }
}
