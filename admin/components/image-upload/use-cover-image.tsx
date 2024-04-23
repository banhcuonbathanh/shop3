import { create } from "zustand";

type CoverImageStore = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReplace: (url: string) => void;
};

export const useCoverImage = create<CoverImageStore>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: () => {
    console.log(" this is CoverImageStore onOpen");

    set({ isOpen: true, url: undefined });
  },
  onClose: () => {
    console.log(" this is CoverImageStore onClose");
    set({ isOpen: false, url: undefined });
  },
  onReplace: (url: string) => {
    console.log(" this is CoverImageStore onReplace");
    set({ isOpen: true, url });
  }
}));
