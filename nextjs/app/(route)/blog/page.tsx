import Container from "@/components/ui/container";
import Featured from "./component/featured/Featured";
import CategoryList from "./component/categoryList/CategoryList";
import CardList from "./component/cardList/CardList";
import Menu from "./component/Menu/Menu";
import { getServerSession } from "next-auth/next";
import { getAuthSession, options } from "@/app/api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import { get_blog_post } from "./blog-controller/controller";
// import { findAllBlogPosthop } from "@/action/blog-post-shop";
const BlogsPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/auth/page/login?callbackUrl=/server");
  }

  const blog = await get_blog_post();

  const reversedBlog = blog.reverse();

  return (
    <Container>
      <Featured blogPost={reversedBlog[0]} />

      <CategoryList />

      <div className="flex gap-10">
        <div className="flex-1">
          <CardList />
        </div>
        <div className="flex-1">
          <Menu />
        </div>
      </div>
    </Container>
  );
};

export default BlogsPage;
