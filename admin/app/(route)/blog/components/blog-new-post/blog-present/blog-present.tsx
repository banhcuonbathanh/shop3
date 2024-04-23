import React from "react";
import Image from "next/image";
import BlogPara from "./blog-sub-des";
import Comments from "./blog-comment";
interface BlogProps {
  title: string;
  imageBlogUrl: string | null;
}

const BlogPresent: React.FC<BlogProps> = ({ title, imageBlogUrl }) => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-8 mt-10">{title}</h1>
      {imageBlogUrl && (
        <Image
          src={imageBlogUrl}
          alt="blog image"
          width={200}
          height={200}
          style={{ width: "auto", height: "auto" }}
        />
      )}

      <BlogPara />
      <Comments
        postSlug={0}
        BlogPostID={undefined}
        CategoryComment={undefined}
        onNewComment={function (newComment: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default BlogPresent;
