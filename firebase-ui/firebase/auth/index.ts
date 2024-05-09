import {
  signInWithEmailAndPassword,
  UserCredential,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FormType as LoginSchema } from "@/app/auth/login/login-form";
import { FormType as RegisterSchema } from "@/app/auth/register/register-form";
import { auth } from "../client-app";

async function signUp(data: RegisterSchema) {
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

async function SignInWithGoogle(){
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
}

async function signIn(data: LoginSchema) {
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

function SignOut() {
  try {
    signOut(auth);
  } catch (error) {
    console.log(error);
  }
}

export { signUp, signIn, SignOut, SignInWithGoogle };
