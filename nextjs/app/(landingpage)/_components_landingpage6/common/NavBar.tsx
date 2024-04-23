"use client";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import MainButton from "./MainButton";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useStore } from "zustand";
import useNavTitle from "../../zustand/nav-controller";
import { linkCustomer } from "@/lib/config";

function NavBar() {
  const listTitle = [
    // {
    //   name: "Destination",
    //   hash: "#destinations"
    // },
    // {
    //   name: "Hotels",
    //   hash: "#hotels"
    // },
    // {
    //   name: "Flights",
    //   hash: "#flights"
    // },
    // {
    //   name: "Bookings",
    //   hash: "#bookings"
    // }
  ];
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  const { activateTitle, changeActive } = useStore(useNavTitle);

  const imageLogo =
    linkCustomer.golang_Base + linkCustomer.landingpagenavbarlogo;
  const imageHamburger =
    linkCustomer.golang_Base + linkCustomer.landingpagenavbarhumber;

  return (
    <div className="md:sticky md:top-0   md:shadow-none z-20 ">
      {/* DESKTOP */}
      <div className=" hidden lg:block animate-in fade-in zoom-in  p-4 ">
        <div className="flex justify-between items-center">
          <div>
            <Image
              src={imageLogo}
              alt="logo"
              width={200}
              height={500}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
            {/* {listTitle.map((title) => (
              <motion.li
                className="h-3/4 flex items-center justify-center relative"
                key={title.hash}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Link
                  className={clsx(
                    "flex w-full items-center justify-center px-3 py-3 hover:text-gray-950 transition  dark:hover:text-gray-300",
                    {
                      "text-blue-950": activateTitle === title.name
                    }
                  )}
                  href={title.hash}
                  onClick={() => {
                    // setActiveSection(link.name);
                    // setTimeOfLastClick(Date.now());
                  }}
                >
                  <p
                    key={title.name}
                    className={`hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-2`}
                  >
                    {title.name}
                  </p>
                </Link>
              </motion.li>
            ))} */}
            <Link
              href="/auth/page/login"
              className="hover:text-primary text-gray-500 font-[600] cursor-pointer flex items-center gap-2 "
            >
              Login
            </Link>

            <Link
              href="/auth/page/register"
              className="hover:text-primary hover:bg-gradient-to-r from-orange-500 text-gray-500 font-[600] cursor-pointer flex items-center gap-2 border py-2 px-3 rounded-full transition-colors duration-200"
            >
              Sign up
            </Link>

            {/* <div className="flex gap-2 items-center cursor-pointer">
              <p className="font-[700]">EN</p>
              <div>
                <Image
                  src="/images_landingpage6/chevron-down.png"
                  alt="chevron down"
                  width={20}
                  height={50}
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div
        className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[999]   py-4 animate-in fade-in zoom-in  ${
          menu ? " bg-primary py-2" : "bg-white"
        } `}
      >
        <div className="flex justify-between mx-[10px]">
          <div className="flex gap-[50px] text-[16px] items-center select-none">
            <Image
              src={imageLogo}
              alt="logo"
              className="w-[7rem]"
              width={200}
              height={500}
              style={{ width: "auto", height: "auto" }}
            />
          </div>
          <div className="flex items-center gap-[40px]">
            {menu ? (
              <X
                className="cursor-pointer animate-in fade-in zoom-in text-black"
                onClick={toggleMenu}
              />
            ) : (
              <Image
                src={imageHamburger}
                alt="logo"
                className="cursor-pointer animate-in fade-in zoom-in"
                onClick={toggleMenu}
                width={200}
                height={500}
                style={{ width: "auto", height: "auto" }}
              />
            )}
          </div>
        </div>
        {menu ? (
          <div className="my-8 select-none animate-in slide-in-from-right ">
            <div className="flex flex-col gap-8 mt-8 mx-4 ">
              <div className="flex gap-[20px] xl:gap-[50px] text-[16px] flex-col select-none ">
                <p
                  className={`hover:text-white text-navText font-[600] cursor-pointer flex items-center gap-2`}
                >
                  Destinations
                </p>
                <p
                  className={`hover:text-white text-navText font-[600] cursor-pointer flex items-center gap-2`}
                >
                  Hotels
                </p>
                <p
                  className={`hover:text-white text-navText font-[600] cursor-pointer flex items-center gap-2`}
                >
                  Flights
                </p>
                <p
                  className={`hover:text-white text-navText font-[600] cursor-pointer flex items-center gap-2`}
                >
                  Bookings
                </p>

                <Link
                  href="/auth/login"
                  className="hover:text-white text-navText font-[600] cursor-pointer flex items-center gap-2 "
                >
                  Login
                </Link>

                <MainButton
                  text="Sign up"
                  classes="bg-secondary hover:bg-secondary text-navText font-[600] shadow-none rounded-normal border border-none hover:text-white"
                />

                {/* <div className="flex gap-2 items-center cursor-pointer">
                  <p className="font-[700]">EN</p>
                  <div>
                    <Image
                      src="/images_landingpage6/chevron-down.png"
                      alt="chevron down"
                      width={10}
                      height={20}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
