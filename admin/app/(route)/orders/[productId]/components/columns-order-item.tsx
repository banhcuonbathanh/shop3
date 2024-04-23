"use client";

import { ColumnDef } from "@tanstack/react-table";

import { OrderItem } from "@/types";

// const imageUrls = [
//   "http://localhost:8888/uploads/Your%20Title/home_bil_noard.png",
//   "http://localhost:8888/uploads/black.jpg",
//   "http://localhost:8888/uploads/s1%20orange.jpg"
// ];
export const ordersItemsColumns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "ProductID",
    header: "ProductID"
  },

  {
    accessorKey: "quantity",
    header: "quantity"
  },
  {
    accessorKey: "items",
    header: "items"

    // cell: ({ row }) => {
    //   return (
    //     <CellActionOrderItem
    //       dataOrders={row.original.items}
    //       orderId={row.original.id}
    //     />
    //   );
    // }
  },

  // {
  //   accessorKey: "images",
  //   header: "Image",

  //   cell: ({ row }) => <CellActionImageOrderItems data={row.original.images} />
  // },
  // {
  //   accessorKey: "color",
  //   header: "Color",
  //   cell: ({ row }) => (
  //     <div className="flex items-center gap-x-2">
  //       {row.original.color}
  //       <div
  //         className="h-6 w-6 rounded-full border"
  //         style={{ backgroundColor: row.original.color }}
  //       />
  //     </div>
  //   )
  // },
  {
    accessorKey: "createdAt",
    header: "Date"
  }
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
