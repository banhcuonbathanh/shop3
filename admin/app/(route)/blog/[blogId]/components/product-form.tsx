"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
// import ImageUpload from "@/components/ui/image-upload";
import { Checkbox } from "@/components/ui/checkbox";
import { Category, Color, Product, Size } from "@/types";
import { linkCustomer, link_internal } from "@/lib/config";

import {
  deleteImageControllerProduct,
  onSubmitControllerToCreateProduct
} from "../../blog-controller/controller";
import ImageUploadZoneProduct from "./image_upload_zone_product";
import { useUploadStore } from "@/components/use-hook-shop-admin/use-upload-image";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.string().array(),
  price: z.coerce.number().min(1),
  CategoryName: z.string().min(1),
  ColorName: z.string().min(1),
  SizeName: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: (Product & {}) | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  sizes,
  colors
}) => {
  const { acceptedFiles, setAcceptedFiles, upload_picture } = useUploadStore();
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save changes" : "Create";
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>("");
  const defaultValues: ProductFormValues = {
    name: "",
    images: [],
    price: 0,
    CategoryName: "",
    ColorName: "",
    SizeName: "",
    isFeatured: false,
    isArchived: false
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  const onSubmit = async (data: ProductFormValues) => {
    const getCategoryNameById = (categoryId: string) => {
      const category = categories.find(
        (category) => category.id.toString() === categoryId
      );
      console.log(" this is number in category", category);
      return category ? category.name : "Category Not Found";
    };

    const productName = data.name;
    const category = getCategoryNameById(data.CategoryName);
    const serverLink = linkCustomer.golang_Base;
    const link_pic_onserver = await upload_picture(
      category,
      productName,
      acceptedFiles,
      serverLink
    );
    console.log("this is onSubmitController");
    await onSubmitControllerToCreateProduct(data, link_pic_onserver);
  };

  const onDrop = (newAcceptedFiles: File[]) => {
    // Handle duplicate files or any other logic as needed
    setAcceptedFiles([...acceptedFiles, ...newAcceptedFiles]);
  };
  const onremove = (index: number) => {
    // Implement logic to remove the image at the specified index
    const updatedFiles = [...acceptedFiles];
    updatedFiles.splice(index, 1); // Remove the image at the given index
    setAcceptedFiles(updatedFiles); // Update the state with the modified array
  };

  // Using a ternary conditional to assign a default value when initialData?.category is null or undefined
  const categoryString = initialData?.category
    ? initialData.category
    : "No Category";
  const sizeString = initialData?.size ? initialData.size : "No size";
  const colorString = initialData?.color ? initialData.color : "No color";
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          console.log("this is delete in product form");
        }}
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {initialData && (
            <div>
              <div className="flex items-center mb-4">
                <div>product Name : {initialData.name}</div>
                {/* <div>{initialData ? initialData.name : "No Category Selected"}</div> */}
              </div>
              <Separator />
            </div>
          )}
          {initialData && (
            <div>
              <div className="flex items-center mb-4">
                <div>Category Name : {initialData.name}</div>
                {/* <div>{initialData ? initialData.name : "No Category Selected"}</div> */}
              </div>
              <Separator />
            </div>
          )}

          {initialData && (
            <div>
              <div className="flex items-center mb-4">
                <div>Product Price : {initialData.price}</div>
                {/* <div>{initialData ? initialData.name : "No Category Selected"}</div> */}
              </div>
              <Separator />
              <div className="flex items-center mb-4">
                <div>Product Category: {categoryString as string}</div>
              </div>
              <Separator />
              <div className="flex items-center mb-4">
                <div>Product size: {sizeString as string}</div>

                {/* <div>{initialData ? initialData.name : "No Category Selected"}</div> */}
              </div>
              <Separator />

              <div className="flex items-center mb-4">
                <div>Product color : {colorString as string}</div>
                {/* <div>{initialData ? initialData.name : "No Category Selected"}</div> */}
              </div>
              <Separator />
            </div>
          )}

          {initialData && (
            <div>
              <div className="flex items-center mb-4">
                {initialData.imageUrls.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-md overflow-hidden"
                  >
                    <div className="absolute z-10 right-0 top-0">
                      <button
                        onClick={() => {}}
                        className="bg-red-500 p-2 rounded-full text-white text-xs"
                      >
                        X
                      </button>
                    </div>
                    <Image
                      src={image as string}
                      alt="Description of the image"
                      width={500} // Desired width
                      height={300} // Desired height
                    />
                  </div>
                ))}
              </div>
              <Separator />
            </div>
          )}

          {initialData && (
            <div>
              <div className="flex items-center mb-4">
                <div>Product feature : {initialData.isFeatured}</div>
                {/* <div>{initialData ? initialData.name : "No Category Selected"}</div> */}
              </div>
              <Separator />
            </div>
          )}
          {initialData && (
            <div>
              <div className="flex items-center mb-4">
                <div>Product archived : {initialData.isArchived}</div>
                {/* <div>{initialData ? initialData.name : "No Category Selected"}</div> */}
              </div>
              <Separator />
            </div>
          )}
          <ImageUploadZoneProduct
            acceptedFiles={acceptedFiles}
            onDrop={onDrop}
            onRemove={onremove}
          />

          <div className="md:grid md:grid-cols-3 gap-8">
            {NameForm(form, loading)}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CategoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="SizeName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={String(size.id)}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ColorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={String(color.id)}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
interface FormType {
  control: any; // replace 'any' with the actual type
  // include other properties of 'form' here
}

function NameForm(form: FormType, loading: boolean) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input disabled={loading} placeholder="Product name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
