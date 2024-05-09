"use client";

import React, { useState, useEffect, useRef } from "react";

import { Card, CardTitle, CardContent } from "./ui/card";
import { Note } from "@/types";
import { formatDate } from "@/lib/utils";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { DeleteNote, updateNote } from "@/firebase/firestore/note";
import { toast } from "sonner";
import { Trash } from "lucide-react";
import { useAlertModalStore } from "@/hooks/alert-modal-store";
import Image from "next/image";
import EditCardForm from "./edit-card-form";

type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  const { openAlertModal } = useAlertModalStore();
  const [edit, setEdit] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardRef.current &&
        !(cardRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setEdit(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {edit ? (
        <EditCardForm cardRef={cardRef} note={note} setEdit={setEdit} />
      ) : (
        <Card
          ref={cardRef}
          className="relative flex min-h-[300px] flex-col gap-y-4 border-orange-500 pt-8"
          onClick={() => setEdit(!edit)}
        >
          <CardTitle className="mx-4">{note.title}</CardTitle>
          <CardContent className="flex h-full flex-col justify-between gap-y-2 pb-2">
            <div className="relative flex flex-col">
              <p>{note.content}</p>
            </div>
            <div>
              <Image
                src={note.image}
                alt={note.title}
                width={200}
                height={200}
                className="h-36 w-auto rounded-md"
              />
            </div>
            {note?.createdAt?.seconds && (
              <div className="flex h-full items-end justify-end">
                <p className="text-xs italic">
                  {formatDate(note.createdAt.seconds)}
                </p>
              </div>
            )}
          </CardContent>
          <Button
            className="absolute right-2 top-2"
            variant={`destructive`}
            size={`sm`}
            onClick={(e) => {
              e.stopPropagation();
              openAlertModal(note.id);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </Card>
      )}
    </>
  );
};

export default NoteCard;
