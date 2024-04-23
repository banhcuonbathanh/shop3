import Description from "./[subdesId]/components/description";
import { get_Blog_Sub_des_Shop } from "./blog-category-controller";
import { BlogSubDesClient } from "./components/client";

const BlogSubDesPage = async () => {
  const blogcategoriesData = await get_Blog_Sub_des_Shop();

  console.log(
    "admin/app/(route)/blog/categories/page.tsx blogcategoriesData",
    blogcategoriesData
  );
  return (
    <div className="flex-col">

      <BlogSubDesClient data={blogcategoriesData} />
      <Description />
    </div>
  );
};

export default BlogSubDesPage;
