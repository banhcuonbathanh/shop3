import { OrderItem, Product } from "@/types";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import toast from "react-hot-toast";

type ShopStore = {
  currentOrderItem: OrderItem[];

  isAdd: boolean;
  increaseNewOrderItem2: (newOrderItem: OrderItem) => void;
  initialAddOrderItem: (neworderitem: OrderItem[]) => void;
  findOrderItemById: (productID: number) => void;
  addOrderItem: (neworderitem: OrderItem) => void;

  decrease: (productID1: number) => void;
  increase: (product: Product, customerID: number) => void;

  reset: (callback: Function) => void;
};

export const useShopStorePersist = create<ShopStore>()(
  persist<ShopStore>(
    (set, get) => ({
      currentOrderItem: [],
      isAdd: false,

      addItem: (newOrderItem: OrderItem) => {
        const currentItems = get().currentOrderItem;
        const existingItem = currentItems.find(
          (item) => item.ProductID === newOrderItem.ProductID
        );

        if (existingItem) {
          return toast("Item already in cart.");
        }

        set({
          currentOrderItem: [...get().currentOrderItem, newOrderItem]
        });
        toast.success("Item added to cart.");
      },
      addOrderItem: (newOrderItem: OrderItem) => {
        set((state: ShopStore) => {
          const oldOrderItems = state.currentOrderItem;

          // Add the new order item to the existing order items
          const updatedOrderItems = [...oldOrderItems, newOrderItem];

          return {
            currentOrderItem: updatedOrderItems
          };
        });
      },
      // addOrderItem: (neworderitem: OrderItem) => {
      //   set((state: ShopStore) => ({

      //     currentOrderItemPersist2: [...neworderitem]
      //   }));
      // },
      initialAddOrderItem: (neworderitem: OrderItem[]) => {
        set((state: ShopStore) => ({
          currentOrderItem: [...neworderitem]
        }));
      },
      increaseNewOrderItem2: (newOrderItem: OrderItem) => {
        set((state: ShopStore) => {
          const oldOrderItems = state.currentOrderItem || [];
          const existingOrderItem = oldOrderItems.find(
            (oldOrderItem) => oldOrderItem.ID === newOrderItem.ID
          );
          if (existingOrderItem) {
            existingOrderItem.Quantity += 1;
            return {
              currentOrderItem: [...oldOrderItems]
            };
          } else {
            return {
              currentOrderItem: [...oldOrderItems, newOrderItem]
            };
          }
        });
      },
      findOrderItemById: (productID1: number) => {
        return set((state: ShopStore) => {
          const oldOrderItems = state.currentOrderItem;

          const existingOrderItem = oldOrderItems.find(
            (orderItem: OrderItem) => orderItem.Product.id === productID1
          );

          if (existingOrderItem) {
            existingOrderItem.Quantity += 1;

            return {
              currentOrderItem: [...oldOrderItems]
            };
          } else {
            state.isAdd = true;
            return {
              currentOrderItem: [...oldOrderItems]
            };
          }
        });
      },

      decrease: (productID1: number) => {
        return set((state: ShopStore) => {
          // get current order items
          const oldOrderItems = state.currentOrderItem;
          // check if product with id is in order item or not
          const existingOrderItem = oldOrderItems.find(
            (orderItem: OrderItem) => orderItem.Product.id === productID1
          );

          if (existingOrderItem) {
            if (existingOrderItem.Quantity > 0) {
              existingOrderItem.Quantity -= 1;
            }

            return {
              currentOrderItem: [...oldOrderItems]
            };
          } else {
            state.isAdd = true;
            return {
              currentOrderItem: [...oldOrderItems]
            };
          }
        });
      },

      increase: (product: Product, customerID: number) => {
        return set((state: ShopStore) => {
          const oldOrderItems = state.currentOrderItem;

          // Find the existing order item or create a new one with all required properties
          const existingOrderItemIndex = oldOrderItems.findIndex(
            (orderItem: OrderItem) => orderItem.Product.id === product.id
          );

          let existingOrderItem: OrderItem;

          if (existingOrderItemIndex !== -1) {
            existingOrderItem = oldOrderItems[existingOrderItemIndex];
          } else {
            existingOrderItem = {
              ID: Date.now(), // Generate a unique ID for the new item
              UserID: customerID, // Assign customer ID if applicable
              ProductID: product.id, // Assuming ProductID is the correct property name
              OrderID: 0, // Assign order ID if applicable
              CreatedAt: new Date().toISOString(), // Set creation timestamp
              DpdatedAt: new Date().toISOString(), // Set update timestamp
              Product: product, // Assign the entire product object
              Quantity: 0,
              Total: product.price // Calculate total based on quantity and price
              // ...other required properties
            };
          }

          // Increase the quantity
          existingOrderItem.Quantity += 1;

          // Update the total if applicable
          if (existingOrderItem.Total) {
            existingOrderItem.Total =
              existingOrderItem.Quantity * product.price;
          }

          // Create a new array with updated order items
          const updatedOrderItems = [...oldOrderItems];

          // Update or add the item at the correct index
          if (existingOrderItemIndex !== -1) {
            updatedOrderItems[existingOrderItemIndex] = existingOrderItem;
          } else {
            updatedOrderItems.push(existingOrderItem); // Add to the end if new
          }

          return {
            currentOrderItem: [...updatedOrderItems]
          };
        });
      },

      reset: (callback: Function) => {
        set((state: ShopStore) => {
          console.log(
            "function addOrderItems useAdminShopOrder shop_admin/(dashboard)/(route)/orders/zustand-orders.ts resetttt"
          );
          return {
            currentOrderItem: []
          };
        });

        callback();
      }
    }),
    {
      name: "shop store",
      skipHydration: true
    }
  )
);
