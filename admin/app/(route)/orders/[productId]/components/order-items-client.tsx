"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { OrderItem } from "@/types";
import { ordersItemsColumns } from "./columns-order-item";

interface OrdersClientProps {
  data: OrderItem[];
}

export const OrdersItemsClient: React.FC<OrdersClientProps> = ({ data }) => {
  // console.log("this is data OrdersClient")
  const params = useParams();
  const router = useRouter();
  console.log(
    "OrdersItemsClient shop_admin/(dashboard)/(route)/orders/[productId]/components/order-items-client.tsx ",
    data
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Ordersitems (${data.length})`}
          description="Manage products for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="Address" columns={ordersItemsColumns} data={data} />
      {/* <Heading title="Create product" description="API Calls for Products" /> */}
      <Separator />

      {/* <ApiList entityName="products" entityIdName="productId" /> */}
    </>
  );
};
