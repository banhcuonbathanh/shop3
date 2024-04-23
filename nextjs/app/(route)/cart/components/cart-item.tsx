import Image from "next/image";
import { toast } from "react-hot-toast";
import { Expand, Minus, Plus, X } from "lucide-react";

import { OrderItem, Product } from "@/types";
import IconButton from "./icon-button";
import { useShopStorePersist } from "@/app/zustand/home-zustand";
import useCart from "../../../zustand/cart/cart-zustand";

interface CartItemProps {
  data: OrderItem;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const { findOrderItemById, decrease } = useShopStorePersist();

  const onAddToCart = () => {
    findOrderItemById(data.Product.id);
  };

  const onAddToDcrease = () => {
    decrease(data.Product.id);
  };
  const onRemove = () => {
    cart.removeItem("data.id");
  };
  const listData: string[] = ["name 1", "name 2", "name 3"];
  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.Product.imageUrls[0]}
          alt=""
          className="object-cover object-center"
        />
      </div>

      <div className="pl-4 flex flex-row flex-grow justify-between">
        <div className="flex flex-col sm:flex-row">
          <p className="text-gray-500 px-2 sm:h-8 h-auto sm:border-l sm:border-gray-200 ">
            Name: {data.Product.name}
          </p>
          <p className="text-gray-500 px-2 sm:h-8 h-auto sm:border-l sm:border-gray-200">
            Color: {data.Product.color.name}
          </p>
          <p className="text-gray-500 px-2 sm:h-8 h-auto sm:border-l sm:border-gray-200">
            Size: {data.Product.size.value}
          </p>
          <p className="text-gray-500 px-2 sm:h-8 h-auto sm:border-l sm:border-gray-200">
            Quantity: {data.Quantity}
          </p>
        </div>

        <div className="flex flex-row gap-4">
          <IconButton
            className="text-gray-600 h-10"
            onClick={onAddToCart}
            icon={<Plus size={20} className="text-gray-600 h-8" />}
          />
          <IconButton
            className="text-gray-600 h-10"
            onClick={onAddToDcrease}
            icon={<Minus size={20} className="text-gray-600 h-8" />}
          />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
