import { Product } from "@/types";
import ProductCard from "../component/product/product-card";
import NoResults from "./no-results";


interface ProductListProps {
  items: Product[];
}

const ProductListRelated: React.FC<ProductListProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} productData={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductListRelated;
