import { create } from "zustand";

interface useStoreModalStore {
  isOpenChatModal: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChatModal: () => void;
  onCloseChatModal: () => void;
  onClose: () => void;
}

export const useStoreModalShopAdmin = create<useStoreModalStore>((set) => ({
  isOpenChatModal: false,
  isOpen: false,
  onOpenChatModal: () => {
    console.log(" this is imside useStoreModalShopAdmin on open chat modal");
    set({ isOpenChatModal: true });
  },
  onCloseChatModal: () => {
    console.log(" this is imside useStoreModalShopAdmin on open");
    set({ isOpenChatModal: false });
  },
  onOpen: () => {
    console.log(" this is imside useStoreModalShopAdmin on open");
    set({ isOpen: true });
  },
  onClose: () => {
    console.log(" this is imside useStoreModalShopAdmin on close");
    set({ isOpen: false });
  }
}));
