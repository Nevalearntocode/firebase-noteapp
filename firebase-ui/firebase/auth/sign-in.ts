import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { FormType as LoginSchema } from "@/app/auth/login/login-form";
import { auth } from "../client-app";

export default async function SignIn(data: LoginSchema) {
  const { email, password } = data;
  let result: UserCredential | null = null,
    error: any = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
