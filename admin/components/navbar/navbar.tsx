
// import prismadb from "@/lib/prismadb";


import { MainNavShopAdmin } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  // const stores = await prismadb.store.findMany({
  //   where: {
  //     userId,
  //   }
  // });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center">
        {/* <StoreSwitcher items={stores} /> */}
        <MainNavShopAdmin />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
