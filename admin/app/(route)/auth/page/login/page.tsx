"use client";
import { redirect } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { useState } from "react";
// import { login } from "@/app/auth/action/auth-action";
// import signUpController from "../auth-controller";
import { linkCustomer } from "@/lib/config";
import CustomInputField from "../../_component/form-field";
// import { signIn } from "@/auth";

const FormSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters."
  }),
  email: z.string().email({
    message: "Invalid email address."
  })
});
interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

// console.log({ searchParams });
// console.log("this is logindsfasfsda searchParams", searchParams);
// const { data: session, update } = useSession();

// console.log("session useSession", session);

// const { data: session } = useSession();

// console.log("this is logindsfasfsda session", session);
// const session = await getSession();
// console.log("this is login session ", session);
// console.log("this is  login page sessionsadasdasdasd");
// const { data: session, status } = useSession();
// console.log("this is  login page sessionsadasdasdasd", session);
// const { data: session, status } = useSession();
// const { data: session } = useSession({
//   required: true,
//   onUnauthenticated() {
//     redirect("/shop/product?callbackUrl=/client");
//   }
// });
// console.log(
//   "this is session on login page session, status ",
//   session,
//   status
// );
// const { data: session } = useSession({
//   required: true,
//   onUnauthenticated() {
//     console.log("this is inside session ", session);
//     // redirect("/api/auth/signin?callbackUrl=/client");
//   }
// });
export default function InputForm({ searchParams }: Props) {
  const [error, setError] = useState<string | undefined>("");

  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",

      email: ""
    }
  });
  //-------- swr
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setError("");
    console.log(
      "this is sign in credential in submit login page await getSession()ZXZx"
    );

    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });
    if (response?.error) {
      console.log("onSubmit login response response?.error", response?.error);
      setError(response.error);
      return;
    }

    console.log("onSubmit login response", response);
    // const ytetestsyt = await getSession();
    // // const { data: session } = useSession();
    // console.log("this is useSession on submit", ytetestsyt);

    router.push(`/`);
  };

  //--------swr
  // controller

  return (
    <div className="flex flex-row items-center justify-center w-full h-screen   p-10">
      <div className="flex flex-col justify-center w-full h-screen px-6 mb">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              {/* user name */}

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
                    customOnChange={() => {
                      console.log(
                        "this is function in CustomInputField",
                        error
                      );
                      if (error !== "") {
                        setError("");
                      }
                    }}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <CustomInputField
                    field={field}
                    placeholder="email"
                    label="email"
                    description="Enter your email."
                    customOnChange={() => {
                      console.log(
                        "this is function in CustomInputField",
                        error
                      );
                      if (error !== "") {
                        setError("");
                      }
                    }}
                  />
                )}
              />
              <p>{error}</p>
              {/* <p> this is error {signupError}</p> */}
              <Button
                // loading={loading}
                type="submit"
                className="w-full mt-6"
                variant={"secondary"}
              >
                login
              </Button>
            </form>
          </Form>
        </div>

        <button
          onClick={async () => {
            router.push(`/auth/page/register`);
          }}
          className="mt-6 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 rounded shadow-md transition duration-300 ease-in-out"
        >
          Sign up
        </button>
      </div>

      <div className="relative w-full h-full">
        <Image
          src={linkCustomer.golang_Base + linkCustomer.loginImage}
          alt="black.jpg"
          className="h-full w-full hidden rounded-2xl md:block object-cover px-3"
          width={200}
          height={500}
          // style={{ width: "auto", height: "auto" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg p-4 w-80">
            <p className="text-xl text-center">
              We've been using Untitle to kick start every new project and can't
              imagine working without it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

//   <div>
//     <Image src="/orange.png" fill className="w-200 h-200" alt={""} />
//   </div>
// "use client";

// import Link from "next/link";
// import { FormEvent } from "react";
// import { signIn } from "next-auth/react";
// import axios from "axios";
// export default function Register() {
//   const sendData = async () => {
//     try {
//       const response = await axios.post("http://localhost:8080/api/tags", {
//         Name: "1212121111112aaaaa"
//       });

//       if (response.status === 200) {
//         console.log("Data sent successfully:", response.data);
//       }
//     } catch (error) {
//       console.log("An error occurred:", error);
//     }
//   };

//   async function handleSubmit(e: FormEvent) {
//     console.log("this is sing up");
//     e.preventDefault();
//     const form = new FormData(e.target as HTMLFormElement);

//     const res = await fetch("/api/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         username: form.get("username"),
//         password: form.get("password")
//       })
//     });
//     const data = await res.json();
//     if (!data.user) return null;
//     await signIn("credentials", {
//       username: data.user.username,
//       password: form.get("password"),
//       callbackUrl: "/"
//     });
//   }

//   return (
//     <div className="container mx-auto p-4 flex-col justify-center">
//       <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
//         <h2>Register</h2>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" name="username" required />
//         <label htmlFor="password">Password:</label>
//         <input type="password" id="password" name="password" required />
//         <button
//           type="submit"
//           className="self-start p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//         <button
//           onClick={sendData}
//           className="self-start p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           test
//         </button>
//       </form>
//       <p>
//         Already registered? <Link href="/login">Login here</Link>
//       </p>
//     </div>
//   );
// }
// async function createBillboard() {
//   console.log("this is createBillboard in client ");
//   try {
//     const response = await axios.post(
//       "/api/billboards",
//       {
//         Label: "My First Billboard",
//         ImageUrl: "http://example.com/image.jpg"
//       },
//       {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     if (response.status === 201) {
//       console.log("Billboard created successfully:", response.data);
//       // Perform additional actions, like updating the UI or redirecting
//     } else {
//       console.log("Received unexpected status code:", response.status);
//       // Handle unexpected status code
//     }
//   } catch (error) {
//     console.error("An error occurred while creating the billboard:", error);
//     // Handle the error
//   }
// }

// test
