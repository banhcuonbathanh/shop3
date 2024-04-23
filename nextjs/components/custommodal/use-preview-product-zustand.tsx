import { Product } from "@/types";
import { create } from "zustand";

interface usePreviewProductProps {
  isOpen: boolean;
  product: Product | null; // Explicitly set product to null for clarity
  onOpen: () => void;
  onClose: () => void;
  setProduct: (product: Product) => void; // Add setProduct function
}

export const usePreviewProductZustand = create<usePreviewProductProps>(
  (set) => ({
    product: null,
    isOpen: false,
    onOpen: () => {
      console.log(" this is inside useStoreModalShopAdmin on open");
      set({ isOpen: true });
    },
    onClose: () => {
      console.log(" this is inside useStoreModalShopAdmin on close");
      set({ isOpen: false });
    },
    setProduct: (product: Product) => {
      set({ product }); // Concisely update product state
    }
  })
);
