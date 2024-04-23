import { create, useStore } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

interface NavTitle {
  activateTitle: string;
  changeActive: (item: string) => void;
}

const useNavTitle = create<NavTitle>((set, get) => ({
  activateTitle: "Hotels",

  changeActive: (item: string) => {
    console.log("");

    set({
      activateTitle: item
    });
  }
}));

export default useNavTitle;
