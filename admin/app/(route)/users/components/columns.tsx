"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { CellActionImage } from "./cell-action-chat";
import { User } from "@/types";

// const imageUrls = [
//   "http://localhost:8888/uploads/Your%20Title/home_bil_noard.png",
//   "http://localhost:8888/uploads/black.jpg",
//   "http://localhost:8888/uploads/s1%20orange.jpg"
// ];
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "email",
    header: "email"
  },
  {
    accessorKey: "phone_number",
    header: "phone_number"
  },
  // {
  //   accessorKey: "price",
  //   header: "Price"
  // },
  // {
  //   accessorKey: "category",
  //   header: "Category"
  // },
  // {
  //   accessorKey: "size",
  //   header: "Size"
  // },
  {
    accessorKey: "id",
    header: "Chat",

    cell: ({ row }) => <CellActionImage data={row.original.email} />
  },
  // {
  //   accessorKey: "id",
  //   header: "chat",
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
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
