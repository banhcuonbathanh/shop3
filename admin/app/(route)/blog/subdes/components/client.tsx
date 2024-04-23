"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns } from "./columns";

import { BlogSubDes } from "@/types";
import BlogSubDesPage from "../page";
import BlogSubDesForm from "../[subdesId]/page";

interface BlogSubDesClientProps {
  data: BlogSubDes[];
}

export const BlogSubDesClient: React.FC<BlogSubDesClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      {data?.length > 0 && (
        <div className="flex flex-col">
          <Heading
            title={`blog sub des (${data.length})`}
            description="Manage categories for your store"
          />

          <DataTable searchKey="name" columns={columns} data={data} />
        </div>
      )}
      <Separator />

      <BlogSubDesForm />
    </>
  );
};
