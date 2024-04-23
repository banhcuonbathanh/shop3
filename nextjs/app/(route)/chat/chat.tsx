"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import ChatBox from "./component/chat-box";
import {
  createRoomController,
  getRoomController,
  joinRoomController
} from "./provider/controller";
import { WebsocketContext } from "./provider/websocket_provider";
import { linkCustomer } from "@/lib/config";
import CreateRoom from "./component/createRoom";
import { useSession } from "next-auth/react";
type Room = {
  id: string;
  name: string;
};
export type Message = {
  content: string;
  client_id: string;
  username: string;
  room_id: string;
  type: "recv" | "self";
};
// Custom hook
function useOutsideAlerter(
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

const ChatPage = () => {
  const session = useSession();
  const userID = session.data?.user.userID;
  const userEmail = session.data?.user.useremail;
  // console.log(
  //   "nextjs/app/(route)/chat/chat.tsx session",
  //   session.data?.user.userID
  // );
  //
  const { conn, setConn } = useContext(WebsocketContext);

  const joinRoom = (roomId: string, useID: string, useName: string) => {
    const ws = new WebSocket(
      `${linkCustomer.WEBSOCKET_URL}/ws/joinRoom/1?userId=1&username=test`
    );
    if (ws.OPEN) {
      setConn(ws);
      //   router.push('/app')
      return;
    }
  };
  //
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(true);

  const [rooid, setroomid] = useState("");
  const chatRef = useRef(null);

  useOutsideAlerter(chatRef, () => setShowChat(true));

  const handleImageClick = async () => {
    if (session.data?.user) {
      if (userID && userEmail) {
        console.log("3.admin_cloth_nextjs13/app/shop/chat/chat.tsx roomCreate");
        const roomCreate = await createRoomController(userID, userEmail);
        console.log(
          "3.admin_cloth_nextjs13/app/shop/chat/chat.tsx roomCreate",
          roomCreate
        );
      } else {
        // Handle the case where userID or userEmail is undefined
        console.error("User data missing for room creation");
      }
    } else {
      // Handle the case where session data is undefined
      console.error("Session data missing for room creation");
    }

    setShowChat(true);
  };
  return (
    <div ref={chatRef}>
      {showChat ? (
        <ChatBox
          message={message}
          setMessage={setMessage}
          showChat={showChat}
          roomID={""}
        />
      ) : (
        <Image
          src={"/bubble message.png"}
          alt=""
          className={`fixed bottom-0 right-0 p-6 transition-opacity duration-500 `}
          width={100}
          height={200}
          onClick={handleImageClick}
        />
      )}

      <button
        onClick={async () => {
          console.log(
            "3.admin_cloth_nextjs13/app/shop/chat/chat.tsx getRoomController"
          );
          await getRoomController();
        }}
      >
        get room
      </button>

      <button
        onClick={async () => {
          console.log(
            "3.admin_cloth_nextjs13/app/shop/chat/chat.tsx getRoomController join room"
          );
          // joinRoomController("1");
        }}
      >
        join room1212
      </button>

      <button
        className="p-4 border rounded-md m-6 bg-blue-500"
        onClick={async () => {
          const listRoom: Room[] = await getRoomController();
          console.log(
            "admin/app/(route)/users/components/cell-action-chat.tsx listRoom",
            listRoom
          );
          const userRoom = listRoom.find((room) => room.name === userEmail);

          if (userRoom) {
            setroomid(userRoom.id);
            console.log("Found user's room: id ", userRoom.id); // Access the ID
          } else {
            console.log("No room found for user with email:");
          }

          console.log("Found user's room: asdfasdf"); // Access the ID
          if (session.data?.user.userID && session.data?.user.useremail) {
            console.log("room id ", rooid);
            // await joinRoomController(
            //   session.data.user.userID, // Assert that userID is not undefined here
            //   session.data?.user.useremail,
            //   rooid
            // );

            const teset = "ws://localhost:8888";
            // ${linkCustomer.WEBSOCKET_URL}
            const linktest = `${teset}/ws/joinRoom/${rooid}?userId=${session.data.user.userID}&username=${session.data?.user.useremail}`; //

            console.log(
              "admin/app/(route)/users/chat/provider/controller-chat.ts linktest",
              linktest
            );
            const ws = new WebSocket(linktest);

            if (ws.OPEN) {
              setConn(ws);
              console.log(
                "admin/app/(route)/users/components/cell-action-chat.tsx set conn ws",
                conn
              );
              return;
            }
          } else {
            console.error("userID or userRoom is undefined");
          }
        }}
      >
        join new
      </button>

      <CreateRoom />
    </div>
  );
};

export default ChatPage;
