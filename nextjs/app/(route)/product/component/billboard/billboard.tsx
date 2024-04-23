"use client";

import { Billboard } from "@/types";
import Image from "next/image";
const BillboardPage: React.FC<{ data: Billboard }> = ({ data }) => {
  const imageUrl = data.imageUrl;
  // const billboard = await get_Billboard_Shop();

  return (
    <div className="relative w-full h-full">
      <Image
        src={data.imageUrl[0]}
        alt="black.jpg"
        className="h-full w-full hidden rounded-2xl md:block object-cover px-3"
        width={500}
        height={500}
        style={{ width: "500", height: "500" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg p-4 w-80">
          <p className="text-xl text-center">{data.label}</p>
        </div>
      </div>
    </div>
    // <div className="p-4 sm:p-6 lg:p-8 rounded-xl relative bg-slate-500">
    //   {/* <Image
    //     src={data.imageUrl[0]}
    //     alt="logo"
    //     width={100} // Relatively large width
    //     height={400} // Relatively large height
    //     className="h-full w-full hidden rounded-2xl md:block object-cover px-3"
    //   /> */}

    //   <div className="rounded-xl absolute aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover">
    //     <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
    //       <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs">
    //         {data.label}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default BillboardPage;
