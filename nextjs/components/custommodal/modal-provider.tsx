"use client";

import { useEffect, useState } from "react";
import { PreviewProductModal } from "./preview-product-modal";

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
      <PreviewProductModal />
    </>
  );
};
