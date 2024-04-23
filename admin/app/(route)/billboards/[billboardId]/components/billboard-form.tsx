"use client";

import React, { useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash } from "lucide-react";

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

import { Billboard } from "@/types";

import ImageUploadZone from "./image_upload";

import { useUploadStore } from "@/components/use-hook-shop-admin/use-upload-image";
import { linkCustomer, link_internal } from "@/lib/config";
import { onSubmitControllerToCreateBillboard } from "../../billboard-controller/billboard-controller";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  label: z.string().min(1),
  images: z.string().array()
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: (Billboard & {}) | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard." : "Add a new billboard";
  const toastMessage = initialData
    ? "Billboard updated."
    : "Billboard created.";
  const action = initialData ? "Save changes" : "Create";
  const defaultValues: BillboardFormValues = {
    label: "", // Corrected property name from 'lable' to 'label'
    images: []
  };

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      images: []
    }
  });
  // -------------
  const { acceptedFiles, setAcceptedFiles, upload_picture } = useUploadStore();

  // const serverLink = "http://localhost:8888";

  // Make sure this is a string
  // upload_picture(title1, acceptedFiles, serverLink)
  //   .then((uploadedUrls) => {
  //     // Handle the uploaded URLs here
  //   })
  //   .catch((error) => {
  //     // Handle any errors
  //   });

  const onSubmit = async (data: BillboardFormValues) => {
    console.log("this is on submit in billboard form");
    const billboardLabel = data.label;
    const serverLink = linkCustomer.golang_Base;
    const link_pic_onserver = await upload_picture(
      billboardLabel,
      billboardLabel,
      acceptedFiles,
      ""
    );
    console.log(" this is in onSubmit billboards asdf", link_pic_onserver);

    onSubmitControllerToCreateBillboard(data, link_pic_onserver);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `${link_internal.routes_shop_admin_billboards.billboardid}${params.billboardId}`
      );
      router.refresh();
      router.push(
        `${link_internal.routes_shop_admin_billboards_not_api.billboardid}`
      );
      toast.success("Billboard deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  // drop zone ---------------
  const [serverPicLink, setserverPicLink] = useState<string[]>([]);
  // add new ------------------

  const onDrop = (newAcceptedFiles: File[]) => {
    // Handle duplicate files or any other logic as needed
    setAcceptedFiles([...acceptedFiles, ...newAcceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });
  const onremove = (index: number) => {
    // Implement logic to remove the image at the specified index
    const updatedFiles = [...acceptedFiles];
    updatedFiles.splice(index, 1); // Remove the image at the given index
    setAcceptedFiles(updatedFiles); // Update the state with the modified array
  };
  //
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
      {initialData && (
        <div>
          <div className="flex items-center mb-4">
            <div>billboard Name : {initialData.label}</div>
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <ImageUploadZone
            acceptedFiles={acceptedFiles}
            onDrop={onDrop}
            onRemove={onremove}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
// };
// const upload_picture = async (
//   acceptedFiles: File[],
//   title: string
// ): Promise<string[]> => {
//   const uploadedUrls: string[] = [];

//   try {
//     for (let index = 0; index < acceptedFiles.length; index++) {
//       const file = acceptedFiles[index];
//       console.log(`Uploading file ${index + 1} of ${acceptedFiles.length}`);
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("title", title); // Add the billboard field

//       const response = await axios.post(
//         "http://localhost:8888/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data"
//           }
//         }
//       );

//       console.log(
//         `File ${index + 1} uploaded successfully:`,
//         response.data.url
//       );

//       const listor = link.golang_Base;
//       const data = listor + response.data.url;
//       console.log("alskjdflaskjdfl data trong uppload file link");
//       console.log(data);
//       uploadedUrls.push(data);
//     }

//     // Reset acceptedFiles to an empty array

//     setAcceptedFiles([]);
//     setserverPicLink(uploadedUrls);
//     return uploadedUrls;
//   } catch (error) {
//     console.error("File upload error:", error);
//     return [];
//   }
// };

{
  /* <button
        onClick={async () => {
          const link_pic_onserver = await upload_picture(
            acceptedFiles,
            "test123123"
          );

          console.log(
            " THIS IS LINKG OF PICTURE ON SERVER from button upload picture",
            link_pic_onserver
          );

          setserverPicLink(link_pic_onserver);
        }}
      >
        {" "}
        test upload file picture{" "}
      </button> */
}

// add new ------------------
// original on drop workiing well==================

// const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
// const onDrop = useCallback(
//   (newAcceptedFiles: File[], fileRejections: FileRejection[]) => {
//     console.log(" this is inside useCallback trong billboar form 1");

//     const duplicateFiles = newAcceptedFiles.filter((newFile) => {
//       return acceptedFiles.some((existingFile) => {
//         return newFile.name === existingFile.name;
//       });
//     });
//     console.log(" this is inside useCallback trong billboar form 2");
//     if (duplicateFiles.length === 0) {
//       console.log(" this is inside useCallback trong billboar form 3");

//       setAcceptedFiles([...acceptedFiles, ...newAcceptedFiles]);
//     }

//     console.log(" this is inside useCallback trong billboar form 4");
//     console.log(acceptedFiles);
//     // Handle file rejections if needed
//   },
//   [acceptedFiles]
// );

// original on drop workiing well==================
