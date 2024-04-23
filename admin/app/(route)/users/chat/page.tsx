"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import ChatBox from "./component/chat-box";
import {
  createRoomController,
  getRoomController,
  joinRoomController
} from "./provider/controller-chat";
import { WebsocketContext } from "./provider/websocket_provider";
import { linkCustomer } from "@/lib/config";
import CreateRoom from "./component/createRoom";
import { useSession } from "next-auth/react";
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
  // console.log(
  //   "nextjs/app/(route)/chat/chat.tsx session",
  //   session.data?.user.userID
  // );
  //
  const { setConn } = useContext(WebsocketContext);

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

  const [roomId, setRoomID] = useState<number>(0);
  const chatRef = useRef(null);

  useOutsideAlerter(chatRef, () => setShowChat(true));

  const handleImageClick = async () => {
    if (session.data?.user) {
      const userID = session.data.user.userID;
      const userEmail = session.data.user.useremail;
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
        className="bg-blue-500 border"
        onClick={() => {
          // joinRoom("1");
        }}
      >
        join room sadf
      </button>

      <CreateRoom />
    </div>
  );
};

export default ChatPage;
