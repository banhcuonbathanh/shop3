import { linkCustomer, link_internal } from "@/lib/config";
import { ProductColumn } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
type ProductFormValues = {
  name: string;
  images: string[];
  price: number;
  CategoryName: string;
  ColorName: string;
  SizeName: string;
  isFeatured?: boolean | undefined;
  isArchived?: boolean | undefined;
};

const fetchOneProductByName = async (name: string): Promise<boolean> => {
  console.log("this is inside fetchOneProductByName controller", name);
  try {
    const response = await axios.get(
      `${linkCustomer.golang_Base}${linkCustomer.routes_products.findProductsByName}?name=${name}`
    );

    console.log(
      "this is inside fetchOneProductByName controller data ",
      response.data.data
    );
    const dataFromserver = response.data.data;
    if (Array.isArray(dataFromserver) && dataFromserver.length === 0) {
      return false; // Product found, return true
    } else {
      // Handle other response status codes or conditions
      return true; // Product not found, return false
    }
  } catch (error) {
    // Handle any network or request-related errors
    console.error("An error occurred:", error);
    return false; // An error occurred, return false
  }
};

const onSubmitControllerToCreateProduct = async (
  data: ProductFormValues,

  link_pic_onserver: string[]
) => {
  // Check if the product is available in the database
  const isProductAvailable = await fetchOneProductByName(data.name);

  if (isProductAvailable) {
    // Product exists, handle accordingly
    console.log("Product already exists");
    toast.success("Product exists");
  } else {
    // Product doesn't exist, proceed to create it

    const formdata = {
      name: data.name,
      ImageUrls: link_pic_onserver,
      Price: data.price,
      CategoryId: data.CategoryName,
      ColorId: data.ColorName,
      SizeId: data.SizeName,
      IsFeatured: data.isFeatured,
      IsArchived: data.isArchived,
      OrderItem: []
    };

    const postUrl = link_internal.routes_shop_admin_products.productid;

    try {
      // Make a POST request to create the product
      const responseData = await axios.post(`${postUrl}`, formdata);

      // Handle the response data, and update the UI as needed
      // (e.g., redirect to a different page, show a success message)
      // ...

      // Example:
      // router.refresh();
      // router.push(
      //   `http://localhost:3000/${link_internal.routes_shop_admin_products_not_api.productid}`
      // );
      // toast.success(toastMessage);
    } catch (error) {
      // Handle any errors that may occur during the POST request
      console.error("An error occurred:", error);
      toast.error("Something went wrong.");
    }
  }
};

const extractFilePath = (url: string) => {
  const parsedURL = new URL(url);
  const pathArray = parsedURL.pathname.split("/").slice(2).join("/"); // Extract from the third segment
  return pathArray;
};

const deleteImageControllerProduct = async (deleteImageLink: string[]) => {
  console.log("deleteImageControllerProduct");

  for (const imageFileToDelete of deleteImageLink) {
    try {
      const path = extractFilePath(imageFileToDelete);
      console.log("deleteImageControllerProduct path", path);
      const response = await axios.delete(
        `${linkCustomer.golang_Base}/deleteImage?file=uploads/${path}`
      );
      console.log("deleteImageControllerProduct filename", path);
      if (response.status === 200) {
        console.error(`success to delete the image /uploads/`);
        return true;
      } else {
        console.error(`Failed to delete the image /uploads/`);
        return false;
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
};

const get_Product_Shop = async (): Promise<ProductColumn[]> => {
  try {
    const response = await fetch(
      linkCustomer.golang_Base + linkCustomer.routes_products.getAllProducts,
      {
        method: "GET",
        cache: "no-store"
      }
    );
    const data = await response.json();

    const products: ProductColumn[] = data.data.map((item: ProductColumn) => {
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

export {
  fetchOneProductByName,
  onSubmitControllerToCreateProduct,
  deleteImageControllerProduct,
  get_Product_Shop
};
