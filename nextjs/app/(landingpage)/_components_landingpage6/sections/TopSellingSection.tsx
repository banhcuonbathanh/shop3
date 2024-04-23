"use client";

import React, { useEffect } from "react";
import DestinationCard from "../cards/DestinationCard";
import { motion, useAnimate, useInView } from "framer-motion";
import { linkCustomer } from "@/lib/config";

function TopSellingSection() {
  const topSellingImage1Path =
    linkCustomer.golang_Base + linkCustomer.topsellingnavbarimage1;
  const topSellingImage2Path =
    linkCustomer.golang_Base + linkCustomer.topsellingnavbarimage2;
  const topSellingImage3Path =
    linkCustomer.golang_Base + linkCustomer.topsellingnavbarimage3;

  const [scope, animate] = useAnimate();

  const isInView = useInView(scope, {
    margin: "90%  0px 0px"
    // once: true
  });
  useEffect(() => {
    if (isInView) {
      animate(
        scope.current,
        {
          x: [-500, 500, 0],
          opacity: [0, 1],
          scale: [0.5, 1]
          // y: [-100, 0]
        },
        { duration: 1 }
      );
    }
  }, [isInView]);
  const destinations = [
    {
      id: 0,
      imageUrl: topSellingImage1Path,
      title: "Rome, Italy",
      amount: "$5.42k",
      duration: "10 Days Trip",
      highlighted: false
    },
    {
      id: 1,
      imageUrl: topSellingImage1Path,
      title: "London, UK",
      amount: "$4.2k",
      duration: "12 Days Trip",
      highlighted: false
    },
    {
      id: 2,
      imageUrl: topSellingImage1Path,
      title: "Full Europe",
      amount: "$15k",
      duration: "28 Days Trip",
      highlighted: true
    }
  ];
  return (
    <motion.section
      // className="mt-7"
      id="hotels"
      ref={scope}
      transition={{
        type: "spring",
        damping: 10,
        mass: 0.75,
        stiffness: 100
      }}
    >
      <p className="text-lightGray text-[1.125rem] font-[600] text-center mt-20">
        Top Selling
      </p>
      <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
        Top Destinations
      </p>
      <div className="flex flex-col gap-4 md:flex-row items-center md:justify-between mt-16 w-full">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            imageUrl={destination.imageUrl}
            title={destination.title}
            duration={destination.duration}
            amount={destination.amount}
            highlighted={destination.highlighted}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default TopSellingSection;
