"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import CategoryPage from "../[categoryId]/page";
import { CategoryBlog } from "@/types";

interface CategoriesClientProps {
  data: CategoryBlog[];
}

export const BlogCategoriesClient: React.FC<CategoriesClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();
  console.log("admin/app/(route)/blog/categories/components/client.tsx", data);
  return (
    <>
      {data?.length > 0 && (
        <div className="flex flex-col">
          <Heading
            title={`blog category (${data.length})`}
            description="Manage categories for your store"
          />

          <DataTable searchKey="name" columns={columns} data={data} />
        </div>
      )}
      <Separator />

      <CategoryPage
        params={{
          categoriesData: data[0]
        }}
      />
    </>
  );
};