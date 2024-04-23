import BreadcrumbComponent from "@/components/breadcrumb";
import { BlogPost, BlogSubDesGolang } from "@/types";
import Image from "next/image";
import Link from "next/link";
type FeaturedProps = {
  blogPost: BlogPost;
};
const Featured = ({ blogPost }: FeaturedProps) => {
  console.log(
    "3.admin_cloth_nextjs13/app/shop/blog/component/featured/Featured.tsx",
    blogPost.desc
  );

  const blogPostdesc: BlogSubDesGolang[] = blogPost.desc;
  return (
    <div className="mt-8 md:mt-12 lg:mt-16  ">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center">
        <b> {blogPost.title}</b>
      </h1>
      <div className="mt-12 md:mt-16 lg:mt-20 flex flex-col  gap-4">
        <div className="flex-1 md:hidden lg:flex items-center justify-center relative">
          <Image
            src={blogPost.slug}
            width={200}
            height={200}
            alt="Picture of the author"
            style={{ width: "auto", height: "auto" }}
          />
        </div>
        <div className="flex-1">
          <p className="text-lg md:text-xl font-light mt-4 lg:mt-6">
            {blogPostdesc[0].Desc}
          </p>

          <Link
            href={{
              pathname: `/blog/${blogPost.id}`,
              query: {
                tittle: blogPost.title,

                id: blogPost.id
              }
            }}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;

// img: "http://localhost:8888/uploads/c1/p2/black.jpg",
