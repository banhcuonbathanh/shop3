"use client";

import { useShopCartNew } from "@/app/zustand/cart-zustand";

import React from "react";

export default function Navbarshoppingbagquantity() {
  const { currentOrderItem } = useShopCartNew();

 
  //------------
  // const [orderitem, setOrderItem] = useState<OrderItem[]>([]);
  // const { currentOrderItem1, initialAddOrderItem } = useShopStorePersist();
  // useEffect(() => {
  //   // fetchOrderItem();
  //   setOrderItem(currentOrderItem);
  // }, [currentOrderItem.length]);
  return (
    <span className="ml-1">
      {currentOrderItem.length === null || currentOrderItem.length === 0
        ? 0
        : currentOrderItem.length}
    </span>
  );
}
