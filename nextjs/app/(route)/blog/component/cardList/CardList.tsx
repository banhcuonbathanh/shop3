import React from "react";
import styles from "./cardList.module.css";

import Image from "next/image";

// import { Pagination } from "@tanstack/react-table";

import { CategoryBlog, Post, UserBlog } from "@/types";
import Card from "./Card";
import { get_blog_post } from "../../blog-controller/controller";

const CardList = async () => {
  const user: UserBlog = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    emailVerified: "2023-12-01T08:00:00.000Z",
    image: "http://localhost:8888/uploads/c1/p2/black.jpg",
    accounts: [],
    sessions: [],
    Post: [],
    Comment: []
  };

  const category: CategoryBlog = {
    id: "1",
    slug: "technology",
    title: "Technology",
    img: "http://localhost:8888/uploads/c1/p2/black.jpg",
    Posts: []
  };

  const post: Post = {
    id: "1",
    createdAt: "2023-12-02T08:00:00.000Z",
    slug: "new-technology-trends",
    title: "New Technology Trends",
    desc: "Exploring the latest trends in technology.",
    img: "http://localhost:8888/uploads/c1/p2/black.jpg",
    views: 1500,
    catSlug: "technology",
    cat: category,
    userEmail: "john@example.com",
    user: user,
    comments: []
  };

  const posts: Post[] = [post, { ...post, id: "2" }, { ...post, id: "3" }];
  const blog = await get_blog_post();

  const reversedBlog = blog.reverse();
  return (
    <div className="flex-5">
      <h1 className="my-10 text-4xl">Recent Posts</h1>
      <div className="flex flex-col gap-5">
        {reversedBlog?.map((item) => {
          return <Card item={item} key={item.id} />;
        })}
      </div>
      {/* <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} /> */}
    </div>
  );
};

export default CardList;
