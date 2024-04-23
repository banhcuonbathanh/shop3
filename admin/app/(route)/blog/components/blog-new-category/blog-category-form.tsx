"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
// import { Billboard, Category } from "@prisma/client"
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { BlogCategory, Category } from "@/types";
import { link_internal } from "@/lib/config";
import {
  createBlogCategory,
  getAllBlogCategory
} from "../../blog-controller/controller";
import { DataTable } from "@/components/ui/data-table";
import { blogcategoryColumns } from "./compoent/columns-blog-category";

const formSchema = z.object({
  Name: z.string().min(2)
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
}

import React from "react";

export default function Blogcategoryform() {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: ""
    }
  });

  //----------------- fetch all category ------------------
  const [categoriesData, setCategories] = useState<BlogCategory[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBlogCategory();
        setCategories(data); // Now data is of type BlogCategory[]
      } catch (error) {
        console.error(error); // Handle errors appropriately
      } finally {
        setLoading(false); // Update loading state after fetching data
      }
    };

    fetchData();
  }, []);

  //----------------- create category ------------------
  const onSubmit = async (data: CategoryFormValues) => {
    console.log(
      " onSubmit  3.admin_cloth_nextjs13/app/shop_admin/(dashboard)/(route)/blog/components/blog-new-category/blog-category-form.tsx data.Name",
      data.Name
    );
    try {
      // await axios.post(`/api/shop_admin/categories`, data);

      const test = createBlogCategory("slug", data.Name, "imageurl");

      router.refresh();
      // router.push(
      //   link_internal.routes_shop_admin_categories_not_api.categoryid
      // );
      toast.success(" create blog category successfgdfgf");
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  //----------------- delete category ------------------
  const onDelete = async () => {
    try {
      setLoading(true);
      // await axios.delete(`/api/shop_admin/categories/${params.categoryId}`);
      const categoryId = params.categoryId; // Replace with the actual category ID
      const deleteUrl = `${link_internal.routes_shop_admin_categories.categoryid}/${categoryId}`;

      await axios.delete(deleteUrl);
      router.refresh();
      router.push(
        link_internal.routes_shop_admin_categories_not_api.categoryid
      );
      toast.success("Category deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div>
        <DataTable
          searchKey="Title"
          columns={blogcategoryColumns}
          data={categoriesData}
        />
        <Separator />
        <div className="flex items-center justify-between mt-10">
          {/* <Heading title={title} description={description} /> */}

          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <Separator />

        <div>
          <div className="flex items-center mb-4">
            <div>Category Name : </div>
            {/* <div>{initialData ? initialData.name : "No Category Selected"}</div> */}
          </div>
          <Separator />
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="md:grid md:grid-cols-3 gap-8">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Category blog name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <Button className="ml-auto" type="submit" variant={"secondary"}>
              {action}
            </Button> */}
          </form>
        </Form>
      </div>
    </>
  );
}

// const onSubmit = async (data: CategoryFormValues) => {
//   try {
//     // setLoading(true);
//     console.log(" this is category post shop admin ");
//     await axios.post(`/api/shop_admin/categories`, data);
//     // if (initialData) {
//     //   await axios.post(
//     //     `/api/categories`,
//     //     data
//     //   );
//     // } else {
//     //   await axios.post(`/api/${params.storeId}/categories`, data);
//     // }
//     // router.refresh();
//     // router.push(`/${params.storeId}/categories`);
//     toast.success(toastMessage);
//   } catch (error: any) {
//     toast.error("Something went wrong.");
//   } finally {
//     setLoading(false);
//   }
// };
// const onSubmit = async (data: CategoryFormValues) => {
//   try {
//     // setLoading(true);
//     console.log("this is category post shop admin");
//     const response = await axios.post(`/api/shop_admin/categories`, data);
//     // Handle the response here
//     console.log("Response data:", response.data);
//     toast.success(toastMessage);
//   } catch (error: any) {
//     if (error.response) {
//       // Server responded with a non-2xx status code
//       console.log("Server responded with an error:", error.response.data);
//       toast.error("Something went wrong.");
//     } else if (error.request) {
//       // Request was made but no response was received
//       console.log("No response received:", error.request);
//       toast.error("No response received.");
//     } else {
//       // Something else went wrong
//       console.log("Something else went wrong:", error.message);
//       toast.error("Something else went wrong.");
//     }
//   } finally {
//     // setLoading(false);
//   }
// };
