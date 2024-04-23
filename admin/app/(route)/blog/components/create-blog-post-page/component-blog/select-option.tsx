"use client";

import { BlogCategory } from "@/types";
import React, { useEffect, useState } from "react";
import { getAllBlogCategory } from "../../../blog-controller/controller";
type CategoryChangeHandler = (category: { id: number; title: string }) => void;

export const BlogCategoryPages = ({
  onBlogCategoryChange
}: {
  onBlogCategoryChange: CategoryChangeHandler;
}) => {
  const [categoriesData, setCategories] = useState<BlogCategory[]>([]);

  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBlogCategory();

        setCategories(data); // Now data is of type BlogCategory[]
      } catch (error) {
        console.error(error); // Handle errors appropriately
      } finally {
        // setLoading(false); // Update loading state after fetching data
      }
    };

    fetchData();
  }, [categoriesData.length]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    // Find the selected category
    const selectedCategory = categoriesData.find(
      (category) => category.Title === event.target.value
    );

    if (selectedCategory) {
      // Set the selected category slug
      setCatSlug(selectedCategory.Title);

      // Call the parent's function to handle the change (if applicable)
      if (onBlogCategoryChange) {
        onBlogCategoryChange({
          id: selectedCategory.ID,
          title: selectedCategory.Title
        });
      }
    }
  };

  // console.log(
  //   "3.admin_cloth_nextjs13/app/shop_admin/(dashboard)/(route)/blog/components/create-blog-post-page/component-blog/select-option.tsx",
  //   categoriesData
  // );
  return (
    <div className="border px-3 py-4 ">
      <p className="py-2">choose Category blog</p>
      <select
        className="py-2 px-4 my-2 inline-block"
        onChange={handleCategoryChange}
        value={catSlug}
      >
        {categoriesData.map((category) => (
          <option key={category.ID} value={category.Title}>
            {category.Title}
          </option>
        ))}
      </select>
    </div>
  );
};
