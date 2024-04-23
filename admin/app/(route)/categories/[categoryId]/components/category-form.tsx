"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
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
import { Category } from "@/types";
import { link_internal } from "@/lib/config";

const formSchema = z.object({
  Name: z.string().min(2)
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Category | null;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category." : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Name: ""
    }
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        const categoryId = params.categoryId; // Replace with the actual category ID
        const patchUrl =
          link_internal.routes_shop_admin_categories.categoryid +
          `/${categoryId}`;

        await axios.patch(patchUrl, data);
        // await axios.patch(
        //   `/api/shop_admin/categories/${params.categoryId}`,
        //   data
        // );
      } else {
        // await axios.post(`/api/shop_admin/categories`, data);
        const postUrl = link_internal.routes_shop_admin_categories.categoryid;

        await axios.post(postUrl, data);
      }
      router.refresh();
      router.push(
        link_internal.routes_shop_admin_categories_not_api.categoryid
      );
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      {initialData && (
        <div>
          <div className="flex items-center mb-4">
            <div>Category Name : {initialData.name}</div>
            {/* <div>{initialData ? initialData.name : "No Category Selected"}</div> */}
          </div>
          <Separator />
        </div>
      )}

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
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

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
