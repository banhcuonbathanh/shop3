"use client";

import { useRouter, useSearchParams } from "next/navigation";


import { OrdersItemsClient } from "./components/order-items-client";


// Import the router-specific hook

const OrderItemsPage = ({ params }: { params: { productId: string } }) => {
  const id = params.productId;

  const router = useRouter();
  const search = useSearchParams();
  const { currentOrderItem } = useAdminShopOrder();
  console.log(
    " this is inside ProductUpdatePage 3.admin_cloth_nextjs13/app/shop_admin/(dashboard)/(route)/orders/[productId]/page.tsx params",
    currentOrderItem
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6"></div>
      {<OrdersItemsClient data={currentOrderItem} />}
    </div>
  );
};

export default OrderItemsPage;


function useAdminShopOrder(): { currentOrderItem: any; } {
  throw new Error("Function not implemented.");
}
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
