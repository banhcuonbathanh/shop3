"use client";
import Image from "next/image";
import React from "react";
import MainButton from "../common/MainButton";
import { motion } from "framer-motion";
import { linkCustomer } from "@/lib/config";

function HeroSection() {
  const imagestyleunserline =
    linkCustomer.golang_Base + linkCustomer.landingpagenavbarstylistunserline;

  const lady = linkCustomer.golang_Base + linkCustomer.landingpagenavbarlady;
  return (
    <motion.section
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "tween",
        duration: 0.2
      }}
      className="flex justify-between items-center mt-16 md:z-[9999]"
    >
      <div className="pt-32 md:pt-4">
        <p className="text-[1.128rem] font-[700] text-primary uppercase mb-4">
          Best Destinations around the world
        </p>
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: [-100, 100, 0] }}
          transition={{ ease: "easeOut", duration: 1, stiffness: 125 }}
          className="flex flex-col"
        >
          <div className="volkhov font-[700] text-[3rem] md:text-[4.73756rem] leading-large inline-flex text-lightBlue">
            Travel,
            <div className="flex  flex-col">
              <span className="ml-8 z-10">enjoy</span>
              <Image
                src={imagestyleunserline}
                alt="stylish underline"
                className="-mt-4 z-0 hidden md:block"
                width={200}
                height={500}
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>

          <p className="volkhov font-[700] text-[3rem] md:text-[4.73756rem] leading-large inline-flex text-lightBlue">
            and live a new and full life
          </p>
        </motion.div>

        <p className="my-[1.6rem] font-bold leading-[1.692rem] text-lightGray text-[1rem]">
          Built Wicket longer admire do barton vanity itself do in it. Preferred
          to sportsmen it engrossed listening. Park gate sell they west hard for
          the.
        </p>

        <div className="flex gap-6 items-center ">
          <div>
            <MainButton
              text="Find out more"
              classes="bg-secondary text-white font-[600] shadow-none rounded-[0.564rem] border-none hover:bg-secondary  w-[9.58788rem] h-[3rem]"
            />
          </div>
          {/* <div className="flex items-center mt-6 hover:cursor-pointer">
            <Image
              src="/images_landingpage6/play-shadow.png"
              alt="rounded play icon with shadow"
              width={200}
              height={500}
            />
            <p className="text-lightGrayAlt -mt-6">Play Demo</p>
          </div> */}
        </div>
      </div>
      <div className="hidden md:block">
        <Image
          src={lady}
          alt="girl with phone with aircrafts on the background"
          width={500}
          height={500}
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </motion.section>
  );
}

export default HeroSection;
