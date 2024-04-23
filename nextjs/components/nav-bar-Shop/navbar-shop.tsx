"use client";

import { MainNavShop } from "./main-nav-shop";

import { useRouter } from "next/navigation";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";

import { OrderItem } from "@/types";

import { useSession } from "next-auth/react";
import ThemesToogle, { SliderToggle } from "./themes-toggle";
import { useTheme } from "next-themes";
import { FlyoutLink, PricingContent } from "./Flyout_Link";
import { useShopStorePersist } from "@/app/zustand/home-zustand";
import Navbarcartbutton from "./navbarcartbutton/navbarcartbutton";

// import { fetch_All_Categories } from "../../controller/home-controller";
// import prismadb from "@/lib/prismadb";
type ToggleOptionsType = "light" | "dark";
const NavbarShop = () => {
  const { setTheme } = useTheme();
  const [selected, setSelected] = useState<ToggleOptionsType>("light");
  const [orderitem, setOrderItem] = useState<OrderItem[]>([]);
  const router = useRouter();
  //----------
  const { data: session } = useSession();

  // console.log("this is session in ProductCard ", session?.user.userID);

  const userId = Number(session?.user.userID);
  //-----
  // const fetchOrderItem = async () => {
  //   try {
  //     // Assuming fetchOrderItemCustomerId is an asynchronous function that returns a promise
  //     const orderitems = await fetchOrderItemCustomerId1(userId);
  //     console.log(
  //       "orderitems 3.admin_cloth_nextjs13/app/shop/component/nav-bar-Shop/navbar-shop.tsx",
  //       orderitems.data
  //     );

  //     if (orderitems.data == !null) {
  //       initialAddOrderItem(orderitems.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching order item:", error);
  //   }
  // };
  // const { currentOrderItemPersist, increaseNewOrderItem1 } =
  //   useShopStorePersist();

  const { currentOrderItem, initialAddOrderItem } = useShopStorePersist();

  // useEffect(() => {}, [currentOrderItemPersist2]);
  useEffect(() => {
    // fetchOrderItem();
    setOrderItem(currentOrderItem);
  }, [currentOrderItem.length]);

  return (
    <div className="border-b sticky top-0 z-30 ">
      <div className="flex h-16 items-center">
        {/* <StoreSwitcher items={stores} /> */}
        <MainNavShop />
        <div className="ml-auto flex items-center space-x-4">
          {/* <SliderToggle selected={selected} setSelected={setSelected} /> */}
          <ThemesToogle />
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
        <Navbarcartbutton />
        <div>
          <FlyoutLink href="#" FlyoutContent={PricingContent}>
            Authen
          </FlyoutLink>
        </div>
      </div>
    </div>
  );
};

export default NavbarShop;

// const stores = await prismadb.store.findMany({
//   where: {
//     userId,
//   }
// });
