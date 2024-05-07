import { create } from "zustand";

type AddNoteModalState = {
  isOpen: boolean;
  openAddNoteModal: () => void;
  closeAddNoteModal: () => void;
};

export const useAddNoteModalStore = create<AddNoteModalState>((set) => ({
  isOpen: false,
  openAddNoteModal: () => set({ isOpen: true }),
  closeAddNoteModal: () => set({ isOpen: false }),
}));
