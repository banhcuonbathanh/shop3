import { create } from "zustand";
import { Product, Category, Color, Size } from "@/types";
import axios from "axios";
import { linkCustomer } from "@/lib/config";

interface ProductStore {
  productData: Product | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
  loading: boolean;
  setProductData: (data: Product | null) => void;
  setCategories: (data: Category[]) => void;
  setColors: (data: Color[]) => void;
  setSizes: (data: Size[]) => void;
  setLoading: (isLoading: boolean) => void;
  fetchColors: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchSizes: () => Promise<void>;
  fetchProducts: () => Promise<void>;
}

const useProductStore = create<ProductStore>((set) => ({
  // state
  productData: null,
  categories: [],
  colors: [],
  sizes: [],
  loading: true,
  // abstract functions
  setProductData: (data) => set({ productData: data }),
  setCategories: (data) => set({ categories: data }),
  setColors: (data) => set({ colors: data }),
  setSizes: (data) => set({ sizes: data }),
  setLoading: (isLoading) => set({ loading: isLoading }),
  // functions
  fetchColors: async () => {
    const getallColors =
      linkCustomer.golang_Base + linkCustomer.routes_color.getAllColors;
    try {
      const response = await axios.get(`${getallColors}`);

      if (response.data && response.status === 200) {
        const colorData = response.data.data;
        set({ colors: colorData } as ProductStore); // Update the state with the correct data type
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  },
  fetchCategories: async () => {
    console.log("this is fetchCategories in useProductStore ");
    try {
      const getallCategory =
        linkCustomer.golang_Base +
        linkCustomer.routes_categories.getAllCategories;
      const response = await axios.get(`${getallCategory}`);

      if (response.data && response.status === 200) {
        const categoryData = response.data.data;
        set({ categories: categoryData } as ProductStore); // Update the state with the correct data type
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  },
  fetchSizes: async () => {
    console.log("this is fetchSizes in useProductStore ");
    try {
      const getallSize =
        linkCustomer.golang_Base + linkCustomer.routes_size.getAllSizes;
      const response = await axios.get(`${getallSize}`);

      if (response.data && response.status === 200) {
        const sizeData = response.data.data;
        set({ sizes: sizeData } as ProductStore); // Update the state with the correct data type
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  },

  fetchProducts: async () => {
    console.log("this is productData in useProductStore ");
    try {
      const getAllProductsUrl =
        linkCustomer.golang_Base + linkCustomer.routes_products.getAllProducts;
      const response = await axios.get(`${getAllProductsUrl}`);

      if (response.data && response.status === 200) {
        const productData = response.data.data;
        console.log("this is productData in useProductStore ", productData);

        set({ productData: productData } as ProductStore); // Update the state with the correct data type
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}));

export default useProductStore;
