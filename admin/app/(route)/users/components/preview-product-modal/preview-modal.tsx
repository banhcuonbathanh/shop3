"use client";

import { Product } from "@/types";

import { Modal } from "@/components/ui/modal";
import usePreviewModal from "./use-preview-modal";
import Gallery from "./gallery";
import Info from "./info";

const PreviewModal = () => {
  const previewModal = usePreviewModal();
  // const product = usePreviewModal((state) => state.data);
  const product: Product = {
    id: 1,
    category: {
      id: 23,
      name: "test234"
    },
    name: "Smartphone",
    price: 499.99,
    isFeatured: true,
    size: {
      id: 5,
      name: "test111",
      value: "test111",
      createdAt: "2023-10-19 08:12:33"
    },
    color: {
      id: 3,
      name: "sdsdfasdf",
      value: "#00FF00",
      createdAt: "2023-10-20 03:46:10"
    },
    imageUrls: ["http://localhost:8888/uploads/Your Title/home_bil_noard.png"],
    isArchived: false,
    createdAt: "2023-10-25 07:41:26",
    discount: 0
  };

  if (!product) {
    return null;
  }

  return (
    <Modal
      isOpen={previewModal.isOpen}
      // onClose={previewModal.onClose}

      onClose={() => {
        previewModal.onClose();
      }}
      title={""}
      description={""}
    >
      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <div className="sm:col-span-4 lg:col-span-5">
          <Gallery images={"/black.jpg"} />
        </div>
        <div className="sm:col-span-8 lg:col-span-7">
          <Info data={product} />
        </div>
      </div>
    </Modal>
  );
};

export default PreviewModal;
