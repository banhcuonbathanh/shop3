"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { linkCustomer } from "@/lib/config";

// import useShopStore from "../../controller/zusstand";
// import { useEffect, useState } from "react";

export function MainNavShop({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  //---------
  // const [header, setHeader] = useState(false);
  // useEffect(() => {
  //   // This function is run when the component mounts and after every update (if there are any dependencies)
  //   const handleScroll = () => {
  //     console.log(" window.scrollY", window.scrollY, header);
  //     window.scrollY > 50 ? setHeader(true) : setHeader(false);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // This function is run before the component unmounts and before every update
  //   return () => window.removeEventListener("scroll", handleScroll);
  // });

  //---------
  const existingRoutes = [
    {
      href: `/product`,
      label: "product",
      active: `${params}` === "undefined" ? `/product` : `/product/${params}`
      // active: pathname === `/${params.storeId}/settings`
    },
    {
      href: `/cart`,
      label: "cart",
      active: `/cart`
    },
    {
      href: `/blog`,
      label: "blog",
      active: `/blog`
    }
  ];
  // const combinedRoutes = [...existingRoutes, ...categoryRoutes];
  const handleLinkClick = (href: string, label: string) => {
    // setActiveCategoryByName(label);
    // const category = categoriesList.find((category) => category.name === label);

    // router.push(href);
    router.push(`${href}`);
  };
  const linkImage = linkCustomer.golang_Base + linkCustomer.shopnavbarlogo;
  return (
    // <header
    //   className={`${
    //     true ? "py-4 shadow-lg dark:bg-accent" : "py-6 dark:bg-transparent"
    //   } sticky top-0 z-30 transition-all ${pathname === "/" && "bg-[#fef9f5]"}`}
    // >
    <div className={"flex items-center gap-x-6 "}>
      <Image
        src={linkImage}
        alt="logo"
        width={70}
        height={50}
        style={{ maxWidth: "auto", maxHeight: "auto" }}
      />
      {existingRoutes.map((route) => (
        // <span key={route.href}>

        <div key={route.href} className={"flex flex-col items-center gap-x-6"}>
          <Link
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === route.href
                ? "border-b-2 border-orange-500 transition-all ease-in-out duration-300 dark:text-white light:text-black"
                : "transition-all ease-in-out duration-300 text-muted-foreground"
            )}
            onClick={() => handleLinkClick(route.href, route.label)}
            style={{ cursor: "pointer" }} // Set cursor style for the link
          >
            {route.label}
            {/* </div> */}
          </Link>
        </div>
      ))}
    </div>
    // </header>
  );
}

{
  /* {existingRoutes.map((route) => (
        <span key={route.href}>
          <a
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white"
                : "text-muted-foreground"
            )}
            onClick={() => handleLinkClick(route.href, route.label)}
            style={{ cursor: "pointer" }} // Set cursor style for the link
          >
            {route.label}
          </a>
        </span>
      ))} */
}
{
  /* <div
            className={cn(
              "border-b-2 transition-opacity bg-orange-50",
              route.active ? "opacity-100" : "opacity-0"
            )}
            style={{ width: "fit-content" }}
          >
            &nbsp;
          </div> */
}
// {
//   href: `/${params.storeId}/settings`,
//   label: "Settings",
//   active: pathname === `/${params.storeId}/settings`
// },
// {
//   href: `/sign-in`,
//   label: "sign-in",
//   active: pathname === `/${params.storeId}/settings`
// },
// {
//   href: `/sign-up`,
//   label: "sign-up",
//   active: `/sign-up`
// },
// {
//   href: `/reading`,
//   label: "reading",
//   active: `/reading`
// },

{
  /* <div
              className={`${
                pathname === route.href
                  ? // pathname === route.href
                    "border-b-2 border-orange-500 transition-all ease-in-out duration-300 dark:text-white light:text-black"
                  : "transition-all ease-in-out duration-300"
              }`}
            > */
}
// ---------
// Inside the MainNavShop component

// const names: string[] = categoriesList.map((category) => category.name);
// const {
//   categoriesList,

//   setActiveCategoryByName
// } = useShopStore();
//-------
