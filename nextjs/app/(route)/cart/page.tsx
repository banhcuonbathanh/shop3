"use client";

import { useEffect, useState } from "react";

import Summary from "./components/summary";

import Container from "@/components/ui/container";

import { OrderItem } from "@/types";

import CartItem from "./components/cart-item";
import { useShopCartNew } from "@/app/zustand/cart-zustand";

export const revalidate = 0;

const CartPage = () => {
  const { currentOrderItem } = useShopCartNew();
  // const [orderItems, setOrderItem] = useState<OrderItem[]>([]);
  const [orderitem, setOrderItem] = useState<OrderItem[]>([]);
  useEffect(() => {
    // fetchOrderItem();
    setOrderItem(currentOrderItem);
  }, [currentOrderItem.length]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log(currentOrderItem);
  }, [currentOrderItem]);
  // console.log(
  //   " 3.admin_cloth_nextjs13/app/shop/cart/page.tsx currentOrderItem",
  //   currentOrderItem
  // );
  useEffect(() => {
    setIsMounted(true);
    useShopCartNew.persist.rehydrate();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    // <div className="bg-white">
    <Container>
      <div className="px-4 py-16 sm:px-2 lg:px-2">
        <h1 className="text-3xl font-bold ">Shopping Cart</h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            {orderitem.length === 0 && (
              <p className="text-neutral-500">No items added to cart.</p>
            )}
            <ul>
              {orderitem.map((item) => (
                <CartItem key={item.Product.id} data={item} />
              ))}
            </ul>
          </div>
          <Summary data={orderitem} />
        </div>
      </div>
    </Container>
    // </div>
  );
};

export default CartPage;
