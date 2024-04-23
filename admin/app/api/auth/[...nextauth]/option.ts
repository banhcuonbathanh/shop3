import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import { linkCustomer } from "@/lib/config";
import { Order, OrderItem } from "@/types";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30
  },
  pages: {
    signIn: "/auth/page/login"
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        // console.log("this is inside credentials authorize credentials");
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid email or password");
        }

        const linkLogin =
          linkCustomer.golang_Base + linkCustomer.routes_user.Login;

        const res = await fetch(linkLogin, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });
        const user = await res.json();

        // console.log("user data", user.data);
        if (user.status === "Bad Request") {
          console.log("inside 1111111212");

          throw new Error(user.data);
        }

        // console.log("thisajsdhfbjasdhfkjhaskdfhkasjhdfkhaskldfhksjd");

        // console.log("inside user.data.email", user.data);
        // console.log("inside user.data.email", user.data.Email);
        // console.log(
        //   "inside user.data.email new item",
        //   user.data.Orders[0].OrderItem
        // );
        const orders = user.data.Orders;
        if (
          user &&
          user.data &&
          user.data.Orders &&
          user.data.Orders.OrderItem
        ) {
          const orders = user.data.Orders;
          orders.OrderItem.forEach((orderItem: OrderItem, index: number) => {
            // console.log(`Order Item ${index + 1}:`, orderItem);
          });
        } else {
          // console.log("OrderItem is undefined");
        }

        return {
          id: user.data.id,
          firstName: user.data.Role,
          userName: user.data.name,

          email: user.data.email,
          emailVerified: user.data.emailVerified,
          phone: user.data.phone,
          image: user.data.image, // Example image URL
          accounts: user.data.ID,
          sessions: user.data.AccessToken
        };
        // const response = await sql`
        // SELECT * FROM users WHERE email=${credentials?.email}`;
        // const user = response.rows[0];

        // const passwordCorrect = await compare(
        //   credentials?.password || '',
        //   user.password
        // );

        // console.log({ passwordCorrect });

        // if (passwordCorrect) {
        //   return {
        //     id: user.id,
        //     email: user.email,
        //   };
        // }
      }
    })
  ],

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      console.log("admin/app/api/auth/[...nextauth]/option.ts jwt");
      // console.log(
      //   "this is jwttt in credential 222222222 token, user, trigger, session ",
      //   token,
      //   user,
      //   trigger,
      //   session
      // );
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      console.log("admin/app/api/auth/[...nextauth]/option.ts session");
      const linkLogin =
        linkCustomer.golang_Base + linkCustomer.routes_tokens.createToken;

      const res = await fetch(linkLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: token.firstName,
          userID: token.accounts
        })
      });

      const user = await res.json();

      // get user information
      const fetchUserLink =
        linkCustomer.golang_Base +
        linkCustomer.routes_users.findUserById +
        token.accounts;

      // console.log(
      //   "this is session in option api.auth/option fetchUserLink ",
      //   fetchUserLink
      // );
      const userServerData = await fetch(fetchUserLink, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      // console.log(
      //   "this is session in option api.auth/option fetchUserLink sadfsdfs"
      // );
      const userData = await userServerData.json();

      // console.log(
      //   "3.admin_cloth_nextjs13/app/api/auth/[...nextauth]/option.ts userData",
      //   userData
      // );
      // console.log(
      //   "this is session in option api.auth/option userData ",
      //   userData.data.Orders[0]
      // );

      //

      session.user = {
        accessToken: user.data.AT,
        refreshToken: user.data.RT,
        userID: token.accounts,
        orderID: userData.data?.Orders?.[0]?.ID,
        orders: userData.data?.Orders?.[0] || {},
        useremail: userData.data?.email
      };
      // console.log("this is session", session);
      return session;
    }
  }
};
export const getAuthSession = () => getServerSession(options);
