"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { link_internal } from "@/lib/config";
import { Billboard } from "@/types"; // Import the Billboard type
import { BillboardForm } from "./components/billboard-form"; // Import the BillboardForm component

const BillboardPage = ({ params }: { params: { billboardId: string } }) => {
  const [billboardData, setBillboardData] = useState<Billboard | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.billboardId;

  const fetchBillboard = () => {
    setLoading(true);
    axios
      .get(`${link_internal.routes_shop_admin_billboards.billboardid}${id}`)
      .then((response) => {
        if (response.data && response.status === 200) {
          const billboard = response.data.data;
          const billboardData: Billboard = {
            id: billboard.id,
            label: billboard.label,
            imageUrl: billboard.imageUrl,
            createdAt: billboard.createdAt
          };
          setBillboardData(billboardData);
        } else {
          console.error("Request failed with status:", response.status);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id !== "new" && id !== "") {
      fetchBillboard();
    }
  }, [id]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboardData} />
      </div>
    </div>
  );
};

export default BillboardPage;
