"use client";

import { useParams, useRouter } from "next/navigation";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import ProductUpdatePage from "../[productId]/page";
import { ProductColumn } from "@/types";
import { columns } from "./columns";

interface ProductsClientProps {
  data: ProductColumn[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  console.log(" this thi data in client trong product table ", data);
  return (
    <>
      {/* {data?.length > 0 && ( */}
      <div className="flex flex-col">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        />

        <DataTable searchKey="name" columns={columns} data={data} />
      </div>
      {/* )} */}

      <Separator />

      <ProductUpdatePage
        params={{
          productId: ""
        }}
      />
    </>
  );
};
