import Image from "next/image";

import { BlogComment, BlogPost, CategoryBlog, Post, UserBlog } from "@/types";
import Menu from "../component/Menu/Menu";
import PostAthur from "./component/pic-title-time";
import { useSearchParams } from "next/navigation";
// import { findAllBlogPosthop } from "@/action/blog-post-shop";
import BlogSubDes from "./component/blog-sub-des";

import Comments from "./component/comment";

import ListComment from "./component/list-commnet";
import { useEffect, useState } from "react";
import {
  FindAllCommentsByPostIDController,
  get_blog_post
} from "../blog-controller/controller";

interface Params {
  blogid: string;

  // or whatever type it should be
}

const SingleBlogPage = async ({ params }: { params: Params }) => {
  const blogPosts = await get_blog_post();

  console.log("nextjs/app/(route)/blog/[blogid]/page.tsx blogPosts", blogPosts);
  const blogId = params.blogid;

  const blogPost = blogPosts.find((blog) => blog.id === Number(blogId));
  const blogsubdes = blogPost?.desc;

  // console.log("nextjs/app/(route)/blog/[blogid]/page.tsx blogPost", blogPost);
  return (
    <div className="container mx-auto px-4 lg:px-0 max-w-screen ">
      <div className="flex flex-row gap-8 ">
        <div className="  w-2/3">
          <h1 className="text-4xl lg:text-6xl font-bold mb-8 text-center mt-4">
            {blogPost?.title}
          </h1>

          <Image
            src={blogPost?.slug || "default_image_path"}
            alt=""
            className=" w-full h-80 mb-10"
            width={100}
            height={200}
          />

          <div className="flex flex-row gap-4 ">
            <div className="  w-full">
              <div className="mb-4 mt-4 " />
              <BlogSubDes BlogSubDesGolang={blogsubdes} />
              <Comments
                postSlug={1}
                BlogPostID={blogPost?.id}
                CategoryComment={blogPost?.categoryTitle}
                // onNewComment={function (newComment: string): void {
                //   console.log(
                //     "this is reload fucntion in 3.admin_cloth_nextjs13/app/shop/blog/[blogid]/page.tsx"
                //   );
                //   window.location.reload();
                // }}
              />
         
            </div>
          </div>
        </div>

        <div className="w-1/3">
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPage;
