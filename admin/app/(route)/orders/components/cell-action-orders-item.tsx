"use client";
import { OrderItem } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdminShopOrder } from "../zustand-orders";

interface CellActionProps {
  dataOrders: OrderItem[];
  orderId: string; // Include the order ID for dynamic routing
}

export const CellActionOrderItemInOrder: React.FC<CellActionProps> = ({
  dataOrders,
  orderId
}) => {
  const router = useRouter();
  // console.log(
  //   "  CellActionOrderItem shop_admin/(dashboard)/(route)/orders/components/cell-action-orders-item.tsx datadata",
  //   dataOrders
  // );
  const { addOrderItems } = useAdminShopOrder();

  return (
    // <Link
    //   href={{
    //     pathname: `/shop_admin/orders/${orderId}`,
    //     query: { data: serializedData }
    //   }}
    // >
    //   Some text
    // </Link>
    <>
      {dataOrders !== null && dataOrders.length > 0 ? (
        <button
          onClick={() => {
            console.log("tsdfasdsdfsadfsd");
            addOrderItems(dataOrders);
            router.push(`orders/${orderId}`);
          }}
        >
          Detail order items
        </button>
      ) : (
        <span>No order items</span>
      )}
    </>
  );
};
// "use client";

// import axios from "axios";
// import { Copy, Edit, MoreHorizontal, Router, Trash } from "lucide-react";
// // import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

// import { AlertModal } from "@/components/modals/alert-modal";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
{
  /* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        loading={loading}
      /> */
}
// const imageUrls = [
//   "http://localhost:8888/uploads/Your%20Title/home_bil_noard.png",
//   "http://localhost:8888/uploads/black.jpg",
//   "http://localhost:8888/uploads/s1%20orange.jpg"
// ];

// const [loading, setLoading] = useState(false);
// const [open, setOpen] = useState(false);
// const router = useRouter();
// <DropdownMenu>
// <DropdownMenuTrigger asChild>
//   <Button variant="ghost" className="h-8 w-8 p-0">
//     <span className="sr-only">Open menu</span>
//     <MoreHorizontal className="h-4 w-4" />
//   </Button>
// </DropdownMenuTrigger>
// <DropdownMenuContent align="end">
//   <div className="flex space-x-4">
//     {/* {data.map((imageUrl, index) => (
//       <li key={index}>
//         <img src={imageUrl} width={180} height={180} alt="" />
//       </li>
//     ))} */}
//   </div>
// </DropdownMenuContent>
// </DropdownMenu>
