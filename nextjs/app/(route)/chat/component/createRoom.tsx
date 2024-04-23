"use client";

import { Button } from "@/components/ui/button";
import { linkCustomer } from "@/lib/config";
import { getSession, useSession } from "next-auth/react";
import React, { useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { WebsocketContext } from "../provider/websocket_provider";

const CreateRoom = () => {
  const session = useSession();
  const { conn, setConn } = useContext(WebsocketContext);
  console.log("nextjs/app/(route)/chat/component/createRoom.tsx ", session);
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
        data
      );

      if (res.ok) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createRooms = async (userEmail: string) => {
    const roomID = uuidv4();
    console.log(
      "nextjs/app/(route)/chat/component/createRoom.tsx roomID",
      roomID
    );
    try {
      const res = await fetch(`${linkCustomer.API_URL}/ws/createRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: roomID,
          name: userEmail
        })
      });
      // join room

      if (session.data?.user.userID && session.data?.user.useremail) {
        const teset = "ws://localhost:8888";
        // ${linkCustomer.WEBSOCKET_URL}
        const linktest = `${teset}/ws/joinRoom/${roomID}?userId=${session.data.user.userID}&username=${session.data?.user.useremail}`;

        console.log(
          "nextjs/app/(route)/chat/component/createRoom.tsx roomID linktest",
          linktest
        );
        const ws = new WebSocket(linktest);

        if (ws.OPEN) {
          setConn(ws);
          console.log(
            "nextjs/app/(route)/chat/component/createRoom.tsx set conn ws",
            conn
          );
          return;
        }
      }

      //
      if (res.ok) {
        getRooms();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        className="bg-red border text-white"
        onClick={async () => {
          if (session.data?.user?.useremail) {
            await createRooms(session.data.user.useremail);
          } else {
            // Handle the case where useremail is undefined (e.g., show error message)
          }
        }}
      >
        Create roomsadf
      </Button>
      {/* <Button className="bg-blue border text-white" onClick={getRooms}>
        get room
      </Button> */}
    </div>
  );
};

export default CreateRoom;
