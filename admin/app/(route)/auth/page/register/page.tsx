"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";

import { useState, useTransition } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

// import { auth } from "../../../../auth";
import { Session } from "next-auth";
import { linkCustomer } from "@/lib/config";
import CustomInputField from "../../_component/form-field";
import { register } from "../../action/auth-action";
import { FormError } from "../../_component/form-error";
import { FormSuccess } from "../../_component/form-success";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
  email: z.string().email({
    message: "Invalid email address."
  }),
  phone_number: z.string().min(10, {
    message: "Phone number must be at least 10 digits."
  }),
  streetAddress: z.string().min(1, {
    message: "Street address must not be empty."
  })
});

export default function InputForm() {
  const [session, setsession] = useState<Session | null>(null);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      password: "",

      email: "",
      phone_number: "",
      streetAddress: ""
    }
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setError("");
    setSuccess("");
    console.log("this is onSubmit server action client");
    console.log(data);
    console.log("1 onSubmit");
    const test = await register(
      data.name,
      data.email,
      data.password,
      "",
      data.phone_number,
      data.streetAddress
    );
    console.log("test1212", test);
    console.log("test", test.message);
    // .then((data) => {
    //   console.log("data in onSubmit", data);

    if (test.message === "user created") {
      setSuccess(test.message);
      router.push(`/auth/page/login`);
    } else {
      setError(test.message);
    }
    // setSuccess(test?.success);
    // });
    console.log("2 onSubmit", test);
    // router.push(`/shop/product`);
  };
  //------------------

  return (
    <div className="flex flex-row items-center justify-center w-full h-screen p-10">
      <div className="  h-full md:w-1/2 space-y-30 w-full   ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-10  ">
              {/* user name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <CustomInputField
                    field={field}
                    placeholder="Name or nick "
                    label="Name or nick name"
                    description="fill your name or nick name."
                  />
                )}
              />
              {/* password */}
              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <CustomInputField
                    field={field}
                    placeholder="Password"
                    label="Password"
                    description="Enter your secure password."
                  />
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <CustomInputField
                    className="w-full"
                    field={field}
                    placeholder="email"
                    label="email"
                    description="Enter your email."
                  />
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <CustomInputField
                    field={field}
                    placeholder="phone_number"
                    label="phone_number"
                    description="Enter your phone_number."
                  />
                )}
              />
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <CustomInputField
                    field={field}
                    placeholder="streetAddress"
                    label="streetAddress"
                    description="Enter your streetAddress."
                  />
                )}
              />

              <FormError message={error} />
              <FormSuccess message={success} />
              {/* <button
                onClick={async () => {
                  console.log("button test1asdfsdf");
                  const test = await register(
                    "1121234",
                    "1211234",
                    "1211234",
                    "1212143",
                    "1241213",
                    "1214231"
                  );
                  console.log("button test2", test);
                }}
              >
                testsdfasd
              </button> */}

              <div className="w-full mt-6">
                {" "}
                <Button
                  // loading={isLoading}
                  type="submit"
                  className="w-full mt-6"
                  variant={"secondary"}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </Form>
        <p></p>

        <button
          onClick={async () => {
            router.push(`/auth/page/login`);
          }}
          className="mt-6 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 rounded shadow-md transition duration-300 ease-in-out"
        >
          Sign in
        </button>
      </div>
      <div className="sm:w-0 sm:h-0 md:w-full md:h-full relative flex items-center justify-center ">
        <Image
          src={linkCustomer.golang_Base + linkCustomer.signupImage}
          alt="img"
          className="w-[400px] h-full rounded-r-2xl md:block object-cover top-0 left-0 bottom-0 z-10 relative sm hidden"
          width={200}
          height={500}
        />
        <div className="absolute bottom-10 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block z-20 sm hidden">
          <span className="text-white text-xl">
            We've been using Untitle to kick
            <br />
            start every new project and can't
            <br />
            imagine working without it."
          </span>
        </div>
      </div>
    </div>
  );
}
