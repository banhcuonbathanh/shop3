import { Button } from "@/components/ui/button";
import { linkCustomer } from "@/lib/config";
import { getSession } from "next-auth/react";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const CreateRoom = () => {
  const session = getSession();
console.log("")
  const getRooms = async (userEmail: string) => {
    console.log(
      "3.admin_cloth_nextjs13/app/shop/chat/component/createRoom.tsx getRooms"
    );
    try {
      const res = await fetch(`${linkCustomer.API_URL}/ws/getRooms`, {
        method: "GET"
      });

      const data = await res.json();

      console.log(
        "3.admin_cloth_nextjs13/app/shop/chat/component/createRoom.tsx getRooms",
        data
      );

      if (res.ok) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createRooms = async (userEmail: string) => {
    try {
      const res = await fetch(`${linkCustomer.API_URL}/ws/createRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: uuidv4(),
          name: "12"
        })
      });

      if (res.ok) {
        getRooms(userEmail);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        className="bg-red border text-white"
        onClick={() => {
          createRooms("szdafsd");
        }}
      >
        Create room
      </button>
      {/* <Button className="bg-blue border text-white" onClick={getRooms}>
        get room
      </Button> */}
    </div>
  );
};

export default CreateRoom;
