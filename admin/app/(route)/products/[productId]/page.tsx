"use client";

import { Category, Color, Product, Size } from "@/types";
import useProductStore from "../components/controller";
import { ProductForm } from "./components/product-form";

import { useEffect, useState } from "react";
import { linkCustomer, link_internal } from "@/lib/config";
import axios from "axios";

// Import the router-specific hook

const ProductUpdatePage = ({ params }: { params: { productId: string } }) => {
  const id = params.productId;

  const [categoriesData, setCategoriesData] = useState([]);
  const [sizesData, setSizesData] = useState<[]>([]);
  const [colorsData, setColorsData] = useState<[]>([]);
  const [productsData, setProductData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        link_internal.routes_shop_admin_categories.categoryid
      );

      const test = response.data.data.data;
      if (response.data.data) {
        const transformedData = test.map((item: Category) => ({
          id: item.id.toString(),
          name: item.name
          // Add 'createdAt' field if available in the response
          // createdAt: item.createdAt,
        }));

        setCategoriesData(transformedData);
      } else {
        console.error("Data in response is not an array.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchColors = async () => {
    // Update the function name
    try {
      const response = await axios.get(
        link_internal.routes_shop_admin_colors.colorid
      ); // Update route

      const test = response.data.data.data;

      if (response.data.data) {
        const transformedData = test.map((item: Color) => ({
          // Update types
          id: item.id.toString(),
          name: item.name,
          value: item.value,
          createdAt: item.createdAt // Add 'createdAt' field if available in the response
        }));

        setColorsData(transformedData);
      } else {
        console.error("Data in response is not an array.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSizes = async () => {
    try {
      const response = await axios.get(
        link_internal.routes_shop_admin_sizes.sizeid // Update route
      );

      const test = response.data.data.data;
      if (response.data.data) {
        const transformedData: [] = test.map((item: Size) => ({
          id: item.id.toString(),
          name: item.name,
          value: item.value, // You may need to set the value field to some default value
          // Add 'createdAt' field if available in the response
          createdAt: item.createdAt
        }));

        setSizesData(transformedData); // Update variable name
      } else {
        console.error("Data in response is not an array.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const base = linkCustomer.golang_Base;
    const findProduct = linkCustomer.routes_products.getProductById;
    try {
      const response = await axios.get(`${base}${findProduct}${id}`);
      console.log(" this is inside fetch button products44");
      const test = response.data.data;
      console.log("test page producqqqqqq", response.data.data);
      console.log("test test.category.name", test.category.name);
      if (response.data.data) {
        const transformedData: Product = {
          id: test.id,
          name: test.name,
          isFeatured: test.isFeatured,
          isArchived: test.isArchived,
          price: test.price.toString(),
          category: test.category.name,
          size: test.size.value,
          color: test.color.value,
          createdAt: test.createdAt,
          imageUrls: test.imageUrls,
          discount: 0
        };
        console.log("transformedData", transformedData);
        setProductData(transformedData); // Update variable name
      } else {
        console.error("Data in response is not an array.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== "new" && id !== "") {
      fetchProducts();
    }
  }, [id]);

  useEffect(() => {
    fetchCategories();
    fetchColors();
    fetchSizes();
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categoriesData}
          colors={colorsData}
          sizes={sizesData}
          initialData={productsData}
        />
      </div>
    </div>
  );
};

export default ProductUpdatePage;

// const fetchCategories = async () => {
//   try {
//     const getallCategory =
//       link.golang_Base + link.routes_categories.getAllCategories;
//     const response = await axios.get(`${getallCategory}`);

//     if (response.data && response.status === 200) {
//       const categoryData = response.data.data;
//       setCategories(categoryData);
//     } else {
//       console.error("Request failed with status:", response.status);
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// };

// const fetchColors = async () => {
//   const getallColors = link.golang_Base + link.routes_color.getAllColors;
//   try {
//     const response = await axios.get(`${getallColors}`);

//     if (response.data && response.status === 200) {
//       const colorData = response.data.data;
//       setColors(colorData);
//     } else {
//       console.error("Request failed with status:", response.status);
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// };

// const fetchSizes = async () => {
//   try {
//     const getallSize = link.golang_Base + link.routes_size.getAllSizes;
//     const response = await axios.get(`${getallSize}`);

//     if (response.data && response.status === 200) {
//       const sizeData = response.data.data;
//       setSizes(sizeData);
//     } else {
//       console.error("Request failed with status:", response.status);
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   }
// };

// const [categories, setCategories] = useState<Category[]>([]);
// const [colors, setColors] = useState<Color[]>([]);
// const [sizes, setSizes] = useState<Size[]>([]);
// const [loading, setLoading] = useState(true);
