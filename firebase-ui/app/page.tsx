"use client";

import NoteCard from "@/components/note-card";
import { useAuthContext } from "@/contexts/auth-context";
import { useNoteContext } from "@/contexts/note-context";
import { useRouter } from "next/navigation";

export default function Home() {
  const user = useAuthContext();
  const notes = useNoteContext();
  const router = useRouter();

  if (!user) router.push("/auth/login");

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-8 px-12 py-12 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </div>
    </>
  );
}
