"use client";
import { useAlertModalStore } from "@/hooks/alert-modal-store";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DeleteNote } from "@/firebase/firestore/note";
import { toast } from "sonner";

type Props = {};

const AlertModal = (props: Props) => {
  const { isOpen, closeAlertModal, noteId } = useAlertModalStore();

  const onDelete = async () => {
    try {
      await DeleteNote(noteId);
      toast.success("Note deleted successfully");
      closeAlertModal();
    } catch (error) {
      toast.error("Error deleting note");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeAlertModal}>
      <DialogContent>
        <DialogTitle>Are you sure you want to delete this note?</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <div className="flex items-center justify-between gap-x-4">
          <Button className="w-1/4" onClick={closeAlertModal}>
            Cancel
          </Button>
          <Button className="w-1/4" onClick={onDelete} variant={`destructive`}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AlertModal;
