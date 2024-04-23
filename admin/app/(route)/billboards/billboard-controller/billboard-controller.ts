import { linkCustomer, link_internal } from "@/lib/config";
import { BillboardColumn } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";
type BillboardFormValues = {
  label: string;
  images: string[];
};

const get_Billboard_Shop = async (): Promise<BillboardColumn[]> => {
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
    console.log(
      "nextjs/app/(route)/product/controller-product/controller-product.ts",
      data.data
    );

    // Check if data is null
    if (data === null || data.data === null) {
      return [];
    }

    const mappedData: BillboardColumn[] = data.data.map((item: any) => ({
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
//----------------------------------

const fetchOneBillboardByName = async (name: string): Promise<boolean> => {
  console.log("this is inside fetchOneProductByName controller", name);
  try {
    const response = await axios.get(
      `${linkCustomer.golang_Base}${linkCustomer.routes_billboards.findBillboardByLabel}?label=${name}`
    );

    console.log(
      "this is inside fetchOneBillboardByName controller data ",
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
//--------------------
const onSubmitControllerToCreateBillboard = async (
  data: BillboardFormValues,

  link_pic_onserver: string[]
) => {
  // Check if the product is available in the database
  const isProductAvailable = await fetchOneBillboardByName(data.label);
  console.log(
    "onSubmitControllerToCreateBillboard to check billboard availble or not ",
    isProductAvailable
  );
  if (isProductAvailable) {
    // Product exists, handle accordingly
    console.log("onSubmitControllerToCreateBillboard already exists");
    toast.success("onSubmitControllerToCreateBillboard exists");
  } else {
    // Product doesn't exist, proceed to create it
    console.log(
      "onSubmitControllerToCreateBillboard to check billboard case product not availble  "
    );
    const formdata = {
      name: data.label,
      ImageUrls: link_pic_onserver
    };
    console.log("onSubmitControllerToCreateBillboard to formdata ", formdata);
    const postUrl = link_internal.routes_shop_admin_billboards.billboardid;
    console.log(
      "onSubmitControllerToCreateBillboard to check billboard case product not availble postUrl ",
      postUrl
    );
    try {
      // Make a POST request to create the product
      const responseData = await axios.post(`${postUrl}`, formdata);

      console.log(
        "onSubmitControllerToCreateBillboard to check billboard responseData",
        responseData.data
      );
      toast.success("post ok ");
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

export {
  get_Billboard_Shop,
  onSubmitControllerToCreateBillboard
  // fetchProductsByCategory,
  // fetchOrderItem,
  // fetchOrderItemCustomerId1,
  // createOrderItem,
  // updateOrderItem,
  // fetch_All_Categories1,
  // fetchProductsById
};
