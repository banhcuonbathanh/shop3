import Link from "next/link";
import Image from "next/image";
interface MenuPostProps {
  withImage?: boolean;
  title: string;
}

const MenuPost: React.FC<MenuPostProps> = ({ withImage, title }) => {
  return (
    <Link href="/" className="flex items-center gap-20">
      {withImage && (
        <div className="flex-1 aspect-w-1 aspect-h-1 relative">
          <Image
            src="/black.jpg"
            alt=""
            className="rounded-full border-3 border-gray-300 object-cover"
          />
        </div>
      )}
      <div className="flex-4 flex flex-col gap-5">
        <span className="px-3 py-1 rounded-lg text-white text-xs bg-ff7857">
          {title}
        </span>
        <h3 className="text-18 font-semibold text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h3>
        <div className="text-12">
          <span className="text-gray-500">John Doe</span>
          <span className="text-gray-500"> - 10.03.2023</span>
        </div>
      </div>
    </Link>
  );
};

export default MenuPost;
