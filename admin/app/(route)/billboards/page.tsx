// import { useEffect, useState } from "react";
// import axios from "axios";
// import { link_internal } from "@/lib/config";
// import { Billboard } from "@/types"; // Import the Billboard type

import { get_Billboard_Shop } from "./billboard-controller/billboard-controller";
import { BillboardClient } from "./components/client"; // Import BillboardClient
// import { BillboardColumn } from "@/app/shop_admin/types";

const BillboardsPage = async () => {
  const billboard = await get_Billboard_Shop();

  return (
    <div className="flex-col">
      <BillboardClient data={billboard} />
    </div>
  );
};

export default BillboardsPage;
