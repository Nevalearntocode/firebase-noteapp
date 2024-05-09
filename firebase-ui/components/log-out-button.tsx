"use client";

import React from "react";
import { Button } from "./ui/button";
import { SignOut } from "@/firebase/auth";

type Props = {};

const LogOutButton = (props: Props) => {
  const onSignOut = () => {
    SignOut();
  };

  return <Button onClick={onSignOut}>Log Out</Button>;
};

export default LogOutButton;
