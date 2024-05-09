"use client";

import { Note } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./auth-context";
import { getNotes } from "@/firebase/firestore/note";

export const NoteContext = createContext<Note[]>([]);

type NoteContextProviderProps = {
  children: React.ReactNode;
};

export const NoteContextProvider = ({ children }: NoteContextProviderProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const user = useAuthContext();

  useEffect(() => {
    let unsubscribe: () => void

    if (user) {
      const fetchNotes = async () => {
        unsubscribe = getNotes(user.uid, (notes) => {
          setNotes(notes);
        });
      };
      fetchNotes();
    } else {
      setNotes([]);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

  return <NoteContext.Provider value={notes}>{children}</NoteContext.Provider>;
};

export const useNoteContext = () => useContext(NoteContext);
