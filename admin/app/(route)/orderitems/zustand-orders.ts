// import { OrderItem } from "@/types";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// type ShopAdminOrderStore = {
//   currentOrderItem: OrderItem[];
//   addOrderItems: (newOrderItem: OrderItem[]) => void;
//   reset: (callback: Function) => void;
// };

// export const useAdminShopOrder = create<ShopAdminOrderStore>()(
//   persist<ShopAdminOrderStore>(
//     (set, get) => ({
//       currentOrderItem: [],

//       addOrderItems: (newOrderItem: OrderItem[]) => {
//         console.log(
//           "function addOrderItems useAdminShopOrder shop_admin/(dashboard)/(route)/orders/zustand-orders.ts",
//           newOrderItem
//         );
//         set((state: ShopAdminOrderStore) => {
//           const oldOrderItems = state.currentOrderItem;

//           return {
//             currentOrderItem: newOrderItem
//           };
//         });
//       },

//       reset: (callback: Function) => {
//         set((state: ShopAdminOrderStore) => {
//           console.log(
//             "function addOrderItems useAdminShopOrder shop_admin/(dashboard)/(route)/orders/zustand-orders.ts resetttt"
//           );
//           return {
//             currentOrderItem: []
//           };
//         });

//         callback();
//       }
//     }),
//     {
//       name: "admin shop store",
//       skipHydration: true
//     }
//   )
// );
