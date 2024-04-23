"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";

const BreadcrumbComponent = () => {
  const paths: string = usePathname();

  const pathNames: string[] = paths.split("/").filter((path: string) => path);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {pathNames.length > 0 && <BreadcrumbSeparator />}
        {pathNames.map((link: string, index: number) => {
          //   console.log(
          //     "3.admin_cloth_nextjs13/components/breadcrumb/breadcrumb.tsx pathNames",
          //     pathNames
          //   );
          const href: string = `/${pathNames.slice(0, index + 1).join("/")}`;
          //   console.log(
          //     "3.admin_cloth_nextjs13/components/breadcrumb/breadcrumb.tsx href",
          //     href
          //   );
          const linkName: string =
            link[0].toUpperCase() + link.slice(1, link.length);

          const isLastPath: boolean = pathNames.length === index + 1;
          return (
            <div key={index} className="flex items-center">
              <BreadcrumbItem>
                {!isLastPath ? (
                  <BreadcrumbLink href={href}>{linkName}</BreadcrumbLink>
                ) : (
                  <BreadcrumbLink>{linkName}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLastPath && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
