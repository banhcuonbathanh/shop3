"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { OrderItem, Product } from "@/types";

import { useSession } from "next-auth/react";

import IconButton from "@/components/icon-button";

import { useShopCartNew } from "@/app/zustand/cart-zustand";

import { PreviewProductModal } from "@/components/custommodal/preview-product-modal";
import { usePreviewProductZustand } from "@/components/custommodal/use-preview-product-zustand";

interface ProductCard {
  productData: Product;
}

const ProductCard: React.FC<ProductCard> = ({ productData }) => {
  const { data: session } = useSession();
  const userId = session?.user.userID;

  const {
    currentOrderItem,

    decrease,
    increase
  } = useShopCartNew();
  // const {
  //   currentOrderItem,

  //   decrease,
  //   increase,

  // } = useShopStorePersist();
  // console.log(
  //   "this is ProductCard, product currentOrderItem",
  //   currentOrderItem[0]
  // );
  const currentOrderItemPage = currentOrderItem.find(
    (orderItem: OrderItem) => orderItem.ProductID === productData.id
  );
  // const currentOrderItemPage = currentOrderItem.find(
  //   (orderItem: OrderItem) => orderItem.Product?.id === productData.id
  // );
  //

  const onIncrease: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (userId === "NA") {
      router.push(`/auth/page/login`);
    } else {
      increase(productData, Number(userId));
      // router.push(`/shop/cart`);
    }
  };

  const onDecrease1: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (userId === "NA") {
      console.log("User ID is not available.");
      router.push(`/auth/page/login`);
    } else {
      decrease(productData.id);
      // router.push(`/shop/cart`);
    }
  };
  const { onOpen, setProduct } = usePreviewProductZustand();
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    setProduct(productData);
    onOpen();
  };
  // const onDecrease: MouseEventHandler<HTMLButtonElement> = onDecreaseCartHook(
  //   decrease,
  //   productData,
  //   currentOrderItem,

  //   initialAddOrderItem
  // );

  const router = useRouter();

  const goToDetailProduct = () => {
    // console.log("product-card.tsx currentOrderItem", currentOrderItem);
    router.push(`product/${productData?.id}`);
  };

  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      {/* Image & actions */}

      <PreviewProductModal />
      <div className="aspect-square rounded-xl bg-primary relative">
        <Image
          src={productData.imageUrls[0]}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
          sizes="(min-width: 640px) 640px, 100vw"
          onClick={goToDetailProduct}
        />

        <div className="flex flex-col opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center mb-5">
            <IconButton
              onClick={onPreview}
              icon={
                <Expand size={20} className="text-gray-400 hover:text-black" />
              }
            />

            <IconButton
              onClick={onIncrease}
              icon={
                <Plus size={20} className="text-gray-400 hover:text-black" />
              }
            />
            <IconButton
              onClick={onDecrease1}
              icon={
                <Minus size={20} className="text-gray-400  hover:text-black" />
              }
            />
          </div>
        </div>
      </div>
      {/* Description */}

      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold dark:text-black ligh:text-white text-lg">
            {productData.name}
          </p>
          <p className="text-sm dark:text-gray-500 text-gray-500">
            {productData.category?.name}
          </p>
        </div>
        <div>
          <p className="font-semibold text-lg self-start dark:text-black ">
            {productData.price}
          </p>
          <p className="text-sm text-gray-500">
            {currentOrderItemPage?.Quantity}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;

// function onDecreaseCartHook(
//   decrease: (productID1: number) => void,
//   data: Product,
//   currentOrderItemPersist2: OrderItem[],
//   initialAddOrderItem: (neworderitem: OrderItem[]) => void
// ): MouseEventHandler<HTMLButtonElement> {
//   return async (event) => {
//     const [orderitem, setOrderItem] = useState<OrderItem[]>([]);
//     console.log("ProductCard onDecrease");
//     decrease(data.id);
//     const updateedOrderItem = currentOrderItemPersist2.find(
//       (item) => item.ProductID === data.id
//     );
//     console.log(
//       "ProductCard onDecrease currentOrderItemPersist2",
//       currentOrderItemPersist2
//     );
//     if (updateedOrderItem !== undefined) {
//       await updateOrderItem(updateedOrderItem.id!, updateedOrderItem);
//       const updatedOrder = await fetchOrderItemCustomerId(1);

//       setOrderItem(updatedOrder.data);

//       initialAddOrderItem(updatedOrder.data);
//     }
//     event.stopPropagation();
//   };
// }
// const ontest: MouseEventHandler<HTMLButtonElement> = (event) => {
//   console.log(" ontest");
//   event.stopPropagation();
//   const sampleProduct: Product = {
//     id: 1,
//     category: { id: 1, name: "Electronics" },
//     name: "Smartphone",
//     price: 599.99,
//     isFeatured: true,
//     size: {
//       id: 1,
//       name: "Medium",
//       value: "M",
//       createdAt: "2023-11-14T00:00:00Z"
//     },
//     color: {
//       id: 1,
//       name: "Black",
//       value: "#000000",
//       createdAt: "2023-11-14T00:00:00Z"
//     },
//     imageUrls: ["url1", "url2"],
//     isArchived: false,
//     createdAt: "2023-11-14T00:00:00Z",
//     discount: 10
//   };

//   const sampleOrderItem: OrderItem = {
//     customerId: 123,
//     total: 599.99,
//     quantity: 1,
//     orderItemId: 1,
//     product: sampleProduct,
//     productID: 1
//   };

//   addOrderItem(sampleOrderItem);

//   console.log("ontest ProductCard", currentOrderItemPersist2);
// };
