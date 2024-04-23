"use client";

import { Product } from "@/types";
import { Button } from "../ui/button";
import { Modal } from "./original-modal";
import { usePreviewProductZustand } from "./use-preview-product-zustand";
import Gallery from "../product_detail/gallery";
import Info from "../product_detail/info";

export const PreviewProductModal = () => {
  // console.log("this is StoreModalShopAdmin");
  const previewProductZustand = usePreviewProductZustand();
  const product = previewProductZustand.product;

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories."
      isOpen={previewProductZustand.isOpen}
      onClose={() => {
        previewProductZustand.isOpen;
        previewProductZustand.onClose();
        previewProductZustand.isOpen;
      }}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <div className="px-4 py-10 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                {product && <Gallery images={product.imageUrls} />}

                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                  {product && <Info data={product} />}
                </div>
              </div>
              <hr className="my-10" />
              {/* <ProductListRelated items={product} /> */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
