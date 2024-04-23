"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { ordersColumns } from "./columns";
import ProductUpdatePage from "../[productId]/page";

import { useState } from "react";
import { OrderColumn } from "@/types";

interface OrdersClientProps {
  data: OrderColumn[];
}

export const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  // console.log("this is data OrdersClient")
  const params = useParams();
  const router = useRouter();

  const timeZoneOffset = 7 * 60 * 60 * 1000; // 7 hours in milliseconds

  data.forEach((order) => {
    // Parse the 'createdAt' string into a Date object
    const date = new Date(order.createdAt);

    // Format the date part (year, month, day)
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    // Format the time part (hour, minute)
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit"
    });

    // Apply the time zone offset manually
    const adjustedDate = new Date(date.getTime() + timeZoneOffset);

    // Format the time with the adjusted date and time zone information
    const formattedTimeWithZone = adjustedDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC"
    });

    // Combine date, time, and time zone with separators
    const formattedCreatedAt = `${formattedDate} ${formattedTime}`;

    // Update the 'createdAt' property with the combined formatted string
    order.createdAt = formattedCreatedAt;
  });

  data.sort((a, b) => {
    // Handle potential missing or invalid 'createdAt' values gracefully
    if (!a.createdAt || !b.createdAt) {
      return 0; // Maintain original order if either value is missing
    }

    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Sort in descending order (newest to oldest)
    return dateB.getTime() - dateA.getTime();
  });
  // Now with human-readable 'createdAt' including time and zone

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage products for your store"
        />
      </div>
      <Separator />
      <button>Sort by Date</button>
      <DataTable searchKey="Address" columns={ordersColumns} data={data} />
      {/* <Heading title="Create product" description="API Calls for Products" /> */}
      <Separator />

      {/* <ApiList entityName="products" entityIdName="productId" /> */}
    </>
  );
};
