import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth"; // Importing the createUserWithEmailAndPassword and getAuth functions from the firebase/auth module
import { FormType as RegisterSchema } from "@/app/auth/register/register-form";
import { auth } from "../client-app";

export default async function signUp(data: RegisterSchema) {
  const { email, password, password2 } = data;
  let result: UserCredential | null = null,
    error: any = null;
  if (password !== password2) {
    return {
      result: null,
      error: new Error("Passwords do not match"),
    };
  }
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
