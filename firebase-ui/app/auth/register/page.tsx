"use client"

import React from "react";
import RegisterForm from "./register-form";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

type Props = {};

const Register = (props: Props) => {
  const user = useAuthContext();
  const router = useRouter()

  if (user) {
    return router.push("/");
  }

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default Register;
