import { linkCustomer, link_internal } from "@/lib/config";
import { OrderColumn } from "@/types";
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

const getAllOrdersController = async () => {
  try {
    const response = await axios.get(
      link_internal.routes_shop_admin_products.productid
    );
    const test = response.data.data.data;
    console.log("this test trong ProductsPage1111:", test);
    if (response.data.data) {
      const formattedProducts: OrderColumn[] = test.map((item: any) => {
        console.log("this item trong Produdsaasfasfas:items ", item);
        console.log("this item trong Produdsaasfasfas:name ", item.name); // Print the entire 'item' object for debugging

        console.log(
          "this item trong Produdsaasfasfas:image urls ",
          item.imageUrls
        ); // Print the entire 'item' object for debugging

        return {
          id: item.id.toString(), // Ensure 'id' is a string
          name: item.name,
          isFeatured: item.isFeatured,
          isArchived: item.isArchived,
          price: item.price.toString(), // Ensure 'price' is a string
          category: item.category.name,
          size: item.size.name,
          color: item.color.value,
          createdAt: item.createdAt,
          images: item.imageUrls || []
        };
      });
      console.log(
        "this item trong ProductsPage1111:formattedProducts",
        formattedProducts
      );
      // setOrderData(formattedProducts);
    } else {
      console.error("Request failed with status:", response.status);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // setLoading(false);
  }
};

//----------
const deleteOrdersController = async (orderId: string) => {
  try {
    // 1. Construct the DELETE request URL securely using template literals:
    const baseUrl = linkCustomer.golang_Base;
    const deleteOrderUrl = `${baseUrl}${linkCustomer.routes_orders.deleteOrder.path}`;
    console.log(
      "3.admin_cloth_nextjs13/app/shop_admin/(dashboard)/(route)/orders/controller.ts orderId",
      deleteOrderUrl + orderId
    );
    // 2. Send the DELETE request with appropriate headers:
    const response = await axios.delete(deleteOrderUrl + orderId, {
      // Ensure correct HTTP method
      method: "DELETE",
      headers: {
        // Set headers if applicable, including authentication if needed
        /*
                "Content-Type": "application/json",
                "Authorization": "Bearer YOUR_ACCESS_TOKEN"
                */
      }
    });

    // 3. Handle successful and unsuccessful responses:
    if (response.status === 200) {
      // Check for specific success code (200 OK)
      console.log("Order deleted successfully:", orderId);
      return true; // Indicate successful deletion
    } else {
      console.error("Error deleting order:", orderId, response.statusText);
      throw new Error(`Error deleting order (status: ${response.status})`);
    }
  } catch (err) {
    console.error("Unexpected error deleting order:", orderId, err);
    throw err; // Re-throw the error for handling in the calling code
  }
};

export {
  fetchOneProductByName,
  onSubmitControllerToCreateProduct,
  deleteImageControllerProduct,
  getAllOrdersController,
  deleteOrdersController
};
