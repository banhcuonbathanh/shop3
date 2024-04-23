"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, SizeColumn } from "./columns";

import { SizeForm } from "../[sizeId]/components/size-form";

interface SizesClientProps {
  data: SizeColumn[];
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      {/* {data?.length > 0 && ( */}
      <div className="flex flex-col">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your products"
        />
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />

        <Separator />
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={null} />
      </div>
    </>
  );
};
