"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellActionProduct } from "./cell-action";
import { CellActionImage } from "./cell-action-image";
import { ProductColumn } from "@/types";

// const imageUrls = [
//   "http://localhost:8888/uploads/Your%20Title/home_bil_noard.png",
//   "http://localhost:8888/uploads/black.jpg",
//   "http://localhost:8888/uploads/s1%20orange.jpg"
// ];
export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "isArchived",
    header: "Archived"
  },
  {
    accessorKey: "isFeatured",
    header: "Featured"
  },
  {
    accessorKey: "price",
    header: "Price"
  },
  {
    accessorKey: "category",
    header: "category",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.category.name}
      </div>
    )
  },
  {
    accessorKey: "size",
    header: "size",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.size.name}
        {row.original.size.value}
      </div>
    )
  },
  {
    accessorKey: "images",
    header: "Image",

    cell: ({ row }) => {
      console.log(
        "admin/app/(route)/products/components/columns.tsx row.original",
        row.original.color
      );
      return <CellActionImage data={row.original.imageUrls} />;
    }
  },
  {
    accessorKey: "color",
    header: "color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color.name}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color.value }}
        />
      </div>
    )
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "Date"
  // },
  {
    id: "actions",
    cell: ({ row }) => <CellActionProduct data={row.original} />
  }
];
