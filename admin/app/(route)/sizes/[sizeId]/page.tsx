"use client";

import { useCallback, useEffect, useState } from "react";
import { SizeForm } from "./components/size-form";
import axios from "axios";
import { Size } from "@/types";
import { linkCustomer } from "@/lib/config";

const SizePage = ({ params }: { params: { sizeId: string } }) => {
  const [sizeData, setSizeData] = useState<Size | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.sizeId;

  const fetchSize = useCallback(async () => {
    const base = linkCustomer.golang_Base;
    const findSize = linkCustomer.routes_size.getSizeById;
    try {
      // const response = await axios.get(`http://localhost:8888/api/sizes/${id}`);
      const response = await axios.get(`${base}${findSize}${id}`);

      if (response.data && response.status === 200) {
        const size = response.data.data;
        const sizeData: Size = {
          id: size.id,
          name: size.name,
          value: size.value,
          createdAt: size.createdAt
        };

        setSizeData(sizeData);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  }, [id, linkCustomer.golang_Base, linkCustomer.routes_size.getSizeById, setSizeData]);

  useEffect(() => {
    if (id !== "new") {
      fetchSize();
    }
  }, [id, fetchSize]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={sizeData} />
      </div>
    </div>
  );
};

export default SizePage;
