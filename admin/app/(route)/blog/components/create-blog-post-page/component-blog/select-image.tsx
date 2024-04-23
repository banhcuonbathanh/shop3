"use client";

import React, { useState } from "react";
import Image from "next/image";
interface ImageChangeHandler {
  (newFile: File | null): void; // Updated type to handle null values
}
export const BlogImage = ({
  onImageChange
}: {
  onImageChange: ImageChangeHandler;
}) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      console.warn("No file selected.");
      return;
    }

    setFile(selectedFile);
    onImageChange(selectedFile); // Pass the selected File directly

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => setImageUrl(reader.result as string);
  };

  return (
    <div className="flex gap-20  w-full left-20 border p-6 my-10">
      <input
        type="file"
        id="image"
        //   onChange={handleFileChange}

        onChange={handleFileChange}
        className="hidden"
      />
      <button>
        <label htmlFor="image">Choose image title</label>
      </button>
    </div>
  );
};

{
  /* <button className="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center cursor-pointer">
            <Image src="/black.jpg" alt="" width={16} height={16} />
          </button> */
}
{
  /* <button className="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center cursor-pointer">
            <Image src="/logo.svg" alt="" width={16} height={16} />
          </button> */
}
