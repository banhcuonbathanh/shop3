"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { BlogSubDes, CategoryBlog } from "@/types";

export const columns: ColumnDef<BlogSubDes>[] = [
  {
    accessorKey: "Title",
    header: "Title"
  },

  {
    accessorKey: "createdAt",
    header: "Date"
  }
  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
