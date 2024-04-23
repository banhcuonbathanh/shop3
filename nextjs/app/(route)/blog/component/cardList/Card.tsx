import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";

interface CardProps {
  item: BlogPost;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const desc = item.desc[0].Desc;
  return (
    <div
      className=" rounded-lg overflow-hidden shadow-lg p-6 mb-4 flex gap-5 border"
      key={item.id}
    >
      {item.slug && (
        <div className="w-1/2 h-64 mb-4">
          <Image
            src={item.slug}
            alt=""
            className="object-cover w-full h-full rounded-lg"
            width={200}
            height={200}
          />
        </div>
      )}
      <div className=" w-1/2 ">
        <div className="flex items-center justify-between mb-2 ">
          {/* <span className="text-sm">
            {item.created_at}{" "}
            <span
              className={`py-1 px-2 rounded-lg bg-${item.title} text-white text-sm font-semibold`}
            >
              {item.title}
            </span>
          </span> */}
        </div>
        <Link href={`/blog/${item.id}`}>
          <h1 className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-500">
            {item.title}
          </h1>
        </Link>
        <p>{desc}</p>
        <Link
          href={`/blog/${item.id}`}
          className="text-blue-500 font-semibold hover:underline"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
