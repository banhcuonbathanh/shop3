"use client";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import {
  ChartBoxUserData,
  chartBoxProductData,
  barChartBoxRevenue,
  chartBoxConversion
} from "./component/graph/data";
import PieChartBox from "./component/graph/piechart";
import BigChartBox from "./component/graph/liechart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useStoreModalShopAdmin } from "@/components/use-hook-shop-admin/use-store-modal-shop-admin";
import { Chart } from "./component/graph/chart";
import TopBox from "./component/graph/topbox";
import ChartBoxUser from "./component/graph/chartboxuser";
import Menu from "./component/graph/menu";
import ChatPage from "@/components/chat/chat";
import { linkCustomer } from "@/lib/config";

const SetupPage = () => {
  // const onOpen = useStoreModalShopAdmin((state) => state.onOpen); error
  const isOpen = useStoreModalShopAdmin((state) => state.isOpen);
  const router = useRouter();
  const session = useSession();
  console.log(
    "admin/app/(route)/(overview)/page.tsx getAllBillboards",
    linkCustomer.golang_Base + linkCustomer.routes_billboards.getAllBillboards
  );

  // console.log(
  //   "3.admin_cloth_nextjs13/app/shop_admin/page.tsx session.data?.user.userID asd",
  //   session.data?.user.userID,
  //   session.data?.user?.userID === undefined
  // );

  // console.log(
  //   "3.admin_cloth_nextjs13/app/shop_admin/page.tsx session.data?.user.userID asd",
  //   session.data?.user.userID
  // );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (session.data?.user.userID === undefined) {
      console.log("User ID is not available.");
      // Optionally navigate to a login page
      router.push(`/auth/page/login`);
    }
  });

  const data = [
    { name: "Jan", total: 4000 },
    { name: "Feb", total: 3000 },
    { name: "Mar", total: 2000 },
    { name: "Apr", total: 2780 },
    { name: "May", total: 1890 },
    { name: "Jun", total: 2390 },
    { name: "Jul", total: 3490 }
  ];
  // const totalRevenue = await getTotalRevenue(params.storeId);
  return (
    <div className="flex flex-row w-full pt-10">
      <div className="w-5/6">
        <div className="flex flex-col">
          <div className="flex-1 space-y-4 pl-8 ">
            <Heading title="Dashboard" description="Overview of your store" />
            <Separator />

            <div className="grid gap-4 grid-cols-3 h-40">
              <div className="border rounded-md flex  items-center pl-4">
                <span className="text-2xl font-bold pr-2">
                  Total Revenue :{" "}
                </span>
                123421
              </div>
              <div className="border rounded-md flex  items-center pl-4">
                <span className="text-2xl font-bold pr-2">Total sales : </span>
                123421
              </div>

              <div className="border rounded-md flex  items-center pl-4">
                <span className="text-2xl font-bold pr-2">Total sales : </span>
                123421
              </div>
            </div>
            <Chart data={data} />
            <div className="flex flex-row  ">
              <TopBox />
              <div className="grid grid-cols-2 gap-4 w-full">
                <ChartBoxUser {...ChartBoxUserData} />
                <ChartBoxUser {...chartBoxProductData} />
                <ChartBoxUser {...chartBoxConversion} />
                <PieChartBox />
              </div>
            </div>
            <BigChartBox />

            <ChatPage />
            {/* 
            <button
              className="bg-orange h-90 w-90 border"
              onClick={() => {
                console.log("this is inside admin shop button test");
                coverImage.onOpen();
                // onOpen();
              }}
            >
              asdfasdf
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupPage;
