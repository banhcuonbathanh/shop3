import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      accessToken: string;
      refreshToken: string;
      userID: string;
      orderID: string;
      orders: Order;
      useremail: string;
      userName: string;
    } & DefaultSession["user"];
  }
}
