"use client";

import { ColorClient } from "./components/client"; // Import ColorsClient

import { useEffect, useState } from "react";
import axios from "axios";
import { link_internal } from "@/lib/config";
import { Color, ColorColumn } from "@/types"; // Update the import to Color

const ColorsPage = ({ params }: { params: { storeId: string } }) => {
  // Rename the component to ColorsPage
  const [colorsData, setColorsData] = useState<ColorColumn[]>([]); // Update state variable and type
  const [loading, setLoading] = useState(true);

  const fetchColors = async () => {
    console.log(" this is fetchColors");

    // Update the function name
    try {
      const response = await axios.get(
        link_internal.routes_shop_admin_colors.colorid
      ); // Update route

      const test = response.data.data.data;
      console.log(" this is fetchColors 11", test);
      if (response.data.data) {
        const transformedData: ColorColumn[] = test.map((item: Color) => ({
          // Update types
          id: item.id.toString(),
          name: item.name,
          value: item.value,
          createdAt: item.createdAt // Add 'createdAt' field if available in the response
        }));

        setColorsData(transformedData);
      } else {
        console.error("Data in response is not an array.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColors(); // Call the fetchColors function
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ColorClient data={colorsData} /> // Update to ColorsClient
        )}
      </div>
    </div>
  );
};

export default ColorsPage; // Update the component name
