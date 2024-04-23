"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNavShopAdmin({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/`,
      label: "Overview",
      active: pathname === `/${params.storeId}`
    },
    {
      href: `/users`,
      label: "Users",
      active: pathname === `/${params.storeId}`
    },
    {
      href: `/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`
    },
    {
      href: `/categories`,
      label: "Categories",
      active: pathname === `/shop_admin/categories`
    },
    {
      href: `/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`
    },
    {
      href: `/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`
    },
    {
      href: `/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`
    },
    {
      href: `/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`
    },
    {
      href: `/orderitems`,
      label: "orderitems",
      active: pathname === `/${params.storeId}/orders`
    },
    {
      href: `/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`
    },
    {
      href: `/shop/product`,
      label: "Shop",
      active: pathname === `/${params.storeId}/settings`
    },
    {
      href: `/blog`,
      label: "Blog",
      active: pathname === `/${params.storeId}/settings`
    }
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === route.href
              ? "border-b-2 border-orange-500 transition-all ease-in-out duration-300 dark:text-white light:text-black"
              : "transition-all ease-in-out duration-300 text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
