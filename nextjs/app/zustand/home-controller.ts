import { linkCustomer } from "@/lib/config";
import { Billboard, Category, OrderItem, Product } from "@/types";

import axios from "axios";

const get_Billboard_Shop = async (): Promise<Billboard[]> => {
  try {
    const response = await fetch(
      linkCustomer.golang_Base +
        linkCustomer.routes_billboards.getAllBillboards,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    const data = await response.json();

    return data.data; // Returning the parsed JSON data
  } catch (error) {
    console.error("Error fetching billboard:", error);
    throw error; // Propagate the error to the caller
  }
};

// fetchProductsByCategory
const fetchProductsByCategory = async (
  categoryId: number
): Promise<Product[]> => {
  console.log(
    "fetchProductsByCategory in home controller link",
    `${linkCustomer.golang_Base}${linkCustomer.routes_products.findProductByCategory}${categoryId}`
  );
  try {
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_products.findProductByCategory}${categoryId}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    const data = await response.json();

    return data.products; // Assuming the products are in the 'products' field of the returned data
  } catch (error) {
    console.error(`Error fetching products in category ${categoryId}:`, error);
    throw error;
  }
};







async function fetch_All_Categories1() {
  const apiUrl = `${linkCustomer.golang_Base}${linkCustomer.routes_categories.getAllCategories}`;

  try {
    const response = await axios.get(apiUrl);

    const categories = response.data.data;
    // addCategory1(categories);
    return categories;
  } catch (error) {
    throw error;
  }
}

const fetchProductsById = async (productId: number): Promise<Product> => {
  console.log(
    "fetchProductsByCategory in home controller link",
    `${linkCustomer.golang_Base}${linkCustomer.routes_products.getProductById}${productId}`
  );
  try {
    const response = await fetch(
      `${linkCustomer.golang_Base}${linkCustomer.routes_products.getProductById}${productId}`,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    const data = await response.json();
    console.log("fetchProductsById in home controller link", data.data);
    return data.data; // Assuming the products are in the 'products' field of the returned data
  } catch (error) {
    console.error(`Error fetching products in category ${productId}:`, error);
    throw error;
  }
};
// async function fetchBillboards() {
//   const apiUrl = `${link_external_shop.golang_Base}${link_external_shop.routes_billboards.getAllBillboards}`;

//   try {
//     const response = await axios.get(apiUrl);

//     const billboards = response.data.data;
//     // Process the retrieved billboards here, such as calling a function to handle the data
//     addBillboard(billboards);
//     // Additional actions if needed, e.g., setting the active billboard
//     setActiveBillboard(billboards[0].name);
//   } catch (error) {
//     throw error;
//   }
// }

export {
  get_Billboard_Shop,
  fetchProductsByCategory,




  fetch_All_Categories1,
  fetchProductsById
};
