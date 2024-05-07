"use client";

import React from "react";
import LogOutButton from "./log-out-button";
import { useAuthContext } from "@/contexts/auth-context";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useAddNoteModalStore } from "@/hooks/add-note-store";

type Props = {};

const Navbar = (props: Props) => {
  const user = useAuthContext();
  const { openAddNoteModal } = useAddNoteModalStore();

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-24 items-center justify-between border-b-2 border-b-orange-500 bg-gradient-to-br from-orange-400 to-orange-200 px-24">
      <div className="flex items-center space-x-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-white">Note App</h1>
      </div>
      <div className="flex items-center gap-x-4">
        <Button onClick={openAddNoteModal}>
          <Plus />
        </Button>
        <LogOutButton />
      </div>
    </div>
  );
};

export default Navbar;
