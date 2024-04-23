"use client";

import NextImage from "next/image";
import { Tab } from "@headlessui/react";

import GalleryTab from "./gallery-tab";

interface GalleryProps {
  images: String;
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <p>this is GalleryProps</p>
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          <GalleryTab key={1} image={images as String} />
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        <Tab.Panel key={1}>
          <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
            <NextImage
              fill
              src={"/black.jpg"}
              alt="Image"
              className="object-cover object-center"
            />
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
