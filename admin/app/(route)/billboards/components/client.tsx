"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import BillboardPage from "../[billboardId]/page";

import { Heading } from "@/components/ui/heading";
import { BillboardColumn } from "@/types";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  console.log(
    "admin/app/(route)/billboards/components/client.tsx BillboardClient",
    data
  );
  return (
    <>
      {data && (
        <div className="flex flex-col">
          <Heading
            title={`Billboards (${data.length})`}
            description="Manage billboards for your store"
          />
          {/* <Button onClick={() => router.push(`/shop_admin/billboards/new`)}>
      <Plus className="mr-2 h-4 w-4" /> Add New
    </Button> */}

          {/* <Separator /> */}
          <DataTable searchKey="label" columns={columns} data={data} />
        </div>
      )}

      <BillboardPage
        params={{
          billboardId: ""
        }}
      />
    </>
  );
};
