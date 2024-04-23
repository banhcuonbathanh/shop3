"use client";

import React, {
  useState,
  MouseEvent,
  useContext,
  useEffect,
  useRef
} from "react";

import { WebsocketContext } from "../provider/websocket_provider";
import { useRouter } from "next/router";
import { linkCustomer } from "@/lib/config";
import { getSession, useSession } from "next-auth/react";
export type Message = {
  content: string;
  client_id: string;
  username: string;
  room_id: string;
  type: "recv" | "self";
};
// Define the types for the props
type ChatBoxProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;

  showChat: boolean;
};

// ChatBox Component
const ChatBox: React.FC<ChatBoxProps> = ({
  message,
  setMessage,

  showChat
}) => {
  // --------------------------------------------------

  const { data: session, status } = useSession();
  console.log(
    "3.admin_cloth_nextjs13/app/shop/chat/component/chat-box.tsx",
    session
  );
  const user = session?.user;

  // const [messages, setMessage1] = useState<Array<Message>>([]);
  const [users, setUsers] = useState<Array<{ username: string }>>([]);
  const { conn, setConn } = useContext(WebsocketContext);
  const roomId = conn?.url.split("/")[5];
  const [mounted, setMonuted] = useState();

  useEffect(() => {
    // if (conn === null) {
    //   router.push("/");
    //   return;
    // }

    const roomId = conn?.url.split("/")[5];
    async function getUsers() {
      try {
        const res = await fetch(
          `${linkCustomer.API_URL}/ws/getClients/${roomId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          }
        );
        const data = await res.json();

        setUsers(data);
      } catch (e) {
        console.error(e);
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    if (conn === null) {
      console.log("conn === null");
      return;
    }

    conn.onmessage = (message) => {
      const m: Message = JSON.parse(message.data);
      if (m.content == "A new user has joined the room") {
        setUsers([...users, { username: m.username }]);
      }

      if (m.content == "user left the chat") {
        const deleteUser = users.filter((user) => user.username != m.username);
        setUsers([...deleteUser]);
        // setMessage1([...messages, m]);
        return;
      }

      user?.userName == m.username ? (m.type = "self") : (m.type = "recv");
      // setMessage1([...messages, m]);
    };

    conn.onclose = () => {};
    conn.onerror = () => {};
    conn.onopen = () => {};
  }, [conn, users]);

  const sendMessage = () => {
    if (conn === null) {
      console.log(
        "3.admin_cloth_nextjs13/app/shop/chat/component/chat-box.tsx  conn === null)"
      );
      return;
    }
    console.log(
      "3.admin_cloth_nextjs13/app/shop/chat/component/chat-box.tsx  conn not null)"
    );
    conn.send("textarea.current.value");
  };

  // -----------------------------------------------------------------------
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleSend = () => {
    console.log(message);
  };

  // chat app
  if (conn !== null) {
    conn.onmessage = (event) => {
      console.log(
        "nextjs/app/(route)/chat/component/chat-box.tsx   conn.onmessage",
        conn.onmessage
      );
      console.log("Received message from server:", event.data);
      // Now you can do whatever you want with the message
      // For example, you can update your state to display the message in your chat app
    };
  } else {
    console.log("WebSocket connection is not established.");
  }

  // const { conn } = useContext(WebsocketContext)
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);
  const [roomName, setRoomName] = useState("");

  // const router = useRouter();
  useEffect(() => {});
  return (
    <div
      className={`flex flex-col h-64 w-80 border border-gray-300 rounded-xl p-4 fixed bottom-0 right-0 transition-opacity duration-500 ${
        showChat ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="overflow-auto mb-4">
        {/* Here you can render the chat messages */}
      </div>
      <div className="flex fixed bottom-5 right-5">
        <input
          type="text"
          value={message}
          onChange={handleInputChange}
          className="flex-grow border border-gray-300 rounded-l-xl p-2"
        />
        <button
          className="bg-blue-500 text-white rounded-r-xl px-4"
          onClick={() => {
            console.log(" sending message");
            sendMessage();
          }}
        >
          SEND
        </button>

        {/* <button
          onClick={() => {
            console.log("akdshjfk;jasd");
          }}
        >
          asdf
        </button> */}
      </div>
    </div>
  );
};

export default ChatBox;
