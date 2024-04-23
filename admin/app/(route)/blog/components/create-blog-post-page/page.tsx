"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";

// import { BlogCategoryForm } from "../blog-new-category/blog-category-form";

import { Separator } from "@radix-ui/react-dropdown-menu";

import BlogNewPostFrom from "../blog-new-post/blog-new-post-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateBlogPostPage = () => {
  const router = useRouter();
  const [newPost, setNewPost] = useState(true);
  const [newCategory, setNewCategory] = useState(false);
  const session = useSession();
  const listButton = [
    { name: "New Post", key: 1 },
    { name: "New Category", key: 2 },
    { name: "subdes", key: 3 }
  ];

  const buttons = listButton.map((button) => (
    <Button
      key={button.key} // Assign unique key to each button
      onClick={() => {
        switch (button.name) {
          case "New Post":
            setNewPost(!newPost);
            break;
          case "New Category":
            // setNewCategory(!newCategory);

            router.push("/blog/categories");
            break;
          case "subdes":
            // setNewCategory(!newCategory);

            router.push("/blog/subdes");
            break;
          default:
            // Handle unexpected button names (optional)
            console.warn("Unknown button name:", button.name);
        }
      }}
      variant="secondary"
    >
      {button.name}
    </Button>
  ));
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-10">
        {buttons}

        <Separator />
      </div>

   
      <>
        {BlogNewPostFrom(
          Number(session.data?.user.userID),
          session.data?.user.useremail ||
            "no email wa found from CreateBlogPostPage"
        )}
      </>
    </div>
  );
};

export default CreateBlogPostPage;

{
  /* <select
        className="mb-10 px-4 py-2 ml-10 inline-block"
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <p>{catSlug}</p> */
}
{
  /* <input
        type="text"
        placeholder="Title"
        className="px-20 py-20 text-4xl border "
        // The Tailwind classes mimic the provided styles
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <p>{title}</p> */
}
{
  /* <div className="flex gap-20 h-700px relative">
        <button onClick={() => setOpen(!open)}>
          <Image src="/orange.png" alt="" width={60} height={40} />
        </button>
        {open && (
          <div className="flex gap-20 bg-gray-100 relative z-50 w-full left-20">
            <input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="hidden"
            />
            <button className="w-9 h-9 rounded-full border border-gray-500 flex items-center justify-center cursor-pointer">
              <label htmlFor="image">
                <Image src="/orange.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center cursor-pointer">
              <Image src="/black.jpg" alt="" width={16} height={16} />
            </button>
            <button className="w-9 h-9 rounded-full border border-green-600 flex items-center justify-center cursor-pointer">
              <Image src="/logo.svg" alt="" width={16} height={16} />
            </button>
          </div>
        )}
      </div> */
}
