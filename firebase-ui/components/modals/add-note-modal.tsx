"use client";

import { useAddNoteModalStore } from "@/hooks/add-note-store";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useAuthContext } from "@/contexts/auth-context";
import addNote from "@/firebase/firestore/add-new-note";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

type Props = {};

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

type FormType = z.infer<typeof formSchema>;

const AddNoteModal = (props: Props) => {
  const user = useAuthContext();
  const { isOpen, closeAddNoteModal } = useAddNoteModalStore();
  const [isClient, setIsClient] = useState(false);
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !user) {
    return null;
  }

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormType) => {
    try {
      await addNote(user.uid, data);
      form.reset();
      closeAddNoteModal();
      toast.success("Note added successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error adding note");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeAddNoteModal}>
      <DialogContent>
        <DialogTitle>Add new note</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md font-semibold">Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="border-orange-400"
                      placeholder="New title"
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
                  <FormLabel className="text-md font-semibold">
                    Content
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="border-orange-400"
                      placeholder="New content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={isLoading}>Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteModal;
