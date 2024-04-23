import {  Product } from "@/types";

import ProductCard from "./product-card";
import {
  filterProductsByCategory,
  get_Categories_Shop,
  get_Product_Shop
} from "../../controller-product/controller-product";

const ProductList = async () => {
  const product = await get_Product_Shop();
  const categoriesList = await get_Categories_Shop();

  // generateCategoryNameList();

  const categories: string[] = categoriesList.map((category) => {
    return category.name;
  });
  const uniqueCategoryNames: string[] = [];
  new Set(categories).forEach((name) => {
    uniqueCategoryNames.push(name);
  });

  return (
    <div className="space-y-4">
      {uniqueCategoryNames.map((categoryName) => (
        <div key={categoryName}>
          <h1>{categoryName}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filterProductsByCategory(categoryName, product).map(
              (item: Product) => {
                return <ProductCard key={item.id} productData={item} />;
              }
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default ProductList;
