"use client";

import React from "react";
import LoginForm from "./login-form";
import { useAuthContext } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const user = useAuthContext();
  const router = useRouter();

  if (user) {
    return router.push("/");
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default Login;
