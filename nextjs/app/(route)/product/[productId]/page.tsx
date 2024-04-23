import Gallery from "@/components/product_detail/gallery";
import Info from "@/components/product_detail/info";
import Container from "@/components/ui/container";
import {
  fetchProductsById,
  get_Product_Shop
} from "../controller-product/controller-product";
import { Product } from "@/types";
import ProductListRelated from "./product-list-related";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: number;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const id = params.productId;

  const products = await get_Product_Shop();
  console.log(
    "3.admin_cloth_nextjs13/app/shop/product/[productId]/page products",
    products
  );
  console.log(
    "3.admin_cloth_nextjs13/app/shop/product/[productId]/page id",
    id
  );
  function findProductById(products: Product[], productId: number) {
    return products.find((product) => product.id === productId);
  }

  const product = findProductById(products, Number(id));
  console.log(
    "3.admin_cloth_nextjs13/app/shop/product/[productId]/page ",
    product
  );
  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {product && <Gallery images={product.imageUrls} />}

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            {product && <Info data={product} />}
          </div>
        </div>
        <hr className="my-10" />
        {/* <ProductListRelated items={product} /> */}
      </div>
    </Container>
  );
};

export default ProductPage;

// const { filterProductsByCategory, productList } = useShopStore();

// const products = productList.find(
//   (product) => product.id === Number(params.productId)
// );

// console.log(" ProductPage 3", products);
// if (products === null || products === undefined) {
//   return null; // Return a loader, error message, or anything suitable for when data is loading or unavailable.
// }

// console.log(" ProductPage 4");
// const suggestedProducts =
//   products && products.category && products.category.name
//     ? filterProductsByCategory(products.category.name, productList)
//     : [];

// console.log(" ProductPage 5");
// console.log(" ProductPage", products);
