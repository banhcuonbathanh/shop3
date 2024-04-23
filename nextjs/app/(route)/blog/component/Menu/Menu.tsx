import React from "react";
import styles from "./menu.module.css";
import Link from "next/link";
import Image from "next/image";
import MenuPosts from "../menuPosts/MenuPosts";
import MenuCategories from "../menuCategories/MenuCategories";

const Menu = () => {
  return (
    <div className="flex-2 mt-20">
      <h2 className="text-gray-500 text-sm font-normal">{"What's hot"}</h2>
      <h1 className="text-2xl">Most Popular</h1>
      <MenuPosts withImage={false} />
      <h2 className="text-gray-500 text-sm font-normal">Discover by topic</h2>
      <h1 className="text-2xl">Categories</h1>
      <MenuCategories />
    </div>
  );
};

export default Menu;
