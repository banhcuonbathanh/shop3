"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { CellActionImageBillboards } from "./cell-action-image-billboards";
import { BillboardColumn } from "@/types";



export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label"
  },
  {
    accessorKey: "createdAt",
    header: "Date"
  },
  {
    accessorKey: "images",
    header: "Image",
    cell: ({ row }) => {
      console.log("Data in CellActionImageBillboards:", row.original.imageUrl); // Log the data
      return <CellActionImageBillboards data={row.original.imageUrl} />;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];


