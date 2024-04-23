import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  // const data = await getData();
  const data = [
    {
      id: "category1-id",
      slug: "technology",
      title: "Technology",
      img: "/bag.jpg",
      Posts: [
        // This array would contain associated posts for the Technology category if any
      ]
    },

    // Category 2
    {
      id: "category2-id",
      slug: "science",
      title: "Science",
      img: "/bag.jpg",
      Posts: [
        // This array would contain associated posts for the Science category if any
      ]
    },

    {
      id: "category3-id",
      slug: "travel",
      title: "Travel",
      img: "/bag.jpg",
      Posts: [
        // This array would contain associated posts for the Travel category if any
      ]
    }
  ];
  return (
    <div className="">
      <h1 className="mt-12 mb-0 text-xl">Popular Categories</h1>
      <div className="flex flex-wrap justify-between gap-5">
        {data?.map((item) => (
          <Link
            href="/blog?cat=style"
            className={`flex items-center gap-2 capitalize w-1/5 h-20 justify-center rounded-2xl ${
              item.slug === "style" ? "bg-blue-300" : "" // Replace the condition with corresponding slug checks for other backgrounds
            }`}
            key={item.id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={70}
                height={70}
                className="rounded-full"
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
