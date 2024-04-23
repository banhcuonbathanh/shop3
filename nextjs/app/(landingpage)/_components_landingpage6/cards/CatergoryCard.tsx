import React from "react";
import Image from "next/image";
interface IProps {
  iconUrl: string;
  title: string;
  description: string;
  highlighted: boolean;
}

function CatergoryCard({ iconUrl, title, description, highlighted }: IProps) {
  return (
    <div
      className={`flex relative flex-col gap-4 items-center p-[2.5rem] ${
        highlighted ? "bg-white shadow-md rounded-[2.5rem]" : ""
      }`}
    >
      <div>
        <Image
          src={iconUrl}
          alt="category card icon"
          className="h-[80px]"
          width={200}
          height={500}
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <p className="text-subtitle text-[1.2rem] font-[600]">{title}</p>
      <p className="text-lightGray text-[1rem] font-bold">{description}</p>
      {highlighted && (
        <div className="absolute -bottom-8 -left-10 -z-10">
          <Image
            src="/images_landingpage6/rectangle-shape.png"
            alt="rectangle shape"
            width={200}
            height={500}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}

export default CatergoryCard;
