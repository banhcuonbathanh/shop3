import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@nextui-org/react";
import Image from "next/image";
import { useBlogStorePersist } from "../../../blog-controller/zusstand";
import ImageUploadZoneBlog from "../../../components/create-blog-post-page/component-blog/image_upload_zone_blog";
import { BlogImage } from "../../../components/create-blog-post-page/component-blog/select-image";

const BlogSubDesForm = () => {
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

  console.log(
    "admin/app/(route)/blog/subdes/[subdesId]/components/blog-sub-des-form.tsx blogSubDes",
    blogSubDes
  );
  const onDrop = (newAcceptedFiles: File[]) => {
    // Handle duplicate files or any other logic as needed
    setAcceptedFiles([...acceptedFilesBlog, ...newAcceptedFiles]);

    fileToImage(newAcceptedFiles[0]);
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

  const [value, setValue] = React.useState("");
  // new test of image blog image

  const [imageBlogFile, setImageBlogFile] = useState<File>();
  const [imageBlogUrl, setImageUrl] = useState<string | null>(null);
  const chooseImageBlog = (selectedFile: File | null) => {
    // Handle potential null values and errors

    if (selectedFile) {
      // Further actions with the selected file
      setImageBlogFile(selectedFile); // Optionally store in state for later use

      const reader = new FileReader();

      // Robust error handling for potential exceptions during reading
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        // Handle errors appropriately (e.g., display an error message to the user)
      };

      reader.onloadend = () => {
        if (reader.result) {
          setImageUrl(reader.result as string);
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
  return (
    <div className="flex flex-col border p-6">
      <div className="w-full flex flex-col gap-2 max-w-[240px]">
        <Textarea
          variant="underlined"
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          value={value}
          onValueChange={setValue}
        />
        <p className="text-default-500 text-small">Textarea value: {value}</p>
      </div>

      {/* <select
        className="py-2 px-4"
        onChange={handleCategoryChange}
        value={style} // Set the initial selected value
      >
        {categoriesData.map((category) => {
          return (
            <option key={category.ID} value={category.style}>
              {category.style}
            </option>
          );
        })}
      </select> */}
      {/* <div>
        
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
      </div> */}

      {/* <BlogImage onImageChange={chooseImageBlog} /> */}

      <ImageUploadZoneBlog
        acceptedFiles={acceptedFilesBlog}
        onDrop={onDrop}
        onRemove={onremove}
      />

      <div>
        {blogSubDes.length > 0 && (
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
        )}
      </div>
      <Button
        onClick={async () => {
          console.log(
            "admin/app/(route)/blog/subdes/[subdesId]/components/blog-sub-des-form.tsx, imageUrl1",
            imageUrl1
          );
          const newBlogSubDes = {
            Title: value, // Replace with desired title
            Desc: value, // Replace with desired description
            ImageUrls: imageUrl1,
            File: acceptedFilesBlog[0]
          };

          addBlogSubDes1(newBlogSubDes);

          setValue("");

          onremove(0);
        }}
        variant={"secondary"}
      >
        Add New Sub Des
      </Button>
    </div>
  );
};

export default BlogSubDesForm;
