import { get_Category_Shop } from "./category-controller";
import { CategoriesClient } from "./components/client";

const CategoriesPage = async () => {
  const categoriesData = await get_Category_Shop();
  return (
    <div className="flex-col">
      <CategoriesClient data={categoriesData} />
    </div>
  );
};

export default CategoriesPage;
