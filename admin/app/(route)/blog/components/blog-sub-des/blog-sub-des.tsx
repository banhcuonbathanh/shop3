import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";

import { Button } from "@/components/ui/button";
import { useBlogStorePersist } from "../../blog-controller/zusstand";

import ImageUploadZoneBlog from "../create-blog-post-page/component-blog/image_upload_zone_blog";

import Image from "next/image";

const BlogSubDes = () => {
  // const { acceptedFiles, setAcceptedFiles, upload_picture } = useUploadStore();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl1, setImageUrl1] = useState<string>("");
  const fileToImage = (selectedFile: File | null) => {
    // Handle potential null values and errors
    console.log("Selected file:", selectedFile);

    if (selectedFile) {
      // Further actions with the selected file
      setFile(selectedFile); // Optionally store in state for later use

      const reader = new FileReader();

      // Robust error handling for potential exceptions during reading
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        // Handle errors appropriately (e.g., display an error message to the user)
      };

      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl1(reader.result as string);
        } else {
          console.error("Error reading file: No result obtained.");
          // Handle empty result appropriately
        }
      };

      reader.readAsDataURL(selectedFile);
    } else {
      // Handle the case where no file is selected (e.g., display a message)
      console.log("No file selected.");
    }
  };

  const {
    addBlogSubDes1,
    blogSubDes,
    acceptedFilesBlog,
    setAcceptedFiles,
    upload_picture_blog
  } = useBlogStorePersist();
  const onDrop = (newAcceptedFiles: File[]) => {
    // Handle duplicate files or any other logic as needed
    setAcceptedFiles([...acceptedFilesBlog, ...newAcceptedFiles]);
  };

  const onremove = (index: number) => {
    // Implement logic to remove the image at the specified index
    const updatedFiles = [...acceptedFilesBlog];
    updatedFiles.splice(index, 1); // Remove the image at the given index
    setAcceptedFiles(updatedFiles); // Update the state with the modified array
  };

  useEffect(() => {
    // useBlogStorePersist.persist.rehydrate();
  }, [blogSubDes]); // Use the spread operator
  const [style, setstyle] = useState<string>("");
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Set the selected category slug
    setstyle(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <select
        className="py-2 px-4"
        onChange={handleCategoryChange}
        value={style} // Set the initial selected value
      ></select>
      <div>
        {blogSubDes.map((blog) => (
          <div className="border" key={blog.Title}>
            {blog.File && (
              <Image
                src={URL.createObjectURL(blog.File)}
                width={150}
                height={150}
                alt={"blog.file.name"}
              />
            )}

            <p key={blog.Title}> {blog.Title}</p>
          </div>
        ))}
      </div>

      <ReactQuill theme="snow" value={title} onChange={setTitle} />
      {title}

      <ImageUploadZoneBlog
        acceptedFiles={acceptedFilesBlog}
        onDrop={onDrop}
        onRemove={onremove}
      />

      <Button
        onClick={async () => {
          const reader = new FileReader();
          setImageUrl1(reader.result as string);
          const newBlogSubDes = {
            Title: title, // Replace with desired title
            Desc: title, // Replace with desired description
            ImageUrls: imageUrl1,
            File: acceptedFilesBlog[0]
          };

          addBlogSubDes1(newBlogSubDes);
        }}
        variant={"secondary"}
      >
        Add New Sub Des
      </Button>
    </div>
  );
};

export default BlogSubDes;
