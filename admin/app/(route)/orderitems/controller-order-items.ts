import { linkCustomer, link_internal } from "@/lib/config";
import { OrderColumn } from "@/types";
import axios from "axios";

const getAllOrderItemsController = async () => {
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

const findAllOrdersItems = async () => {
  const baseUrl = linkCustomer.golang_Base;
  console.log(
    " this is findAllOrders action server path (route)/orderitems/action/get-all-order-items.ts",
    baseUrl + linkCustomer.routes_orderItems.findAllOrderItems.path
  );
  try {
    const response = await fetch(
      baseUrl + linkCustomer.routes_orderItems.findAllOrderItems.path, // Update the route for getting all products
      {
        method: "GET",
        cache: "no-store"
      }
    );
    const data = await response.json();

    console.log(
      " this is findAllOrders action server order /shop_admin/(dashboard)/(route)/orderitems/action/get-all-order-items.ts",
      data
    );
    return data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { getAllOrderItemsController, findAllOrdersItems };
