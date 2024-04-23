import axios from "axios";
// import link from "next/link";
import { create } from "zustand";

import { linkCustomer } from "@/lib/config";
interface UploadStore {
  acceptedFiles: File[];
  setAcceptedFiles: (files: File[]) => void;

  upload_picture: (
    category: string,
    title: string,
    acceptedFiles: File[],
    serverLink: String
  ) => Promise<string[]>; // Specify the types of 'title' and 'acceptedFiles'
}

export const useUploadStore = create<UploadStore>((set) => ({
  acceptedFiles: [],
  setAcceptedFiles: (files) => set({ acceptedFiles: files }),

  upload_picture: async (
    category: string,
    productName: string,
    acceptedFiles: File[]
    // serverLink: String
  ): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    try {
      for (let index = 0; index < acceptedFiles.length; index++) {
        const file = acceptedFiles[index];
        console.log(
          "admin/components/use-hook-shop-admin/use-upload-image.ts file",
          file
        );

        console.log(
          "admin/components/use-hook-shop-admin/use-upload-image.ts link",
          linkCustomer.golang_Base + linkCustomer.routes_image.uploadImage
        );
        const formData = new FormData();
        formData.append("file", file);
        formData.append("productName", productName); // Add the billboard field
        formData.append("category", category);
        const response = await axios.post(
          linkCustomer.golang_Base + linkCustomer.routes_image.uploadImage,
          // "http://localhost:8888/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        console.log(
          `File ${index + 1} uploaded successfully:`,
          response.data.url
        );

        const data = response.data.url; // Access serverLink from state
        console.log("alskjdflaskjdfl data trong upload file link");
        console.log(data);
        uploadedUrls.push(data);
      }

      // Clear the acceptedFiles array
      set({ acceptedFiles: [] });

      return uploadedUrls;
    } catch (error) {
      console.error("File upload error:", error);
      return [];
    }
  }
}));
