import { linkCustomer } from "@/lib/config";
import { Billboard, Category, Product } from "@/types";

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
    console.log(
      "nextjs/app/(route)/product/controller-product/controller-product.ts link",
      linkCustomer.golang_Base + linkCustomer.routes_billboards.getAllBillboards
    );
    const data = await response.json();
    console.log(
      "nextjs/app/(route)/product/controller-product/controller-product.ts",
      data.data
    );

    // Check if data is null
    if (data === null || data.data === null) {
      return [];
    }

    const mappedData: Billboard[] = data.data.map((item: any) => ({
      id: item.id,
      label: item.label,
      imageUrl: item.imageUrl.map((url: string) => {
        return linkCustomer.golang_Base + url;
      }),
      createdAt: item.created_at
    }));
    return mappedData; // Returning the parsed JSON data
  } catch (error) {
    console.error("Error fetching billboard:", error);
    throw error; // Propagate the error to the caller
  }
};

const get_Product_Shop = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      linkCustomer.golang_Base + linkCustomer.routes_products.getAllProducts,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    const data = await response.json();

    const products: Product[] = data.data.map((item: Product) => {
      const listImage = item.imageUrls.map((image) => {
        return linkCustomer.golang_Base + image;
      });

      return {
        id: item.id,
        category: item.category,
        name: item.name,
        price: item.price,
        isFeatured: item.isFeatured,
        size: item.size,
        color: item.color,
        imageUrls: listImage,
        isArchived: item.isArchived,
        createdAt: item.createdAt
        // Optionally add discount if needed:
        // discount: someLogicToCalculateDiscount(item),
      };
    });

    return products; // Returning the parsed JSON data
  } catch (error) {
    console.error(
      " nextjs/app/(route)/product/controller-product/controller-product.tsError fetching product:",
      error
    );
    throw error; // Propagate the error to the caller
  }
};

const fetchProductsById = async (id: number): Promise<Product> => {
  try {
    const response = await fetch(
      linkCustomer.golang_Base + linkCustomer.routes_products.getProductById,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    const data = await response.json();
    console.log(
      "nextjs/app/(route)/product/controller-product/controller-product.ts",
      data.data
    );
    const products: Product = data.data.map((item: Product) => {
      const listImage = item.imageUrls.map((image) => {
        return linkCustomer.golang_Base + image;
      });

      return {
        id: item.id,
        category: item.category,
        name: item.name,
        price: item.price,
        isFeatured: item.isFeatured,
        size: item.size,
        color: item.color,
        imageUrls: listImage,
        isArchived: item.isArchived,
        createdAt: item.createdAt
        // Optionally add discount if needed:
        // discount: someLogicToCalculateDiscount(item),
      };
    });

    return products; // Returning the parsed JSON data
  } catch (error) {
    console.error(
      " nextjs/app/(route)/product/controller-product/controller-product.tsError fetching product:",
      error
    );
    throw error; // Propagate the error to the caller
  }
};

const get_Categories_Shop = async (): Promise<Category[]> => {
  try {
    const response = await fetch(
      linkCustomer.golang_Base +
        linkCustomer.routes_categories.getAllCategories,
      {
        method: "GET",
        cache: "no-store"
      }
    );

    const data = await response.json();
    const categories: Category[] = data.data.map((item: any) => {
      return {
        id: item.id,

        name: item.name
      };
    });
    return categories; // Returning the parsed JSON data
  } catch (error) {
    console.error("Error fetching billboard:", error);
    throw error; // Propagate the error to the caller
  }
};
const filterProductsByCategory = (
  categoryName: string,
  products: Product[]
) => {
  return products.filter((product) => product.category.name === categoryName);
};

export {
  get_Billboard_Shop,
  get_Product_Shop,
  get_Categories_Shop,
  filterProductsByCategory,
  fetchProductsById
  // fetchProductsByCategory,
  // fetchOrderItem,
  // fetchOrderItemCustomerId1,
  // createOrderItem,
  // updateOrderItem,
  // fetch_All_Categories1,
  // fetchProductsById
};
