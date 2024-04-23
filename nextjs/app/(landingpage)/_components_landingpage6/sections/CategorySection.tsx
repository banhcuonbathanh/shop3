"use client";

import React from "react";
import CatergoryCard from "../cards/CatergoryCard";
import { motion, useInView, useAnimationControls } from "framer-motion";
import { useRef, useEffect } from "react";
const variants = {
  hidden: { opacity: 0, x: -100, scale: 0.5 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 1 } }, // Add transition for 1 second duration
  hover: { scale: 1.1 }
};
function CategorySection() {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimationControls();

  const isInView = useInView(ref, { margin: "-80% 0px -20% 0px " });
  console.log("this is CategorySection in landing page 6 isInView", isInView);
  console.log(
    "this is CategorySection in landing page 6 isInView useEffect ref.current",
    ref.current
  );

  // controls.set({ opacity: 0 });
  // controls.start({ opacity: 0.5 });
  useEffect(() => {
    if (isInView && ref.current) {
      controls.start("visible"); // Start the animation to the "visible" variant
    }
  }, [isInView]);

  const features = [
    {
      id: 0,
      iconUrl: "/images_landingpage6/satellite.png",
      title: "Calculated Weather",
      description:
        "Built Wicket longer admire do barton vanity itself do in it.",
      highlighted: false
    },
    {
      id: 1,
      iconUrl: "/images_landingpage6/aircraft.png",
      title: "Best Flights",
      description:
        "Engrossed listening. Park gate sell they west hard for the.",
      highlighted: true
    },
    {
      id: 2,
      iconUrl: "/images_landingpage6/mic.png",
      title: "Local Events",
      description:
        "Barton vanity itself do in it. Preferd to men it engrossed listening. ",
      highlighted: false
    },
    {
      id: 3,
      iconUrl: "/images_landingpage6/cog.png",
      title: "Customization",
      description:
        "We deliver outsourced aviation services for military customers",
      highlighted: false
    }
  ];

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden" // Set initial state to "hidden"
      animate={controls}
    >
      <p className="text-lightGray text-[1.125rem] font-[600] text-center">
        Category
      </p>
      <p className="volkhov text-[3.125rem] text-title font-[700] text-center">
        We Offer Best Services
      </p>
      <div className="flex flex-col gap-4 md:flex-row justify-between w-full mt-16">
        {features.map((feature) => (
          <CatergoryCard
            key={feature.id}
            iconUrl={feature.iconUrl}
            title={feature.title}
            description={feature.description}
            highlighted={feature.highlighted}
          />
        ))}
      </div>
    </motion.section>
  );
}

export default CategorySection;
