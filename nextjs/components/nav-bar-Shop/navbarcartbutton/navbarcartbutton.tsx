import React, { useEffect, useState } from "react";

import { ShoppingBag } from "lucide-react";

import Link from "next/link";
import Navbarshoppingbagquantity from "./navbarshoppingbag";
export default function Navbarcartbutton() {
  return (
    <Link href={`/cart`}>
      <div className="flex flex-row px-6 text-gray-400 hover:text-primary">
        <ShoppingBag size={30} />
        <Navbarshoppingbagquantity />
      </div>
    </Link>
  );
}
