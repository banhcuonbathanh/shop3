import Image from "next/image";
import { BlogPost } from "@/types";

const PostAthur: React.FC<{ blogPost: BlogPost }> = ({ blogPost }) => {
  // console.log("3.admin_cloth_nextjs13/app/shop/blog/[blogid]/component/pic-title-time.tsx blogPost", blogPost)
  return (
    <div className="flex items-center gap-4">
      {blogPost.slug && (
        <div className="w-12 h-12 relative">
          <Image
            src={blogPost.slug}
            alt=""
            className="rounded-full"
            width={500}
            height={500}
          />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{blogPost.slug}</span>
        <span className="text-sm text-gray-500">01.01.2024</span>
      </div>
    </div>
  );
};

export default PostAthur;
