import React from "react";
import { Card, CardTitle, CardContent } from "./ui/card";
import { Note } from "@/types";
import { formatDate } from "@/lib/utils";

type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  return (
    <Card className="flex flex-col gap-y-4 border-orange-500 pt-8">
      <CardTitle className="mx-4">{note.title}</CardTitle>
      <CardContent className="flex h-full flex-col justify-between gap-y-2 pb-2">
        <div className="">
          <p>{note.content}</p>
        </div>
        {note?.createdAt?.seconds && (
          <div className="flex h-full items-end justify-end">
            <p className="text-xs italic">
              {formatDate(note.createdAt.seconds)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;
