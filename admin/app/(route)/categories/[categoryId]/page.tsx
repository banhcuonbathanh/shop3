// import prismadb from "@/lib/prismadb";
"use client";
import { useEffect, useState } from "react";
import { CategoryForm } from "./components/category-form";
import axios from "axios";
import { link_internal, linkCustomer } from "@/lib/config";
import { Category } from "@/types";

const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
  const [categoriesData, setCategoriesData] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.categoryId;

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/categories/findbyid/${id}`
        // `${link_internal.routes_shop_admin_categories.categoryid}/${params.categoryId}`
      );

      if (response.data && response.status === 200) {
        const test = response.data.data;
        const responseData: Category = {
          id: test.id,
          name: test.name
          // Add other properties here if available in the response
        };

        setCategoriesData(responseData);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id !== "new") {
      fetchCategory();
    }
  }, [id]);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={categoriesData} />
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
