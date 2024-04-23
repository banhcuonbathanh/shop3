"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ordersItemsColumns } from "./columns-order-item";
import { OrderItem } from "@/types";

interface OrderItemsClientProps {
  data: OrderItem[];
}

export const OrdersItemsClient: React.FC<OrderItemsClientProps> = ({
  data
}) => {
  // console.log("this is data OrdersClient")
  const params = useParams();
  const router = useRouter();
  console.log(
    "OrdersItemsClient /orderitems/components/order-client.tsx ",
    data[0]
  );
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`OrdersItems (${data.length})`}
          description="Manage products for your store"
        />
        {/* <Button
          className="bg-orange-500"
          onClick={() => router.push(`/shop_admin/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New product
        </Button> */}
      </div>
      <Separator />
      <DataTable
        searchKey="ProductID"
        columns={ordersItemsColumns}
        data={data}
      />
      {/* <Heading title="Create product" description="API Calls for Products" /> */}
      <Separator />

      {/* <ApiList entityName="products" entityIdName="productId" /> */}
    </>
  );
};
