import { ProductsClient } from "./components/client";

import { get_Product_Shop } from "./controller";

const ProductsPage = async () => {
  const products = await get_Product_Shop();

  return (
    <div className="flex-col">
      
      <ProductsClient data={products} />
      
      
      </div>
  );
};
export default ProductsPage;