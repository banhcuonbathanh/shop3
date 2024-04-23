import React from "react";
import Image from "next/image";
interface IProps {
  iconUrl: string;
  title: string;
  description: string;
}

function TripStepCard({ iconUrl, title, description }: IProps) {
  return (
    <div className="flex  gap-8 items-center">
      <div>
        <Image
          src={iconUrl}
          alt="step icon"
          width={200}
          height={500}
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-lightGray text-[1rem] font-[700]">{title}</p>
        <p className="text-lightGray text-[1rem] font-[400]">{description}</p>
      </div>
    </div>
  );
}

export default TripStepCard;
