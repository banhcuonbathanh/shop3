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
  //
  const { setConn } = useContext(WebsocketContext);

  // const joinRoom = (roomId: string) => {
  //   const ws = new WebSocket(
  //     `${linkCustomer.WEBSOCKET_URL}/ws/joinRoom/1?userId=1&username=test`
  //   );
  //   if (ws.OPEN) {
  //     setConn(ws);
  //     //   router.push('/app')
  //     return;
  //   }
  // };
  //
  const [message, setMessage] = useState("");
  const [showChat, setShowChat] = useState(true);
  const chatRef = useRef(null);

  useOutsideAlerter(chatRef, () => setShowChat(true));

  // const handleImageClick = async () => {
  //   const roomCreate = await createRoomController("sdfgsdf");
  //   console.log(
  //     "3.admin_cloth_nextjs13/app/shop/chat/chat.tsx roomCreate",
  //     roomCreate
  //   );
  //   // setShowChat(true)
  // };
  return (
    <div ref={chatRef}>
      {/* {showChat ? (
        <ChatBox
          message={message}
          setMessage={setMessage}
          showChat={showChat}
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
      )} */}

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
          joinRoomController("1");
        }}
      >
        join room1212
      </button>

      {/* <button
        className="bg-blue border"
        onClick={() => {
          joinRoom("1");
        }}
      >
        join room
      </button> */}

      <CreateRoom />
    </div>
  );
};

export default ChatPage;
