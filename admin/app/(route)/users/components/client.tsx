"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";

import { User } from "@/types";

interface ProductsClientProps {
  data: User[];
}

export const UsersClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  console.log("admin/app/(route)/users/components/client.tsx", data);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`user (${data.length})`}
          description="Manage products for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="Create product" description="API Calls for Products" /> */}
      <Separator />

      {/* <ApiList entityName="products" entityIdName="productId" /> */}
    </>
  );
};
