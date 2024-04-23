// import { revalidatePath } from "next/cache";
// "use server";
export async function register(
  name: string,
  email: string,
  Password: string,
  Image: string,
  phone_number: string,
  streetAddress: string
) {
  console.log("register user server action12123412");
  console.log("3 server");
  try {
    const response = await fetch("http://localhost:8888/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        userId: 1,
        name,
        email,
        Password,
        Image,
        phone_number,
        streetAddress,
        completed: false
      })
    });

    console.log("4");
    const data = await response.json(); // Extract JSON content

    console.log("register user server data response", data.data);

    return data.data;
  } catch (err) {
    console.log("this is error trong register use server", err);
    return { error: "error register trong server" };
  }
}

//--------
export async function login(Password: string, email: string) {
  console.log("register user server action12123412");
  console.log("3 server");
  try {
    const response = await fetch("http://localhost:8888/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        Password,

        completed: false
      })
    });

    console.log("4");
    const data = await response.json(); // Extract JSON content

    console.log("register user server data response", data.data);

    return data.data;
  } catch (err) {
    console.log("this is error trong register use server", err);
    return { error: "error register trong server" };
  }
}

// if (!response.ok) {
//   throw new Error(`HTTP error! status: ${response.status}`);
// }

// revalidatePath("http://localhost:3000/sign-up");

// export async function register(
//   name: string,
//   email: string,
//   Password: string,
//   Image: string,
//   phone_number: string,
//   streetAddress: string
// ) {
//   console.log("register user server action12123412");
//   console.log("3 server");

//   try {
//     const response = await fetch("http://localhost:8888/api/users", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },

//       body: JSON.stringify({
//         userId: 1,
//         name,
//         email,
//         Password,
//         Image,
//         phone_number,
//         streetAddress,
//         completed: false
//       })
//     });

//     console.log("4", await response.json());
//     const data = await response.json(); // Extract JSON content and update data

//     console.log("register user server data response", data);

//     return data;
//   } catch (err) {
//     console.log("this is error trong register use server");
//     return { error: "error register trong server" }; // Now data is accessible here
//   }
// }
