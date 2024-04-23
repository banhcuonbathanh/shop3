import { Button } from "@/components/ui/button";
import { linkCustomer } from "@/lib/config";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const CreateRoom = () => {
  const getRooms = async () => {
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
        res
      );

      if (res.ok) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createRooms = async () => {
    console.log(
      "3.admin_cloth_nextjs13/app/shop/chat/component/createRoom.tsx createRooms"
    );
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
        getRooms();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button className="bg-red border text-white" onClick={createRooms}>
        Create room
      </Button>
      <Button className="bg-blue border text-white" onClick={getRooms}>
        get room
      </Button>
    </div>
  );
};

export default CreateRoom;
