import { BlogSubDes, OrderItem, Product } from "@/types";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import toast from "react-hot-toast";
import { linkCustomer } from "@/lib/config";

type BlogStore = {
  blogCategoryTitle: string;

  blogSubDes: BlogSubDes[];
  acceptedFilesBlog: File[];
  reset: (callback: Function) => void;
  setAcceptedFiles: (files: File[]) => void;
  addBlogSubDes1: (newBlogSubDes: BlogSubDes) => void;

  upload_picture_blog: (
    category: string,
    title: string,
    acceptedFiles: File[],
    serverLink: String
  ) => Promise<string[]>;
};

export const useBlogStorePersist = create<BlogStore>()(
  persist<BlogStore>(
    (set, get) => ({
      blogCategoryTitle: "",
      blogSubDes: [],
      acceptedFilesBlog: [],
      setAcceptedFiles: (files) => set({ acceptedFilesBlog: files }),
      // initialAddOrderItem: (neworderitem: OrderItem[]) => {
      //   set((state: ShopStore) => ({
      //     currentOrderItem: [...neworderitem]
      //   }));
      // },

      reset: (callback: Function) => {
        set((state: BlogStore) => {
          return {
            blogSubDes: []
          };
        });

        callback();
      },

      addBlogSubDes1: (newBlogSubDes: BlogSubDes) => {
        set((state: BlogStore) => {
          return {
            blogSubDes: [...state.blogSubDes, newBlogSubDes]
          };
        });
      },

      addBlogCategory: (categoryTittle: string) => {
        set((state: BlogStore) => {
          return {
            blogCategoryTitle: categoryTittle
          };
        });
      },

      upload_picture_blog: async (
        category: string,
        productName: string,
        acceptedFiles: File[],
        serverLink: String
      ): Promise<string[]> => {
        const uploadedUrls: string[] = [];

        try {
          for (let index = 0; index < acceptedFiles.length; index++) {
            const file = acceptedFiles[index];

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

            const data = serverLink + response.data.url; // Access serverLink from state

            console.log(data);
            uploadedUrls.push(data);
          }

          // Clear the acceptedFiles array
          set({ acceptedFilesBlog: [] });

          return uploadedUrls;
        } catch (error) {
          console.error("File upload error:", error);
          return [];
        }
      }
    }),
    {
      name: "shop store",
      skipHydration: true
    }
  )
);
