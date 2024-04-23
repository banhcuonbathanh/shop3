import { create } from "zustand";

import { Product } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: Product;
  onOpen: (data: Product) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Product) => {
    console.log("Opening modal with data:", data); // Add this line
    set({ isOpen: true, data });
  },
  onClose: () => {
    console.log("Closing modal"); // Add this line
    set({ isOpen: false });
  }
}));

export default usePreviewModal;
