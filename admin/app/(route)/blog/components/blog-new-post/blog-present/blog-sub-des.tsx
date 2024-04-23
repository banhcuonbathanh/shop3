"use client";

import React from "react";
import Image from "next/image";
import { useBlogStorePersist } from "../../../blog-controller/zusstand";
export default function BlogPara() {
  const { blogSubDes } = useBlogStorePersist();

  console;
  return (
    <>
      {blogSubDes.map((subDes, index) => (
        <div
          key={index}
          className={`flex flex-row mt-20 ${
            index % 2 === 0 ? "flex-row-reverse" : ""
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
      ))}
    </>
  );
}
