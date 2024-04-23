"use client";

import { ColorForm } from "./components/color-form";
import { Color } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const ColorPage = ({ params }: { params: { colorId: string } }) => {
  const [colorData, setColorData] = useState<Color | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.colorId;

  const fetchColor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8888/api/colors/${id}`
      );

      if (response.data && response.status === 200) {
        const color = response.data.data;
        const colorData: Color = {
          id: color.id,
          name: color.name,
          value: color.value,
          createdAt: color.createdAt
        };

        setColorData(colorData);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== "new") {
      fetchColor();
    }
  }, [id]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={colorData} />
      </div>
    </div>
  );
};

export default ColorPage;
