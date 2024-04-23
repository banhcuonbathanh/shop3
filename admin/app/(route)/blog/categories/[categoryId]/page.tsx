// import prismadb from "@/lib/prismadb";
"use client";
import { useEffect, useState } from "react";import { BlogCategoryForm } from "./components/blog-category-form";

import {  CategoryBlog } from "@/types";

const CategoryPage = ({ params }: { params: { categoriesData: CategoryBlog } }) => {



  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BlogCategoryForm initialData={null} />
      </div>
    </div>
  );
};

export default CategoryPage;

// const fetchCategory = async () => {
//   try {
//     const response = await axios.get(
//       `/api/shop_admin/categories/1`
//       // `${link_internal.routes_shop_admin_categories.categoryid}/${params.categoryId}`
//     );
//     console.log("This is inside fetchCategories CategoryPage");
//     console.log(response.data);

//     if (response.data && response.status === 200) {
//       const test = response.data.data;
//       const responseData: Category = {
//         id: test.data.id,
//         name: test.data.name
//         // Add other properties here if available in the response
//       };

//       setCategoriesData(responseData);
//     } else {
//       console.error("Request failed with status:", response.status);
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   } finally {
//     setLoading(false);
//   }
// };
