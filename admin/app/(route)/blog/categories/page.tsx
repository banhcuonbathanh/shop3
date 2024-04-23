import { get_Blog_category_Shop } from "./blog-category-controller";
import { BlogCategoriesClient } from "./components/client";

const BlogCategoriesPage = async () => {
  const blogcategoriesData = await get_Blog_category_Shop();

  // console.log(
  //   "admin/app/(route)/blog/categories/page.tsx blogcategoriesData",
  //   blogcategoriesData
  // );
  return (
    <div className="flex-col">
      <BlogCategoriesClient data={blogcategoriesData} />
    </div>
  );
};

export default BlogCategoriesPage;
