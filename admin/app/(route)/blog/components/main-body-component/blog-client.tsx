"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";
import ProductUpdatePage from "../../[blogId]/page";
import CreateBlogPostPage from "../create-blog-post-page/page";
import { ProductColumn } from "@/types";

interface BlogsClientProps {
  data: ProductColumn[];
}

export const BlogsClient: React.FC<BlogsClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  // console.log(" this thi data in client trong product table ", data);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`blog (${data.length})`}
          description="Manage products for your store"
        />
        {/* <Button onClick={() => router.push(`/shop_admin/products/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New product
        </Button> */}
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      {/* <Heading title="Create product" description="API Calls for Products" /> */}
      <Separator />

      <CreateBlogPostPage />
    </>
  );
};
