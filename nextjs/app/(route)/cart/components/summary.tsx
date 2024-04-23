"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

import { OrderItem } from "@/types";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { createOrderItem } from "../controller/cart-controller";
import { useShopCartNew } from "@/app/zustand/cart-zustand";

interface Summary {
  data: OrderItem[];
}
const Summary: React.FC<Summary> = ({ data }) => {
  const { currentOrderItem, reset } = useShopCartNew();
  const [orderitem, setOrderItem] = useState<OrderItem[]>([]);
  const { data: session } = useSession();
  const userId = session?.user.userID ?? "NA";
  let money: number = 0;

  let totalQuantity: number = 0;

  for (const item of data) {
    totalQuantity += item.Quantity;
  }

  for (const item of data) {
    money += item.Quantity * item.Product.price;
  }

  // const router = useRouter();
  const onCheckout = async () => {
    if (currentOrderItem.length > 0) {
      console.log("11111111111111111");

      const test = await createOrderItem(data, Number(userId));

      if (test === "ok") {
        console.log("asd;iofja;lsjflkajsdf asdfsadfsafd", test === "ok");
        toast.success("createOrderItem completed.");
        // router.push("/shop");
      }

      reset(() => {
        console.log(
          "18072364081237409817304871923749812374 3.admin_cloth_nextjs13/app/shop/cart/components/summary.tsx≈"
        );
      });

      toast.success("onCheckout completed.asdfas");
      setOrderItem([]);
      console.log("11111111111111111", currentOrderItem);
    } else {
      toast.success("no product was chose ");
    }
  };

  return (
    <div className="rounded-lg p-6 lg:col-span-5 border">
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between pt-4">
          <div className="text-base font-medium ">Order summary:</div>
          <h2 className="text-lg font-medium ">{totalQuantity}</h2>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-base font-medium ">Order total</div>
          <h2 className="text-lg font-medium ">{money}.000 VND</h2>
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={data.length === 0}
        className="w-full mt-6 dark:bg-orange-500"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
