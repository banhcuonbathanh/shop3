// import Credentials from "next-auth/providers/credentials";
// import Github from "next-auth/providers/github";
// import Google from "next-auth/providers/google";

// import { LoginSchema } from "./app/auth/utils/schemas";
// import { getUserByEmail } from "./app/auth/data/user";
// import { NextAuthConfig } from "next-auth";

// export default {
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET
//     }),
//     Github({
//       clientId: process.env.GITHUB_CLIENT_ID,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET
//     }),
//     Credentials({
//       name: "Credentials",
//       async authorize(credentials, req) {
//         console.log(
//           "this is inside Credentials /auth/middleware/auth.config.ts"
//         );
//         // const validatedFields = LoginSchema.safeParse(credentials);

//         // if (validatedFields.success) {
//         //   const { email, password } = validatedFields.data;

//         //   const user = await getUserByEmail(email);
//         //   // if (!user || !user.password) return null;

//         //   // const passwordsMatch = await bcrypt.compare(
//         //   //   password,
//         //   //   user.password,
//         //   // );

//         //   // if (passwordsMatch)

//         //   return user;
//         // }

//         return null;
//       }
//     })
//   ]
// } satisfies NextAuthConfig;