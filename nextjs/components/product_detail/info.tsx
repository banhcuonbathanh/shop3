"use client";

import { Expand, Minus, Plus, ShoppingCart } from "lucide-react";

import { OrderItem, Product } from "@/types";

import { Button } from "@/components/ui/button";

import { MouseEventHandler } from "react";
import { useSession } from "next-auth/react";
import router from "next/router";
import IconButton from "../icon-button";
import { useShopCartNew } from "@/app/zustand/cart-zustand";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const {
    currentOrderItem,

    decrease,
    increase
  } = useShopCartNew();

  const { data: session } = useSession();

  const userId = session?.user.userID ?? "NA";
  const onIncrease: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (userId === "NA") {
      console.log("User ID is not available.");
      router.push(`/auth/page/login`);
    } else {
      increase(data, Number(userId));
    }
  };

  const onDecrease1: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (userId === "NA") {
      console.log("User ID is not available.");
      router.push(`/auth/page/login`);
    } else {
      decrease(data.id);
      // router.push(`/shop/cart`);
    }
  };
  // const onAddToCart = () => {
  //   cart.addItem(data);
  // };

  const currentOrderItemPage = currentOrderItem.find(
    (orderItem: OrderItem) => orderItem.ProductID === data.id
  );

  const color = data.color.value;
  return (
    <div>
      <h1 className="text-3xl font-bold">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl"></p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold ">Size:</h3>
          <div>{data?.size?.value}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold ">Color:</h3>
          <div
            className="h-6 w-6 rounded-full "
            style={{ backgroundColor: color }}
          />
        </div>
      </div>

      <div className="flex gap-x-6 mb-5 mt-10">
        <IconButton
          onClick={onIncrease}
          icon={<Plus size={20} className="text-gray-600" />}
        />

        <p className="text-sm text-white">{currentOrderItemPage?.Quantity}</p>
        <IconButton
          onClick={onDecrease1}
          icon={<Minus size={20} className="text-gray-600" />}
        />
      </div>

      {/* <div className="mt-10 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className="flex items-center gap-x-2 dark:bg-orange-300 dark:text-white light:bg-white light:text-black"
        >
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div> */}
    </div>
  );
};

export default Info;
