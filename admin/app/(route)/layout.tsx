// import Footer from "./componet/footer/footer";

import { ToastProviderShopAdmin } from "@/provider/toast-provider-shop-admin";

import Navbar from "@/components/navbar/navbar";
import { ModalProviderShopAdmin } from "@/provider/modal-provider-shop-admin";

export default async function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <ToastProviderShopAdmin />
      <ModalProviderShopAdmin />
      <Navbar />
      {children}
      {/* <Footer /> */}
    </div>
    // <>

    //   {children}
    // </>
  );
}
