"use client";

import { useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";


import { useCoverImage } from "./use-cover-image";
import { SingleImageDropzone } from "./single-image-dropzone";

export const CoverImageModal = () => {
  const coverImage = useCoverImage();

  const [file, setFile] = useState<File>();

  const onClose = () => {
    setFile(undefined);

    coverImage.onClose();
  };

  // const onChange = async (file?: File) => {
  //   console.log(" this is inside CoverImageModal on change");
  //   if (file) {
  //     console.log(" this is inside if checki file is valivabe");
  //     console.log(file);

  //     setFile(file);

  //     // onClose();
  //   }
  // };
  // test upload file

  const onChange = async (file?: File) => {
    console.log("this is inside CoverImageModal on change");

    if (file) {
      console.log("this is inside if check file is valid");
      console.log(file);

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);

      // Send a POST request to the server using Axios
      try {
        const response = await axios.post(
          "http://localhost:8888/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );

        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
  };

  // ends
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            Cover Image sdfs
          </h2>
        </DialogHeader>

        <SingleImageDropzone
          className="w-full outline-none"
          // disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
        <button
          onClick={() => {
            setFile(undefined);
          }}
        >
          delete picture
        </button>
      </DialogContent>
    </Dialog>
  );
};
