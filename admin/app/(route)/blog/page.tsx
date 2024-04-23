import { get_Product_Shop } from "../products/controller";
import { BlogsClient } from "./components/main-body-component/blog-client";
// import { BillboardColumn } from "@/app/shop_admin/types";

const BillboardsPage = async () => {
  const products = await get_Product_Shop();

  return (
    <div className="flex-col">
      <BlogsClient data={products} />
    </div>
  );
};

export default BillboardsPage;
