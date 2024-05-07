"use client";

import { Note } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./auth-context";
import getNotes from "@/firebase/firestore/get-notes";

export const NoteContext = createContext<Note[]>([]);

type NoteContextProviderProps = {
  children: React.ReactNode;
};

export const NoteContextProvider = ({ children }: NoteContextProviderProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const user = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        const unsubscribe = getNotes(user.uid, (notes) => {
          setNotes(notes);
        })

        return unsubscribe
      };

      fetchNotes();
    }
  }, [user]);

  return <NoteContext.Provider value={notes}>{children}</NoteContext.Provider>;
};

export const useNoteContext = () => useContext(NoteContext);
