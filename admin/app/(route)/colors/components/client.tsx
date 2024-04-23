"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import { link_internal } from "@/lib/config";
import { ColorForm } from "../[colorId]/components/color-form";
import { ColorColumn } from "@/types";

interface ColorClientProps {
  data: ColorColumn[];
}

export const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your products"
        />
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data} />
      </div>

      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={null} />
      </div>
    </>
  );
};
