"use client";

import { useEffect, useState } from "react";
// import axios from "axios";

import { OrdersItemsClient } from "./components/order-client";
import { findAllOrdersItems } from "./controller-order-items";




const OrderitemsPage = ({ params }: { params: { storeId: string } }) => {
  // console.log(
  //   "this is OrdersPage in shop_admin/(dashboard)/(route)/OrderitemsPage/page"
  // );
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchOrderItems() {
    console.log(
      "OrderitemsPage fetchOrderItems (dashboard)/(route)/orderitems/page.tsx"
    );
    const data = await findAllOrdersItems();

    setOrderItems(data);
    setLoading(false);
  }
  console.log();
  useEffect(() => {
    fetchOrderItems();
  }, []);

  // console.log(
  //   "this is OrderitemsPage in shop_admin/(dashboard)/(route)/orders/page OrderitemsPage",
  //   orderItems[0]
  // );
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {loading ? <p>Loading...</p> : <OrdersItemsClient data={orderItems} />}
      </div>
    </div>
  );
};

export default OrderitemsPage;



// const [orders, setOrderData] = useState<OrderColumn[] | []>([]);
// const [loading, setLoading] = useState(true);

// const ordersProducts = async () => {
//   try {
//     const response = await axios.get(
//       link_internal.routes_shop_admin_products.productid
//     );
//     const test = response.data.data.data;
//     console.log("this test trong ProductsPage1111:", test);
//     if (response.data.data) {
//       const formattedProducts: OrderColumn[] = test.map((item: any) => {
//         console.log("this item trong Produdsaasfasfas:items ", item);
//         console.log("this item trong Produdsaasfasfas:name ", item.name); // Print the entire 'item' object for debugging

//         console.log(
//           "this item trong Produdsaasfasfas:image urls ",
//           item.imageUrls
//         ); // Print the entire 'item' object for debugging

//         return {
//           id: item.id.toString(), // Ensure 'id' is a string
//           name: item.name,
//           isFeatured: item.isFeatured,
//           isArchived: item.isArchived,
//           price: item.price.toString(), // Ensure 'price' is a string
//           category: item.category.name,
//           size: item.size.name,
//           color: item.color.value,
//           createdAt: item.createdAt,
//           images: item.imageUrls || []
//         };
//       });
//       console.log(
//         "this item trong ProductsPage1111:formattedProducts",
//         formattedProducts
//       );
//       setOrderData(formattedProducts);
//     } else {
//       console.error("Request failed with status:", response.status);
//     }
//   } catch (error) {
//     console.error("An error occurred:", error);
//   } finally {
//     setLoading(false);
//   }
// };

// useEffect(() => {
//   // ordersProducts();
// }, []);
