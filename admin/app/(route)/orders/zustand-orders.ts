import { OrderItem, Product } from "@/types";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import toast from "react-hot-toast";

type ShopAdminOrderStore = {
  currentOrderItem: OrderItem[];
  addOrderItems: (newOrderItem: OrderItem[]) => void;
};

export const useAdminShopOrder = create<ShopAdminOrderStore>()(
  persist<ShopAdminOrderStore>(
    (set, get) => ({
      currentOrderItem: [],

      addOrderItems: (newOrderItem: OrderItem[]) => {
        console.log(
          "function addOrderItems useAdminShopOrder shop_admin/(dashboard)/(route)/orders/zustand-orders.ts",
          newOrderItem
        );
        set((state: ShopAdminOrderStore) => {
          const oldOrderItems = state.currentOrderItem;

          return {
            currentOrderItem: newOrderItem
          };
        });
      }
    }),
    {
      name: " admin shop store",
      skipHydration: true
    }
  )
);
