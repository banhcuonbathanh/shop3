"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  getRoomController,
  joinRoomController
} from "../chat/provider/controller-chat";
import { useContext, useEffect, useRef, useState } from "react";
import { WebsocketContext } from "../chat/provider/websocket_provider";
import { useStoreModalShopAdmin } from "@/components/use-hook-shop-admin/use-store-modal-shop-admin";
import ChatBody from "./message";
import { Message } from "@/types";

interface CellActionProps {
  data: string;
}
type Room = {
  id: string;
  name: string;
};
// const imageUrls = [
//   "http://localhost:8888/uploads/Your%20Title/home_bil_noard.png",
//   "http://localhost:8888/uploads/black.jpg",
//   "http://localhost:8888/uploads/s1%20orange.jpg"
// ];
export const CellActionImage: React.FC<CellActionProps> = ({ data }) => {
  const session = useSession();
  const { isOpenChatModal, onOpenChatModal } = useStoreModalShopAdmin();
  const { conn, setConn } = useContext(WebsocketContext);
  console.log(
    "admin/app/(route)/users/components/cell-action-chat.tsx email user",
    data
  );

  const [rooid, setroomid] = useState("");

  // message

  const [messages, setMessage] = useState<Array<Message>>([]);
  const textarea = useRef<HTMLTextAreaElement>(null);

  const sendMessage = () => {
    console.log(
      "admin/app/(route)/users/components/cell-action-chat.tsx chat message"
    );
    if (!textarea.current?.value) return;

    console.log(
      "admin/app/(route)/users/components/cell-action-chat.tsx chat message 11111"
    );
    if (conn === null) {
      console.log(
        "admin/app/(route)/users/components/cell-action-chat.tsx chat message conn null 2222"
      );
      return;
    }
    console.log(
      "admin/app/(route)/users/components/cell-action-chat.tsx chat message conn ok"
    );
    conn.send(textarea.current.value);
    textarea.current.value = "";
  };

  // reiceve

  useEffect(() => {
    if (conn === null) {
      console.log("conn === null");
      return;
    }

    conn.onmessage = (message) => {
      console.log(
        "nextjs/app/(route)/chat/component/chat-box.tsx message.data",
        message.data
      );
      const m: Message = JSON.parse(message.data);
      console.log(
        "nextjs/app/(route)/chat/component/chat-box.tsx message.data",
        message.data
      );
      // if (m.content == "A new user has joined the room") {
      //   setUsers([...users, { username: m.username }]);
      // }
      // console.log("nextjs/app/(route)/chat/component/chat-box.tsx m", m);
      // if (m.content == "user left the chat") {
      //   const deleteUser = users.filter((user) => user.username != m.username);
      //   setUsers([...deleteUser]);
      //   // setMessage1([...message1, m]);
      //   return;
      // }

      // user?.userName == m.username ? (m.type = "self") : (m.type = "recv");
      // // setMessage1([...message1, m]);
    };

    conn.onclose = () => {};
    conn.onerror = () => {};
    conn.onopen = () => {};
  }, [conn]);
  //
  return (
    <>
      <button
        className="p-4 border rounded-md"
        onClick={async () => {
          const listRoom: Room[] = await getRoomController();
          console.log(
            "admin/app/(route)/users/components/cell-action-chat.tsx listRoom",
            listRoom
          );
          const userRoom = listRoom.find((room) => room.name === data);

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
        join
      </button>
      <button
        className="p-4 border rounded-md"
        onClick={() => {
          onOpenChatModal();
        }}
      >
        open chat
      </button>

      <button
        className="p-4 border rounded-md"
        onClick={async () => {
          const listRoom = await getRoomController();
          console.log(
            "admin/app/(route)/users/components/cell-action-chat.tsx email listRoom",
            listRoom
          );
        }}
      >
        get room
      </button>

      {
        <div className="flex flex-col w-full">
          <div className="p-4 md:mx-6 mb-14">
            <ChatBody data={messages} />
          </div>
          <div className="fixed bottom-0 mt-4 w-full">
            <div className="flex md:flex-row px-4 py-2 bg-grey md:mx-4 rounded-md">
              <div className="flex items-center bg-white">
                <button
                  className="p-2 rounded-md bg-blue text-white"
                  onClick={sendMessage}
                >
                  Send
                </button>
              </div>
              <div className="flex w-full mr-4 rounded-md border border-blue">
                <textarea
                  ref={textarea}
                  placeholder="type your message here"
                  className="w-full h-10 p-2 rounded-md focus:outline-none"
                  style={{ resize: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
