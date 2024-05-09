import { create } from "zustand";

type AlertModalState = {
  noteId: string;
  isOpen: boolean;
  openAlertModal: (noteId: string) => void;
  closeAlertModal: () => void;
};

export const useAlertModalStore = create<AlertModalState>((set) => ({
  noteId: "",
  isOpen: false,
  openAlertModal: (noteId: string) => set({ isOpen: true, noteId }),
  closeAlertModal: () => set({ isOpen: false }),
}));
