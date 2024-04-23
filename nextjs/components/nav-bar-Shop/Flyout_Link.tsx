import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import router from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
const FlyoutLink = ({
  children,
  href,
  FlyoutContent
}: {
  children: React.ReactNode;
  href: string;
  FlyoutContent?: React.ElementType;
}) => {
  const [open, setOpen] = useState(false);

  const showFlyout = FlyoutContent && open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className="relative text-gray-400 hover:text-primary">
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)"
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
        />
      </a>
      <AnimatePresence>
        {showFlyout && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-1/2 top-12 bg-white text-black"
          >
            <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
            <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
            <FlyoutContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingContent = () => {
  const routes = [
    {
      href: `/auth/page/login`,
      label: "sign in"
    },

    {
      href: `/auth/page/register`,
      label: "sign up"
    },

    {
      href: `https://bard.google.com/chat`,
      label: "bard"
    }
  ];
  const onCheckout = async () => {
    console.log("this is onCheckout FlyoutLink");
    await signOut();
  };
  return (
    <div className="w-40 p-6 shadow-xl bg-card">
      <Button variant={"secondary"} size={"lg"}>
        {"route.label"}
      </Button>
      <div className=" space-y-3 flex flex-col">
        {/* <h3 className="font-semibold">Authentication</h3> */}
        {routes.map((route) => (
          <Link key={route.href} href={route.href}>
            {/* {route.label} */}
            <Button variant={"link"} size={"lg"}>
              {route.label}
            </Button>
          </Link>
        ))}
      </div>

      <Button variant={"secondary"} size={"lg"} onClick={onCheckout}>
        {" "}
        sign out
      </Button>
      {/* <div className="mb-6 space-y-3">
        <h3 className="font-semibold">For Companies</h3>
        <a href="#" className="block text-sm hover:underline">
          Startups
        </a>
        <a href="#" className="block text-sm hover:underline">
          SMBs
        </a>
        <a href="#" className="block text-sm hover:underline">
          Enterprise
        </a>
      </div> */}
      {/* <button className="w-full rounded-lg border-2 border-neutral-950 px-4 py-2 font-semibold transition-colors hover:bg-neutral-950 hover:text-white">
        Contact sales
      </button> */}
    </div>
  );
};

// export default Flyout_Link_Nav_Bar_shop;
export { FlyoutLink, PricingContent };
