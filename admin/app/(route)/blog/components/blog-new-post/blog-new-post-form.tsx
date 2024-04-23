import React, { useState } from "react";

import Image from "next/image";

import { BlogImage } from "../create-blog-post-page/component-blog/select-image";
import { BlogCategoryPages } from "../create-blog-post-page/component-blog/select-option";
import BlogSubDes from "../blog-sub-des/blog-sub-des";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  createBlogPost,
  createSubDesList1
} from "../../blog-controller/controller";
import { useBlogStorePersist } from "../../blog-controller/zusstand";
import { BlogSubDesGolang } from "@/types";
import { validateAndCreateBlogPost } from "./function-blog-new-post";
import { linkCustomer } from "@/lib/config";
import { InputText } from "../create-blog-post-page/component-blog/inputtext";
import BlogPresent from "./blog-present/blog-present";
type CategoryChangeHandler = (category: { id: number; title: string }) => void;
const BlogNewPostFrom = (userID: number, userEmail: string) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [imageBlogFile, setImageBlogFile] = useState<File>();
  const [imageBlogUrl, setImageUrl] = useState<string | null>(null);
  const [blogCategory, setBlogCategory] = useState("");
  const [blogCategoryID, setBlogCategoryID] = useState(0);
  const [error, setError] = useState("");
  const handleBlogCategoryChange: CategoryChangeHandler = (category) => {
    setBlogCategory(category.title);

    setBlogCategoryID(category.id);
  };
  const handleBlogTitleChange = (newTitle: string) => {
    setError("");

    const result: string = newTitle.replace(/<\/?p>/g, "");
    setBlogTitle(result);
  };
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

  const { blogSubDes, blogCategoryTitle, upload_picture_blog } =
    useBlogStorePersist();

  return (
    <>
      <Heading
        title={`Create Blog Post`}
        description="Manage products for your store"
      />
      <InputText
        onChange={handleBlogTitleChange}
        labeltextarea={" blog title"}
        description={"input title blog"}
      />

      <BlogImage onImageChange={chooseImageBlog} />

      <BlogCategoryPages onBlogCategoryChange={handleBlogCategoryChange} />

      {error !== "" && (
        <p className="text-center text-red-600 font-bold text-xl">{error}</p>
      )}

      <BlogPresent title={blogTitle} imageBlogUrl={imageBlogUrl} />

      <Button
        onClick={async () => {
          // ------------------
          const postresult = await validateAndCreateBlogPost(
            blogTitle,
            blogCategory,
            userEmail,
            userID,
            imageBlogFile,
            blogCategoryID,
            setError,
            upload_picture_blog
          );
          // ---------------
          var blogSubDesGolang: BlogSubDesGolang[] = [];

          console.log(
            "3.admin_cloth_nextjs13/app/shop_admin/(dashboard)/(route)/blog/components/blog-new-post/blog-new-post-form.tsx blogSubDes.length",
            blogSubDes.length
          );

          let promises = blogSubDes.map(async (originalItem) => {
            const imageUploadResponse = await upload_picture_blog(
              "Blog-sub-des",
              originalItem.Title,
              [originalItem.File],
              linkCustomer.golang_Base
            );
            let testL1212: string;
            testL1212 = imageUploadResponse[0];

            let test: BlogSubDesGolang = {
              BlogPostID: postresult.ID, // Assuming Title is unique for BlogPostID (be cautious about this assumption)
              Title: originalItem.Title,
              Desc: originalItem.Desc,
              ImageUrls: testL1212
            };

            console.log(
              "3.admin_cloth_nextjs13/app/shop_admin/(dashboard)/(route)/blog/components/blog-new-post/blog-new-post-form.tsx       test",
              test
            );
            blogSubDesGolang.push(test);
          });

          Promise.all(promises).then(async () => {
            const test = await createSubDesList1(blogSubDesGolang);
          });
        }}
        variant={"secondary"}
      >
        add new post
      </Button>
    </>
  );
};

export default BlogNewPostFrom;
