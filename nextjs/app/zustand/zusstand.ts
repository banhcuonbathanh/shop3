import {
  Category,
  Product,
  Billboard,
  Order,
  OrderItem,
  OrderStatus
} from "@/types";

import { create } from "zustand";

interface ShopStore {
  ordersList: Order[];
  categoriesList: Category[];
  productList: Product[];
  activeCategory: Category | null;
  billboardList: Billboard[];
  activeBillboard: Billboard | null;
  categoryNameList: string[];
  addCategory1: (newCategories: Category[]) => void;
  addProduct: (newProducts: Product[]) => void;
  setActiveCategoryByName: (categoryName: string) => void;
  addBillboard: (newBillboards: Array<Billboard>) => void;
  setActiveBillboard: (billboard: Billboard | null) => void;
  generateCategoryNameList: () => void;
  filterProductsByCategory: (
    categoryName: string,
    products: Product[]
  ) => Product[];
  filterProductsByProductId: (productId: number) => Product | null;
  addItemToOrder: (orderItem: OrderItem) => void;

  // convertProductToOrderItem: (product: Product) => OrderItem;
  filterItemsWithQuantity: (newOrderItem: OrderItem[]) => OrderItem[];
}

const useShopStore = create<ShopStore>((set, get) => ({
  currentOrderItem: [],
  ordersList: [],
  categoriesList: [],
  productList: [],
  activeCategory: null,
  billboardList: [],
  activeBillboard: null,
  categoryNameList: [], // Array to hold category names

  generateCategoryNameList: () => {
    set((state) => {
      const categoryNames = state.categoriesList.map((category) => {
        return category.name;
      });

      // Convert the array of category names into a Set to remove duplicates
      const uniqueCategoryNames: string[] = [];
      new Set(categoryNames).forEach((name) => {
        uniqueCategoryNames.push(name);
      });

      return { categoryNameList: uniqueCategoryNames };
    });
  },

  addCategory1: (newCategories: Category[]) => {
    set((state) => ({
      categoriesList: [...state.categoriesList, ...newCategories]
    }));
  },

  addProduct: (newProducts: Product[]) => {
    set((state) => ({
      productList: [...state.productList, ...newProducts]
    }));
  },

  setActiveCategoryByName: (categoryName: string) => {
    set((state) => {
      const category = state.categoriesList.find(
        (cat) => cat.name === categoryName
      );
      if (category) {
        return { activeCategory: category };
      } else {
        return { activeCategory: null };
      }
    });
  },

  addBillboard: (newBillboards: Billboard[]) => {
    set((state) => ({
      billboardList: [...state.billboardList, ...newBillboards]
    }));
  },

  setActiveBillboard: (billboard: Billboard | null) => {
    set((state) => ({ activeBillboard: billboard }));
  },

  filterProductsByCategory: (categoryName: string, products: Product[]) => {
    return products.filter((product) => product.category.name === categoryName);
  },
  filterProductsByProductId: (productId: number) => {
    const state = get();

    const product = state.productList.find(
      (product) => product.id === Number(productId)
    );
    return product || null; // return null if no product is found
  },

  addItemToOrder: (orderItem: OrderItem) => {
    set((state) => {
      const ordersList = [...state.ordersList];

      // If the order already exists, update the order item quantity.
      const existingOrder = ordersList.find(
        (order) => order.id === orderItem.Product.id
      );
      if (existingOrder!) {
        existingOrder.orderItems.push(orderItem);
      } else {
        // Otherwise, create a new order and add the order item.
        const newOrder = {
          id: orderItem.Product.id,
          customerId: orderItem.Product.id, // TODO: Replace this with the actual customer ID.
          orderItems: [orderItem],
          shippingAddress: {
            name: "John Doe",
            streetAddress: "123 Main St",
            email: "john@example.com"
          },

          total: 0,
          status: OrderStatus.PENDING
        };
        // ordersList.push(newOrder);
      }

      return { ordersList };
    });
  },
  // convertProductToOrderItem: (product: Product): OrderItem => {
  //   const orderItem: OrderItem = {
  //     customerId: 1,
  //     orderItemId: product.id,
  //     quantity: 1,
  //     total: product.price,
  //     productID: product.id
  //   };
  //   return orderItem;
  // },

  filterItemsWithQuantity: (newOrderItem: OrderItem[]) => {
    return newOrderItem.filter((item) => item.Quantity > 0);
  }
}));

export default useShopStore;
