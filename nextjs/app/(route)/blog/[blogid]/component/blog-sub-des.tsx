import { BlogSubDesGolang } from "@/types";
import React from "react";
import Image from "next/image";
const BlogSubDes = ({
  BlogSubDesGolang
}: {
  BlogSubDesGolang: BlogSubDesGolang[] | undefined;
}) => {
  return (
    <>
      {BlogSubDesGolang ? (
        BlogSubDesGolang.map((subDes, index) => (
          <div
            key={index}
            className={`flex flex-row mt-20 ${
              index % 2 === 0 ? "" : "flex-row-reverse"
            }`}
          >
            <Image
              src={subDes.ImageUrls}
              alt={subDes.Title}
              width={200}
              height={500}
              className="w-1/2"
            />
            <p className="pl-4">{subDes.Desc}</p>
          </div>
        ))
      ) : (
        <p>No blog sub-descriptions available.</p>
      )}
    </>
  );
};

export default BlogSubDes;
