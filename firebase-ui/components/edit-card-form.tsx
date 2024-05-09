"use client";

import React from "react";
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
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Note } from "@/types";
import { updateNote } from "@/firebase/firestore/note";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { formSchema } from "./modals/add-note-modal";
import ImageUpload from "./image-upload";

type Props = {
  note: Note;
  cardRef: React.RefObject<HTMLDivElement>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormType = z.infer<typeof formSchema>;

const EditCardForm = ({ note, cardRef, setEdit }: Props) => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
      image: note.image,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormType) => {
    try {
      await updateNote(note.id, data);
      setEdit(false);
      toast.success("Note updated successfully");
    } catch (error) {
      toast.error("Error updating note");
    }
  };

  return (
    <Card
      ref={cardRef}
      className="flex min-h-[300px] flex-col gap-y-4 border-orange-500 pt-8"
    >
      <CardContent className="flex h-full flex-col justify-between gap-y-2 pb-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full flex-col gap-y-2 pb-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="text-lg font-bold"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea disabled={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUpload
                      onChange={field.onChange}
                      onRemove={() => field.onChange("")}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="ml-auto mt-auto flex w-1/4">
              Save
            </Button>
          </form>
        </Form>{" "}
      </CardContent>
    </Card>
  );
};

export default EditCardForm;
