import NavbarShop from "@/components/nav-bar-Shop/navbar-shop";

import ToastProvider from "@/provider/toast-provider";
import { ModalProviderShopAdmin } from "@/components/custommodal/modal-provider";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl">
            <ModalProviderShopAdmin />
      <ToastProvider />

      <NavbarShop />

      {children}

      {/* <Footer /> */}
    </div>
    // <>
    //   <NavbarAdmin />
    //   {children}
    // </>
  );
}
