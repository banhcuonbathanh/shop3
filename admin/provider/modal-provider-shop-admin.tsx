"use client";

import { useEffect, useState } from "react";

import { StoreModalShopAdmin } from "@/components/modals/store-modal-shop-admin";
import { CoverImageModal } from "@/components/image-upload/cover-image-modal";
import { CustomChatModalShopAdmin } from "@/components/modals/custom-chat-modal-shop-admin";

export const ModalProviderShopAdmin = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CustomChatModalShopAdmin />
      <StoreModalShopAdmin />
      <CoverImageModal />
    </>
  );
};
