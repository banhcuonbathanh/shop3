import { useShopStorePersist } from "@/app/zustand/home-zustand";
import { linkCustomer } from "@/lib/config";
import { OrderItem, Product } from "@/types";
import axios from "axios";
import { MouseEventHandler, useState } from "react";

const createOrderItem = async (
  currentOrderItem: OrderItem[],
  userId: number
) => {
  const formdata = {
    userID: userId,

    orderItem: currentOrderItem
  };
  const link =
    linkCustomer.golang_Base +
    linkCustomer.routes_orderItems.createOrderItem;

  try {
    // const response = await axios.post("/api/submitForm", formData);
    const response = await axios.post(
      linkCustomer.golang_Base +
      linkCustomer.routes_orderItems.createOrderItem,
      formdata
    );
    const test = response.data.status;

    return "ok";
 
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};
// const fetchOrderItem = async () => {
//   try {
//     const response = await axios.get(
//       linkCustomer.golang_Base +
//         linkCustomer.routes_orderItems.findAllOrderItems
//     ); // Accessing the API route

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
async function updateOrderItem(orderItemID: number, updatedData: OrderItem) {
  try {
    const response = await axios.patch(
      linkCustomer.golang_Base +
        linkCustomer.routes_orderItems.updateOrderItem +
        orderItemID,
      updatedData
    );
    return response.data;
  } catch (error) {
    // Handle error appropriately
    console.error("Error updating order item:", error);
    throw error;
  }
}

// const fetchOrderItemCustomerId1 = async (customerId: number) => {
//   try {
//     const response = await axios.get(
//       linkCustomer.golang_Base +
//         linkCustomer.routes_orderItems.findOrderByItemId +
//         customerId
//     ); // Accessing the API route
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };
function useHandleAddToCart(
  data: Product,
  currentOrderItemPersist2: OrderItem[]
): MouseEventHandler<HTMLButtonElement> {
  const { initialAddOrderItem, findOrderItemById } = useShopStorePersist();

  const [orderitem, setOrderItem] = useState<OrderItem[]>([]);
  return async (event) => {
    console.log("handleAddToCart ");
    const existingOrderItem = currentOrderItemPersist2.find(
      (orderItem) => orderItem.Product.id === data.id
    );
    if (existingOrderItem) {
      findOrderItemById(data.id);

      const updateedOrderItem = currentOrderItemPersist2.find(
        (item) => item.ProductID === data.id
      );

      if (updateedOrderItem !== undefined) {
        // await updateOrderItem(updateedOrderItem.ID!, updateedOrderItem);
      }
    } else {
      // await createOrderItem(data, 1);

      // const updatedOrder = await fetchOrderItemCustomerId(1);

      // setOrderItem(updatedOrder.data);

      initialAddOrderItem(orderitem);
    }
    event.stopPropagation();
  };
}

function useOnDecreaseCartHook(
  decrease: (productID1: number) => void,
  data: Product,
  currentOrderItemPersist2: OrderItem[],
  initialAddOrderItem: (neworderitem: OrderItem[]) => void
): MouseEventHandler<HTMLButtonElement> {
  const [orderitem, setOrderItem] = useState<OrderItem[]>([]);
  return async (event) => {
    console.log("ProductCard onDecrease");
    decrease(data.id);
    const updateedOrderItem = currentOrderItemPersist2.find(
      (item) => item.ProductID === data.id
    );
    console.log(
      "ProductCard onDecrease currentOrderItemPersist2",
      currentOrderItemPersist2
    );
    if (updateedOrderItem !== undefined) {
      // await updateOrderItem(updateedOrderItem.ID!, updateedOrderItem);
      // const updatedOrder = await fetchOrderItemCustomerId(1);

      // setOrderItem(updatedOrder.data);

      initialAddOrderItem(orderitem);
    }
    event.stopPropagation();
  };
}

export {
  // fetchOrderItemCustomerId1,
  updateOrderItem,
  // fetchOrderItem,
  createOrderItem,
  useHandleAddToCart,
  useOnDecreaseCartHook
};
