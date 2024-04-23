import { linkCustomer, link_internal } from "@/lib/config";
import { BillboardColumn, SizeColumn } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";

const get_Size_Shop = async (): Promise<SizeColumn[]> => {
  try {
    const response = await fetch(
      linkCustomer.golang_Base + linkCustomer.routes_size.getAllSizes,
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

export {
  get_Size_Shop

  // fetchProductsByCategory,
  // fetchOrderItem,
  // fetchOrderItemCustomerId1,
  // createOrderItem,
  // updateOrderItem,
  // fetch_All_Categories1,
  // fetchProductsById
};
